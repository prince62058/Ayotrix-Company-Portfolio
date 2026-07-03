import serverless from "serverless-http";
import bundledApp from "../../artifacts/api-server/dist/index.mjs";

const app = bundledApp.default || bundledApp.app || bundledApp;
export const handler = serverless(app);
