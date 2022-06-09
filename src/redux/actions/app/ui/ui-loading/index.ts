import { createActionType } from '../../../../../_shared/ui/redux';

export const UI_LOADING = createActionType('UI_LOADING', 'UI');

export const startUILoading = (key: string) => ({
  type: UI_LOADING.START,
  key,
});

export const stopUILoading = (key: string) => ({
  type: UI_LOADING.END,
  key,
});
