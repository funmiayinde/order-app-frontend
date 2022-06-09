import {
  Box,
  Container,
  Card,
  Typography,
  Divider,
  Link,
  Alert,
} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import LoginForm from '../../../components/auth/LoginForm';
import { useAuth } from '../../../hooks/useAuth';
import { APP } from '../../../_shared/util/_urls';
import { GuestGuard } from '../../../components/_shared/guard/guest-guard';
import { useUI } from '../../../hooks/useUI';

const Login = () => {
  const LOGIN_UI_KEY = 'login';
  const { handleLogin } = useAuth({ key: LOGIN_UI_KEY });
  const { uiErrors } = useUI();

  return (
    <>
      <Head>
        <title>Login | Order Manager App</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px',
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItem: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4">Log in</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Login in to the internal platform
              </Typography>
            </Box>
            <Box
              sx={{
                flexFlow: 1,
                mt: 3,
              }}
            >
              {uiErrors.login && (
                <Alert severity="error">{uiErrors.login}</Alert>
              )}
              <p />
              <p />
              <LoginForm onSubmit={handleLogin} />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ mt: 1 }}>
              <NextLink href={APP.SIGN_UP} passHref>
                <Link color="textSecondary" variant="body2">
                  Don`t have account? Click here
                </Link>
              </NextLink>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page: any) => <GuestGuard>{page}</GuestGuard>;

export default Login;
