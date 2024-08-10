export interface CommentsProps {
  comment: string;
  created_at: string;
  updated_at: string;
  id: string;
  post: {
    city_id: number;
    comment: string;
    created_at: string;
    id: string;
    picture: string;
    tags: any;
    updated_at: string;
  };
  user: {
    created_at: string;
    description: string;
    gender: string;
    id: string;
    name: string;
    password: string;
    photo_profile: string;
    status: string;
    updated_at: string;
    username: string;
  };
}

export interface ListCommentsProps {
  data: CommentsProps[];
  setVisibleModalComments: (data: boolean) => void;
}

export interface UserListCommentsProps {
  setVisibleModalComments: (data: boolean) => void;
}
