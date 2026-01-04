// frontend/src/hooks/use-form-submission.ts
import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import { getGraphQLErrorMessages } from '@/lib/graphql-errors';

export function useFormSubmission<T extends (...args: any[]) => Promise<any>>(
  submitFn: T,
  options: {
    onSuccess?: (data: Awaited<ReturnType<T>>) => void;
    onError?: (error: Error) => void;
  } = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (...args: Parameters<T>) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await submitFn(...args);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err as ApolloError | Error;
      const errorMessage = error instanceof ApolloError 
        ? getGraphQLErrorMessages(error)[0] || 'An error occurred'
        : error.message || 'An error occurred';
      
      setError(errorMessage);
      options.onError?.(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    error,
  };
}