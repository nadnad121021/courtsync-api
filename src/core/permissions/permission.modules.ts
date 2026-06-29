export const PERMISSION_MODULES = {
  users: ['read', 'create', 'update', 'delete'],

  roles: ['read', 'create', 'update', 'delete'],

  permissions: ['read', 'create', 'update', 'delete'],

  venues: ['read', 'create', 'update', 'delete'],

  courts: ['read', 'create', 'update', 'delete'],

  bookings: ['read', 'create', 'update', 'delete'],

  payments: ['read', 'create', 'update', 'delete'],

  notifications: ['read', 'create', 'update', 'delete'],
} as const;