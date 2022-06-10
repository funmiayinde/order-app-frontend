import {
  Grid,
  Box,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/system';
import { get } from 'lodash';
import Head from 'next/head';
import { ReactNode, useRef, useState } from 'react';
import { OrderDrawer } from '../../../components/order/order-drawer';
import { OrderListTable } from '../../../components/order/order-list';
import { AuthGuard } from '../../../components/_shared/guard/auth-guard';
import Layout from '../../../components/_shared/layout';
import { useOrder } from '../../../hooks/useOrder';
import { Search as SearchIcon } from '../../../_shared/icons/search';

const OrderListener = styled('div', {
  shouldForwardProp: props => props !== 'open',
})(({ theme, open }: { theme?: any | Theme; open: boolean }) => ({
  flowGrow: 1,
  overflow: 'hidden',
  paddingBottom: theme.spacing(8),
  paddingTop: theme.spacing(8),
  zIndex: 1,
  [theme.breakpoints.up('lg')]: {
    marginRight: -500,
  },
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('lg')]: {
      marginRight: 0,
    },
    transaction: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Orders = () => {
  const ref = useRef(null);
  const queryRef = useRef({ value: '' });
  const [sort, setSort] = useState<string | undefined>('desc');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [query, setQuery] = useState({
    filters: [],
    query: '',
  });
  const [drawer, setDrawer] = useState({
    isOpen: false,
    order: null,
  });

  const ORDER_KEY = '@@ORDER_KEY';
  const ORDER_UI_KEY = '@@ORDER_UI_KEY';

  const defaultParams = {
    per_page: 10,
    page: 1,
    // all: true,
  };

  const orderHook = useOrder({
    key: ORDER_KEY,
    doFind: true,
    params: {
      ...defaultParams
    }
  });

  const orderValues = orderHook.get(ORDER_KEY);
  const orderMeta = orderHook.metadata(ORDER_KEY);
  const orders: OrderNameSpace.Order[] = orderHook.get(ORDER_KEY).byList;
  const pagination = orderMeta.pagination;
  const loading = orderMeta.loading;

  const handleQueryChange = (event: any) => {
    event?.preventDefault();
    setQuery(prevState => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  };

  const handleSortChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null
  ) => {
    const value = event?.target.value;
    setSort(value || 'desc');
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOpenDrawer = (order: any) => {
    orderHook.setCurrent(ORDER_KEY, get(orderValues.byId, order.uid));
    setDrawer({
      isOpen: true,
      order,
    });
  };

  return (
    <>
      <Head>
        <title>Order List | Order Manager App</title>
      </Head>
      <Box
        component="main"
        ref={ref}
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <OrderListener open={drawer.isOpen}>
          <Box sx={{ px: 3 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Orders</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleOpenDrawer}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Tabs
            indicatorColor="primary"
            scrollButtons="auto"
            textColor="primary"
            value="all"
            sx={{ mt: 3 }}
            variant="scrollable"
          >
            {[{ label: 'All', value: 'all' }].map(({ label, value }, idx) => (
              <Tab key={idx} value={value} label={label} />
            ))}
          </Tabs>
          <Divider />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              m: -1.5,
              p: 3,
            }}
          >
            <Box
              component="form"
              onSubmit={handleQueryChange}
              sx={{
                flexGrow: 1,
                m: 1.5,
              }}
            >
              <TextField
                defaultValue=""
                fullWidth
                inputProps={{ ref: queryRef }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search by customer email"
              />
            </Box>
            <Button variant="outlined" sx={{ m: 1.5 }}>
              Filter by booking date
            </Button>
          </Box>
          <Divider />
          {loading && (
            <Box
              sx={{
                alignItems: 'center',
              }}
            >
              <Typography variant="body1">Loading...</Typography>
            </Box>
          )}
          {!loading && orders && orders.length && (
            <OrderListTable
              key="orderTable"
              onOpenDrawer={handleOpenDrawer}
              onPageChange={handlePageChange}
              onRowPerPageChange={handleRowsPerPageChange}
              orders={orders}
              orderCount={orders.length}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          )}
          {!loading && !orders && (
            (
              <Box
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography variant="body1">No order Yet</Typography>
              </Box>
            )
          )}
        </OrderListener>
        <OrderDrawer
          containerRef={ref}
          onClose={handleOpenDrawer}
          open={drawer.isOpen}
          order={drawer.order}
        />
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
