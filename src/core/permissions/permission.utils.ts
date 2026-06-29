import { PERMISSION_MODULES } from './permission.modules';

export function generatePermissions() {
  return Object.entries(PERMISSION_MODULES).flatMap(
    ([moduleName, actions]) =>
      actions.map(action => ({
        code: `${moduleName}:${action}`,
        description: `${capitalize(action)} ${moduleName}`,
      })),
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}