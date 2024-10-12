

import { MiscellaneousServices } from '@mui/icons-material';
import { IconAperture } from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
    {
      navlabel: true,
      subheader: 'Home',
    },
  
    {
      id: uniqueId(),
      title: 'Dashboard',
      icon: IconAperture,
      href: '/admin',
      chipColor: 'secondary',
    },

    {
      navlabel: true,
      subheader: 'Main',
    },

    // {
    //   id: uniqueId(),
    //   title: 'Service',
    //   icon: MiscellaneousServices,
    //   href: '/admin/service',
    // },
    // {
    //   id: uniqueId(),
    //   title: 'Service Category',
    //   icon: MiscellaneousServices,
    //   href: '/admin/servicecategory',
    // },
    {
      id: uniqueId(),
      title: 'Home',
      icon: MiscellaneousServices,
      href: '/admin/home',
    },
    {
      id: uniqueId(),
      title: 'Services',
      icon: MiscellaneousServices,
      href: '/admin/services/',
      children :[
        {
          id: uniqueId(),
          title: 'All',
          icon: MiscellaneousServices,
          href: '/admin/services/all',
        },
        {
          id: uniqueId(),
          title: 'Drafts',
          icon: MiscellaneousServices,
          href: '/admin/services/drafts',
        },
      ]
    },
    {
      id: uniqueId(),
      title: 'Commission Setup',
      icon: MiscellaneousServices,
      href: '/admin/commissionsetup',
    },
    {
      id: uniqueId(),
      title: 'Services Location',
      icon: MiscellaneousServices,
      href: '/admin/serviceslocation/',
      children :[
        {
          id: uniqueId(),
          title: 'All',
          icon: MiscellaneousServices,
          href: '/admin/serviceslocation/all',
        },
        {
          id: uniqueId(),
          title: 'Drafts',
          icon: MiscellaneousServices,
          href: '/admin/serviceslocation/drafts',
        },
      ]
    },
    {
      id: uniqueId(),
      title: 'Bookings',
      icon: MiscellaneousServices,
      href: '/admin/booking/',
      children :[
        {
          id: uniqueId(),
          title: 'All',
          icon: MiscellaneousServices,
          href: '/admin/booking/all',
        },
        {
          id: uniqueId(),
          title: 'Completed',
          icon: MiscellaneousServices,
          href: '/admin/booking/completed',
        },
        {
          id: uniqueId(),
          title: 'On Going',
          icon: MiscellaneousServices,
          href: '/admin/booking/ongoing',
        },
        {
          id: uniqueId(),
          title: 'Waiting',
          icon: MiscellaneousServices,
          href: '/admin/booking/waiting',
        },
        {
          id: uniqueId(),
          title: 'Canceled',
          icon: MiscellaneousServices,
          href: '/admin/booking/canceled',
        },
      ]
    },
    {
      id: uniqueId(),
      title: 'Transactions',
      icon: MiscellaneousServices,
      href: '/admin/Transactions/',
      children :[
        {
          id: uniqueId(),
          title: 'All Transactions',
          icon: MiscellaneousServices,
          href: '/admin/Transactions/Alltransactions',
        },
        {
          id: uniqueId(),
          title: 'Due Transactions',
          icon: MiscellaneousServices,
          href: '/admin/Transactions/Duetransactions',
        },
        {
          id: uniqueId(),
          title: 'Paid Transactions',
          icon: MiscellaneousServices,
          href: '/admin/Transactions/Paidtransactions',
        },
        {
          id: uniqueId(),
          title: 'Commission Transactions',
          icon: MiscellaneousServices,
          href: '/admin/Transactions/Commissiontransactions',
        },
      ]
    },
    {
      id: uniqueId(),
      title: 'Providers/Vendors',
      icon: MiscellaneousServices,
      href: '/admin/providers/',
      children :[
        {
          id: uniqueId(),
          title: 'All',
          icon: MiscellaneousServices,
          href: '/admin/providers/all',
        },
        {
          id: uniqueId(),
          title: 'Drafts',
          icon: MiscellaneousServices,
          href: '/admin/Providers/drafts',
        },
        {
          id: uniqueId(),
          title: 'Holds',
          icon: MiscellaneousServices,
          href: '/admin/Providers/Holds',
        },
        {
          id: uniqueId(),
          title: 'Banned',
          icon: MiscellaneousServices,
          href: '/admin/Providers/Banned',
        },
      ]
    },
    {
      id: uniqueId(),
      title: 'Users',
      icon: MiscellaneousServices,
      href: '/admin/user/',
      children :[
        {
          id: uniqueId(),
          title: 'All',
          icon: MiscellaneousServices,
          href: '/admin/user/all',
        },
        {
          id: uniqueId(),
          title: 'Drafts',
          icon: MiscellaneousServices,
          href: '/admin/user/drafts',
        },
        {
          id: uniqueId(),
          title: 'Holds',
          icon: MiscellaneousServices,
          href: '/admin/user/Holds',
        },
        {
          id: uniqueId(),
          title: 'Banned',
          icon: MiscellaneousServices,
          href: '/admin/user/Banned',
        },
      ]
    },
]

export default Menuitems;
