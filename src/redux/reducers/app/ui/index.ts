import { getNewLoadingState } from '../../../../_shared/util/helpers';
import { UI_ERROR, UI_LOADING, UI_SET_PAGINATION } from '../../../actions';
import { Action } from '../../../type';
import { UIState } from '../../types';

export const UIDefaultState: UIState = {
  uiErrors: {},
  uiLoaders: {},
  pagination: {},
};

const uiReducers = (state = UIDefaultState, action: Action) => {
  switch (action.type) {
    case UI_LOADING.START:
      return getNewLoadingState(state, action, true);
    case UI_LOADING.END:
      return getNewLoadingState(state, action, false);
    case UI_ERROR:
      return Object.assign({}, state, {
        uiErrors: { ...state.uiErrors, [action.meta.key]: action.meta.value },
      });
    case UI_SET_PAGINATION:
      return Object.assign({}, state, {
        pagination: { ...state.pagination, [action.key]: action.meta.value },
      });
    default:
      return state;
  }
};

export default uiReducers;
