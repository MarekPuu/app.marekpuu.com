import React, { Suspense } from 'react';
import Loading from '../LoadingSpinner/Loading';

const SuspenseWithLoader = ({ children }: any) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default SuspenseWithLoader;
