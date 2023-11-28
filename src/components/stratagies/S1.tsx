import React from 'react'
import S1NotionalLend from './integrations/S1NotionalLend'
import { Box, Grid } from '@mui/material'
export default function S1() {
  return (
    <Box>
        <Grid container direction='column' spacing={3} justifyContent='space-around' alignItems={'flex'}>
            <Grid item>
                <S1NotionalLend name="Notional Lend ETH" currencyId="1"/>
            </Grid>
            <Grid item>
                <S1NotionalLend name="Notional Lend DAI" currencyId="2"/>
            </Grid>
            <Grid item>
                <S1NotionalLend name="Notional Lend USDC" currencyId="3"/>
            </Grid>
            <Grid item>
                <S1NotionalLend name="Notional Lend WBTC" currencyId="4"/>
            </Grid>
        </Grid>
    </Box>
  )
}
