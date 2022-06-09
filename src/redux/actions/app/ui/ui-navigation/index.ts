import { createActionString } from '../../../../../_shared/ui/redux';

import { UI } from '../index';

export const UI_NAVIGATION = createActionString('UI_NAVIGATION', 'UI');

export const navigateTo = (path: string) => ({
  type: UI_NAVIGATION,
  payload: path,
});
