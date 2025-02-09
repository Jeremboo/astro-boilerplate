export default async function initProject(onProgress: (progress: number) => void) {
  let loading = 0;
  const intervalId = setInterval(() => {
    loading += 0.1;
    onProgress(loading);
    if (loading >= 1) {
      clearInterval(intervalId);
    }
  }, 200);
}
