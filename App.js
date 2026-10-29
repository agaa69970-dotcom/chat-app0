name: Build APK

on:
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17

      - name: Create Expo project
        run: npx create-expo-app@latest app --template blank --yes

      - name: Install dependencies
        working-directory: app
        run: |
          npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill

      - name: Copy app code
        run: |
          rm -f app/App.tsx app/App.js
          cp App.js app/App.js

      - name: Configure Android package
        working-directory: app
        run: |
          node -e "
          const fs=require('fs');
          const c=JSON.parse(fs.readFileSync('app.json','utf8'));
          c.expo.name='المساعد الذكي';
          c.expo.android=Object.assign({}, c.expo.android, {package:'com.smartchat.app'});
          fs.writeFileSync('app.json', JSON.stringify(c,null,2));
          "

      - name: Prebuild Android
        working-directory: app
        run: npx expo prebuild --platform android --no-install

      - name: Build release APK
        working-directory: app/android
        run: ./gradlew assembleRelease --no-daemon

      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: app-release-apk
          path: app/android/app/build/outputs/apk/release/app-release.apk
          
