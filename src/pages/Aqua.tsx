import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const getPageTransition = (from: string | undefined) => {
    switch (from) {
        case 'aquarium':
            return {
                initial: {
                    opacity: 0,
                    scale: 0.8,
                    x: '100%'
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
        case 'map':
            return {
                initial: {
                    opacity: 0,
                    scale: 0.8,
                    y: '-100%'
                },
                animate: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                    }
                },
                exit: {
                    opacity: 0,
                    scale: 0.8,
                    y: '100%',
                    transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            };
        case 'river':
            return {
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
                    x: '100%',
                    transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            };
        default:
            // Transición por defecto (cuando entramos desde App.tsx - diagonal)
            return {
                initial: {
                    opacity: 0,
                    scale: 0.8,
                    x: '100%',
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
                },
                exit: {
                    opacity: 0,
                    scale: 0.8,
                    x: '-100%',
                    y: '-100%',
                    transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            };
    }
};

export function Aqua() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;
    const pageTransition = getPageTransition(from);
    const [hoverStates, setHoverStates] = useState({
        acuario: false,
        rios: false,
        mapa: false,
        logo: false
    });

    const handleNavigate = (path: string) => {
        navigate(path, { state: { from: 'aqua' } });
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                className="fixed inset-0 bg-black"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
            >
                <div className="w-full h-full relative">
                    {/* Logo central - hidden on mobile and tablet */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer transition-transform duration-300 hidden lg:block"
                        onClick={() => navigate('/')}
                        onHoverStart={() => setHoverStates(prev => ({ ...prev, logo: true }))}
                        onHoverEnd={() => setHoverStates(prev => ({ ...prev, logo: false }))}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-black bg-opacity-80 rounded-full flex items-center justify-center shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent rounded-full opacity-50" />
                            <img
                                src="/src/assets/logo/logo.svg"
                                alt="Logo Arapaima"
                                className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40"
                                style={{ filter: 'brightness(1)', transition: 'filter 0.3s ease' }}
                            />
                        </div>
                    </motion.div>

                    {/* Mobile and Tablet Layout - Stacked Rectangles */}
                    <div className="lg:hidden flex flex-col h-full">
                        {/* Logo Section */}
                        <motion.div 
                            className="h-16 w-full cursor-pointer"
                            onClick={() => navigate('/')}
                            onHoverStart={() => setHoverStates(prev => ({ ...prev, logo: true }))}
                            onHoverEnd={() => setHoverStates(prev => ({ ...prev, logo: false }))}
                            style={{
                                background: 'linear-gradient(to bottom, #1a1a1a, #000000)',
                                filter: `brightness(${hoverStates.logo ? '100%' : '90%'})`,
                                transition: 'filter 0.5s ease'
                            }}
                        >
                            <div className="h-full flex items-center justify-center">
                                <img
                                    src="/src/assets/logo/logo.svg"
                                    alt="Logo Arapaima"
                                    className="w-32 h-32"
                                    style={{ filter: 'brightness(1)', transition: 'filter 0.3s ease' }}
                                />
                            </div>
                        </motion.div>

                        {/* Acuario Section */}
                        <motion.div 
                            className="h-[calc(100%-4rem)] w-full cursor-pointer"
                            onHoverStart={() => setHoverStates(prev => ({ ...prev, acuario: true }))}
                            onHoverEnd={() => setHoverStates(prev => ({ ...prev, acuario: false }))}
                            onClick={() => handleNavigate('/aquarium')}
                            style={{
                                backgroundImage: 'url("/src/assets/background/background-aquarium.png")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: `brightness(${hoverStates.acuario ? '100%' : '90%'})`,
                                transition: 'filter 0.5s ease'
                            }}
                        >
                            <div className="h-full flex items-center justify-center gap-4">
                                <img
                                    src={hoverStates.acuario ? "/src/assets/icons/fish_black.png" : "/src/assets/icons/fish.png"}
                                    alt="Icono Acuario"
                                    className="w-12 h-12"
                                />
                                <span className={`text-4xl font-bold ${hoverStates.acuario ? 'text-black' : 'text-white'}`}>
                                    ACUARIO
                                </span>
                            </div>
                        </motion.div>

                        {/* Rios Section */}
                        <motion.div 
                            className="h-[calc(100%-4rem)] w-full cursor-pointer"
                            onHoverStart={() => setHoverStates(prev => ({ ...prev, rios: true }))}
                            onHoverEnd={() => setHoverStates(prev => ({ ...prev, rios: false }))}
                            onClick={() => handleNavigate('/river')}
                            style={{
                                backgroundImage: 'url("/src/assets/background/background_river.svg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: `brightness(${hoverStates.rios ? '100%' : '90%'})`,
                                transition: 'filter 0.5s ease'
                            }}
                        >
                            <div className="h-full flex items-center justify-center gap-4">
                                <img
                                    src={hoverStates.rios ? "/src/assets/icons/river_black.png" : "/src/assets/icons/river.png"}
                                    alt="Icono Rios"
                                    className="w-12 h-12"
                                />
                                <span className={`text-4xl font-bold ${hoverStates.rios ? 'text-black' : 'text-white'}`}>
                                    RIOS
                                </span>
                            </div>
                        </motion.div>

                        {/* Mapa Section */}
                        <motion.div 
                            className="h-[calc(100%-4rem)] w-full cursor-pointer"
                            onHoverStart={() => setHoverStates(prev => ({ ...prev, mapa: true }))}
                            onHoverEnd={() => setHoverStates(prev => ({ ...prev, mapa: false }))}
                            onClick={() => handleNavigate('/map')}
                            style={{
                                backgroundImage: 'url("/src/assets/background/background-map.svg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: `brightness(${hoverStates.mapa ? '100%' : '90%'})`,
                                transition: 'filter 0.5s ease'
                            }}
                        >
                            <div className="h-full flex items-center justify-center gap-4">
                                <img
                                    src={hoverStates.mapa ? "/src/assets/icons/map_black.png" : "/src/assets/icons/map.png"}
                                    alt="Icono Mapa"
                                    className="w-12 h-12"
                                />
                                <span className={`text-4xl font-bold ${hoverStates.mapa ? 'text-black' : 'text-white'}`}>
                                    MAPA
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Desktop Layout - Original Design */}
                    <div className="hidden lg:block w-full h-full">
                        {/* Sección izquierda - Acuario */}
                        <motion.div 
                            className="absolute top-0 left-0 w-1/2 h-full group cursor-pointer"
                            onHoverStart={() => setHoverStates(prev => ({ ...prev, acuario: true }))}
                            onHoverEnd={() => setHoverStates(prev => ({ ...prev, acuario: false }))}
                            onClick={() => handleNavigate('/aquarium')}
                            style={{
                                backgroundImage: 'url("/src/assets/background/background-aquarium.png")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
                                filter: `brightness(${hoverStates.acuario ? '100%' : hoverStates.rios || hoverStates.mapa || hoverStates.logo ? '40%' : '100%'})`,
                                transition: 'filter 0.5s ease'
                            }}
                        >
                            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 translate-y-[-25%] md:translate-y-[-15%] lg:translate-y-0">
                                <motion.img
                                    src={hoverStates.acuario ? "/src/assets/icons/fish_black.png" : "/src/assets/icons/fish.png"}
                                    alt="Icono Acuario"
                                    className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-500 ${hoverStates.acuario ? 'filter-none scale-110' : 'brightness-0 invert'}`}
                                    style={{ transformOrigin: 'center' }}
                                />
                                <motion.span 
                                    className={`text-3xl md:text-4xl lg:text-6xl font-bold transition-all duration-500 ${hoverStates.acuario ? 'text-black scale-110' : 'text-white'}`}
                                    style={{ transformOrigin: 'center' }}
                                >
                                    ACUARIO
                                </motion.span>
                            </div>
                        </motion.div>
                        
                        {/* Sección derecha - Rios */}
                        <motion.div 
                            className="absolute top-0 right-0 w-1/2 h-full group cursor-pointer"
                            onHoverStart={() => setHoverStates(prev => ({ ...prev, rios: true }))}
                            onHoverEnd={() => setHoverStates(prev => ({ ...prev, rios: false }))}
                            onClick={() => handleNavigate('/river')}
                            style={{
                                backgroundImage: 'url("/src/assets/background/background_river.svg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 50%)",
                                filter: `brightness(${hoverStates.rios ? '100%' : hoverStates.acuario || hoverStates.mapa || hoverStates.logo ? '40%' : '100%'})`,
                                transition: 'filter 0.5s ease'
                            }}
                        >
                            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 translate-y-[-25%] md:translate-y-[-15%] lg:translate-y-0">
                                <motion.img
                                    src={hoverStates.rios ? "/src/assets/icons/river_black.png" : "/src/assets/icons/river.png"}
                                    alt="Icono Rios"
                                    className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-500 ${hoverStates.rios ? 'filter-none scale-110' : 'brightness-0 invert'}`}
                                    style={{ transformOrigin: 'center' }}
                                />
                                <motion.span 
                                    className={`text-3xl md:text-4xl lg:text-6xl font-bold transition-all duration-500 ${hoverStates.rios ? 'text-black scale-110' : 'text-white'}`}
                                    style={{ transformOrigin: 'center' }}
                                >
                                    RIOS
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Sección central (abajo) - Mapa */}
                        <motion.div 
                            className="absolute bottom-0 left-0 w-full h-1/2 group cursor-pointer"
                            onHoverStart={() => setHoverStates(prev => ({ ...prev, mapa: true }))}
                            onHoverEnd={() => setHoverStates(prev => ({ ...prev, mapa: false }))}
                            onClick={() => handleNavigate('/map')}
                            style={{
                                backgroundImage: 'url("/src/assets/background/background-map.svg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                clipPath: "polygon(50% 0%, 0 100%, 100% 100%)",
                                filter: `brightness(${hoverStates.mapa ? '100%' : hoverStates.acuario || hoverStates.rios || hoverStates.logo ? '40%' : '100%'})`,
                                transition: 'filter 0.5s ease'
                            }}
                        >
                            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                                <motion.img
                                    src={hoverStates.mapa ? "/src/assets/icons/map_black.png" : "/src/assets/icons/map.png"}
                                    alt="Icono Mapa"
                                    className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-500 ${hoverStates.mapa ? 'filter-none scale-110' : 'brightness-0 invert'}`}
                                    style={{ transformOrigin: 'center' }}
                                />
                                <motion.span 
                                    className={`text-3xl md:text-4xl lg:text-6xl font-bold transition-all duration-500 ${hoverStates.mapa ? 'text-black scale-110' : 'text-white'}`}
                                    style={{ transformOrigin: 'center' }}
                                >
                                    MAPA
                                </motion.span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}