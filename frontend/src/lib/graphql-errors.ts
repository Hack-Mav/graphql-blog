// frontend/src/lib/graphql-errors.ts
import { ApolloError } from '@apollo/client';

export function getGraphQLErrorMessages(error: ApolloError): string[] {
  if (!error) return [];
  
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return error.graphQLErrors.map(err => err.message);
  }
  
  if (error.networkError) {
    return ['Network error occurred. Please check your connection and try again.'];
  }
  
  return [error.message || 'An unknown error occurred'];
}

export function formatGraphQLErrors(error: ApolloError): string {
  return getGraphQLErrorMessages(error).join('\n');
}