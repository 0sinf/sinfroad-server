export interface GoogleUser {
  provider: string;
  prvoiderId: string;
  email: string;
  name: string;
}

export interface User extends GoogleUser {
  id: string;
  grade: number;
  created: Date;
  hashedRefreshToken?: string;
}
