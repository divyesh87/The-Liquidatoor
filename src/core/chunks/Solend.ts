import { Connection, PublicKey } from "@solana/web3.js";
import { OBLIGATION_SIZE, parseObligation } from "@solendprotocol/solend-sdk";
import axios from "axios";
import { config } from "../../config";
import { ISolendMarket, ISolendMarketsRes } from "../../interfaces";

const SOLEND_BASE_URL = "https://api.solend.fi";

export class Solend {
  private readonly web3Provider: Connection;

  constructor(web3Provider: Connection) {
    this.web3Provider = web3Provider;
  }

  public async getObligationsForMarket(marketAddress: string) {
    const solendProgramId = config.SOLEND_PROGRAM_DEPLOYMENTS[config.MODE];

    const res = await this.web3Provider.getProgramAccounts(
      new PublicKey(solendProgramId),
      {
        commitment: this.web3Provider.commitment,
        filters: [
          {
            memcmp: {
              offset: 10,
              bytes: marketAddress,
            },
          },
          {
            dataSize: OBLIGATION_SIZE,
          },
        ],
        encoding: "base64",
      }
    );

    return res.map((account) =>
      parseObligation(account.pubkey, account.account)
    );
  }

  public static async getSolendMarkets(): Promise<ISolendMarketsRes> {
    const url = `${SOLEND_BASE_URL}/v1/markets/configs?scope=solend&deployment=${config.MODE}`;
    const res: ISolendMarketsRes = (await axios(url)).data;
    return res;
  }

  public static async getPrimaryMarket(): Promise<ISolendMarket> {
    const allMarkets = await Solend.getSolendMarkets();
    const primaryMarket = allMarkets.find((market) => market.isPrimary);
    if (!primaryMarket) throw new Error("[Solend] Primary market not found!");
    return primaryMarket;
  }
}
