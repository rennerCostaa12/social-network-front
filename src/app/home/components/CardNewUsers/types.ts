export interface UserProps {
  id: string;
  name: string;
  username: string;
  gender: string;
  description: string | null;
  photo_profile: string;
  created_at: string;
  updated_at: string;
}

export interface ListUsersProps {
  data: UserProps[];
}
