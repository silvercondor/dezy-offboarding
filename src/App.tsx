import { Web3Button } from '@web3modal/react'
import { useAccount, useNetwork } from 'wagmi'

import { Account } from './components/Account'
import { Balance } from './components/Balance'
import { BlockNumber } from './components/BlockNumber'
import { NetworkSwitcher } from './components/NetworkSwitcher'
import { ReadContract } from './components/ReadContract'
import { ReadContractsV1 } from './components/ReadContractsV1'
import { ReadContractsInfinite } from './components/ReadContractsInfinite'
import { SendTransaction } from './components/SendTransaction'
import { SendTransactionPrepared } from './components/SendTransactionPrepared'
import { SignMessage } from './components/SignMessage'
import { SignTypedData } from './components/SignTypedData'
import { Token } from './components/Token'
import { WatchContractEvents } from './components/WatchContractEvents'
import { WatchPendingTransactions } from './components/WatchPendingTransactions'
import { WriteContract } from './components/WriteContract'
import { WriteContractPrepared } from './components/WriteContractPrepared'
import { ChainDisconnectedError } from 'viem'
import { Box, Grid } from '@mui/material'
import {S4} from './components/stratagies/S4'

export function App() {
  const { address, isConnected } = useAccount()
  const {chain} = useNetwork()
  // const s4XsgdUsdcData = useS4(address, "0x6279653c28f138c8b31b8a0f6f8cd2c58e8c1705")
  // console.log(s4XsgdUsdcData)
  return (    
    <Box sx={{height:'100%', width:'100%'}}>
      <Box sx={{margin:'2%'}}>
      <Grid container direction='row' justifyContent={'space-between'}>
        <Grid item>
          Dezy
        </Grid>
        <Grid item>
      <Web3Button />      

        </Grid>

      </Grid>      

      {isConnected && chain?.id==1?(
        <>
{/*              
          <h2>S1</h2>

          <hr/> */}
          <h2>S4</h2>          
          <S4 poolName="XSGD/USDC" poolAddress="0x6279653c28f138c8b31b8a0f6f8cd2c58e8c1705"/>
          <S4 poolName="USDC/USDT" poolAddress="0x3416cF6C708Da44DB2624D63ea0AAef7113527C6"/>                    
          <hr/>
        </>
      ):<NetworkSwitcher/>}
      </Box>
      </Box>    
  )
}