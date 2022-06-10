import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import { ReactNode } from 'react';

type PropertyListItemProps = {
  align?: 'horizontal' | 'vertical';
  children?: ReactNode | ReactNode[];
  disableGutters?: boolean;
  label: string;
  value?: string;
};
export const PropertyListItem = (props: PropertyListItemProps) => {
  const { align = 'vertical', children, disableGutters, value, label } = props;
  return (
    <ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5,
      }}
    >
      <ListItemText
        disableTypography
        primary={
          <Typography
            sx={{ minWidth: align === 'vertical' ? 'inherit' : 180 }}
            variant="subtitle2"
          >
            {label}
          </Typography>
        }
        secondary={
          <Box
            sx={{
              flex: 1,
              mt: align === 'vertical' ? 0.5 : 0,
            }}
          >
            {children || (
              <Typography color="textSecondary" variant="body2">
                {value}
              </Typography>
            )}
          </Box>
        }
        sx={{
          display: 'flex',
          flexDirection: align === 'vertical' ? 'column' : 'row',
          my: 0,
        }}
      ></ListItemText>
    </ListItem>
  );
};
