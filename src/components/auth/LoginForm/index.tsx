import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { ActionOption } from '../../../redux/actions/type';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { APP } from '../../../_shared/util/_urls';
import { updateUIError } from '../../../redux/actions';
import { useUI } from '../../../hooks/useUI';
import { Box, FormHelperText, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type LoginFormProps = {
  onSubmit: (
    payload: Record<'email' & 'password', string>,
    option: ActionOption
  ) => void;
};

const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const { uiLoaders } = useUI();

  const onFinish = (values: Record<'email' & 'password', string>) => {
    onSubmit(values, {
      key: 'login',
      onFinish: (data: Record<string, any> | undefined) => {
        console.log('data-onFinish:::', data);
        router.push(`${APP.ORDER}`)
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().min(8).max(255).required('Password is required'),
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
    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <TextField
        name="email"
        autoFocus
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="Email address"
        margin="normal"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
      />
      <TextField
        name="password"
        autoFocus
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        margin="normal"
        helperText={formik.touched.password && formik.errors.password}
        label="Enter your password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <LoadingButton
          disabled={uiLoaders.login}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={uiLoaders.login}
        >
          Log In
        </LoadingButton>
      </Box>
    </form>
  );
};

export default LoginForm;
