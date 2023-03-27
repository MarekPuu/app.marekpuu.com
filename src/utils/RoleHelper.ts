const roles: IRoles[] = [
  {
    roleName: 'Admin',
    roleId: 2,
  },
  {
    roleName: 'Omistaja',
    roleId: 1,
  },
  {
    roleName: 'Käyttäjä',
    roleId: 3,
  },
];

interface IRoles {
  roleName: string;
  roleId: number;
}

const CanEditAdmin = (users: any, id: string | undefined): boolean => {
  if (!!!id || !!!users || !!!Array.isArray(users)) return false;

  const householdUser = users.find((element: any) => element.userId === id);

  if (householdUser.roleId === 1 || householdUser.roleId === 2) return true;

  return false;
};

const CanEditOwner = (users: any, id: string): boolean => {
  if (!!!id || !!!users || !!!Array.isArray(users)) return false;

  const householdUser = users.find((element: any) => element.userId === id);

  if (householdUser.roleId === 1) return true;

  return false;
};

export { CanEditAdmin, CanEditOwner, roles };
