/* eslint-disable @next/next/no-img-element */
import { MouseEvent, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Box,
  IconButton,
  Tooltip,
  Badge,
  ButtonBase,
  Avatar,
  Toolbar,
} from '@mui/material';
import { Bell as BellIcon } from '../../../_shared/icons/bell';
import { Menu as MenuIcon } from '../../../_shared/icons/menu';
import { UserCircle as UserCircleIcon } from '../../../_shared/icons/user-circle';
import { AccountPopOver } from '../../../_shared/pop-over/account-popover';


const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));




const AccountButton = ({
  authUser,
}: {
  authUser: { name: string; avatar: string };
}) => {
  const anchorRef = useRef(null);
  const [openPopOver, setOpenPopOver] = useState<boolean>(false);
  const handleOpenPopOver = (open: boolean) => {
    setOpenPopOver(open);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={() => handleOpenPopOver(true)}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          src={authUser.avatar}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      <AccountPopOver
        anchorEl={anchorRef.current}
        onClose={() => handleOpenPopOver(false)}
        open={openPopOver}
        authUser={authUser}
      />
    </>
  );
};

type NavbarProps = {
  onOpenSidebar: () => void;
  authUser: { name: string; avatar: string };
};

export const Navbar = ({ onOpenSidebar, authUser }: NavbarProps) => {
  return (
    <>
      <NavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <AccountButton authUser={authUser} />
        </Toolbar>
      </NavbarRoot>
    </>
  );
};
