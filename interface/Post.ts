export interface PostInterface {
  title: string;
  content: string;
  description: string;
  userId: string;
  createdAt: CreatedAt;
  uid: string;
}

export type CreatedAt = {
  seconds: number;
  nanoseconds: number;
};
