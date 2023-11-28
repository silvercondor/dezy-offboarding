import { useEffect, useState } from "react";
import {
  Address,
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
} from "wagmi";
import { dezyS4, uniswapV3Pool } from "../contracts";
import { Box, Button, Grid, Typography } from "@mui/material";

export function S4(props: any) {
  const poolAddress: Address = props.poolAddress;
  const poolName: String = props.poolName;
  const { address } = useAccount();

  // send transction
  const { write, data, error, isLoading, isError } = useContractWrite({
    ...dezyS4,
    functionName: "withdrawV3PositionNft",
    args: [],
  });

  // get pool data
  const poolData = useContractReads({
    contracts: [
      {
        ...uniswapV3Pool,
        address: poolAddress,
        functionName: "token0",
      },
      {
        ...uniswapV3Pool,
        address: poolAddress,
        functionName: "token1",
      },
      {
        ...uniswapV3Pool,
        address: poolAddress,
        functionName: "fee",
      },
    ],
  });
  // get nftId
  const nftData: any = useContractRead({
    ...dezyS4,
    functionName: "getV3PositionNft",
    args: [
      address,
      poolData.data?.[0].result,
      poolData.data?.[1].result,
      poolData.data?.[2].result,
    ],
  });
  // const nftId = nftData.data?.[3]
  console.log("useS4", poolData, nftData);
  return (
    <Box>
      {/* <div>Data:</div> */}
      {poolData.isLoading && nftData.isLoading && <div>loading...</div>}
      {poolData.isSuccess && nftData.isSuccess && (
        <Grid
          container
          direction="row"
          columns={2}
          justifyContent={"space-around"}
          alignItems={"flex-start"}
        >
          <Grid item>
            <Typography>{poolName}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disabled={
                poolData.isSuccess && nftData.data?.[2].toString() === "0"
                  ? true
                  : false
              }
              onClick={() => {
                write({
                  args: [
                    poolData.data?.[0].result,
                    poolData.data?.[1].result,
                    poolData.data?.[2].result,
                    nftData.data?.[2],
                  ],
                });
              }}
            >
              Withdraw
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
