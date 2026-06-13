import { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const PRODUCTION_BUNDLE_ID = "com.tigawanna.cinefam";

const getUniqueIdentifier = () => {
  if (IS_DEV) return `${PRODUCTION_BUNDLE_ID}.dev`;
  if (IS_PREVIEW) return `${PRODUCTION_BUNDLE_ID}.preview`;
  return PRODUCTION_BUNDLE_ID;
};

const getAppName = () => {
  if (IS_DEV) return { name: "Cinefam (Dev)", slug: "cinefam" };
  if (IS_PREVIEW) return { name: "Cinefam (Preview)", slug: "cinefam" };
  return { name: "Cinefam", slug: "cinefam" };
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, slug } = getAppName();
  const appIdentifier = getUniqueIdentifier();
  const useFirebase = process.env.APP_VARIANT === "production";

  const plugins: NonNullable<ExpoConfig["plugins"]> = [
    "@react-native-vector-icons/material-icons",
    "@react-native-vector-icons/material-design-icons",
    "expo-router",
    "expo-secure-store",
    "expo-web-browser",
    "./plugins/with-android-gradle",
    [
      "expo-splash-screen",
      {
        image: "./assets/icons/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#0f0a18",
      },
    ],
  ];

  if (useFirebase) {
    plugins.push("@react-native-firebase/app");
    plugins.push("@react-native-firebase/crashlytics");
  }

  return {
    ...config,
    name,
    slug,
    scheme: slug,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/icon.png",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      bundleIdentifier: appIdentifier,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#7c3aed",
        foregroundImage: "./assets/icons/adaptive-icon.png",
      },
      googleServicesFile: useFirebase ? "./google-services.json" : undefined,
      package: appIdentifier,
    },
    web: {
      output: "static",
      favicon: "./assets/icons/favicon.png",
    },
    plugins,
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/65ad39ae-2b04-4edf-801c-39a889964c2f",
    },
    extra: {
      router: {},
      eas: {
        projectId: "65ad39ae-2b04-4edf-801c-39a889964c2f",
      },
    },
  };
};
