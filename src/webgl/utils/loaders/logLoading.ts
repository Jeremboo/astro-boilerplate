import { DefaultLoadingManager } from 'three';

import { showErrorMessage } from '~store/error';
import { setProgress, toggleLoading } from '~store/loading';

// TODO 2025-04-12 jeremboo: Transform as LoadingManager out of utils

let currentFile: string;
let time: Date;
let totalTime = 0;

function formatSeconds(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function secondsBetween(date1: Date, date2: Date) {
  // @ts-ignore
  const diffMs = date2 - date1;
  return diffMs / 1_000;
}

const startLoadingTimer = (url: string) => {
  const newTime = new Date();
  if (currentFile !== undefined && time !== undefined) {
    const secs = secondsBetween(time, newTime);
    totalTime += secs;
    console.log(`${currentFile} loaded in ${secs.toFixed(0)} secs`);
  }
  currentFile = url;
  time = new Date();
};

// If more complexity needed, see : https://threejs.org/docs/?q=LoadingM#api/en/loaders/managers/LoadingManager
export default function logLoading() {
  DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    currentFile = url;
    totalTime = 0;
    toggleLoading(true);
    // console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };

  DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    startLoadingTimer(url);
    setProgress(url, `${itemsLoaded}/${itemsTotal}`);

    // console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };

  DefaultLoadingManager.onLoad = function () {
    toggleLoading(false);
    console.log(`Loading Complete in ${formatSeconds(totalTime)} secs.`);
  };

  DefaultLoadingManager.onError = function (url) {
    toggleLoading(false);
    showErrorMessage(`There was an error loading ${url}`);
    // console.log( 'There was an error loading ' + url );
  };
}
