import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import articles from '@/data/data.json';
import { useState } from 'react';
import { MobileMenu } from './components/MobileMenu';

const pageTransition = {
    initial: {
        x: '100%',
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        x: '100%',
        opacity: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
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

export function ArticleDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const article = articles[parseInt(id || '0')];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingUrl, setPendingUrl] = useState('');

    const handleBack = () => {
        navigate('/culture', { state: { from: 'article-detail' } });
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setPendingUrl(e.currentTarget.href);
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

    if (!article) {
        return <p>Artículo no encontrado</p>;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="article-detail"
                className="fixed inset-0"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
            >
                <motion.div
                    className="relative w-full h-full flex flex-col text-white"
                    style={{
                        backgroundImage: "url('/src/assets/background/background-culture.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Contenido principal con scroll */}
                    <div className="relative flex-1 overflow-y-auto pt-24 md:pt-36 custom-scrollbar-blue">
                        <div className="w-full max-w-4xl mx-auto px-4 md:px-8 pb-8">
                            <div className="bg-black/20 backdrop-blur-sm md:rounded-xl overflow-hidden">
                                <div className="flex flex-col">
                                    {/* Título */}
                                    <div className="px-6 md:px-8 pt-6 md:pt-8">
                                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">{article.title}</h1>
                                    </div>

                                    {/* Imágenes */}
                                    <div className="mt-6 md:mt-8 px-4 md:px-8">
                                        {article.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative w-full mb-6 md:mb-8 last:mb-0"
                                            >
                                                <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
                                                    <div className="relative w-full pb-[75%] md:pb-[56.25%] bg-black/20">
                                                        <img
                                                            src={image}
                                                            alt={`Imagen ${index + 1}`}
                                                            className="absolute inset-0 w-full h-full object-contain md:object-cover"
                                                            style={{
                                                                objectFit: 'cover',
                                                                objectPosition: 'center'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Contenido */}
                                    <div className="px-6 md:px-8 py-6 md:py-8">
                                        <div className="prose prose-lg md:prose-xl prose-invert max-w-none">
                                            {article.content.split('\n').map((paragraph, index) => (
                                                <p key={index} className="text-base md:text-lg lg:text-xl leading-relaxed mb-6 last:mb-0">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>

                                        {/* Fuente */}
                                        <div className="mt-8 md:mt-10">
                                            <motion.a
                                                href={article.url}
                                                onClick={handleLinkClick}
                                                className="block w-full bg-white/10 px-6 py-4 md:py-5 rounded-lg text-white text-center text-sm md:text-base font-medium hover:bg-white/20 transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                Leer más en la fuente original
                                            </motion.a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Barra superior con logo - Ahora fixed */}
                    <div className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-md z-50 py-3 md:py-5">
                        <div className="flex items-center px-4 md:px-8">
                            {/* Contenedor del ícono y título */}
                            <div className="flex items-center gap-3 flex-1">
                                <motion.div 
                                    className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                                    variants={iconAnimation}
                                >
                                    <img 
                                        src="/src/assets/icons/culture.png"
                                        alt="Culture Icon"
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                                <motion.h2 
                                    className="text-2xl md:text-3xl font-bold text-white md:block hidden"
                                    variants={pageIndicatorAnimation}
                                >
                                    Cultura
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
                                    className="w-60 h-auto"
                                    style={{ userSelect: 'none' }}
                                />
                            </motion.div>

                            {/* Botón de volver para desktop */}
                            <div className="flex-1 justify-end hidden md:flex">
                                <motion.div
                                    className="flex items-center gap-4 cursor-pointer"
                                    onClick={handleBack}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    <img
                                        src="/src/assets/icons/back.png"
                                        alt="Volver"
                                        className="w-12 h-12"
                                    />
                                    <span className="text-white text-xl">Volver</span>
                                </motion.div>
                            </div>

                            {/* Menú móvil */}
                            <div className="md:hidden">
                                <MobileMenu onNavigateBack={handleBack} />
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
                                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md p-4 md:p-6 rounded-xl z-50 w-[calc(100%-2rem)] md:w-[400px] max-w-[400px]"
                                >
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">¿Deseas salir de la página?</h3>
                                    <p className="text-sm md:text-base text-white/80 mb-4">
                                        Estás a punto de navegar a un sitio externo. ¿Deseas continuar?
                                    </p>
                                    <div className="flex gap-3 justify-end">
                                        <motion.button
                                            onClick={handleCancel}
                                            className="px-4 py-2 rounded-lg bg-white/10 text-sm md:text-base text-white hover:bg-white/20 transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Cancelar
                                        </motion.button>
                                        <motion.button
                                            onClick={handleConfirm}
                                            className="px-4 py-2 rounded-lg bg-blue-500 text-sm md:text-base text-white hover:bg-blue-600 transition-colors"
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