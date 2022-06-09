import { ReactNode } from 'react';
import { createActionString } from '../../../../../_shared/ui/redux';

export const UI_ERROR = createActionString('UI_ERROR', 'UI');

export const updateUIError = (
  key: string,
  value: string | null | ReactNode
) => ({
  type: UI_ERROR,
  meta: {
    key,
    value,
  }
});
