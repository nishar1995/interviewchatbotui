import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';

// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  {
    name: 'Home',
  },
  // label end
  {
    name: 'E-Commerce',
    href: routes.eCommerce.dashboard,
  },
  {
    name: 'Support',
    href: routes.support.dashboard,
  },
  {
    name: 'Logistics',
    href: routes.logistics.dashboard,
  },
  {
    name: 'Analytics',
    href: routes.analytics,
  },
  {
    name: 'File',
    href: routes.file.dashboard,
  },
  // label start
  {
    name: 'Apps',
  },
  // label end
  {
    name: 'Products',
    href: routes.eCommerce.products,
  },
  {
    name: 'Product Details',
    href: routes.eCommerce.productDetails(DUMMY_ID),
  },
  {
    name: 'Create Product',
    href: routes.eCommerce.createProduct,
  },
  {
    name: 'Edit Product',
    href: routes.eCommerce.ediProduct(DUMMY_ID),
  },
  {
    name: 'Categories',
    href: routes.eCommerce.categories,
  },
  {
    name: 'Create Category',
    href: routes.eCommerce.createCategory,
  },
  {
    name: 'Edit Category',
    href: routes.eCommerce.editCategory(DUMMY_ID),
  },
  {
    name: 'Orders',
    href: routes.eCommerce.orders,
  },
  {
    name: 'Order Details',
    href: routes.eCommerce.orderDetails(DUMMY_ID),
  },
  {
    name: 'Create Order',
    href: routes.eCommerce.createOrder,
  },
  {
    name: 'Edit Order',
    href: routes.eCommerce.editOrder(DUMMY_ID),
  },
  {
    name: 'Reviews',
    href: routes.eCommerce.reviews,
  },
  {
    name: 'Shop',
    href: routes.eCommerce.shop,
  },
  {
    name: 'Cart',
    href: routes.eCommerce.cart,
  },
  {
    name: 'Checkout & Payment',
    href: routes.eCommerce.checkout,
  },
  {
    name: 'Support Inbox',
    href: routes.support.inbox,
  },
  {
    name: 'Support Snippets',
    href: routes.support.snippets,
  },
  {
    name: 'Support Templates',
    href: routes.support.templates,
  },
  {
    name: 'Invoice List',
    href: routes.invoice.home,
  },
  {
    name: 'Invoice Details',
    href: routes.invoice.details(DUMMY_ID),
  },
  {
    name: 'Create Invoice',
    href: routes.invoice.create,
  },
  {
    name: 'Edit Invoice',
    href: routes.invoice.edit(DUMMY_ID),
  },
  {
    name: 'Shipment List',
    href: routes.logistics.shipmentList,
  },
  {
    name: 'Shipment Details',
    href: routes.logistics.shipmentDetails(DUMMY_ID),
  },
  {
    name: 'Tracking',
    href: routes.logistics.tracking(DUMMY_ID),
  },
  {
    name: 'File Manager',
    href: routes.file.manager,
  },
  // label start
  {
    name: 'Widgets',
  },
  // label end
  {
    name: 'Cards',
    href: routes.widgets.cards,
  },
  {
    name: 'Icons',
    href: routes.widgets.icons,
  },
  {
    name: 'Charts',
    href: routes.widgets.charts,
  },
  // {
  //   name: 'Banners',
  //   href: routes.widgets.banners,
  // },
  {
    name: 'Maps',
    href: routes.widgets.maps,
  },
  // label start
  {
    name: 'Forms',
  },
  // label end
  {
    name: 'Profile Settings',
    href: routes.forms.profileSettings,
  },
  {
    name: 'Notification Preference',
    href: routes.forms.notificationPreference,
  },
  {
    name: 'Personal Information',
    href: routes.forms.personalInformation,
  },
  {
    name: 'Newsletter',
    href: routes.forms.newsletter,
  },
  // {
  //   name: 'Multi Step',
  //   href: routes.forms.multiStep,
  // },
  {
    name: 'Payment checkout',
    href: routes.eCommerce.checkout,
  },
  // label start
  {
    name: 'Tables',
  },
  // label end
  {
    name: 'Basic',
    href: routes.tables.basic,
  },
  {
    name: 'Collapsible',
    href: routes.tables.collapsible,
  },
  {
    name: 'Enhanced',
    href: routes.tables.enhanced,
  },
  {
    name: 'Sticky Header',
    href: routes.tables.stickyHeader,
  },
  {
    name: 'Pagination',
    href: routes.tables.pagination,
  },
  {
    name: 'Search',
    href: routes.tables.search,
  },
  // label start
  {
    name: 'Pages',
  },
  // label end
  {
    name: 'Profile',
    href: routes.profile,
  },
  {
    name: 'Welcome',
    href: routes.welcome,
  },
  {
    name: 'Coming soon',
    href: routes.comingSoon,
  },
  {
    name: 'Access Denied',
    href: routes.accessDenied,
  },
  {
    name: 'Not Found',
    href: routes.notFound,
  },
  {
    name: 'Maintenance',
    href: routes.maintenance,
  },
  {
    name: 'Blank',
    href: routes.blank,
  },
  // label start
  {
    name: 'Authentication',
  },
  // label end
  {
    name: 'Modern Sign Up',
    href: routes.auth.signUp,
  },
  
  {
    name: 'Modern Sign In',
    href: routes.auth.signIn,
  },
 
  {
    name: 'Modern Forgot Password',
    href: routes.auth.forgotPassword,
  },

  {
    name: 'Modern OTP Page',
    href: routes.auth.otp1,
  },
  {
    name: 'Vintage OTP Page',
    href: routes.auth.otp2,
  },
  {
    name: 'Trendy OTP Page',
    href: routes.auth.otp3,
  },
  {
    name: 'Elegant OTP Page',
    href: routes.auth.otp4,
  },
  {
    name: 'Classic OTP Page',
    href: routes.auth.otp5,
  },
];
