import type { Loader } from 'three';
import { AssetType } from '~types/enum';

export type LoaderAudioArgs = { loop?: boolean };
export type LoaderVideoArgs = { width?: number; height?: number; loop?: boolean; muted?: boolean };
export type LoaderTextureArgs = { imageOrientation?: 'flipY' } | undefined;
export type LoaderToArgsMap = {
  [AssetType.audio]: LoaderAudioArgs;
  [AssetType.audioPositional]: LoaderAudioArgs;
  [AssetType.video]: LoaderVideoArgs;
  [AssetType.gltf]: undefined;
  [AssetType.image]: undefined;
  [AssetType.ktx2Texture]: undefined;
  [AssetType.texture]: LoaderTextureArgs;
};

export const LoaderMap = {
  [AssetType.audio]: async () => (await import('./loadAudio')).default,
  [AssetType.audioPositional]: async () => (await import('./loadAudioPositional')).default,
  [AssetType.video]: async () => (await import('./loadVideoTexture')).default,
  [AssetType.gltf]: async () => (await import('./loadGLTF')).default,
  [AssetType.image]: async () => (await import('./loadImage')).default,
  [AssetType.ktx2Texture]: async () => (await import('./loadKTX2Texture')).default,
  [AssetType.texture]: async () => (await import('./loadTexture')).default
};

export async function load<T>(loader: Loader, src: string): Promise<T> {
  return new Promise((resolve, reject) => {
    loader.load(
      src,
      (data) => {
        resolve(data as T);
      },
      (xhr: ProgressEvent) => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100;
          console.log(`${src} progress: ${percentComplete}%`);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}
