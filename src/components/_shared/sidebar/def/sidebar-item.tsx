import { Box, Button, Collapse, ListItem } from '@mui/material';
import { ReactNode, useState } from 'react';
import { ChevronRight as ChevronRightIcon } from '../../../../_shared/icons/chevron-right';
import { ChevronDown as ChevronDownIcon } from '../../../../_shared/icons/chevron-down';
import NextLink from 'next/link';

export type SidebarItemProps = {
  title: string;
  path: string;
  depth: number;
  active?: boolean;
  open?: boolean;
  children?: any | ReactNode | ReactNode[];
  icon?: ReactNode;
  chip?: ReactNode;
  info?: ReactNode;
};

export const SidebarItem = (props: SidebarItemProps) => {
  const {
    active = false,
    children,
    chip,
    title,
    icon,
    info,
    path,
    depth,
    open: openProp,
  } = props;

  const [open, setOpen] = useState<boolean>(openProp ?? false);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  let paddingLeft = 24;
  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  if (children) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: 'block',
          mb: 0.5,
          py: 0,
          px: 2,
        }}
      >
        <Button
          endIcon={
            !open ? (
              <ChevronRightIcon fontSize="small" />
            ) : (
              <ChevronDownIcon fontSize="small" />
            )
          }
          disableRipple
          onClick={handleToggle}
          startIcon={icon}
          sx={{
            color: active ? 'secondary.main' : 'neutral.300',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '&:hover': {
              backgroundColor: 'rgba(255,255, 255, 0.08)',
            },
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400',
            },
            '& .MuiButton-endIcon': {
              color: 'neutral.400',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
        <Collapse in={open} sx={{ mt: 0.5 }}>
          {children}
        </Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2,
      }}
    >
      <NextLink href={path} passHref>
        <Button
          component="a"
          startIcon={icon}
          endIcon={chip}
          disableFocusRipple
          sx={{
            borderRadius: 1,
            color: 'neutral.300',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255,255,255, 0.08)',
              color: 'secondary.main',
              fontWeight: 'fontWeightBold',
            }),
            '&:hover': {
              backgroundColor: 'rgba(255,255, 255, 0.08)',
            },
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400',
            },
          }}
        >
          <Box sx={{ flexGrow: 11 }}>{title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};
