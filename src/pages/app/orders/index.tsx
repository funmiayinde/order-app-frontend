import { Grid, Button, Typography, FormControlLabel, Switch } from '@mui/material';
import { Box } from '@mui/system';
import Head from 'next/head';
import { ReactNode, useRef } from 'react';
import { AuthGuard } from '../../../components/_shared/guard/auth-guard';
import Layout from '../../../components/_shared/layout';

const Orders = () => {
  const ref = useRef(null);
  return (
    <>
      <Head>
        <title>Order | Order Manager App</title>
      </Head>
      <Box
        component="main"
        ref={ref}
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          // display: 'flex',
          // overflow: 'hidden'
        }}
      >
        <Typography>Order Page</Typography>
      </Box>
    </>
  );
};

Orders.getLayout = (page: ReactNode | ReactNode[]) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default Orders;