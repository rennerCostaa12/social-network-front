export interface CardProfileUsersProps {
    id: string;
    name: string;
    username: string;
    description: string;
    gender: string;
    followers: number;
    following: number;
    url_img: string | null;
    isFollowing: boolean;
}