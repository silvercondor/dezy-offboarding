import { useNetwork, useSwitchNetwork } from "wagmi";
import Button from "@mui/material/Button";
import { Box, Grid, Typography } from "@mui/material";
export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <Box>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        {switchNetwork && (
          <Box>
            <Grid container direction='column' alignItems={'center'} spacing={2}>

              <Grid item>                
                {chains.map((x) =>
                  x.id === chain?.id ? null : (
                    <Button
                      variant="contained"
                      key={x.id}
                      onClick={() => switchNetwork(x.id)}
                    >
                      {`Switch To ${x.name}`}
                      {isLoading && x.id === pendingChainId && " (switching)"}
                    </Button>
                  )
                )}
              </Grid>
            </Grid>
            
          </Box>
        )}
      </Grid>

      <div>{error?.message}</div>
    </Box>
  );
}
