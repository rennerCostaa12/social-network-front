"use client";

import { Loader2 } from "lucide-react";

import { CardProfileUsers } from "../CardProfileUsers";
import { useUsersSearch } from "./useUsersSearch";
import { Button } from "../ui/button";

export const UsersSearch = () => {
  const { listUsers, handlePaginate, totalPage, pageUsers, loading } =
    useUsersSearch();

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {loading && <Loader2 className="h-10 w-10 animate-spin" />}

        {listUsers?.length === 0 && !loading && (
          <h1 className="text-2xl mt-8">Nehuma pessoa encontrada</h1>
        )}
        {listUsers?.length > 0 &&
          !loading &&
          listUsers.map((value) => (
            <CardProfileUsers
              key={value.id}
              id={value.id}
              name={value.name}
              username={value.username}
              description={value.description ?? ""}
              followers={value.followerCount}
              following={value.followingCount}
              gender={value.gender}
              url_img={value.photo_profile}
              isFollowing={value.isFollowing}
            />
          ))}
      </div>

      {pageUsers < (totalPage as number) && (
        <div className="flex justify-center my-4">
          <Button onClick={handlePaginate} loading={loading}>
            Carregar Mais
          </Button>
        </div>
      )}
    </div>
  );
};
