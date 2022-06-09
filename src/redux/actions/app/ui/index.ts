import { createActionString } from '../../../../_shared/ui/redux';

export const UI = 'UI';
export const UI_RESET = createActionString('UI_RESET', UI);

export * from './ui-error';
export * from './ui-loading';
export * from './ui-pagination';
export * from './ui-navigation';
