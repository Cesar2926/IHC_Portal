import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
    onNavigateBack: () => void;
}

export function MobileMenu({ onNavigateBack }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && 
                menuRef.current && 
                buttonRef.current && 
                !menuRef.current.contains(event.target as Node) && 
                !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const buttonVariants = {
        closed: {
            rotate: 0
        },
        open: {
            rotate: 180
        }
    };

    return (
        <>
            {/* Botón del menú hamburguesa */}
            <motion.button
                ref={buttonRef}
                className="relative z-[100] flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm md:hidden"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                variants={buttonVariants}
                animate={isOpen ? "open" : "closed"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <div className="flex items-center justify-center w-6 h-6">
                    <img
                        src="/src/assets/icons/burger-menu-svgrepo-com.svg"
                        alt={isOpen ? "Cerrar menú" : "Abrir menú"}
                        className="w-5 h-5 object-contain"
                    />
                </div>
            </motion.button>

            {/* Menú desplegable */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menú */}
                        <motion.div
                            ref={menuRef}
                            className="fixed top-0 right-0 w-64 h-full bg-black/[0.98] backdrop-blur-md border-l border-white/10 shadow-[-8px_0_15px_-3px_rgba(0,0,0,0.4)] z-[95]"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col gap-4 p-6">
                                {/* Logo */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex justify-center bg-black/95 p-4 rounded-lg backdrop-blur-sm"
                                >
                                    <img
                                        src="/src/assets/logo/logo.svg"
                                        alt="Logo"
                                        className="w-32 h-auto"
                                    />
                                </motion.div>

                                {/* Botón Volver */}
                                <motion.button
                                    className="flex items-center gap-3 text-white text-lg bg-black/95 hover:bg-black/80 rounded-lg p-3 transition-all duration-200 w-full"
                                    onClick={() => {
                                        setIsOpen(false);
                                        onNavigateBack();
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img
                                        src="/src/assets/icons/back.png"
                                        alt="Volver"
                                        className="w-6 h-6"
                                    />
                                    Volver
                                </motion.button>

                                {/* Botón Inicio */}
                                <motion.button
                                    className="flex items-center gap-3 text-white text-lg bg-black/95 hover:bg-black/80 rounded-lg p-3 transition-all duration-200 w-full"
                                    onClick={() => {
                                        setIsOpen(false);
                                        navigate('/');
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img
                                        src="/src/assets/icons/house-chimney-blank-svgrepo-com.svg"
                                        alt="Inicio"
                                        className="w-6 h-6 invert"
                                    />
                                    Inicio
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
} 