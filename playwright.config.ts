import { PlaywrightTestConfig } from "@playwright/test";
import fs from 'fs';

function getConfig(env: string) {
  const configData = JSON.parse(fs.readFileSync('./env.config.json', 'utf-8'));
  if (!configData[env]) {
    throw new Error(`No configuration found for environment: ${env}`);
  }
  return configData[env];
}

const env = process.env.ENV || 'local';
const config = getConfig(env);
const url = config.base_url;
const browserName = process.env.BROWSER || config.browserName;
const workers = parseInt(process.env.WORKERS) || config.workers;

const playwrightConfig: PlaywrightTestConfig = {
      use: {
        baseURL :url,
        browserName:browserName,
        trace: "on-first-retry",
        headless: false,
        screenshot: "only-on-failure",
        video: "retain-on-failure"
      },
      testDir: 'playwright_e2e/tests',
      fullyParallel: true,
      workers: workers,
      retries: 1,
      reporter: [['allure-playwright'],['html', { open: 'never' }]],
      timeout: 30000, // Optional test timeout
    }

  export default playwrightConfig;
