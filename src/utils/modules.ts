/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy } from "react";

export const lazily = <T extends Record<string, any>, U extends keyof T>(loader: (x?: string) => Promise<T>) =>
  new Proxy({} as unknown as T, {
    get: (_target, componentName: string | symbol) => {
      if (typeof componentName === "string") {
        return lazy(() =>
          loader(componentName).then((x) => ({
            default: x[componentName as U] as any as React.ComponentType<any>,
          }))
        );
      }
      return null;
    },
  });
