export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  // type: string;
  email: string;
  password: string | null;
  username: string;
  profile: any;
  session: any;
  workouts: any;
}
