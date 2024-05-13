import dynamic from 'next/dynamic';
import { Loader } from 'rizzui';

const NoSSR = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
  loading: () => <Loader variant="spinner" size="lg" />,
});
