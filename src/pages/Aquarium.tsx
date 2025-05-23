import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { MobileMenu } from './components/MobileMenu';
import fishes from '@/data/fishes.json';
import './Aquarium.css';

const pageTransition = {
    initial: {
        opacity: 0,
        scale: 0.8,
        x: '-100%'
    },
    animate: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        x: '-100%',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const overlayTransition = {
    initial: {
        background: 'radial-gradient(circle at bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        opacity: 0
    },
    animate: {
        background: 'radial-gradient(circle at bottom right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)',
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

const fishVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
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

// Generar las letras del alfabeto que tienen peces asociados
const getAvailableLetters = (fishes: any[]) => {
    const letters = new Set(fishes.map(fish => fish.name.charAt(0).toUpperCase()));
    return ['Todos', ...Array.from(letters).sort()];
};

export function Aquarium() {
    const navigate = useNavigate();
    const [currentFishIndex, setCurrentFishIndex] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [selectedLetter, setSelectedLetter] = useState('Todos');

    // Obtener letras disponibles
    const availableLetters = useMemo(() => getAvailableLetters(fishes), []);

    // Filtrado de peces por letra inicial
    const filteredFishes = useMemo(() => {
        if (selectedLetter === 'Todos') return fishes;
        return fishes.filter((fish) => 
            fish.name.toUpperCase().startsWith(selectedLetter)
        );
    }, [selectedLetter]);

    const currentFish = filteredFishes[currentFishIndex];

    useEffect(() => {
        setIsFirstRender(false);
        setCurrentFishIndex(0); // Resetear el índice cuando cambia el filtro
    }, [selectedLetter]);

    const handlePreviousFish = () => {
        setCurrentFishIndex((prevIndex) =>
            prevIndex === 0 ? filteredFishes.length - 1 : prevIndex - 1
        );
    };

    const handleNextFish = () => {
        setCurrentFishIndex((prevIndex) =>
            prevIndex === filteredFishes.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleNavigateBack = () => {
        navigate('/aqua', { state: { from: 'aquarium' } });
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                handlePreviousFish();
            } else if (event.key === 'ArrowRight') {
                handleNextFish();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="fixed inset-0"
                initial="initial"
                animate="animate"
                exit="exit"
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
                    className="relative w-full h-full flex flex-col text-white"
                    variants={contentAnimation}
                    style={{
                        backgroundImage: "url('/src/assets/background/background-aquarium.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Barra superior con ícono, título y logo */}
                    <div className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-sm z-50 py-2 md:py-5">
                        <div className="flex items-center px-4 md:px-8">
                            <div className="flex items-center gap-2 md:gap-3 flex-1">
                                <motion.div 
                                    className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center"
                                    variants={iconAnimation}
                                >
                                    <img 
                                        src="/src/assets/icons/fish.png"
                                        alt="Fish Icon"
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                                <motion.h2 
                                    className="text-xl md:text-3xl font-bold text-white"
                                    variants={pageIndicatorAnimation}
                                >
                                    Acuario
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

                            {/* Botón de volver para desktop y menú móvil */}
                            <div className="flex-1 flex justify-end">
                                <motion.div
                                    className="hidden md:flex items-center gap-2 cursor-pointer group"
                                    onClick={handleNavigateBack}
                                >
                                    <motion.img
                                        src="/src/assets/icons/arrow-left.svg"
                                        alt="Volver"
                                        className="w-8 h-8 transition-transform group-hover:-translate-x-1"
                                    />
                                    <span className="text-white text-xl">Volver</span>
                                </motion.div>
                                <div className="md:hidden">
                                    <MobileMenu onNavigateBack={handleNavigateBack} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filtro alfabético */}
                    <motion.div 
                        className="fixed top-20 md:top-32 left-0 right-0 z-40"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="flex justify-start md:justify-center gap-1 md:gap-2 overflow-x-auto pb-2 px-2 md:px-4">
                            {availableLetters.map((letter) => (
                                <motion.button
                                    key={letter}
                                    className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap
                                        ${selectedLetter === letter 
                                            ? 'bg-white text-black shadow-lg' 
                                            : 'bg-black/30 text-white hover:bg-black/50 hover:shadow-md'}`}
                                    onClick={() => setSelectedLetter(letter)}
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {letter}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contenedor centralizado */}
                    <div className="flex-1 flex items-center justify-center px-4 md:px-8 mt-32 md:mt-44 mb-8">
                        <div className="w-full md:w-[80%] lg:w-[60%] mx-auto flex flex-col items-center justify-start text-center h-[calc(100vh-180px)] md:h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {filteredFishes.length > 0 ? (
                                    <motion.div
                                        key={currentFishIndex}
                                        variants={fishVariants}
                                        initial={isFirstRender ? false : "initial"}
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col items-center bg-black/20 backdrop-blur-sm p-4 md:p-8 rounded-xl w-full my-4"
                                    >
                                        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">{currentFish.name}</h1>
                                        <p className="text-base md:text-lg mb-4 md:mb-8">{currentFish.data}</p>
                                        
                                        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:mb-8">
                                            {Object.entries(currentFish.characteristics).map(([key, value]) => (
                                                <motion.div
                                                    key={key}
                                                    className="bg-gray-800/60 p-2 rounded-md shadow-md text-xs md:text-sm"
                                                    whileHover={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                        scale: 1.05
                                                    }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <strong>{key}:</strong> {value}
                                                </motion.div>
                                            ))}
                                        </div>

                                        <img
                                            src={currentFish.image}
                                            alt={currentFish.name}
                                            className="w-full md:w-125 h-48 md:h-80 object-cover rounded-lg mt-4 md:mt-8"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center bg-black/20 backdrop-blur-sm p-4 md:p-8 rounded-xl w-full my-4"
                                    >
                                        <h2 className="text-xl md:text-2xl font-bold text-white">No hay peces que empiecen con la letra {selectedLetter}</h2>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Flechas de navegación mejoradas */}
                    <motion.div
                        className="absolute left-4 md:left-8 lg:left-32 top-1/2 transform -translate-y-1/2 cursor-pointer z-20 bg-black/30 p-2 md:p-4 rounded-full backdrop-blur-sm hover:bg-black/50 transition-all"
                        onClick={handlePreviousFish}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <motion.img
                            src="/src/assets/icons/arrow-left.svg"
                            alt="Flecha izquierda"
                            className="w-8 h-8 md:w-12 md:h-12"
                            whileHover={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.img
                            src="/src/assets/icons/arrow-left-hover.svg"
                            alt="Flecha izquierda hover"
                            className="w-8 h-8 md:w-12 md:h-12 absolute top-2 left-2 md:top-4 md:left-4"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute right-4 md:right-8 lg:right-32 top-1/2 transform -translate-y-1/2 cursor-pointer z-20 bg-black/30 p-2 md:p-4 rounded-full backdrop-blur-sm hover:bg-black/50 transition-all"
                        onClick={handleNextFish}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <motion.img
                            src="/src/assets/icons/arrow-right.svg"
                            alt="Flecha derecha"
                            className="w-8 h-8 md:w-12 md:h-12"
                            whileHover={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.img
                            src="/src/assets/icons/arrow-right-hover.svg"
                            alt="Flecha derecha hover"
                            className="w-8 h-8 md:w-12 md:h-12 absolute top-2 left-2 md:top-4 md:left-4"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}