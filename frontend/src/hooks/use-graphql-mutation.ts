// frontend/src/hooks/use-graphql-mutation.ts
import { useMutation } from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';

export function useGraphQLMutation<TData = any, TVariables = any>(
  mutation: DocumentNode,
  options?: any
) {
  return useMutation<TData, TVariables>(mutation, options);
}
