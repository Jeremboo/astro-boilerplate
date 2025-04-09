import type { Audio, AudioListener, CompressedTexture, Group, Loader, Texture } from "three";

export enum LoaderType {
  audio = 'audio',
  gltf = 'gltf',
  image = 'image',
  ktx2Texture = 'ktx2Texture',
  texture = 'texture',
}

export type LoaderToDataMap = {
  [LoaderType.audio]: Audio;
  [LoaderType.gltf]: Group;
  [LoaderType.image]: HTMLImageElement;
  [LoaderType.ktx2Texture]: CompressedTexture;
  [LoaderType.texture]: Texture;
}

export type LoaderAudioArgs = { audioListener: AudioListener };
export type LoaderTextureArgs = { imageOrientation?: 'flipY' } | undefined;
export type LoaderToArgsMap = {
  [LoaderType.audio]: LoaderAudioArgs;
  [LoaderType.gltf]: undefined;
  [LoaderType.image]: undefined;
  [LoaderType.ktx2Texture]: undefined;
  [LoaderType.texture]: LoaderTextureArgs;
}

export const LoaderMap = {
  [LoaderType.audio]: async () => (await import('./loadAudio')).default,
  [LoaderType.gltf]: async () => (await import('./loadGLTF')).default,
  [LoaderType.image]: async () => (await import('./loadImage')).default,
  [LoaderType.ktx2Texture]: async () => (await import('./loadKTX2Texture')).default,
  [LoaderType.texture]: async () => (await import('./loadTexture')).default,
}

export async function load<T>(loader: Loader, src: string, onProgress?: () => void): Promise<T> {
  return new Promise((resolve, reject) => {
    loader.load(
      src,
      (data) => {
        resolve(data as T);
      },
      onProgress,
      (error) => {
        reject(error);
      }
    );
  });
}