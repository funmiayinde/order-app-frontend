// import 'simplebar/dist/simplebar.mind.css';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';

const BarRoot = styled(SimpleBar)``;

const ScrollBarRoot = (props: any, ref: any) => {
  return <BarRoot ref={ref} {...props} />;
};

export const ScrollBar = forwardRef(ScrollBarRoot);
