import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { APP } from '../../../../_shared/util/_urls';

type AuthGuardsProps = {
  children: ReactNode;
};

export const GuestGuard = ({ children }: AuthGuardsProps) => {
  const { sessionToken, authData } = useAuth({});
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);

  console.log('GuestGuard-sessionToken:::', sessionToken);

  useEffect(() => {
      if (!router.isReady) {
          return;
      }
      // Check if user is authenticated
      if (!isEmpty(sessionToken) && !isEmpty(authData)) {
          router.push(APP.ORDER).catch(console.error);
      } else {
          setChecked(true);
      }
  }, [router.isReady, sessionToken, authData, router]);

  if (!checked) {
      return null;
  }

  return <>{children}</>;
};
