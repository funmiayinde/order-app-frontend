import { ReactNode } from 'react';
import Layout from '../../../components/_shared/layout';
import { AuthGuard } from '../../../components/_shared/guard/auth-guard';
import Head from 'next/head';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Reports as ReportsIcon } from '../../../_shared/icons/report';

const User = () => {
  return (
    <>
      <Head>
        <title>Home | Order Manager App</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">User</Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  m: -1,
                }}
              >
                <Button
                  startIcon={<ReportsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                    Users
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

User.getLayout = (page: ReactNode | ReactNode[]) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);
export default User;
