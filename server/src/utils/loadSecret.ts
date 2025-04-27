import fs from "fs";

// Function to load secret from file or environment variables.
// This assumes envs have been mounted using dotenv or by docker
export function loadSecret(fileEnvName: string, envVarName: string): string {
  // Check if we have a file path from environment
  const filePath = process.env[fileEnvName];

  if (filePath && fs.existsSync(filePath)) {
    try {
      return fs.readFileSync(filePath, "utf8").trim();
    } catch (err) {
      console.error(`Error reading secret file at ${filePath}:`, err);
    }
  }

  // Fallback to direct environment variable
  const envValue = process.env[envVarName];
  if (!envValue) {
    console.warn(`Warning: Secret not found for ${envVarName}`);
  }

  return envValue || "";
}
