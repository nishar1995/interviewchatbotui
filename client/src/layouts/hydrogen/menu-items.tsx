import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import Cookies from 'js-cookie';
import { UserRole } from '@/enums/role';
import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiCurrencyDollarDuotone,
  PiSquaresFourDuotone,
  PiGridFourDuotone,
  PiFeatherDuotone,
  PiChartLineUpDuotone,
  PiMapPinLineDuotone,
  PiUserGearDuotone,
  PiBellSimpleRingingDuotone,
  PiUserDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiStepsDuotone,
  PiCreditCardDuotone,
  PiTableDuotone,
  PiBrowserDuotone,
  PiHourglassSimpleDuotone,
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
  PiFolderLockDuotone,
  PiBinocularsDuotone,
  PiHammerDuotone,
  PiNoteBlankDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiCalendarPlusDuotone,
  PiEnvelopeDuotone,
  PiCurrencyCircleDollarDuotone,
  PiBriefcaseDuotone,
  PiHouseLineDuotone,
  PiAirplaneTiltDuotone,
  PiFolderNotchDuotone,
  PiCaretCircleUpDownDuotone,
  PiListNumbersDuotone,
  PiCoinDuotone,
  PiCalendarDuotone,
} from 'react-icons/pi';
import { hardcodedUsers } from '@/app/(hydrogen)/layout';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = (userEmail: string) => {
  const cookieValue: any = Cookies.get('user_details');
  const user: any = cookieValue ? JSON.parse(cookieValue) : {};
  console.log("get role in cookies", user)

  if (!Number(user.role)) return [];
  if (Number(user.role) === UserRole.HR) {
    return [
      // label start
      {
        name: 'Overview',
      },
      // label end
      {
        name: 'File Manager',
        href: routes.fileManager.dashboard,
        icon: <PiFolderNotchDuotone />,
        // dropdownItems: [
        //   {
        //     name: 'Dropdown Item 3',
        //     href: '/item2/dropdown1',
        //   },
        //   {
        //     name: 'Dropdown Item 4',
        //     href: '/item2/dropdown2',
        //   },
        // ],
      },
      {
        name: 'Candidates List',
        href: routes.executive.dashboard,
        icon: <PiBriefcaseDuotone />,
        // dropdownItems: [
        //   {
        //     name: 'Dropdown Item 3',
        //     href: '/item2/dropdown1',
        //   },
        //   {
        //     name: 'Dropdown Item 4',
        //     href: '/item2/dropdown2',
        //   },
        // ],
        
      },
      {
        name: 'Meeting Schedule',
        href: routes.meeting.dashboard,
        icon: <PiBriefcaseDuotone />,
        // dropdownItems: [
        //   {
        //     name: 'Dropdown Item 3',
        //     href: '/item2/dropdown1',
        //   },
        //   {
        //     name: 'Dropdown Item 4',
        //     href: '/item2/dropdown2',
        //   },
        // ],
      },
      // {
      //   name: 'Tenant Management',
      //   href: routes.tenant.dashboard,
      //   icon: <PiBriefcaseDuotone />,
      // },

      // {
      //   name: 'Questions Management',
      //   href: routes.questions.dashboard,
      //   icon: <PiBriefcaseDuotone />,
      // },

      // {
      //     name: 'Roles & Permissions',
      //     href: routes.rolesPermissions,
      //     icon: <PiFolderLockDuotone />,
      //   },
    ];
  }

  if (Number(user.role) === UserRole.CANDIDATE) {
    return [
      {
        name: 'Overview',
      },
      // label end
      {
        name: 'Candidate Dashboard',
        href: routes.candidate.dashboard,
        icon: <PiCalendarDuotone />,
        // badge: 'UPD',
        // dropdownItems: [
        //   {
        //     name: 'Dropdown Item 3',
        //     href: '/item2/dropdown1',
        //   },
        //   {
        //     name: 'Dropdown Item 4',
        //     href: '/item2/dropdown2',
        //   },
        // ],
      },

      {
        name: 'My Interview',
        href: routes.candidate.meeting,
        icon: <PiCalendarDuotone />,
        // badge: 'UPD',
        // dropdownItems: [
        //   {
        //     name: 'Dropdown Item 3',
        //     href: '/item2/dropdown1',
        //   },
        //   {
        //     name: 'Dropdown Item 4',
        //     href: '/item2/dropdown2',
        //   },
        // ],
      },
    ];
  }

  if (Number(user.role) === UserRole.HR_MANAGER) {
    return [
      // label start
      {
        name: 'Overview',
      },
      // label end
      {
        name: 'Interview',
        href: routes.interview.dashboard,
        icon: <PiCalendarDuotone />,
        // dropdownItems: [
        //   {
        //     name: 'Dropdown Item 3',
        //     href: '/item2/dropdown1',
        //   },
        //   {
        //     name: 'Dropdown Item 4',
        //     href: '/item2/dropdown2',
        //   },
        // ],
        // badge: 'UPD',
      },
      {
        name: 'Job',
        href: routes.job.dashboard,
        icon: <PiCalendarDuotone />,
        // badge: 'UPD',
        // dropdownItems: [
        //   {
        //     name: 'Dropdown Item 3',
        //     href: '/item2/dropdown1',
        //   },
        //   {
        //     name: 'Dropdown Item 4',
        //     href: '/item2/dropdown2',
        //   },
        // ],
      },

      {
        name: 'Questions Management',
        href: routes.questions.dashboard,
        icon: <PiBriefcaseDuotone />,
        // dropdownItems: [
        //   {
        //     name: 'Dropdown Item 3',
        //     href: '/item2/dropdown1',
        //   },
        //   {
        //     name: 'Dropdown Item 4',
        //     href: '/item2/dropdown2',
        //   },
        // ],
      },

      {
        name: 'Candidates List',
        href: routes.executive.dashboard,
        icon: <PiBriefcaseDuotone />,
        // dropdownItems: [
        //   {
        //     name: 'Dropdown Item 3',
        //     href: '/item2/dropdown1',
        //   },
        //   {
        //     name: 'Dropdown Item 4',
        //     href: '/item2/dropdown2',
        //   },
        // ],
      },
      {
        name: 'Meeting Schedule',
        href: routes.meeting.dashboard,
        icon: <PiBriefcaseDuotone />,
        // dropdownItems: [
        //   {
        //     name: 'Dropdown Item 3',
        //     href: '/item2/dropdown1',
        //   },
        //   {
        //     name: 'Dropdown Item 4',
        //     href: '/item2/dropdown2',
        //   },
        // ],
      },
    ];
  }

  return [
    // label start
    {
      name: 'Overview',
    },
    {
      name: 'File Manager',
      href: routes.fileManager.dashboard,
      icon: <PiFolderNotchDuotone />,
      // dropdownItems: [
      //   {
      //     name: 'Dropdown Item 3',
      //     href: '/item2/dropdown1',
      //   },
      //   {
      //     name: 'Dropdown Item 4',
      //     href: '/item2/dropdown2',
      //   },
      // ],
    },

    {
      name: 'Tenant Management',
      href: routes.tenant.dashboard,
      icon: <PiBriefcaseDuotone />,
      // dropdownItems: [
      //   {
      //     name: 'Dropdown Item 3',
      //     href: '/item2/dropdown1',
      //   },
      //   {
      //     name: 'Dropdown Item 4',
      //     href: '/item2/dropdown2',
      //   },
      // ],
    },

    {
      name: 'Roles & Permissions',
      href: routes.rolesPermissions,
      icon: <PiFolderLockDuotone />,
      // dropdownItems: [
      //   {
      //     name: 'Dropdown Item 3',
      //     href: '/item2/dropdown1',
      //   },
      //   {
      //     name: 'Dropdown Item 4',
      //     href: '/item2/dropdown2',
      //   },
      // ],
    },

    {
      name: 'Job',
      href: routes.job.dashboard,
      icon: <PiCalendarDuotone />,
      // dropdownItems: [
      //   {
      //     name: 'Dropdown Item 3',
      //     href: '/item2/dropdown1',
      //   },
      //   {
      //     name: 'Dropdown Item 4',
      //     href: '/item2/dropdown2',
      //   },
      // ],
      // badge: 'UPD',
    },

    {
      name: 'Candidates List',
      href: routes.executive.dashboard,
      icon: <PiBriefcaseDuotone />,
      // dropdownItems: [
      //   {
      //     name: 'Dropdown Item 3',
      //     href: '/item2/dropdown1',
      //   },
      //   {
      //     name: 'Dropdown Item 4',
      //     href: '/item2/dropdown2',
      //   },
      // ],
    },

    {
      name: 'Questions Management',
      href: routes.questions.dashboard,
      icon: <PiBriefcaseDuotone />,
      // dropdownItems: [
      //   {
      //     name: 'Dropdown Item 3',
      //     href: '/item2/dropdown1',
      //   },
      //   {
      //     name: 'Dropdown Item 4',
      //     href: '/item2/dropdown2',
      //   },
      // ],
    },

    {
      name: 'Meeting Schedule',
      href: routes.meeting.dashboard,
      icon: <PiBriefcaseDuotone />,
      // dropdownItems: [
      //   {
      //     name: 'Dropdown Item 3',
      //     href: '/item2/dropdown1',
      //   },
      //   {
      //     name: 'Dropdown Item 4',
      //     href: '/item2/dropdown2',
      //   },
      // ],
    },
    // {
    //   name: 'Start Interview',
    //   href: routes.interview.startInterview,
    //   icon: <PiBriefcaseDuotone />,
    // },




    // {
    //   name: 'Overview',
    // },
    // // label end

    // {
    //   name: 'Interview',
    //   href: routes.interview.dashboard,
    //   icon: <PiCalendarDuotone />,
    //   // badge: 'UPD',
    // },
    // {
    //   name: 'Candidate',
    //   href: routes.executive.dashboard,
    //   icon: <PiBriefcaseDuotone />,
    // },
    // {
    //   name: 'Job',
    //   href: routes.job.dashboard,
    //   icon: <PiCalendarDuotone />,
    //   // badge: 'UPD',
    // },

    // {
    //   name: 'Meeting Schedule',
    //   href: routes.ScheduleMeeting.dashboard,
    //   icon: <PiBriefcaseDuotone />,
    // },
    // {
    //   name: 'Financial',
    //   href: routes.financial.dashboard,
    //   icon: <PiCurrencyCircleDollarDuotone />,
    // },
    // {
    //   name: 'Logistics',
    //   href: routes.logistics.dashboard,
    //   icon: <PiPackageDuotone />,
    // },
    // {
    //   name: 'E-Commerce',
    //   href: routes.eCommerce.dashboard,
    //   icon: <PiShoppingCartDuotone />,
    // },
    // {
    //   name: 'Analytics',
    //   href: routes.analytics,
    //   icon: <PiChartBarDuotone />,
    //   badge: '',
    // },
    // {
    //   name: 'Support',
    //   href: routes.support.dashboard,
    //   icon: <PiHeadsetDuotone />,
    // },

    // label start
    // {
    //   name: 'Apps Kit',
    // },
    // // label end
    // {
    //   name: 'E-Commerce',
    //   href: '#',
    //   icon: <PiShoppingCartDuotone />,
    //   dropdownItems: [
    //     {
    //       name: 'Products',
    //       href: routes.eCommerce.products,
    //       badge: '',
    //     },
    //     {
    //       name: 'Product Details',
    //       href: routes.eCommerce.productDetails(DUMMY_ID),
    //     },
    //     {
    //       name: 'Create Product',
    //       href: routes.eCommerce.createProduct,
    //     },
    //     {
    //       name: 'Edit Product',
    //       href: routes.eCommerce.ediProduct(DUMMY_ID),
    //     },
    //     {
    //       name: 'Categories',
    //       href: routes.eCommerce.categories,
    //     },
    //     {
    //       name: 'Create Category',
    //       href: routes.eCommerce.createCategory,
    //     },
    //     {
    //       name: 'Edit Category',
    //       href: routes.eCommerce.editCategory(DUMMY_ID),
    //     },
    //     {
    //       name: 'Orders',
    //       href: routes.eCommerce.orders,
    //     },
    //     {
    //       name: 'Order Details',
    //       href: routes.eCommerce.orderDetails(DUMMY_ID),
    //     },
    //     {
    //       name: 'Create Order',
    //       href: routes.eCommerce.createOrder,
    //     },
    //     {
    //       name: 'Edit Order',
    //       href: routes.eCommerce.editOrder(DUMMY_ID),
    //     },
    //     {
    //       name: 'Reviews',
    //       href: routes.eCommerce.reviews,
    //     },
    //     {
    //       name: 'Shop',
    //       href: routes.eCommerce.shop,
    //     },
    //     {
    //       name: 'Cart',
    //       href: routes.eCommerce.cart,
    //     },
    //     {
    //       name: 'Checkout & Payment',
    //       href: routes.eCommerce.checkout,
    //     },
    //   ],
    // },
    // {
    //   name: 'Support',
    //   href: '#',
    //   icon: <PiHeadsetDuotone />,
    //   dropdownItems: [
    //     {
    //       name: 'Inbox',
    //       href: routes.support.inbox,
    //     },
    //     {
    //       name: 'Snippets',
    //       href: routes.support.snippets,
    //     },
    //     {
    //       name: 'Templates',
    //       href: routes.support.templates,
    //     },
    //   ],
    // },
    // {
    //   name: 'Invoice',
    //   href: '#',
    //   icon: <PiCurrencyDollarDuotone />,
    //   dropdownItems: [
    //     {
    //       name: 'List',
    //       href: routes.invoice.home,
    //     },
    //     {
    //       name: 'Details',
    //       href: routes.invoice.details(DUMMY_ID),
    //     },
    //     {
    //       name: 'Create',
    //       href: routes.invoice.create,
    //     },
    //     {
    //       name: 'Edit',
    //       href: routes.invoice.edit(DUMMY_ID),
    //     },
    //   ],
    // },
    // {
    //   name: 'Logistics',
    //   href: '#',
    //   icon: <PiPackageDuotone />,
    //   dropdownItems: [
    //     {
    //       name: 'Shipment List',
    //       href: routes.logistics.shipmentList,
    //     },
    //     {
    //       name: 'Shipment Details',
    //       href: routes.logistics.shipmentDetails(DUMMY_ID),
    //     },
    //     {
    //       name: 'Create Shipment',
    //       href: routes.logistics.createShipment,
    //     },
    //     {
    //       name: 'Edit Shipment',
    //       href: routes.logistics.editShipment(DUMMY_ID),
    //     },
    //     {
    //       name: 'Customer Profile',
    //       href: routes.logistics.customerProfile,
    //     },
    //     {
    //       name: 'Tracking',
    //       href: routes.logistics.tracking(DUMMY_ID),
    //     },
    //   ],
    // },
    // {
    //   name: 'Appointment',
    //   href: routes.interview.appointmentList,
    //   icon: <PiCalendarDuotone />,
    //   badge: 'UPD',
    // },
    // {
    //   name: 'File Manager',
    //   href: routes.file.manager,
    //   icon: <PiFolderNotchDuotone />,
    // },
    // {
    //   name: 'Event Calendar',
    //   href: routes.eventCalendar,
    //   icon: <PiCalendarPlusDuotone />,
    // },
    // {
    //   name: 'Roles & Permissions',
    //   href: routes.rolesPermissions,
    //   icon: <PiFolderLockDuotone />,
    // },
    // {
    //   name: 'Point of Sale',
    //   href: routes.pos.index,
    //   icon: <PiCreditCardDuotone />,
    // },
    // // label start
    // {
    //   name: 'Search & Filters',
    // },
    // {
    //   name: 'Real Estate',
    //   href: routes.searchAndFilter.realEstate,
    //   icon: <PiHouseLineDuotone />,
    // },
    // {
    //   name: 'Flight Booking',
    //   href: routes.searchAndFilter.flight,
    //   icon: <PiAirplaneTiltDuotone />,
    // },
    // {
    //   name: 'NFT',
    //   href: routes.searchAndFilter.nft,
    //   icon: <PiCoinDuotone />,
    // },
    // // label end
    // // label start
    // {
    //   name: 'Widgets',
    // },
    // // label end
    // {
    //   name: 'Cards',
    //   href: routes.widgets.cards,
    //   icon: <PiSquaresFourDuotone />,
    // },
    // {
    //   name: 'Icons',
    //   href: routes.widgets.icons,
    //   icon: <PiFeatherDuotone />,
    // },
    // {
    //   name: 'Charts',
    //   href: routes.widgets.charts,
    //   icon: <PiChartLineUpDuotone />,
    // },
    // // {
    // //   name: 'Banners',
    // //   href: routes.widgets.banners,
    // //   icon: <PiImageDuotone />,
    // // },
    // {
    //   name: 'Maps',
    //   href: routes.widgets.maps,
    //   icon: <PiMapPinLineDuotone />,
    // },
    // {
    //   name: 'Email Templates',
    //   href: routes.emailTemplates,
    //   icon: <PiEnvelopeDuotone />,
    // },
    // // label start
    // {
    //   name: 'Forms',
    // },
    // // label end
    // {
    //   name: 'Account Settings',
    //   href: routes.forms.profileSettings,
    //   icon: <PiUserGearDuotone />,
    // },
    // {
    //   name: 'Notification Preference',
    //   href: routes.forms.notificationPreference,
    //   icon: <PiBellSimpleRingingDuotone />,
    // },
    // {
    //   name: 'Personal Information',
    //   href: routes.forms.personalInformation,
    //   icon: <PiUserDuotone />,
    // },
    // {
    //   name: 'Newsletter',
    //   href: routes.forms.newsletter,
    //   icon: <PiEnvelopeSimpleOpenDuotone />,
    // },
    // {
    //   name: 'Multi Step',
    //   href: routes.multiStep,
    //   icon: <PiStepsDuotone />,
    // },
    // {
    //   name: 'Payment Checkout',
    //   href: routes.eCommerce.checkout,
    //   icon: <PiCreditCardDuotone />,
    // },
    // // label start
    // {
    //   name: 'Tables',
    // },
    // // label end
    // {
    //   name: 'Basic',
    //   href: routes.tables.basic,
    //   icon: <PiGridFourDuotone />,
    // },
    // {
    //   name: 'Collapsible',
    //   href: routes.tables.collapsible,
    //   icon: <PiCaretCircleUpDownDuotone />,
    // },
    // {
    //   name: 'Enhanced',
    //   href: routes.tables.enhanced,
    //   icon: <PiTableDuotone />,
    // },
    // {
    //   name: 'Sticky Header',
    //   href: routes.tables.stickyHeader,
    //   icon: <PiBrowserDuotone />,
    // },
    // {
    //   name: 'Pagination',
    //   href: routes.tables.pagination,
    //   icon: <PiListNumbersDuotone />,
    // },
    // {
    //   name: 'Search',
    //   href: routes.tables.search,
    //   icon: <PiHourglassSimpleDuotone />,
    // },
    // // label start
    // {
    //   name: 'Pages',
    // },
    // {
    //   name: 'Profile',
    //   href: routes.profile,
    //   icon: <PiUserCircleDuotone />,
    // },
    // {
    //   name: 'Welcome',
    //   href: routes.welcome,
    //   icon: <PiShootingStarDuotone />,
    // },
    // {
    //   name: 'Coming soon',
    //   href: routes.comingSoon,
    //   icon: <PiRocketLaunchDuotone />,
    // },
    // {
    //   name: 'Access Denied',
    //   href: routes.accessDenied,
    //   icon: <PiFolderLockDuotone />,
    // },
    // {
    //   name: 'Not Found',
    //   href: routes.notFound,
    //   icon: <PiBinocularsDuotone />,
    // },
    // {
    //   name: 'Maintenance',
    //   href: routes.maintenance,
    //   icon: <PiHammerDuotone />,
    // },
    // {
    //   name: 'Blank',
    //   href: routes.blank,
    //   icon: <PiNoteBlankDuotone />,
    // },

    // label start
    // {
    //   name: 'Authentication',
    // },
    // label end
    // {
    //   name: 'Sign Up',
    //   href: '#',
    //   icon: <PiUserPlusDuotone />,
    //   dropdownItems: [
    //     {
    //       name: 'Modern Sign up',
    //       href: routes.auth.signUp1,
    //     },
    //     {
    //       name: 'Vintage Sign up',
    //       href: routes.auth.signUp2,
    //     },
    //     {
    //       name: 'Trendy Sign up',
    //       href: routes.auth.signUp3,
    //     },
    //     {
    //       name: 'Elegant Sign up',
    //       href: routes.auth.signUp4,
    //     },
    //     {
    //       name: 'Classic Sign up',
    //       href: routes.auth.signUp5,
    //     },
    //   ],
    // },
    // {
    //   name: 'Sign In',
    //   href: '#',
    //   icon: <PiShieldCheckDuotone />,
    //   dropdownItems: [
    //     {
    //       name: 'Modern Sign in',
    //       href: routes.auth.signIn1,
    //     },
    //     {
    //       name: 'Vintage Sign in',
    //       href: routes.auth.signIn2,
    //     },
    //     {
    //       name: 'Trendy Sign in',
    //       href: routes.auth.signIn3,
    //     },
    //     {
    //       name: 'Elegant Sign in',
    //       href: routes.auth.signIn4,
    //     },
    //     {
    //       name: 'Classic Sign in',
    //       href: routes.auth.signIn5,
    //     },
    //   ],
    // },
    // {
    //   name: 'Forgot Password',
    //   href: '#',
    //   icon: <PiLockKeyDuotone />,
    //   dropdownItems: [
    //     {
    //       name: 'Modern Forgot password',
    //       href: routes.auth.forgotPassword,
    //     },
    //     {
    //       name: 'Vintage Forgot password',
    //       href: routes.auth.forgotPassword2,
    //     },
    //     {
    //       name: 'Trendy Forgot password',
    //       href: routes.auth.forgotPassword3,
    //     },
    //     {
    //       name: 'Elegant Forgot password',
    //       href: routes.auth.forgotPassword4,
    //     },
    //     {
    //       name: 'Classic Forgot password',
    //       href: routes.auth.forgotPassword5,
    //     },
    //   ],
    // },
    // {
    //   name: 'OTP Pages',
    //   href: '#',
    //   icon: <PiChatCenteredDotsDuotone />,
    //   // dropdownItems: [
    //   //   {
    //   //     name: 'Modern OTP page',
    //   //     href: routes.auth.otp1,
    //   //   },
    //   //   {
    //   //     name: 'Vintage OTP page',
    //   //     href: routes.auth.otp2,
    //   //   },
    //   //   {
    //   //     name: 'Trendy OTP page',
    //   //     href: routes.auth.otp3,
    //   //   },
    //   //   {
    //   //     name: 'Elegant OTP page',
    //   //     href: routes.auth.otp4,
    //   //   },
    //   //   {
    //   //     name: 'Classic OTP page',
    //   //     href: routes.auth.otp5,
    //   //   },
    //   // ],
    // },
  ];
};
