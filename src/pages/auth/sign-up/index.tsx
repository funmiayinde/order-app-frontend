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
import { useAuth } from '../../../hooks/useAuth';
import { APP } from '../../../_shared/util/_urls';
import { GuestGuard } from '../../../components/_shared/guard/guest-guard';
import { useUI } from '../../../hooks/useUI';
import SignUpForm from '../../../components/auth/SignUpForm';

const SignUp = () => {
  const SIGN_UP_UI_KEY = 'signUp';
  const { handleLogin } = useAuth({ key: SIGN_UP_UI_KEY });
  const { uiErrors } = useUI();

  return (
    <>
      <Head>
        <title>Sign Up | Order Manager App</title>
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
                Sign up to the internal platform
              </Typography>
            </Box>
            <Box
              sx={{
                flexFlow: 1,
                mt: 3,
              }}
            >
              {uiErrors.signUp && (
                <Alert severity="error">{uiErrors.signUp}</Alert>
              )}
              <p />
              <p />
              <SignUpForm onSubmit={handleLogin} />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ mt: 1 }}>
              <NextLink href={APP.LOGIN} passHref>
                <Link color="textSecondary" variant="body2">
                  Already have account? Log in
                </Link>
              </NextLink>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

SignUp.getLayout = (page: any) => <GuestGuard>{page}</GuestGuard>;

export default SignUp;
