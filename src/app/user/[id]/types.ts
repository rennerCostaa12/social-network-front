export interface PostsByUserProps {
  posts_counts: number;
  posts: PostsUserProps[];
}
export interface PostsSavesProps {
  id: string;
  picture: string;
  city_id: number;
  comment: string;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    username: string;
    photo_profile: string;
  };
  comments: number;
  reactions: number;
  is_reacted: boolean;
  is_saved: boolean;
}

export interface PostsSavesPaginationProps {
  items: PostsSavesProps[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}
