import { UI } from '../index';
import { createActionString } from '../../../../../_shared/ui/redux';

export const UI_SET_PAGINATION = createActionString('UI_PAGINATION', 'UI');

export const uiSetPagination = (key: string, value: Record<string, any>) => ({
  type: UI_SET_PAGINATION,
  meta: {
    key,
    value,
  },
});
