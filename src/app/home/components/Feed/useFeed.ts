import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuthContext } from "@/context/auth";
import { PostsService } from "@/services/posts";

import { DataPosts } from "./types";

export const useFeed = () => {
  const { datasUser } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [dataPosts, setDataPosts] = useState<DataPosts | null>(null);

  const getPosts = async () => {
    setLoading(true);
    const responsePosts = await PostsService.getPostsFeed();
    setLoading(false);

    if (responsePosts?.status) {
      setDataPosts(responsePosts.data);
    } else {
      toast.error("Error", { description: responsePosts?.message });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getPosts();
    }, 10);
  }, []);

  return {
    datasUser,
    loading,
    dataPosts,
  };
};
