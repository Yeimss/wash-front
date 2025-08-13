import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "wash-front",
  slug: "wash-front",
  extra: {
    apiUrl: process.env.APP_ENV === "prod" 
    ? "https://mi-api.com/api" 
    : "https://localhost:7140/"
  },
});
