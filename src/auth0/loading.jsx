import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

//Displays loading while waiting for auht0 process
//displays errormessage when auth0 process fails
function Loading({ children }) {
  const {
    isLoading,
    error,
  } = useAuth0();
  if (isLoading) {
    return <div><h5>
        Loading...
        </h5></div>;
  }
  if (error) {
    return <div><h5>
        Oops... {error.message}
        </h5></div>;
  }
  return <>{children}</>;
}
export default Loading;