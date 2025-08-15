import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "wash-front",
  slug: "wash-front",
  extra: {
    apiUrl: process.env.APP_ENV === "prod" 
    ? "https://mi-api.com/api" 
    : "http://192.168.1.7:5000/api" 
    //: "https://192.168.1.7:7140/api"
  },
});
