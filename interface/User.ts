export interface UserType {
  password: string | number;
  name: string;
  email: string;
  createdAt: string | number;
  uid?: string;
  avatar_url: string;
}
