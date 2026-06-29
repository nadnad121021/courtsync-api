export const PERMISSIONS = {
  USERS_READ: 'users:read',
  USERS_CREATE: 'users:create',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',

  ROLES_READ: 'roles:read',
  ROLES_CREATE: 'roles:create',
  ROLES_UPDATE: 'roles:update',
  ROLES_DELETE: 'roles:delete',

  PERMISSIONS_READ: 'permissions:read',
  PERMISSIONS_CREATE: 'permissions:create',
  PERMISSIONS_UPDATE: 'permissions:update',
  PERMISSIONS_DELETE: 'permissions:delete',

  VENUES_READ: 'venues:read',
  VENUES_CREATE: 'venues:create',
  VENUES_UPDATE: 'venues:update',
  VENUES_DELETE: 'venues:delete',

  COURTS_READ: 'courts:read',
  COURTS_CREATE: 'courts:create',
  COURTS_UPDATE: 'courts:update',
  COURTS_DELETE: 'courts:delete',

  BOOKINGS_READ: 'bookings:read',
  BOOKINGS_CREATE: 'bookings:create',
  BOOKINGS_UPDATE: 'bookings:update',
  BOOKINGS_DELETE: 'bookings:delete',

  PAYMENTS_READ: 'payments:read',
  PAYMENTS_CREATE: 'payments:create',
  PAYMENTS_UPDATE: 'payments:update',
  PAYMENTS_DELETE: 'payments:delete',

  NOTIFICATIONS_READ: 'notifications:read',
  NOTIFICATIONS_CREATE: 'notifications:create',
  NOTIFICATIONS_UPDATE: 'notifications:update',
  NOTIFICATIONS_DELETE: 'notifications:delete',
} as const;