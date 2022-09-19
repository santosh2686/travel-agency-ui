import createCachedSelector from 're-reselect'

const formatCategoryItems = (data = [], routeAlias) => data.map(({ name, _id }) => ({
  label: name,
  route: `/${routeAlias}/${_id}/search`,
}))

const computeNavigationItems = (appConfig) => {
  const {
    customerCategory, expenseCategory, packageCategory,
    staffCategory, vehicleCategory,
  } = appConfig
  return [
    {
      label: 'DashBoard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      label: 'Requests',
      icon: 'list',
      active: 'request',
      items: [{
        label: 'Regular',
        route: '/request/regular',
      }, {
        label: 'Monthly fixed',
        route: '/request/fixed',
      }],
    },
    {
      label: 'Packages',
      icon: 'gift',
      active: 'package',
      items: formatCategoryItems(packageCategory, 'package'),
    },
    {
      label: 'Vehicles',
      icon: 'automobile',
      active: 'vehicle',
      items: formatCategoryItems(vehicleCategory, 'vehicle'),
    },
    {
      label: 'Staff',
      icon: 'user',
      active: 'staff',
      items: formatCategoryItems(staffCategory, 'staff'),
    },
    {
      label: 'Customers',
      icon: 'users',
      active: 'customer',
      items: formatCategoryItems(customerCategory, 'customer'),
    },
    {
      label: 'Expenses',
      icon: 'credit-card',
      active: 'expense',
      items: formatCategoryItems(expenseCategory, 'expense'),
    },
    {
      label: 'Payment',
      icon: 'money',
      active: 'payment',
      items: [{
        label: 'Vehicle',
        route: '/payment/vehicle',
      }, {
        label: 'Staff',
        route: '/payment/staff',
      }],
    },
    {
      label: 'Report',
      icon: 'line-chart',
      active: 'report',
      items: [{
        label: 'Business Report',
        route: '/report/business',
      }, {
        label: 'Vehicle Report',
        route: '/report/vehicle',
      }],
    },
    {
      label: 'Advanced Booking',
      icon: 'calendar',
      route: '/advanced-booking/search',
    },
    {
      label: 'Advanced Payment',
      icon: 'handshake-o',
      route: '/advanced-payment/search',
    },
    {
      label: 'Configuration',
      icon: 'gear',
      active: 'business',
      items: [{
        label: 'Business Settings',
        route: '/business/setting',
      }, {
        label: 'System Users',
        route: '/business/user',
      }],
    },
  ]
}

const getNavigationMenuList = createCachedSelector(
  (state) => state,
  (state) => {
    const { appConfig } = state
    return computeNavigationItems(appConfig)
  },
)(
  () => 'navigationMenu',
)

export default getNavigationMenuList
