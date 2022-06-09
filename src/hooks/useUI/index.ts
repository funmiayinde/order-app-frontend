import { useSelector } from 'react-redux';
import { RootState } from '../../redux/type';

export type UseUiType = {
  uiErrors: Record<any, boolean>;
  uiLoaders: Record<any, boolean>;
  pagination: Record<string, any>;
};

export const useUI = (): UseUiType => {
  const {uiLoaders, pagination, uiErrors } = useSelector(
    ({ ui }: RootState) => ({
      uiLoaders: ui?.uiLoaders,
      uiErrors: ui?.uiErrors,
      pagination: ui?.pagination,
    })
  );
  return {
    uiErrors,
    uiLoaders,
    pagination,
  };
};

