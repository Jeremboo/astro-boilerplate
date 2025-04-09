import { LoaderMap, LoaderType, type LoaderToArgsMap, type LoaderToDataMap } from '~webgl/utils/loaders';
import type { Scenes } from './sceneManager';

export interface AssetProps<T extends LoaderType = LoaderType> {
  id: string;
  src: string;
  type: T;
  args?: LoaderToArgsMap[T];
}

export interface Asset<T extends LoaderType = LoaderType> extends AssetProps<T> {
  data: LoaderToDataMap[T];
}

export enum AssetGroup {
  global = 'global',
}

export type AssetGroupID = Scenes | AssetGroup;

class AssetManager {
  assets: { [key in AssetGroupID]?: Asset[] } = {};

  async loadAsset(props: AssetProps, onProgress?: () => void) {
    const { src, type, args } = props;
    if (!LoaderMap[type]) {
      throw new Error(`AssetManager::load no loader found for type ${type}`);
    }
    const load = await LoaderMap[type]();
    const data = await load(src, args as any, onProgress); // typescript error with args here but it's fine
    return { ...props, data }

  }

  async load(assetProps: AssetProps[], groupId: AssetGroupID = AssetGroup.global, onProgress?: () => void) {
    this.assets[groupId] = this.assets[groupId] || [];
    const assets = await Promise.all(assetProps.map(props => this.loadAsset(props, onProgress)));
    this.assets[groupId].push(...assets.filter(asset => !!asset) as Asset[]);
  }

  get(groupId: AssetGroupID, id: string) {
    const asset = this.find(this.assets[groupId] ?? [], id);
    if (asset) {
      return asset;
    }
    console.warn(`AssetManager::get no assets found for ${id} in ${groupId}`);
    return undefined;
  }

  find(assets: Asset[], id: string) {
    return assets.find(asset => asset.id === id) || false;
  }

  remove(groupId: AssetGroupID) {
    // TODO 2025-04-09 jeremboo:
  }
}

export default new AssetManager();
