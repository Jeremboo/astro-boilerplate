import { MathUtils, Vector2 } from 'three';

export enum Quality {
  High,
  Normal,
  Low
}

const DEFAULT_ANTIALIAS = true; // Disable antialias if you're not using post processing

// TODO 2025-04-08 jeremboo: Check maxFrameBufferSize and fps usage
export type QualitySettings = { antialias: boolean; pixelRatio: number; maxFrameBufferSize: Vector2; fps: number };

const QUALITY_SETTINGS: { [key in Quality]: QualitySettings } = {
  [Quality.High]: {
    antialias: DEFAULT_ANTIALIAS,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    maxFrameBufferSize: new Vector2(1280, 720),
    fps: 120,
  },
  [Quality.Normal]: {
    antialias: DEFAULT_ANTIALIAS,
    pixelRatio: Math.min(1.6, window.devicePixelRatio) || 1,
    maxFrameBufferSize: new Vector2(1280, 720),
    fps: 60,
  },
  [Quality.Low]: {
    antialias: DEFAULT_ANTIALIAS,
    pixelRatio: 1,
    maxFrameBufferSize: new Vector2(1024, 640),
    fps: 30,
  },
};

const TIERS = [Quality.Low, Quality.Normal, Quality.High]; // Based on what return detect-gpu

export const getQualitySettings = (quality: Quality) => {
  return QUALITY_SETTINGS[quality];
};

export const benchmarkQualitySettings = async (detectGpuOptions = {}) => {
  const { getGPUTier } = await import('detect-gpu');
  const gpuTier = await getGPUTier(detectGpuOptions);
  console.log('gpuTier', gpuTier);
  return QUALITY_SETTINGS[TIERS[MathUtils.clamp(gpuTier.tier - 1, 0, TIERS.length - 1)]];
};
