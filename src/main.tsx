import { EthereumClient } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {blue} from '@mui/material/colors'

import { App } from './App'
import { chains, config, walletConnectProjectId } from './wagmi'

const ethereumClient = new EthereumClient(config, chains)
const theme = createTheme({
  palette: {
    mode:'dark',
    
  }
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode >    
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <WagmiConfig config={config}>
      <App />
      <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
      />
    </WagmiConfig>
    </ThemeProvider>    
  </React.StrictMode>,
)
