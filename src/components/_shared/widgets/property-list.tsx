import { List } from '@mui/material';
import { ReactNode } from 'react';

export const PropertyList = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => <List disablePadding>{children}</List>;
