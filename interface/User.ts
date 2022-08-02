export interface UserType {
  password: string | number;
  name: string;
  email: string;
  createdAt: string | number;
  uid?: string;
  avatarUrl: string;
}
