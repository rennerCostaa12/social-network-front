export interface ListUsersProps {
  id: string;
  name: string;
  username: string;
  gender: string;
  description: string | null;
  password: string;
  status: string;
  photo_profile: string;
  created_at: string;
  updated_at: string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export interface ListUsersPaginationProps {
  data: ListUsersProps[];
}

export interface SearchPostsProps {
  params: { search: string };
  searchParams: {
    [key: string]: string | undefined;
  };
}
