/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/addPetProfile` | `/(auth)/caretakerProfile` | `/(auth)/createProfile` | `/(auth)/dummyScreen` | `/(auth)/loginscreen` | `/(auth)/ownerProfile` | `/(auth)/registerScreen` | `/_sitemap` | `/addPetProfile` | `/caretakerProfile` | `/createProfile` | `/dummyScreen` | `/loginscreen` | `/ownerProfile` | `/registerScreen`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
