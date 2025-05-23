import forumData from '@/data/forumData.json';
import { EventEmitter } from 'events';

// Definición de tipos
export interface Comment {
    id: number;
    author: string;
    content: string;
    createdAt: string;
    replies?: Comment[];
}

export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    authorAvatar?: string;
    createdAt: string;
    upvotes: number;
    downvotes: number;
    comments: Comment[];
    label: string;
    image?: string;
}

export interface ForumData {
    posts: Post[];
}

// Evento personalizado para cambios en el foro
const FORUM_CHANGE_EVENT = 'forumDataChange';
const forumEventEmitter = new EventTarget();

// Tipo personalizado para el evento del foro
interface ForumChangeEvent extends CustomEvent<ForumData> {
    detail: ForumData;
}

// Almacenamiento de votos del usuario
interface UserVotes {
    [postId: number]: 'up' | 'down' | null;
}

// Datos en memoria
let currentData: ForumData;
let userVotes: UserVotes = {};

// Cargar votos del usuario del localStorage
try {
    const savedVotes = localStorage.getItem('userVotes');
    if (savedVotes) {
        userVotes = JSON.parse(savedVotes);
    }
} catch (error) {
    console.error('Error al cargar votos guardados:', error);
}

// Inicializar con datos del localStorage si existen, sino usar el JSON
const savedData = localStorage.getItem('forumData');
if (savedData) {
    try {
        currentData = JSON.parse(savedData);
    } catch (error) {
        console.error('Error al cargar datos guardados:', error);
        currentData = { ...forumData };
    }
} else {
    currentData = { ...forumData };
}

// Función para obtener los datos actuales
export function getForumData(): ForumData {
    return currentData;
}

// Función para actualizar los datos del foro
export function updateForumData(newData: ForumData): void {
    currentData = newData;
    localStorage.setItem('forumData', JSON.stringify(newData));
    notifySubscribers();
}

// Función para obtener los votos del usuario
export function getUserVotes(): UserVotes {
    return { ...userVotes };
}

// Función para votar en un post
export function votePost(postId: number, voteType: 'up' | 'down' | null): boolean {
    try {
        const currentVote = userVotes[postId];
        const data = getForumData();
        const post = data.posts.find(p => p.id === postId);
        
        if (!post) return false;

        // Si el voto es el mismo que el actual, lo quitamos
        if (currentVote === voteType) {
            // Revertir el voto anterior
            if (currentVote === 'up') {
                post.upvotes = Math.max(0, post.upvotes - 1);
            } else if (currentVote === 'down') {
                post.downvotes = Math.max(0, post.downvotes - 1);
            }
            userVotes[postId] = null;
        } else {
            // Si hay un voto previo diferente, primero lo quitamos
            if (currentVote === 'up') {
                post.upvotes = Math.max(0, post.upvotes - 1);
            } else if (currentVote === 'down') {
                post.downvotes = Math.max(0, post.downvotes - 1);
            }

            // Aplicar el nuevo voto
            if (voteType === 'up') {
                post.upvotes++;
                userVotes[postId] = 'up';
            } else if (voteType === 'down') {
                post.downvotes++;
                userVotes[postId] = 'down';
            } else {
                userVotes[postId] = null;
            }
        }

        // Guardar los cambios
        updateForumData(data);
        localStorage.setItem('userVotes', JSON.stringify(userVotes));

        // Notificar a los suscriptores
        notifySubscribers();
        
        return true;
    } catch (error) {
        console.error('Error al votar:', error);
        return false;
    }
}

// Suscripción a cambios
let subscribers: ((data: ForumData) => void)[] = [];

export function subscribeToForumChanges(callback: (data: ForumData) => void) {
    subscribers.push(callback);
    return () => {
        subscribers = subscribers.filter(cb => cb !== callback);
    };
}

// Notificar a los suscriptores
function notifySubscribers() {
    subscribers.forEach(callback => callback(currentData));
}

 