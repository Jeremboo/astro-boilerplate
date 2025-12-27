import type { LoaderVideoArgs } from '.';

export default function loadVideo(
  src: string,
  { width = 512, height = 512, loop = false, muted = true }: LoaderVideoArgs = {}
): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const videoPlayer = document.createElement('video');
    videoPlayer.width = width;
    videoPlayer.height = height;
    videoPlayer.loop = loop;
    videoPlayer.muted = muted;
    videoPlayer.preload = 'auto'; // 'auto', 'metadata', or 'none'
    videoPlayer.playsInline = true;

    const source = document.createElement('source');
    source.id = 'mp4';
    source.type = 'video/mp4';
    videoPlayer.appendChild(source);

    if (!videoPlayer.canPlayType('video/mp4')) {
      reject(new Error('Browser cannot play MP4 videos.'));
      return;
    }

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`Video load timed out: ${src}`));
    }, 10000);

    // Cleanup event listeners
    const cleanup = () => {
      clearTimeout(timeout);
      videoPlayer.removeEventListener('canplaythrough', onCanPlay);
      videoPlayer.removeEventListener('error', onError);
      videoPlayer.removeEventListener('loadedmetadata', onCanPlay);
    };

    const onCanPlay = () => {
      cleanup();
      resolve(videoPlayer);
    };

    const onError = (e: any) => {
      cleanup();

      if (videoPlayer.error && videoPlayer.error.code === 4) {
        // NOTE 2025-04-22 jeremboo: Safari issue. It's not loaded because non interaction on the browser. Should be loaded later
        onCanPlay();
      } else {
        reject(new Error(`Failed to load: ${src}`));
      }
    };

    videoPlayer.addEventListener('loadedmetadata', onCanPlay);
    videoPlayer.addEventListener('canplaythrough', onCanPlay);
    videoPlayer.addEventListener('error', onError);
    videoPlayer.src = src;
    if (videoPlayer.readyState > 3) {
      onCanPlay();
    }

    // HACK 2025-04-22 jeremboo: Directly trigger the resolve because of Safari who doesn't want to play it before a trigger
    onCanPlay();
  });
}
