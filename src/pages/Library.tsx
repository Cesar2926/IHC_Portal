import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLibraryData, subscribeToLibraryChanges, type LibraryData } from '@/services/libraryService';
import { MobileMenu } from './components/MobileMenu';


const pageTransition = {
    initial: {
        opacity: 0,
        scale: 0.8,
        x: '-100%',
        y: '100%'
    },
    animate: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const overlayTransition = {
    initial: {
        background: 'radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        opacity: 0
    },
    animate: {
        background: 'radial-gradient(circle at bottom left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)',
        opacity: 1,
        transition: {
            duration: 0.8,
            background: {
                delay: 0.2,
                duration: 0.6
            }
        }
    }
};

const contentAnimation = {
    initial: { opacity: 0 },
    animate: { 
        opacity: 1,
        transition: {
            duration: 0.3,
            delay: 0.3
        }
    }
};

const pageIndicatorAnimation = {
    initial: {
        x: 100,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const iconAnimation = {
    initial: {
        scale: 0,
        opacity: 0,
        rotate: -180
    },
    animate: {
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 0.5,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};


export function Library() {
    const navigate = useNavigate();
    const [libraryData, setLibraryData] = useState<LibraryData>(() => getLibraryData());
    const [centerBook, setCenterBook] = useState(libraryData.books[0]);
    const bottomCenterBook = libraryData.books[0];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingUrl, setPendingUrl] = useState('');

    // Suscribirse a cambios en los datos de la biblioteca
    useEffect(() => {
        const unsubscribe = subscribeToLibraryChanges((newData) => {
            setLibraryData(newData);
        });

        return () => unsubscribe();
    }, []);

    // Dividimos los libros en tres secciones
    const leftBooks = libraryData.books.slice(1, 5);
    const rightBooks = libraryData.books.slice(5, 9);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        e.preventDefault();
        setPendingUrl(url);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        window.open(pendingUrl, '_blank');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setPendingUrl('');
    };

    const handleNavigateBack = () => {
        navigate('/');
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="fixed inset-0"
                initial="initial"
                animate="animate"
                variants={pageTransition}
                style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                }}
            >
                <motion.div
                    className="absolute inset-0"
                    variants={overlayTransition}
                />
                
                <motion.div
                    className="relative w-full h-full flex flex-col items-center justify-start text-white"
                    variants={contentAnimation}
                    style={{
                        backgroundImage: "url('/src/assets/background/background-library.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        overflow: 'hidden'
                    }}
                >
                    {/* Barra superior con ícono y título */}
                    <div className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-sm z-50 py-2 md:py-5">
                        <div className="flex items-center px-4 md:px-8">
                            <div className="flex items-center gap-2 md:gap-3 flex-1">
                                <motion.div 
                                    className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center"
                                    variants={iconAnimation}
                                >
                                    <img 
                                        src="/src/assets/icons/library.png"
                                        alt="Library Icon"
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                                <motion.h2 
                                    className="text-xl md:text-3xl font-bold text-white"
                                    variants={pageIndicatorAnimation}
                                >
                                    Biblioteca
                                </motion.h2>
                            </div>

                            <motion.div
                                className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer hidden md:block"
                                onClick={() => navigate('/')}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                <img
                                    src="/src/assets/logo/logo.svg"
                                    alt="Logo"
                                    className="w-40 md:w-60 h-auto"
                                />
                            </motion.div>

                            {/* Menú móvil */}
                            <div className="flex-1 flex justify-end">
                                <MobileMenu onNavigateBack={handleNavigateBack} />
                            </div>
                        </div>
                    </div>

                    {/* Contenido de la biblioteca */}
                    <div className="flex-1 w-full overflow-y-auto custom-scrollbar-blue">
                        <div className="flex flex-col items-center justify-center min-h-full pt-24 sm:pt-24 md:pt-36 pb-8 px-4 sm:px-5 md:px-8">
                            {/* Máscara superior central con sinopsis */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-4 md:gap-8 my-4 sm:my-4 md:my-8">
                                {/* Máscara superior central */}
                                <motion.div
                                    className="relative w-[300px] h-[300px] sm:w-[280px] sm:h-[280px] md:w-[500px] md:h-[500px]"
                                    layout
                                    initial={{ x: 0, rotate: 0 }}
                                    animate={{ x: 0, rotate: 0 }}
                                    transition={{ duration: 0.5 }}
                                    key={centerBook.title}
                                >
                                    <svg className="w-full h-full">
                                        <defs>
                                            <mask id="mask-library">
                                                <image
                                                    href="/src/assets/icons/mask-library.svg"
                                                    width="100%"
                                                    height="100%"
                                                    preserveAspectRatio="xMidYMid meet"
                                                />
                                            </mask>
                                        </defs>
                                        <image
                                            href={centerBook.images[0]}
                                            width="100%"
                                            height="100%"
                                            preserveAspectRatio="xMidYMid slice"
                                            mask="url(#mask-library)"
                                        />
                                    </svg>
                                </motion.div>

                                {/* Contenedor de la sinopsis */}
                                <div className="w-full sm:w-[280px] md:w-[350px] text-left bg-black/20 backdrop-blur-sm p-4 sm:p-4 md:p-6 rounded-xl">
                                    <h2 className="text-xl sm:text-xl md:text-2xl font-bold mb-2 sm:mb-2 md:mb-4">{centerBook.title}</h2>
                                    <p className="text-base sm:text-sm md:text-lg leading-relaxed mb-4">
                                        {centerBook.content || 'Sinopsis no disponible.'}
                                    </p>
                                    <motion.a
                                        href={centerBook.url}
                                        onClick={(e) => handleLinkClick(e, centerBook.url)}
                                        className="inline-block bg-white/10 px-4 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 rounded-lg text-white text-base sm:text-sm md:text-lg font-bold hover:bg-white/20 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Leer más
                                    </motion.a>
                                </div>
                            </div>

                            {/* Contenedor principal para la librería */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 md:gap-16 bg-black/20 backdrop-blur-sm p-4 sm:p-4 md:p-8 rounded-xl w-full">
                                {/* Contenedor izquierdo */}
                                <div className="grid grid-cols-2 gap-4 sm:gap-3 md:gap-8">
                                    {leftBooks.map((book, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative w-[120px] h-[160px] sm:w-[110px] sm:h-[140px] md:w-[180px] md:h-[220px] cursor-pointer"
                                            onClick={() => setCenterBook(book)}
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                        >
                                            <svg className="w-full h-full">
                                                <defs>
                                                    <mask id={`mask-left-${index}`}>
                                                        <image
                                                            href="/src/assets/icons/library-left.svg"
                                                            width="100%"
                                                            height="100%"
                                                            preserveAspectRatio="xMidYMid meet"
                                                        />
                                                    </mask>
                                                </defs>
                                                <image
                                                    href={book.images[0]}
                                                    width="100%"
                                                    height="100%"
                                                    preserveAspectRatio="xMidYMid slice"
                                                    mask={`url(#mask-left-${index})`}
                                                />
                                            </svg>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Elemento central inferior */}
                                <motion.div
                                    className="relative w-[200px] h-[300px] sm:w-[180px] sm:h-[280px] md:w-[300px] md:h-[500px] cursor-pointer"
                                    onClick={() => setCenterBook(bottomCenterBook)}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    <svg className="w-full h-full">
                                        <defs>
                                            <mask id="mask-center">
                                                <image
                                                    href="/src/assets/icons/library-center.svg"
                                                    width="100%"
                                                    height="100%"
                                                    preserveAspectRatio="xMidYMid meet"
                                                />
                                            </mask>
                                        </defs>
                                        <image
                                            href={bottomCenterBook.images[0]}
                                            width="100%"
                                            height="100%"
                                            preserveAspectRatio="xMidYMid slice"
                                            mask="url(#mask-center)"
                                        />
                                    </svg>
                                </motion.div>

                                {/* Contenedor derecho */}
                                <div className="grid grid-cols-2 gap-4 sm:gap-3 md:gap-8">
                                    {rightBooks.map((book, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative w-[120px] h-[160px] sm:w-[110px] sm:h-[140px] md:w-[180px] md:h-[220px] cursor-pointer"
                                            onClick={() => setCenterBook(book)}
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                        >
                                            <svg className="w-full h-full">
                                                <defs>
                                                    <mask id={`mask-right-${index}`}>
                                                        <image
                                                            href="/src/assets/icons/library-right.svg"
                                                            width="100%"
                                                            height="100%"
                                                            preserveAspectRatio="xMidYMid meet"
                                                        />
                                                    </mask>
                                                </defs>
                                                <image
                                                    href={book.images[0]}
                                                    width="100%"
                                                    height="100%"
                                                    preserveAspectRatio="xMidYMid slice"
                                                    mask={`url(#mask-right-${index})`}
                                                />
                                            </svg>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal de confirmación */}
                    <AnimatePresence>
                        {isModalOpen && (
                            <>
                                {/* Overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                                    onClick={handleCancel}
                                />
                                
                                {/* Modal */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md p-4 sm:p-4 md:p-8 rounded-xl z-50 w-[90%] max-w-[400px]"
                                >
                                    <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-white mb-4">¿Deseas salir de la página?</h3>
                                    <p className="text-white/80 mb-6 text-sm sm:text-sm md:text-base">
                                        Estás a punto de navegar a un sitio externo. ¿Deseas continuar?
                                    </p>
                                    <div className="flex gap-4 justify-end">
                                        <motion.button
                                            onClick={handleCancel}
                                            className="px-4 sm:px-4 md:px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm sm:text-sm md:text-base"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Cancelar
                                        </motion.button>
                                        <motion.button
                                            onClick={handleConfirm}
                                            className="px-4 sm:px-4 md:px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm sm:text-sm md:text-base"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Continuar
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}