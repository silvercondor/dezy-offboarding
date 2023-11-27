import { useAccount, useContractReads } from 'wagmi'

import { wagmiContractConfig, dezyS4} from './contracts'
import { stringify } from '../utils/stringify'

export function ReadContractsV1() {  
  const {address} = useAccount()
  const { data, isSuccess, isLoading } = useContractReads({
    contracts: [
      // {
      //   ...wagmiContractConfig,
      //   functionName: 'balanceOf',
      //   args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
      // },
      // {
      //   ...wagmiContractConfig,
      //   functionName: 'name',
      // },
      {
        ...wagmiContractConfig,
        functionName: 'totalSupply',
      },
      // S4 XSGD USDC
      {
        ...dezyS4,
        functionName:'depositors',
        args:[address?address:"0x0000000000000000000000000000000000000000"]
      },
      // S4 USDC USDT
      {
        ...dezyS4,
        functionName:'depositors',
        args:[address?address:"0x0000000000000000000000000000000000000000"]
      }
    ],
  })

  return (
    <div>
      <div>Data:</div>
      {isLoading && <div>loading...</div>}
      {isSuccess &&
        data?.map((data) => <pre key={stringify(data)}>{stringify(data)}</pre>)}
    </div>
  )
}
