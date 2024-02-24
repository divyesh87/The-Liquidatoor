import dotenv from "dotenv";

dotenv.config();

export const config = {
  SOLANA_RPC: process.env.SOLANA_WS_RPC,
};
