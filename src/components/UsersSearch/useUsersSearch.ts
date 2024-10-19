import { UsersServices } from "@/services/users";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ListUsersProps } from "./types";

let totalPage: number | null = null;

export const useUsersSearch = () => {
  const [listUsers, setListUsers] = useState<ListUsersProps[]>([]);
  const [pageUsers, setPageUsers] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const searchUsers = async (page: number = 1) => {
    const url = window.location.href;
    const nameUserFinded = url.split("/").pop();

    setLoading(true);

    const responseUsers = await UsersServices.searchUsersPagination(
      nameUserFinded as string,
      page
    );

    setLoading(false);

    if (responseUsers?.status) {
      setListUsers([...listUsers, ...responseUsers?.data.items]);
      totalPage = responseUsers?.data.meta.totalPages;
    } else {
      toast.error("Error", {
        description: responseUsers?.message,
      });
    }
  };

  const handlePaginate = () => {
    setPageUsers(pageUsers + 1);

    const scroll = window.scrollY;

    setTimeout(() => {
      window.scroll({ top: scroll, behavior: "instant" });
    }, 100);
  };

  useEffect(() => {
    if (pageUsers === 1) {
      setTimeout(() => {
        searchUsers(pageUsers);
      }, 10);
    } else {
      searchUsers(pageUsers);
    }
  }, [pageUsers]);

  return {
    searchUsers,
    listUsers,
    handlePaginate,
    totalPage,
    pageUsers,
    loading,
  };
};
