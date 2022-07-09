export interface GoogleUser {
  provider: string;
  providerId: string;
  email: string;
  name: string;
}

export interface User extends GoogleUser {
  id: string;
  role: string;
  created: Date;
  hashedRefreshToken?: string;
}
