import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { get } from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Navbar } from '../navbar';
import { Sidebar } from '../sidebar';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 11 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

type LayoutProps = {
  children: ReactNode | JSX.Element | ReactNode[];
};

const Layout = (props: LayoutProps) => {
  const { children } = props;
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);

  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Navbar onOpenSidebar={() => setIsSideOpen(true)} authUser={{
        name: 'Admin',
        avatar: ''
      }} />
      <Sidebar
        onClose={() => setIsSideOpen(false)}
        open={isSideOpen}
        authUser={{
          name: 'Admin',
          avatar: ''
        }}
      />
    </>
  );
};

export default Layout;
