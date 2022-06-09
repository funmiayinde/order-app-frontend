import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { UserCircle as UserCircleIcon } from '../../_shared/icons/user-circle';
import NextLink from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';

type AccountPopOverProps = {
  anchorEl: any;
  onClose: () => void;
  open: boolean;
  authUser: {
    name: string; avatar: string
  }
};

export const AccountPopOver = (props: AccountPopOverProps) => {
  const { anchorEl, onClose, open, authUser } = props;
  const { handleLogout } = useAuth({});

  return (
    <Popover
      anchorEl={anchorEl}
      open={!!open}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
    >
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex',
        }}
      >
        <Avatar
          src={authUser.avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography color="textSecondary" variant="body2">
            Order Manager App
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <NextLink href="#" passHref>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Logout</Typography>}
            />
          </MenuItem>
        </NextLink>
      </Box>
    </Popover>
  );
};
