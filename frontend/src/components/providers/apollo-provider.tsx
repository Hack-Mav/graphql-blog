// frontend/src/components/providers/apollo-provider.tsx
'use client';

import { ApolloProvider as ApolloClientProvider } from '@apollo/react-hooks';
import { client } from '@/lib/apollo-client';

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloClientProvider client={client}>
      {children}
    </ApolloClientProvider>
  );
}