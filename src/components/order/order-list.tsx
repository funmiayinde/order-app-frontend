import {
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { get } from 'lodash';
import moment from 'moment';

type OrderListTableProps = {
  onOpenDrawer?: Function;
  onPageChange: (event: any, page: number) => void;
  onRowPerPageChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  orders: OrderNameSpace.Order[];
  orderCount: number;
  page: number;
  rowsPerPage: number;
};

export const OrderListTable = (props: OrderListTableProps) => {
  const {
    onOpenDrawer,
    onPageChange,
    onRowPerPageChange,
    orders,
    orderCount,
    page,
    rowsPerPage,
  } = props;

  return (
    <div>
      <Table>
        <TableBody>
          {orders.map((order, idx) => (
            <TableRow
              key={idx + 1}
              onClick={() => onOpenDrawer?.(order)}
              hover
              sx={{ cursor: 'pointer' }}
            >
              <TableCell
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'neutral.200',
                    borderRadius: 2,
                    maxWith: 'fit-content',
                    ml: 3,
                    p: 1,
                  }}
                >
                  <Typography align="center" variant="subtitle1">
                    {moment(order.bookingDate).isValid()
                      ? moment(order.bookingDate).format('MMM')
                      : 'Not Valid date'}
                  </Typography>
                  <Typography align="center" variant="h6">
                    {moment(order.bookingDate).isValid()
                      ? moment(order.bookingDate).format('d')
                      : ''}
                  </Typography>
                </Box>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2">
                    {get(order, 'title', 'No title')}
                  </Typography>
                  <Typography variant="body2">
                    {get(order, ['customer', 'name'], 'No name')}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                {get(order, ['customer', 'email'], 'Email')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={orderCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};
