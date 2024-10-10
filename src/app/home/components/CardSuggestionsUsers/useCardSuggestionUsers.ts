import { useEffect, useState } from "react";
import { toast } from "sonner";

import { FollowingUsersServices } from "@/services/following-users";
import { UsersServices } from "@/services/users";
import { useAuthContext } from "@/context/auth";

import { ListUsersProps } from "./types";

export const useCardSuggestionUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersRecommended, setUsersRecommended] = useState<ListUsersProps[]>(
    []
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const { datasUser } = useAuthContext();

  const getUsersRecommended = async (page: number) => {
    try {
      const response = await UsersServices.getUsersRecommended(String(page));
      if (response?.status) {
        console.log(response.data);
        setUsersRecommended((prev) => [...prev, ...response.data.items]);
        setTotalPages(response.data.meta.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollowing = async (idUser: string) => {
    setLoading(true);
    const responseFollowing = await FollowingUsersServices.followingUser(
      datasUser?.id as string,
      idUser
    );
    setLoading(false);

    if (!responseFollowing?.status) {
      toast.error("Error", {
        description: responseFollowing?.message,
      });
    }
  };

  const handleUnfollowing = async (idUser: string) => {
    setLoading(true);
    const responseUnfollowing = await FollowingUsersServices.unfollowingUser(
      datasUser?.id as string,
      idUser
    );
    setLoading(false);

    if (!responseUnfollowing?.status) {
      toast.error("Error", {
        description: responseUnfollowing?.message,
      });
    }
  };

  const toggleFollow = (userId: string, isFollowing: boolean) => {
    if (isFollowing) {
      handleUnfollowing(userId);
      setFollowingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    } else {
      handleFollowing(userId);
      setFollowingUsers((prev) => new Set(prev).add(userId));
    }
  };

  const loadMoreUsers = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      getUsersRecommended(nextPage);
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    getUsersRecommended(currentPage);
  }, []);

  return {
    handleUnfollowing,
    handleFollowing,
    loading,
    toggleFollow,
    followingUsers,
    usersRecommended,
    loadMoreUsers,
    totalPages,
    currentPage,
  };
};
