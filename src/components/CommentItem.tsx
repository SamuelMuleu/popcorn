"use client";

import { useState } from "react";
import Image from "next/image";
import { Comment } from "@/types/comment";
import { getRelativeTime } from "@/utils/timeUtils";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";

interface CommentItemProps {
    comment: Comment;
    currentUserId: string | undefined;
    onEdit: (commentId: string, newText: string) => Promise<void>;
    onDelete: (commentId: string) => Promise<void>;
}

export default function CommentItem({
    comment,
    currentUserId,
    onEdit,
    onDelete,
}: CommentItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.comment);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const isOwnComment = currentUserId === comment.userId;

    const handleSaveEdit = async () => {
        if (!editText.trim()) return;
        setIsSaving(true);
        try {
            await onEdit(comment.id, editText.trim());
            setIsEditing(false);
        } catch (error) {
            console.error("Erro ao editar:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Tem certeza que deseja deletar este comentário?")) return;
        setIsDeleting(true);
        try {
            await onDelete(comment.id);
        } catch (error) {
            console.error("Erro ao deletar:", error);
            setIsDeleting(false);
        }
    };

    const handleCancelEdit = () => {
        setEditText(comment.comment);
        setIsEditing(false);
    };

    return (
        <div className="flex gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <Image
                    src={comment.userPhoto || "/default-avatar.png"}
                    alt={comment.userName}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            </div>

            {/* Conteúdo */}
            <div className="flex-1 min-w-0">
                {/* Cabeçalho */}
                <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{comment.userName}</span>
                        <span className="text-xs text-gray-400">
                            {getRelativeTime(comment.createdAt)}
                            {comment.updatedAt && " (editado)"}
                        </span>
                    </div>

                    {/* Botões de ação */}
                    {isOwnComment && !isEditing && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-gray-400 hover:text-green-400 transition-colors p-1"
                                aria-label="Editar"
                            >
                                <MdEdit size={18} />
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="text-gray-400 hover:text-red-400 transition-colors p-1 disabled:opacity-50"
                                aria-label="Deletar"
                            >
                                <MdDelete size={18} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Texto do comentário */}
                {isEditing ? (
                    <div className="space-y-2">
                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full p-2 bg-gray-700 text-white rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={3}
                            maxLength={500}
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleSaveEdit}
                                disabled={isSaving || !editText.trim()}
                                className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors disabled:opacity-50"
                            >
                                <MdCheck size={16} />
                                Salvar
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                disabled={isSaving}
                                className="flex items-center gap-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm transition-colors"
                            >
                                <MdClose size={16} />
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-200 whitespace-pre-wrap break-words">
                        {comment.comment}
                    </p>
                )}
            </div>
        </div>
    );
}
