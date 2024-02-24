export type ISolendMarketsRes = ISolendMarket[];

export type ISolendMarket = {
  name: string;
  isPrimary: boolean;
  description: string;
  creator: string;
  address: string;
  hidden: boolean;
  isPermissionless: boolean;
  authorityAddress: string;
  owner: string;
  reserves: ISolendReserve[];
  lookupTableAddress: string;
};

export type ISolendReserve = {
  pythOracle: string;
  switchboardOracle: string;
  address: string;
  collateralMintAddress: string;
  collateralSupplyAddress: string;
  liquidityAddress: string;
  liquidityFeeReceiverAddress: string;
  userBorrowCap: string;
  userSupplyCap: string;
  liquidityToken: {
    coingeckoID: string;
    decimals: number;
    logo: string;
    mint: string;
    name: string;
    symbol: string;
    volume24h: string;
  };
};
