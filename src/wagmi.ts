import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'

export const walletConnectProjectId = '8df37d6f52609da433155b5e05856d62'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, ...(import.meta.env?.MODE === 'development' ? [mainnet] : [])],
  [w3mProvider({ projectId: walletConnectProjectId })],
)

export const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 2,
  }),
  publicClient,
  webSocketPublicClient,
})

export { chains }
