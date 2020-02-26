export interface AccessTokenPayload {
  // sub: number;
  // username: string;
  roles: AllowedRolesString[];
}
export type AllowedRolesString = keyof typeof AllowedRoles;

export declare enum AllowedRoles {
  ADMIN,
  USER,
}
