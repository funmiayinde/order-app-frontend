/* eslint-disable @next/next/no-img-element */
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ChartPie as CharBarIcon } from '../../../_shared/icons/chart-pie';
import { ScrollBar } from '../widgets/scrollbar';
import NextLink from 'next/link';
import { SidebarSection } from './def/sidebar-section';

type sectionItemType = {
  title: string;
  roles?: Array<string>;
  items: Array<{
    title: string;
    path: string;
    chip?: ReactNode;
    info?: string;
    icon?: ReactNode;
    roles?: Array<string>;
    children?: any;
  }>;
};

const getSections = (): sectionItemType[] => [
  {
    title: 'Home',
    items: [
      {
        title: 'Order',
        path: '/app/order',
        icon: <CharBarIcon fontSize="small" />,
      },
    ],
  },
];

type SidebarProps = {
  onClose: () => void;
  open: boolean;
  authUser: {
    name: string;
    avatar: string;
  };
};

export const Sidebar = ({ onClose, open, authUser }: SidebarProps) => {
  const router = useRouter();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
    noSsr: true,
  });
  const sections = getSections();
  const organizationRef = useRef(null);
  const [openOrganizationPopOver, setOpenOrganizationPopOver] = useState<
    boolean
  >(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }
    if (open) {
      onClose();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handlePathChange, [router.isReady, router.asPath]);

  const handleOpenOrganizationPopover = (open: boolean) => {
    setOpenOrganizationPopOver(open);
  };

  const content = (
    <>
      <ScrollBar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink href="/app/dashboard" passHref>
                <a>
                  <img alt="Logo" src="/static/images/avatar-image.png" />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                onClick={() => handleOpenOrganizationPopover(true)}
                ref={organizationRef}
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '11px',
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    Order Manager App
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    {authUser.name}
                  </Typography>
                </div>
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map(section => (
              <SidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
        </Box>
      </ScrollBar>
    </>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRight: theme => (theme.palette.mode === 'dark' ? 1 : 0),
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: theme => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
