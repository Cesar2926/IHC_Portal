import libraryData from '@/data/library.json';

// Definición de tipos
export interface Book {
    url: string;
    title: string;
    content: string;
    autor: string;
    images: string[];
    label: string;
}

export interface LibraryData {
    books: Book[];
}

// Evento personalizado para cambios en la biblioteca
const LIBRARY_CHANGE_EVENT = 'libraryDataChange';
const libraryEventEmitter = new EventTarget();

// Tipo personalizado para el evento de la biblioteca
interface LibraryChangeEvent extends CustomEvent<LibraryData> {
    detail: LibraryData;
}

// Datos en memoria
let currentData: LibraryData = {
    books: libraryData
};

// Función para obtener los datos actuales
export function getLibraryData(): LibraryData {
    return currentData;
}

// Función para actualizar los datos
export function updateLibraryData(newData: LibraryData): boolean {
    currentData = newData;
    
    // Disparar evento de cambio
    const event = new CustomEvent<LibraryData>(LIBRARY_CHANGE_EVENT, { detail: currentData });
    libraryEventEmitter.dispatchEvent(event);
    
    return true;
}

// Función para suscribirse a cambios
export function subscribeToLibraryChanges(callback: (data: LibraryData) => void) {
    const handler = (event: Event) => {
        if (event instanceof CustomEvent) {
            const libraryEvent = event as LibraryChangeEvent;
            callback(libraryEvent.detail);
        }
    };
    
    libraryEventEmitter.addEventListener(LIBRARY_CHANGE_EVENT, handler);
    return () => libraryEventEmitter.removeEventListener(LIBRARY_CHANGE_EVENT, handler);
} 