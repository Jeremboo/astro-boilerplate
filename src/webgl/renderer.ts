import { SRGBColorSpace, WebGLRenderer } from 'three';

import { BACKGROUND_COLOR } from '~data/colors';
import { DEBUG_MODE } from '~data/index';

import { getQualitySettings, Quality, type QualitySettings } from './utils/graphics';

export default class Renderer extends WebGLRenderer {
  width!: number;
  height!: number;
  canvasWidth!: number;
  canvasHeight!: number;
  aspectRatio!: number;

  private baseSize: number;
  private maxDiag: number;

  public readonly qualitySettings: QualitySettings;

  constructor(canvas: HTMLCanvasElement) {
    const qualitySettings = getQualitySettings(Quality.Normal);

    super({
      antialias: qualitySettings.antialias,
      alpha: true,
      canvas
    });

    this.qualitySettings = qualitySettings;
    this.outputColorSpace = SRGBColorSpace;

    // Set to false for prod
    this.debug.checkShaderErrors = DEBUG_MODE;

    this.baseSize = Math.sqrt(this.qualitySettings.maxFrameBufferSize.x * this.qualitySettings.maxFrameBufferSize.y);
    this.maxDiag = this.baseSize * this.baseSize;

    this.setPixelRatio(this.qualitySettings.pixelRatio);
    this.setClearColor(BACKGROUND_COLOR);

    // this.shadowMap.enabled = true;
    // this.shadowMap.type = VSMShadowMap;
    // this.shadowMap.type = PCFShadowMap;
    // this.shadowMap.type = PCFSoftShadowMap;

    // The size follow the screen resolution by default
    this.resize();
  }

  resize() {
    this.canvasWidth = this.domElement.offsetWidth;
    this.canvasHeight = this.domElement.offsetHeight;
    this.resizeSize(this.canvasWidth, this.canvasHeight);

    // Reduce the resolution of the canvas if the screen size is too important
    const diag = this.canvasWidth * this.canvasHeight;
    if (diag > this.maxDiag) {
      let width = this.baseSize;
      let height = width / this.aspectRatio;

      const newDiag = width * height;
      const scalar = Math.sqrt(this.maxDiag / newDiag);
      width = Math.floor(width * scalar);
      height = Math.floor(height * scalar);

      this.resizeSize(width, height);
    }

    this.aspectRatio = this.width / this.height;

    // Set the sizes
    this.setSize(this.width, this.height, false);
  }

  private resizeSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

// if (DEBUG_MODE) {
//   const gl = renderer.getContext();
//   const gpuInfo = gl.getExtension('WEBGL_debug_renderer_info');
//   const gpu = gpuInfo && gl.getParameter(gpuInfo.UNMASKED_RENDERER_WEBGL);
//   console.log(`Graphics: ${profiler()}\nGPU: ${gpu}\nTier: ${getTier()}`);
// }