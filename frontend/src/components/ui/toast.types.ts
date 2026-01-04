import * as React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import type * as ToastPrimitives from '@radix-ui/react-toast';

export type ToastActionElement = React.ReactElement<
  ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>;
