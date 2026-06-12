import { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) return "com.tigawanna.cinefam.dev";
  if (IS_PREVIEW) return "com.tigawanna.cinefam.preview";
  return "com.tigawanna.cinefam";
};

const getAppName = () => {
  if (IS_DEV) return { name: "Cinefam (Dev)", slug: "cinefam" };
  if (IS_PREVIEW) return { name: "Cinefam (Preview)", slug: "cinefam" };
  return { name: "Cinefam", slug: "cinefam" };
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, slug } = getAppName();
  const appIdentifier = getUniqueIdentifier();

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
      package: appIdentifier,
    },
    web: {
      output: "static",
      favicon: "./assets/icons/favicon.png",
    },
    plugins: [
      "@react-native-vector-icons/material-icons",
      "@react-native-vector-icons/material-design-icons",
      "expo-router",
      "expo-secure-store",
      "expo-web-browser",
      [
        "expo-splash-screen",
        {
          image: "./assets/icons/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#0f0a18",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "replace-with-eas-project-id",
      },
    },
  };
};
