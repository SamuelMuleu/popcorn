"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Comment } from "@/types/comment";
import CommentItem from "./CommentItem";
import {
    addComment,
    updateComment,
    deleteComment,
    listenToComments,
    AddCommentData,
} from "@/services/comments";
import { MdSend, MdComment } from "react-icons/md";

interface CommentsSectionProps {
    contentId: number;
    contentType: "movie" | "episode";
    seriesId?: number;
    season?: number;
    episode?: number;
}

export default function CommentsSection({
    contentId,
    contentType,
    seriesId,
    season,
    episode,
}: CommentsSectionProps) {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        if (!user) return;

        // Real-time listener para comentários
        const unsubscribe = listenToComments(
            contentId,
            contentType,
            setComments,
            season,
            episode
        );

        return () => unsubscribe();
    }, [contentId, contentType, season, episode, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const commentData: AddCommentData = {
                contentId,
                contentType,
                userId: user.uid,
                userName: user.displayName || "Usuário",
                userPhoto: user.photoURL || "",
                comment: newComment.trim(),
            };

            if (contentType === "episode" && seriesId !== undefined) {
                commentData.seriesId = seriesId;
                commentData.season = season;
                commentData.episode = episode;
            }

            await addComment(commentData);
            setNewComment("");
            setCharCount(0);
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
            alert("Erro ao enviar comentário. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = async (commentId: string, newText: string) => {
        await updateComment(commentId, newText);
    };

    const handleDelete = async (commentId: string) => {
        await deleteComment(commentId);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length <= 500) {
            setNewComment(text);
            setCharCount(text.length);
        }
    };

    if (!user) {
        return (
            <div className="bg-gray-800/30 rounded-lg p-6 text-center">
                <p className="text-gray-400">
                    Faça login para ver e deixar comentários
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Cabeçalho */}
            <div className="flex items-center gap-2">
                <MdComment className="text-green-500" size={24} />
                <h2 className="text-2xl font-semibold text-white">
                    Comentários ({comments.length})
                </h2>
            </div>

            {/* Form para novo comentário */}
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                    <textarea
                        value={newComment}
                        onChange={handleTextChange}
                        placeholder="Compartilhe sua opinião..."
                        className="w-full p-4 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                        rows={3}
                        maxLength={500}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {charCount}/500
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!newComment.trim() || isSubmitting}
                    className="flex items-center gap-2 px-6 py-2 bg-green-700 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <MdSend size={18} />
                    {isSubmitting ? "Enviando..." : "Enviar Comentário"}
                </button>
            </form>

            {/* Lista de comentários */}
            <div className="space-y-3">
                {comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        Seja o primeiro a comentar!
                    </div>
                ) : (
                    comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            currentUserId={user?.uid}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
