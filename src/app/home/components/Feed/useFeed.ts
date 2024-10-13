import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuthContext } from "@/context/auth";
import { PostsService } from "@/services/posts";

let totalPage: number | null = null;

export const useFeed = () => {
  const { datasUser } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [dataPosts, setDataPosts] = useState<PostsUserProps[]>([]);
  const [pageFeed, setPageFeed] = useState<number>(1);

  const getPosts = async (page: number) => {
    setLoading(true);
    const responsePosts = await PostsService.getPostsFeed(String(page));
    setLoading(false);

    if (responsePosts?.status) {
      setDataPosts([...dataPosts, ...responsePosts.data.data]);
      totalPage = responsePosts?.data.meta.totalPages;
    } else {
      toast.error("Error", { description: responsePosts?.message });
    }
  };

  const handlePaginate = () => {
    setPageFeed(pageFeed + 1);

    const scroll = window.scrollY;

    setTimeout(() => {
      window.scroll({ top: scroll, behavior: "instant" });
    }, 100);
  };

  useEffect(() => {
    if (pageFeed === 1) {
      setTimeout(() => {
        getPosts(pageFeed);
      }, 10);
    } else {
      getPosts(pageFeed);
    }
  }, [pageFeed]);

  return {
    datasUser,
    loading,
    dataPosts,
    totalPage,
    pageFeed,
    setPageFeed,
    handlePaginate,
  };
};
