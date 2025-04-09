import { DefaultLoadingManager } from "three";

// If more complexity needed, see : https://threejs.org/docs/?q=LoadingM#api/en/loaders/managers/LoadingManager
export default function logLoading() {
  DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };

  DefaultLoadingManager.onLoad = function ( ) {
    console.log( 'Loading Complete!');
  };

  DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };

  DefaultLoadingManager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url );
  };
}