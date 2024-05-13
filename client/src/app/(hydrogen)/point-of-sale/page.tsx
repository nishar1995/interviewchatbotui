import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { POS_CART_KEY } from '@/config/constants';
import { CartProvider } from '@/store/quick-cart/cart.context';
import { metaObject } from '@/config/site.config';
import POSPageView from '@/app/shared/point-of-sale';
import POSDrawer from '@/app/shared/point-of-sale/pos-drawer';
import PosSearch from '@/app/shared/point-of-sale/pos-search';

export const metadata = {
  ...metaObject('Point of Sale'),
};

const pageHeader = {
  title: 'Point of Sale (POS)',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Point of Sale',
    },
  ],
};

export default function PointOfSalePage() {
  return (
    <CartProvider cartKey={POS_CART_KEY}>
      <div>
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
          className="[&_h2]:font-lexend [&_h2]:font-bold"
        >
          <PosSearch />
        </PageHeader>
        <POSPageView />
        <POSDrawer className="xl:hidden" />
      </div>
    </CartProvider>
  );
}
