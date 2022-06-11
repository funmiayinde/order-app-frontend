import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider, DatePicker, LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import EditIcon from '@mui/icons-material/Edit';
import { PropertyList } from '../_shared/widgets/property-list';
import { PropertyListItem } from '../_shared/widgets/property-list-item';
import { get, values } from 'lodash';
import moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useOrder } from '../../hooks/useOrder';
import { useUI } from '../../hooks/useUI';
import { useState } from 'react';
import { Remove as XIcon } from '../../_shared/icons/remove';

type OrderPreviewProps = {
  lgUp?: string | boolean;
  onEdit: (e?: any) => void;
  order: OrderNameSpace.Order;
};

const OrderPreview = ({ lgUp, onEdit, order }: OrderPreviewProps) => {
  const align = lgUp ? 'horizontal' : 'vertical';

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'neutral.100',
          borderRadius: 1,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          px: 3,
          py: 2.5,
        }}
      >
        <Typography color="textSecondary" variant="overline" sx={{ mr: 2 }}>
          Actions
        </Typography>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            m: 1,
            '&  > button': {
              m: 1,
            },
          }}
        >
          <Button
            onClick={onEdit}
            size="small"
            startIcon={<EditIcon fontSize="small" />}
          >
            Edit
          </Button>
        </Box>
      </Box>
      <Typography sx={{ my: 3 }}>Details</Typography>
      <PropertyList>
        <PropertyListItem
          align={align}
          disableGutters
          label="UID"
          value={get(order, 'uid', 'UID')}
        />
        <PropertyListItem
          align={align}
          disableGutters
          label="TITLE"
          value={get(order, 'title', 'Title')}
        />
        <PropertyListItem
          align={align}
          disableGutters
          label="BOOKING DATE"
          value={
            moment(order.bookingDate).isValid()
              ? moment(order.bookingDate).format('MMM')
              : 'Not Valid date'
          }
        />
        <PropertyListItem align={align} disableGutters label="CUSTOMER">
          <Typography color="primary" variant="body2">
            {get(order, ['customer', 'name'], 'No name')}
          </Typography>
          <Typography color="primary" variant="body2">
            {get(order, ['customer', 'email'], 'No email')}
          </Typography>
          <Typography color="primary" variant="body2">
            {get(order, ['customer', 'phone'], 'No phone')}
          </Typography>
        </PropertyListItem>
        <PropertyListItem align={align} disableGutters label="ADDRESS">
          <Typography color="primary" variant="body2">
            {get(order, ['address', 'country'], 'No country')}
          </Typography>
          <Typography color="primary" variant="body2">
            {get(order, ['address', 'city'], 'No city')}
          </Typography>
          <Typography color="primary" variant="body2">
            {get(order, ['address', 'street'], 'No street')}
          </Typography>
          <Typography color="primary" variant="body2">
            {get(order, ['address', 'zip'], 'No zip')}
          </Typography>
        </PropertyListItem>
      </PropertyList>
    </>
  );
};

type OrderFormProps = {
  onCancel: (e?: any) => void;
  onSave?: (data?: any) => void;
  order?: OrderNameSpace.Order;
  isUpdating?: boolean;
  isCreating?: boolean;
};

const OrderForm = ({
  onCancel,
  onSave,
  order,
  isUpdating,
  isCreating,
}: OrderFormProps) => {
  const { create, update } = useOrder({});
  const { findAll } = useOrder({});
  const { uiLoaders } = useUI();
  const [bookingDate, setBookingDate] = useState('');

  const handleDelete = (e: any) => {
    e.preventDefault();
  };

  const doFindAll = (params = {}) => {
    findAll('@@ORDER_KEY', {
        params: {
            ...params
        }
    });
  };

  const onFinish = (value: Record<string, any>) => {
    const {
      title,
      city,
      country,
      street,
      zip,
      bookingDate,
      email,
      name,
      phone,
    } = value;
    const payload = {
      title,
      bookingDate,
      address: {
        city,
        country,
        zip,
        street,
      },
      customer: {
        email,
        name,
        phone,
      },
    };
    if (onSave) {
      onSave(payload);
    } else {
      if (order) {
        update(
          order.uid,
          'update',
          {
            ...order,
            ...payload,
          },
          {
            onFinish: (data?: Record<string, any>) => {
              doFindAll();
              onCancel();
            },
          }
        );
      } else {
        create({ ...payload }, 'create', {
          onFinish: (data?: Record<string, any>) => {
            doFindAll();
            onCancel();
          },
        });
      }
    }
  };

  const handleOnChangeDate = (value: any) => {
    setBookingDate(moment(value).format('MM DD YYYY'));
    formik.setFieldValue('bookingDate', value);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      city: '',
      country: '',
      street: '',
      zip: '',
      bookingDate: '',
      email: '',
      name: '',
      phone: '',
      submit: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required('Title is required'),
      city: Yup.string().max(255).required('City is required'),
      country: Yup.string().max(255).required('Country is required'),
      street: Yup.string().max(255).required('Street is required'),
      zip: Yup.string().max(255).required('Zip is required'),
      bookingDate: Yup.string().max(255).required('Booking Date is required'),
      name: Yup.string().max(255).required('Customer name is required'),
      phone: Yup.string()
        .max(255)
        .required('Customer phone number is required'),
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Customer email is required'),
    }),
    onSubmit: (values, helpers) => {
      try {
        onFinish(values);
      } catch (err) {
        const error = err as any;
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'neutral.100',
          borderRadius: 1,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          px: 3,
          py: 2.5,
        }}
      >
        <Typography variant="overline" sx={{ mr: 2 }} color="textSecondary">
          {order ? 'Order' : 'Create new order'}
        </Typography>

        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            m: -1,
            '& > button': {
              m: 1,
            },
          }}
        >
          {order && (
            <Button onClick={handleDelete} color="error" sx={{ mt: 3 }}>
              Delete order
            </Button>
          )}
        </Box>
      </Box>
      <Typography sx={{ my: 3 }} variant="h6">
        Details
      </Typography>
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        {order && (
          <TextField
            disabled
            fullWidth
            label="UID"
            name="uid"
            margin="normal"
            value={get(order, 'uid')}
          />
        )}
        <TextField
          fullWidth
          label="Title"
          name="title"
          margin="normal"
          error={Boolean(formik.touched.title && formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={order ? order?.title : formik.values.title}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            label="Booking Date"
            onChange={handleOnChangeDate}
            renderInput={inputProps => <TextField fullWidth {...inputProps} />}
            value={get(order, moment().format('MM DD YYYY'), bookingDate)}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          label="Customer"
          name="email"
          type="email"
          margin="normal"
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={get(order, ['customer', 'email'], formik.values.email)}
        />
        <TextField
          fullWidth
          label="Customer name"
          name="name"
          type="email"
          margin="normal"
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={get(order, ['customer', 'name'], formik.values.name)}
        />
        <TextField
          fullWidth
          label="Customer phone number"
          name="phone"
          type="text"
          margin="normal"
          error={Boolean(formik.touched.phone && formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={get(order, ['customer', 'phone'], formik.values.phone)}
        />
        <TextField
          fullWidth
          label="Country"
          name="country"
          margin="normal"
          error={Boolean(formik.touched.country && formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={get(order, ['address', 'country'], formik.values.country)}
        />
        <TextField
          fullWidth
          label="City"
          name="city"
          margin="normal"
          error={Boolean(formik.touched.city && formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={get(order, ['address', 'city'], formik.values.city)}
        />
        <TextField
          fullWidth
          label="Street"
          name="street"
          margin="normal"
          error={Boolean(formik.touched.street && formik.errors.street)}
          helperText={formik.touched.street && formik.errors.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={get(order, ['address', 'street'], formik.values.street)}
        />
        <TextField
          fullWidth
          label="Zip"
          name="zip"
          margin="normal"
          error={Boolean(formik.touched.zip && formik.errors.zip)}
          helperText={formik.touched.zip && formik.errors.zip}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={get(order, ['address', 'zip'], formik.values.zip)}
        />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            m: -1,
            '& > button': {
              m: 1,
            },
          }}
        >
          <LoadingButton
            color="primary"
            size="small"
            type="submit"
            disabled={
              isUpdating || isCreating || uiLoaders.create || uiLoaders.update
            }
            loading={
              isUpdating || isCreating || uiLoaders.create || uiLoaders.update
            }
            variant="contained"
          >
            {order ? 'Save Changes' : 'Create Order'}
          </LoadingButton>
          <Button
            color="primary"
            variant="outlined"
            onClick={onCancel}
            size="small"
          >
            Cancel
          </Button>
        </Box>
      </form>
    </>
  );
};

const OrderDrawerDesktop = styled(Drawer)({
  width: 500,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    position: 'relative',
    width: 500,
  },
});

const OrderDrawerMobile = styled(Drawer)({
  flexShrink: 0,
  maxWidth: '100%',
  height: 'calc(100% -64px)',
  width: 500,
  '& .MuiDrawer-paper': {
    height: 'calc(100% - 64px)',
    maxWidth: '100%',
    top: 64,
    width: 500,
  },
});

type OrderDrawerProps = {
  containerRef?: any;
  onClose?: (e?: any) => void;
  open?: boolean;
  add?: boolean;
  order?: OrderNameSpace.Order | null;
};

export const OrderDrawer = (props: OrderDrawerProps) => {
  const { containerRef, add = false, onClose, order, open } = props;
  const [isEditing, setIsEditing] = useState(false);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const content = order ? (
    <>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography color="inherit" variant="h6">
          {get(order, 'uid', 'UID')}
        </Typography>
        <IconButton color="inherit" onClick={onClose}>
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          px: 3,
          py: 4,
        }}
      >
        {add && !order && (
          <OrderPreview onEdit={handleEdit} order={order} lgUp={lgUp} />
        )}
        ;
        {!isEditing ? (
          <OrderPreview onEdit={handleEdit} order={order} lgUp={lgUp} />
        ) : (
          <OrderForm onCancel={handleCancel} order={order} />
        )}
      </Box>
    </>
  ) : (
    <OrderForm onCancel={handleCancel} order={undefined} />
  );

  if (lgUp) {
    return (
      <OrderDrawerDesktop
        anchor="right"
        open={open}
        SlideProps={{ container: containerRef?.current }}
        variant="persistent"
      >
        {content}
      </OrderDrawerDesktop>
    );
  }
  return (
    <OrderDrawerMobile
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ container: containerRef?.current }}
      SlideProps={{ container: containerRef?.current }}
      variant="temporary"
    >
      {content}
    </OrderDrawerMobile>
  );
};
