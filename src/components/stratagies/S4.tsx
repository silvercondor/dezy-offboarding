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
import { sendTransaction } from "viem/dist/types/actions/wallet/sendTransaction";
import { parseEther } from "viem";


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
  const nftData:any = useContractRead({
    ...dezyS4,
    functionName: "getV3PositionNft",
    args: [
      address,
      poolData.data?.[0].result,
      poolData.data?.[1].result,
      poolData.data?.[2].result,
    ]
  });
  // const nftId = nftData.data?.[3]
  console.log("useS4", poolData, nftData);
  return (
    <Box style={{display:poolData.isSuccess && nftData.data?.[2].toString()==="0"?"none":"true"}}>    
      {/* <div>Data:</div> */}
      {poolData.isLoading && nftData.isLoading && <div>loading...</div>}
      {poolData.isSuccess && nftData.isSuccess && (
        <Grid container direction="row" columns={2} justifyContent={"space-around"} alignItems={'flex-start'}>
          <Grid item>
            <Typography>{poolName}</Typography>
          </Grid>
          <Grid item>
            <Button
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
  // return (
  //   <div>
  //     <div>Data:</div>
  //     {isLoading && <div>loading...</div>}
  //     {isSuccess &&
  //       data?.map((data) => <pre key={stringify(data)}>{stringify(data)}</pre>)}
  //   </div>
  // )
  // return {token0:poolData.data?.[0].result, token1:poolData.data?.[1].result, fee:poolData.data?.[2].result, nftId:nftId}
}
