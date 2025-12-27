import type { Audio, CompressedTexture, PositionalAudio, Texture, VideoTexture } from 'three';
import type { GLTF } from 'three/examples/jsm/Addons.js';

import { LoaderMap, type LoaderToArgsMap } from '~webgl/utils/loaders';

import audioManager from './audioManager';
import { AssetType } from '~types/enum';

type AssetToDataMap = {
  [AssetType.audio]: Audio;
  [AssetType.audioPositional]: PositionalAudio;
  [AssetType.video]: VideoTexture;
  [AssetType.gltf]: GLTF;
  [AssetType.image]: HTMLImageElement;
  [AssetType.ktx2Texture]: CompressedTexture;
  [AssetType.texture]: Texture;
};

export interface AssetProps<TId extends string = string, T extends AssetType = AssetType> {
  id: TId;
  src: string;
  type: T;
  args?: LoaderToArgsMap[T];
}

export interface Asset<T extends AssetType = AssetType> extends AssetProps<string, T> {
  data: AssetToDataMap[T];
  onLoaded?: () => AssetToDataMap[T];
}

class AssetManager {
  private assets: { [key in string]: Asset } = {};

  private deferredAssetCallbacks: { [key in string]: ((asset: Asset) => void)[] } = {};

  private loadAsset = async (props: AssetProps) => {
    const { src, type, args } = props;
    if (!LoaderMap[type]) {
      throw new Error(`[AssetManager::loadAsset] no loader found for ${src} type ${type}`);
    }
    const load = await LoaderMap[type]();
    const data = await load(src, args as any); // typescript error
    const asset = { ...props, data };
    return asset;
  };

  private loadAssets = async (props: AssetProps[]) => {
    return Promise.all(props.map(this.loadAsset));
  };

  /*
   * * *******************
   * * LOAD DEFERRED
   * * *******************
   */

  // NOTE 2025-04-29 jeremboo: Only directly load deferred assets if the audio context is ready
  private async loadDeferredAssets(deferredAssetProps: AssetProps[]) {
    if (audioManager.isRunning) {
      return this.loadAssets(deferredAssetProps);
    }
    deferredAssetProps.forEach(({ id }) => {
      this.deferredAssetCallbacks[id] = [];
    });
    const onContextRunning = async () => {
      audioManager.remove(onContextRunning);
      await this.load(...deferredAssetProps);
      // TODO 2025-09-18 jeremboo: It shouldn't be there. Move it and also check audio in nanostore
      audioManager.toggleAudio(true);
    };
    audioManager.add(onContextRunning);
    return [];
  }

  /*
   * * *******************
   * * PUBLIC
   * * *******************
   */

  async load(...assetProps: AssetProps[]) {
    const [directAssets, deferredAssets] = assetProps.reduce(
      (acc, props) => {
        const isDeferred =
          props.type === AssetType.audio || props.type === AssetType.audioPositional || props.type === AssetType.video;
        acc[isDeferred ? 1 : 0].push(props);
        return acc;
      },
      [[], []] as AssetProps[][]
    );

    const assets: Asset[] = await this.loadAssets(directAssets);
    assets.push(...(await this.loadDeferredAssets(deferredAssets)));
    assets.forEach((asset) => {
      // Save the asset
      this.assets[asset.id] = asset;

      // If something where already waiting for the asset
      if (this.deferredAssetCallbacks[asset.id]) {
        this.deferredAssetCallbacks[asset.id].forEach((callback) => {
          callback(asset);
        });
        delete this.deferredAssetCallbacks[asset.id];
      }
    });
  }

  async get<T extends AssetType>(id: string): Promise<Asset<T>> {
    const asset = this.assets[id];
    if (asset) {
      return asset as Asset<T>;
    }
    // If the asset is waiting for audio context to be loaded
    const deferredAsset = this.deferredAssetCallbacks[id];
    if (deferredAsset) {
      console.warn(`[AssetManager::get] audio context not ready, waiting before loading ${id}...`);
      const callback: Promise<Asset<T>> = new Promise((resolve) => {
        this.deferredAssetCallbacks[id].push((_asset) => {
          resolve(_asset as Asset<T>);
        });
      });
      return callback;
    }
    throw new Error(`[AssetManager::get] no asset found for ${id}`);
  }

  async getAssets<T extends AssetType>(ids: string[]): Promise<Asset<T>[]> {
    return Promise.all(ids.map((id) => this.get<T>(id)));
  }

  dispose(id: string) {
    const asset = this.assets[id];
    if (asset) {
      // TODO 2025-04-28 jeremboo: Dispose the data depending on the type
      delete this.assets[id];
    }
  }
}

export default new AssetManager();
