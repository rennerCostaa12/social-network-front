import { PostsByUserProps } from "@/app/user/[id]/types";

export interface CardProfileProps {
  following: number;
  followers: number;
  postsUser: PostsByUserProps;
  dataUser: UserProps;
}
