import dotenv from "dotenv";
import { IApplicationMode } from "../interfaces/chunks/Common";

dotenv.config();

const defaultRPCs = {
  production: "https://api.mainnet-beta.solana.com",
  devnet: "https://api.devnet.solana.com",
};

const mode: IApplicationMode = (function () {
  if (
    !process.env.MODE ||
    (process.env.MODE !== "production" && process.env.MODE !== "devnet")
  ) {
    throw new Error("Invalid environment mode, Please see .env.example!");
  }

  return process.env.MODE as IApplicationMode;
})();

export const config = {
  MODE: mode,
  SOLANA_RPC:
    process.env.SOLANA_HTTP_RPC ||
    (mode === "production" ? defaultRPCs.production : defaultRPCs.devnet),
  SOLANA_WS_RPC: process.env.SOLANA_WS_RPC || null,

  SOLEND_PROGRAM_DEPLOYMENTS: {
    [IApplicationMode.PRODUCTION]:
      "So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo",
    [IApplicationMode.DEVNET]: "ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx",
  },
};
