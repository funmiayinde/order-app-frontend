import {
  Typography,
  Container,
  Box,
  Link,
  Grid,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import Head from 'next/head';
import Layout from '../../../components/_shared/layout';
import { AuthGuard } from '../../../components/_shared/guard/auth-guard';
import { ReactNode, useState } from 'react';
import NextLink from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useOrder } from '../../../hooks/useOrder';
import { getNameInitial } from '../../../_shared/util/helpers';
import { get } from 'lodash';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import AlertDialog from '../../../components/_shared/components/alert-dialog';
import { useUI } from '../../../hooks/useUI';
import { useRouter } from 'next/router';
import { APP } from '../../../_shared/util/_urls';
import { LoadingButton } from '@mui/lab';

const OrderDetails = () => {
  const [open, setOpen] = useState(false);
  const [viewPDF, setViewPDF] = useState(false);
  const router = useRouter();

  const { uiLoaders } = useUI();

  const ORDER_KEY = '@@ORDER_KEY';
  const orderHook = useOrder({
    key: ORDER_KEY,
  });

  const currentOrder = orderHook.get(ORDER_KEY).current;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOK = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Order Details | Order Manager App </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Box sx={{ mb: 4 }}>
              <NextLink href="/app/orders" passHref>
                <Link color="textPrimary" variant="subtitle2">
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="subtitle2">Back to order</Typography>
                  </Box>
                </Link>
              </NextLink>
            </Box>

            <Grid container justifyContent="space-between" spacing={3}>
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Avatar
                  sx={{
                    height: 42,
                    mr: 2,
                    width: 42,
                  }}
                >
                  Order Manager App
                </Avatar>
                <div>
                  <Typography variant="h4">
                    {get(currentOrder, ['user', 'profile', 'full_name'])}
                  </Typography>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <Button
                  onClick={() => setViewPDF(true)}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  Preview
                </Button>
                
              </Grid>
            </Grid>
            <Divider sx={{ mt: 3 }} />
          </Box>
        </Container>
      </Box>
      <AlertDialog
        title="Caution message"
        content="Are you sure you want to approve this order?"
        handleClose={handleClose}
        handleOk={handleOK}
        open={open}
      />
    </>
  );
};

OrderDetails.getLayout = (page: ReactNode | ReactNode[]) => (
  <AuthGuard>
    <Layout>{page}</Layout>
  </AuthGuard>
);

export default OrderDetails;
