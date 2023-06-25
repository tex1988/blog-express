import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './Error';

export const QueryBoundaries = ({ children }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary onReset={reset} FallbackComponent={Error}>
        {children}
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);