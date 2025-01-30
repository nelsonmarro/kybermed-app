export interface JwtClaims {
  sub?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}
