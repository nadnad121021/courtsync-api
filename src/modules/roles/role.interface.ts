export enum RoleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum SystemRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  VENUE_OWNER = 'VENUE_OWNER',
  PLAYER = 'PLAYER',
}

export interface IRole {
  id: string;
  name: string;
  description?: string;
  isSystemRole: boolean;
  status: RoleStatus;
  permissions?: string[];
  createdAt: Date;
  updatedAt: Date;
}