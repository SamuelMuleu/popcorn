import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    getDocs,
    onSnapshot,
    serverTimestamp,
    Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Comment } from "@/types/comment";

export interface AddCommentData {
    contentId: number;
    contentType: "movie" | "episode";
    seriesId?: number;
    season?: number;
    episode?: number;
    userId: string;
    userName: string;
    userPhoto: string;
    comment: string;
}

export async function addComment(data: AddCommentData): Promise<void> {
    await addDoc(collection(db, "comments"), {
        ...data,
        createdAt: serverTimestamp(),
        likes: 0,
    });
}

export async function updateComment(
    commentId: string,
    newText: string
): Promise<void> {
    await updateDoc(doc(db, "comments", commentId), {
        comment: newText,
        updatedAt: serverTimestamp(),
    });
}

export async function deleteComment(commentId: string): Promise<void> {
    await deleteDoc(doc(db, "comments", commentId));
}

export async function getComments(
    contentId: number,
    contentType: string,
    season?: number,
    episode?: number
): Promise<Comment[]> {
    let q = query(
        collection(db, "comments"),
        where("contentId", "==", contentId),
        where("contentType", "==", contentType)
    );

    // Para episódios, filtrar por season e episode também
    if (contentType === "episode" && season !== undefined && episode !== undefined) {
        q = query(
            collection(db, "comments"),
            where("contentId", "==", contentId),
            where("contentType", "==", contentType),
            where("season", "==", season),
            where("episode", "==", episode)
        );
    }

    q = query(q, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Comment[];
}

export function listenToComments(
    contentId: number,
    contentType: string,
    callback: (comments: Comment[]) => void,
    season?: number,
    episode?: number
): Unsubscribe {
    let q = query(
        collection(db, "comments"),
        where("contentId", "==", contentId),
        where("contentType", "==", contentType)
    );

    // Para episódios, filtrar por season e episode também
    if (contentType === "episode" && season !== undefined && episode !== undefined) {
        q = query(
            collection(db, "comments"),
            where("contentId", "==", contentId),
            where("contentType", "==", contentType),
            where("season", "==", season),
            where("episode", "==", episode)
        );
    }

    q = query(q, orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Comment[];
        callback(comments);
    });
}
