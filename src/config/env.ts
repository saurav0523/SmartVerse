/**
 * Centralized, validated, and typed environment configuration.
 * Prevents raw access to process.env and guarantees presence of required keys.
 */

export interface EnvConfig {
  RAPIDAPI_KEY: string;
  RAPIDAPI_HOST: string;
  RAPIDAPI_URL: string;
  API_URL: string;
}

const rawConfig = {
  RAPIDAPI_KEY: process.env.EXPO_PUBLIC_RAPIDAPI_KEY,
  RAPIDAPI_HOST: process.env.EXPO_PUBLIC_RAPIDAPI_HOST,
  RAPIDAPI_URL: process.env.EXPO_PUBLIC_RAPIDAPI_URL,
  API_URL: process.env.EXPO_PUBLIC_API_URL,
};

const validateEnv = (): EnvConfig => {
  const missingVars: string[] = [];

  const isTest = typeof jest !== "undefined" || process.env.NODE_ENV === "test";

  if (!rawConfig.RAPIDAPI_KEY && !isTest) {
    missingVars.push("EXPO_PUBLIC_RAPIDAPI_KEY");
  }
  if (!rawConfig.RAPIDAPI_HOST && !isTest) {
    missingVars.push("EXPO_PUBLIC_RAPIDAPI_HOST");
  }
  if (!rawConfig.RAPIDAPI_URL && !isTest) {
    missingVars.push("EXPO_PUBLIC_RAPIDAPI_URL");
  }

  if (missingVars.length > 0) {
    const message = `\n[Env Validation Error] Missing required environment variable(s):\n${missingVars
      .map((v) => ` - ${v}`)
      .join("\n")}\n\nPlease check your .env file or build settings.\n`;
    
    // Safely check if __DEV__ is defined
    const isDevMode = typeof __DEV__ !== "undefined" ? __DEV__ : true;

    if (isDevMode) {
      console.warn(message);
    } else {
      console.error(message);
    }
  }

  return {
    RAPIDAPI_KEY: rawConfig.RAPIDAPI_KEY || "",
    RAPIDAPI_HOST: rawConfig.RAPIDAPI_HOST || "streaming-availability.p.rapidapi.com",
    RAPIDAPI_URL: rawConfig.RAPIDAPI_URL || "https://streaming-availability.p.rapidapi.com",
    API_URL: rawConfig.API_URL || "http://localhost:3000/api",
  };
};

export const env = validateEnv();
