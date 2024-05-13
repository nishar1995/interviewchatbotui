import { ROLES } from '@/config/constants';
import { PERMISSIONS, STATUSES } from '@/data/users-data';

export const statuses = Object.values(STATUSES).map((status) => ({
  label: status,
  value: status,
}));

export const permissions = Object.values(PERMISSIONS).map((permission) => ({
  label: permission,
  value: permission,
}));

export const roles = Object.entries(ROLES).map(([key, value]) => ({
  label: value,
  value: key,
}));
