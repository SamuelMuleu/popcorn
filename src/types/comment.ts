import { Timestamp } from "firebase/firestore";

export interface Comment {
    id: string;
    contentId: number;
    contentType: "movie" | "episode";
    seriesId?: number;
    season?: number;
    episode?: number;
    userId: string;
    userName: string;
    userPhoto: string;
    comment: string;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
    likes?: number;
}
