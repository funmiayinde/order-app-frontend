import { get, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { APP } from '../../../../_shared/util/_urls';

type AuthGuardsProps = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardsProps) => {
  const { sessionToken } = useAuth({});
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (isEmpty(sessionToken)) {
      router
        .push({
          pathname: APP.LOGIN,
          query: {
            returnUrl: router.asPath,
          },
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [router.isReady, sessionToken, router]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};
