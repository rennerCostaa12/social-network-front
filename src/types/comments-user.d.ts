declare type CommentsUserProps = {
  id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    username: string;
    photo_profile: string;
  };
};
