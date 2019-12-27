# TrainingReact
Before , Starting run react native project. Please complete all few steps.

1. Follow all step in Facebook ReactNative:
link: https://facebook.github.io/react-native/docs/getting-started
choose option : React Native CLI Quickstart.

2. Change blacklist metro-config:
direct to follow link folder : rootProject/node_modules/metro-config/src/defaults/blacklist.js

changed the first expression under sharedBlacklist from:

var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
to:

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

3. Add index.bundle.module (Android) : 
direct to follow link folder: android/app/src/main

create folder directory name : assets (rootProject/android/app/src/main/assets)

run below command from project root directory:

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

=> Run project debugging with command : 
react-native run-android

If you want to re-run by press hotkey (r+r) you will need to run in different port default (default port localhost:8081). Because run in default port will cause crash host port.

To run project debugging with different port:
react-native run-android --port=*input your port* (example: react-native run-android --port=8084)
