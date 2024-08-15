import { api } from "@/config/api";
import axios from "axios";

export const FollowingUsersServices = {
  followingUser: async (userIdFollower: string, userIdFollowed: string) => {
    try {
      const responseFollowing = await api.post("users-followers", {
        follower: userIdFollower,
        followed: userIdFollowed,
      });

      if (responseFollowing.status) {
        return {
          status: true,
          message: "Usuário seguido com sucesso",
          statusCode: 201,
          data: responseFollowing.data,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: false,
          message: error.response.data.message,
          statusCode: error.response.status,
        };
      }
    }
  },
  unfollowingUser: async (idUser: string, idUserUnfollowing: string) => {
    try {
      const responseUnfollowing = await api.post(
        `users-followers/unfollow-user/${idUser}`,
        {
          userId: idUserUnfollowing,
        }
      );

      if (responseUnfollowing.status) {
        return {
          status: true,
          message: "Usuário desseguido com sucesso",
          statusCode: 200,
          data: responseUnfollowing.data,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          status: false,
          message: error.response.data.message,
          statusCode: error.response.status,
        };
      }
    }
  },
};
