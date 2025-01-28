export interface JwtClaims {
  sub?: string;
  email?: string;
  userId: string;
  role?: string;
  [key: string]: any;
}
