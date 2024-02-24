import { Connection } from "@solana/web3.js";
import chalk from "chalk";
import { config } from "./config";
import { Solend } from "./core";

async function main() {
  const web3 = new Connection(config.SOLANA_RPC, {
    wsEndpoint: config.SOLANA_WS_RPC,
    commitment: "confirmed",
  });

  const solend = new Solend(web3);
  const primaryMarket = await Solend.getPrimaryMarket();

  console.log(await solend.getObligationsForMarket(primaryMarket.address));
}

main().catch((e) => {
  console.log(chalk.red(`Process exited with code 1;  ${e}`));
  process.exit(1);
});
