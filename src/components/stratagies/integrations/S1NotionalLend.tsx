import React from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { dezyS1NotionalLend } from "../../contracts";
import { Box, Button, Grid } from "@mui/material";

type PropTypes = {
  currencyId: string;
  name: string;
};

export default function S1NotionalLend(props: PropTypes) {
  const { address } = useAccount();
  const currencyIdMap: any = {
    "1": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //ETH
    "2": "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
    "3": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
    "4": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", // WBTC
  };
  const { currencyId, name } = props;

  // send transaction
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...dezyS1NotionalLend,
    functionName: "withdrawToken",
    args: [],
  });

  // fetch balances
  const accountBalance: any = useContractRead({
    ...dezyS1NotionalLend,
    functionName: "getAccountBalance",
    args: [address, currencyId],
  });

  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={3}       
        
      >
        <Grid item>{name}</Grid>
        <Grid item>
          <Button
            variant="contained"
            disabled={
              accountBalance.data?.[0].toString() !== "0" 
                ? false
                : true
            }
            onClick={() => {
              write({
                args: [
                  currencyIdMap[currencyId],
                  currencyId,
                  currencyIdMap[currencyId],
                  0,
                  0,
                  "0x0000000000000000000000000000000000000000",
                  0,
                  true,
                  true,
                  0,
                ],
              });
            }}
          >
            Withdraw
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
