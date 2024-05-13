import { createContext, useContext } from 'react';

export function createContextHook<ContextValue>(errorMessage: string) {
  const Context = createContext<ContextValue | null>(null);

  const useCustomContext = () => {
    const ctx = useContext(Context);

    if (ctx === null) {
      throw new Error(errorMessage);
    }

    return ctx;
  };

  const Provider = ({
    children,
    value,
  }: {
    value: ContextValue;
    children: React.ReactNode;
  }) => <Context.Provider value={value}>{children}</Context.Provider>;

  return [Provider, useCustomContext] as const;
}
