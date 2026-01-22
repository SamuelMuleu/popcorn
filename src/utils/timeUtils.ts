import { Timestamp } from "firebase/firestore";

export function getRelativeTime(timestamp: Timestamp | undefined): string {
    if (!timestamp) return "agora";

    const now = new Date();
    const date = timestamp.toDate();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return "agora";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `há ${minutes} minuto${minutes > 1 ? "s" : ""}`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `há ${hours} hora${hours > 1 ? "s" : ""}`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `há ${days} dia${days > 1 ? "s" : ""}`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `há ${weeks} semana${weeks > 1 ? "s" : ""}`;

    const months = Math.floor(days / 30);
    return `há ${months} ${months > 1 ? "meses" : "mês"}`;
}
