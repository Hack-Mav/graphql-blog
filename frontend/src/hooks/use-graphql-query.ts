// frontend/src/hooks/use-graphql-query.ts
import { useQuery, OperationVariables } from '@apollo/client';
import { DocumentNode } from 'graphql';

export function useGraphQLQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
  query: DocumentNode,
  options?: any
) {
  return useQuery<TData, TVariables>(query, options);
}