export interface JwtClaims {
  sub?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}
