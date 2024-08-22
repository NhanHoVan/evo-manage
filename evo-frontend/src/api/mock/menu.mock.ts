import type { MenuList } from '@/interface/layout/menu.interface';

export const mockMenuList: MenuList = [
  {
    code: 'dashboard',
    label: {
      en_US: 'Dashboard',
      vi_VN: 'Tổng quan',
    },
    icon: 'dashboard',
    path: '/dashboard',
  },
  {
    code: 'documentation',
    label: {
      en_US: 'Documentation',
      vi_VN: 'Tài liệu',
    },
    icon: 'documentation',
    path: '/documentation',
  },
  {
    code: 'guide',
    label: {
      en_US: 'Guide',
      vi_VN: 'Hướng dẫn',
    },
    icon: 'guide',
    path: '/guide',
  },
  {
    code: 'permission',
    label: {
      en_US: 'Permission',
      vi_VN: 'Permission',
    },
    icon: 'permission',
    path: '/permission',
    children: [
      {
        code: 'routePermission',
        label: {
          en_US: 'Route Permission',
          vi_VN: 'Route Permission',
        },
        path: '/permission/route',
      },
      {
        code: 'notFound',
        label: {
          en_US: '404',
          vi_VN: '404',
        },
        path: '/permission/404',
      },
    ],
  },
  {
    code: 'component',
    label: {
      en_US: 'Component',
      vi_VN: 'Component',
    },
    icon: 'permission',
    path: '/component',
    children: [
      {
        code: 'componentForm',
        label: {
          en_US: 'Form',
          vi_VN: 'Biểu mẫu',
        },
        path: '/component/form',
      },
      {
        code: 'componentTable',
        label: {
          en_US: 'Table',
          vi_VN: 'Bảng',
        },
        path: '/component/table',
      },
      {
        code: 'componentSearch',
        label: {
          en_US: 'Search',
          vi_VN: 'Tìm kiếm',
        },
        path: '/component/search',
      },
      {
        code: 'componentAside',
        label: {
          en_US: 'Aside',
          vi_VN: 'Aside',
        },
        path: '/component/aside',
      },
      {
        code: 'componentTabs',
        label: {
          en_US: 'Tabs',
          vi_VN: 'Tabs',
        },
        path: '/component/tabs',
      },
      {
        code: 'componentRadioCards',
        label: {
          en_US: 'Radio Cards',
          vi_VN: 'Radio Cards',
        },
        path: '/component/radio-cards',
      },
    ],
  },
];
