let menu = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../../components/home/home'),
    children: [
      {
        path: "",
        component: () => import('../../components/index/index'),
      },
      {
        path: "/system/menu",
        name: "SystemMenu",
        component: () => import('../../views/system-menu/system-menu'),
      },
      {
        path: "/system/role",
        name: "SystemRole",
        component: () => import('../../views/system-role/system-role')
      }
    ]
  }
]

export default menu

