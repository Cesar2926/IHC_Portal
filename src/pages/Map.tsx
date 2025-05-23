import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { MobileMenu } from './components/MobileMenu';

// Tipos
type RegionData = {
    nombre: string;
    descripcion: string;
    historia: string;
    ph: string;
    temperatura: string;
    oxigenoDisuelto: string;
    turbidez: string;
    ubicacionesClave: { [key: string]: string };
    poblacionIndigena: {
        grupos: string[];
        descripcion: string;
    };
};

type RegionsData = {
    norte: RegionData;
    central: RegionData;
    sur: RegionData;
};

type RegionName = keyof RegionsData;

const pageTransition = {
    initial: {
        opacity: 0,
        scale: 0.8,
        y: '100%'
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

const mapContainerAnimation = {
    center: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    left: {
        x: -200,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
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

const tabContentAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
};

const DataPanel = ({ data }: { data: RegionData }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'historia' | 'ubicaciones' | 'indigenas'>('info');

    return (
        <motion.div
            className="bg-black/80 backdrop-blur-sm rounded-lg border border-[#b38f25]/30 p-4 md:p-6 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            key={data.nombre}
        >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{data.nombre}</h3>
            
            {/* Tabs de navegación */}
            <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
                {(['info', 'historia', 'ubicaciones', 'indigenas'] as const).map((tab) => (
                    <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 text-base md:text-lg ${
                            activeTab === tab
                                ? 'bg-[#b38f25] text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {tab === 'ubicaciones' ? 'Ubicaciones Clave' : 
                         tab === 'indigenas' ? 'Pueblos Indígenas' :
                         tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                ))}
            </div>

            {/* Contenido con altura adaptativa */}
            <div className="h-[40vh] md:h-[500px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
                <AnimatePresence mode="wait">
                    {activeTab === 'info' && (
                        <motion.div
                            key="info"
                            {...tabContentAnimation}
                        >
                            <p className="text-white/90 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">{data.descripcion}</p>
                            <div className="grid gap-3 md:gap-4">
                                <motion.div 
                                    className="bg-white/10 p-3 md:p-4 rounded-lg"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <span className="text-white/70 text-base md:text-lg">pH:</span>
                                    <span className="text-white ml-2 text-base md:text-lg">{data.ph}</span>
                                </motion.div>
                                <motion.div 
                                    className="bg-white/10 p-3 md:p-4 rounded-lg"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <span className="text-white/70 text-base md:text-lg">Temperatura:</span>
                                    <span className="text-white ml-2 text-base md:text-lg">{data.temperatura}</span>
                                </motion.div>
                                <motion.div 
                                    className="bg-white/10 p-3 md:p-4 rounded-lg"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <span className="text-white/70 text-base md:text-lg">Oxígeno Disuelto:</span>
                                    <span className="text-white ml-2 text-base md:text-lg">{data.oxigenoDisuelto}</span>
                                </motion.div>
                                <motion.div 
                                    className="bg-white/10 p-3 md:p-4 rounded-lg"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <span className="text-white/70 text-base md:text-lg">Turbidez:</span>
                                    <span className="text-white ml-2 text-base md:text-lg">{data.turbidez}</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'historia' && (
                        <motion.div
                            key="historia"
                            {...tabContentAnimation}
                        >
                            <p className="text-white/90 text-base md:text-lg leading-relaxed">{data.historia}</p>
                        </motion.div>
                    )}

                    {activeTab === 'ubicaciones' && (
                        <motion.div
                            key="ubicaciones"
                            {...tabContentAnimation}
                        >
                            <div className="space-y-3 md:space-y-4">
                                {Object.entries(data.ubicacionesClave).map(([location, description], index) => (
                                    <motion.div 
                                        key={location}
                                        className="bg-white/10 p-3 md:p-4 rounded-lg"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <h4 className="text-white font-bold mb-2 text-lg md:text-xl">{location}</h4>
                                        <p className="text-white/80 text-base md:text-lg">{description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'indigenas' && (
                        <motion.div
                            key="indigenas"
                            {...tabContentAnimation}
                        >
                            <div className="space-y-3 md:space-y-4">
                                <motion.div 
                                    className="bg-white/10 p-3 md:p-4 rounded-lg"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <h4 className="text-white font-bold mb-2 text-lg md:text-xl">Grupos Principales</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {data.poblacionIndigena.grupos.map((grupo, index) => (
                                            <motion.span 
                                                key={grupo}
                                                className="bg-[#b38f25]/20 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-base md:text-lg"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {grupo}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                                <motion.p 
                                    className="text-white/90 text-base md:text-lg leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {data.poblacionIndigena.descripcion}
                                </motion.p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export function Map() {
    const navigate = useNavigate();
    const [selectedRegion, setSelectedRegion] = useState<RegionName | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const handleNavigateBack = () => {
        navigate('/aqua', { state: { from: 'map' } });
    };

    // Manejador de clics fuera del mapa
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mapContainerRef.current && 
                !mapContainerRef.current.contains(event.target as Node) &&
                selectedRegion !== null) {
                // Verificar si el clic fue dentro del panel de información
                const clickedElement = event.target as HTMLElement;
                const isClickInsideInfoPanel = clickedElement.closest('.region-info-panel');
                
                if (!isClickInsideInfoPanel) {
                    setSelectedRegion(null);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedRegion]);

    const [regionData] = useState<RegionsData>({
        norte: {
            nombre: "Estado Delta Amacuro",
            descripcion: "Zona caracterizada por las llanuras costeras y los márgenes del río Orinoco. Área de gran importancia industrial y minera, donde se encuentra Ciudad Guayana, el principal centro urbano e industrial de la región.",
            historia: "La región norte de Guayana ha sido testigo de importantes acontecimientos históricos. Desde la llegada de los primeros exploradores europeos en el siglo XVI, atraídos por la leyenda de El Dorado, hasta el desarrollo industrial del siglo XX con la creación de la Corporación Venezolana de Guayana (CVG) en 1960. La construcción de la represa de Guri, una de las más grandes del mundo, marcó un hito en el desarrollo hidroeléctrico de la región.",
            ph: "6.5-7.5",
            temperatura: "25-28°C",
            oxigenoDisuelto: "7-9 mg/L",
            turbidez: "10-15 NTU",
            ubicacionesClave: {
                "Ciudad Guayana": "Principal centro urbano e industrial, formado por la unión de Puerto Ordaz y San Félix.",
                "Represa de Guri": "Una de las centrales hidroeléctricas más grandes del mundo, vital para el suministro energético del país.",
                "Puerto de Matanzas": "Terminal portuario crucial para la exportación de minerales y productos industriales.",
                "Parque Cachamay": "Importante área recreativa y turística con cascadas naturales del río Caroní."
            },
            poblacionIndigena: {
                grupos: ["Kariña", "Warao", "Pemón"],
                descripcion: "Las comunidades indígenas de la región norte mantienen una importante presencia a pesar del desarrollo industrial. Los Kariña y Warao han habitado tradicionalmente las zonas costeras y los caños del Delta, mientras que algunas comunidades Pemón se encuentran en las áreas más alejadas de los centros urbanos."
            }
        },
        central: {
            nombre: "Estado Bolívar",
            descripcion: "Planicie elevada con una altitud promedio de 1000m. Hogar de los majestuosos tepuyes, incluyendo el Monte Roraima y el Auyantepui, donde se encuentra el Salto Ángel, la caída de agua más alta del mundo.",
            historia: "La Gran Sabana, habitada ancestralmente por el pueblo Pemón, es una región de extraordinaria importancia geológica y cultural. Los tepuyes, formaciones rocosas que se elevan abruptamente sobre la sabana, tienen una antigüedad estimada de más de 2.000 millones de años. El Salto Ángel fue descubierto para el mundo occidental en 1933 por el aviador estadounidense Jimmie Angel, aunque los indígenas Pemón lo conocían como Kerepakupai Merú (Salto del punto más profundo).",
            ph: "6.8-7.8",
            temperatura: "26-30°C",
            oxigenoDisuelto: "6-8 mg/L",
            turbidez: "12-18 NTU",
            ubicacionesClave: {
                "Salto Ángel": "La cascada más alta del mundo, con una caída de agua de 979 metros.",
                "Monte Roraima": "El tepuy más alto y emblemático de la región, punto triple fronterizo entre Venezuela, Brasil y Guyana.",
                "Parque Nacional Canaima": "Patrimonio de la Humanidad por la UNESCO, hogar de numerosos tepuyes y cascadas.",
                "Santa Elena de Uairén": "Principal centro poblado y punto de entrada a la Gran Sabana."
            },
            poblacionIndigena: {
                grupos: ["Pemón", "Arekuna", "Kamarakoto", "Warao"],
                descripcion: "La Gran Sabana es territorio ancestral del pueblo Pemón y sus subgrupos Arekuna y Kamarakoto. Destaca también la presencia del pueblo Warao, conocidos como 'Gente de las Canoas', expertos navegantes y pescadores con profundo conocimiento de los ecosistemas acuáticos. Los Warao han desarrollado una extraordinaria adaptación a la vida en los deltas, reflejada en sus viviendas palafíticas y su cosmogonía. Estas comunidades mantienen una relación profunda con el territorio, siendo guardianes de los tepuyes y sitios sagrados."
            }
        },
        sur: {
            nombre: "Estado Amazonas",
            descripcion: "Zona de selva tropical y parte del escudo guayanés, con formaciones geológicas que datan de más de 2000 millones de años. Área de gran biodiversidad y reservas forestales importantes.",
            historia: "La región amazónica de Guayana es una de las áreas más antiguas y biodiversas del planeta. El escudo guayanés, formado hace más de 2.000 millones de años, representa una de las formaciones geológicas más antiguas de la Tierra. Esta región ha sido hogar de diversos pueblos indígenas como los Yanomami, quienes han desarrollado un profundo conocimiento de la selva y sus recursos. Durante el siglo XX, la región ganó atención internacional por sus recursos minerales y su importancia ecológica.",
            ph: "6.2-7.2",
            temperatura: "24-27°C",
            oxigenoDisuelto: "8-10 mg/L",
            turbidez: "8-13 NTU",
            ubicacionesClave: {
                "Puerto Ayacucho": "Capital del estado Amazonas y principal centro urbano de la región sur.",
                "Reserva Forestal Sipapo": "Importante área protegida que alberga una rica biodiversidad.",
                "Cerro Autana": "Tepuy sagrado para los pueblos indígenas, conocido como el 'Árbol de la Vida'.",
                "Parque Nacional Yapacana": "Área protegida que incluye el tepuy Yapacana y ecosistemas únicos."
            },
            poblacionIndigena: {
                grupos: ["Yanomami", "Ye'kuana", "Piaroa", "Hoti"],
                descripcion: "La región amazónica alberga una gran diversidad de pueblos indígenas, siendo los Yanomami uno de los grupos más numerosos. Estas comunidades mantienen en gran medida sus formas tradicionales de vida, basadas en la agricultura de conuco, la caza y la recolección. Su conocimiento del bosque tropical es invaluable para la conservación de la biodiversidad."
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="fixed inset-0"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
            >
                <motion.div
                    className="relative w-full h-full flex flex-col"
                    style={{
                        backgroundImage: "url('/src/assets/background/background-map.svg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Overlay oscuro */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Barra superior con ícono y título - Ahora fixed */}
                    <div className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-sm z-50 py-2 md:py-5">
                        <div className="flex items-center px-4 md:px-8">
                            <div className="flex items-center gap-2 md:gap-3 flex-1">
                                <motion.div 
                                    className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center"
                                    variants={iconAnimation}
                                >
                                    <img 
                                        src="/src/assets/icons/map.png"
                                        alt="Map Icon"
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                                <motion.h2 
                                    className="text-xl md:text-3xl font-bold text-white"
                                    variants={pageIndicatorAnimation}
                                >
                                    Mapa
                                </motion.h2>
                            </div>

                            {/* Logo */}
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

                    {/* Contenido principal con scroll */}
                    <div className="relative flex-1 overflow-y-auto custom-scrollbar-blue pt-28 md:pt-36">
                        <div className="flex flex-col md:flex-row items-center justify-center min-h-full p-4 md:p-8 gap-6 md:gap-8">
                            {/* Contenedor del mapa con título */}
                            <motion.div 
                                ref={mapContainerRef}
                                className="relative w-full md:w-[45%] h-[50vh] md:h-3/4"
                                variants={mapContainerAnimation}
                                animate={selectedRegion ? {
                                    x: window.innerWidth >= 768 ? -100 : 0,
                                    y: window.innerWidth < 768 ? -50 : 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }
                                } : {
                                    x: 0,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }
                                }}
                                initial={{ x: 0, y: 0 }}
                            >
                                {/* Título del mapa */}
                                <h2 className="absolute -top-8 md:-top-12 left-0 w-full text-center text-xl md:text-2xl font-bold text-white">
                                    Mapa de la Región Guayana
                                </h2>

                                {/* Marco decorativo */}
                                <div className="absolute -inset-2 bg-gradient-to-br from-[#b38f25]/30 to-[#8f6d0d]/30 rounded-lg" />
                                <div className="absolute -inset-[6px] border border-[#b38f25]/20 rounded-lg" />
                                
                                {/* Contenedor del mapa */}
                                <div className="relative w-full h-full bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-[#b38f25]/10">
                                    <img 
                                        src="/src/assets/icons/guayana.svg"
                                        alt="Mapa de la Guayana"
                                        className="w-full h-full object-contain"
                                    />
                                    
                                    {/* Marcadores de región */}
                                    {(['norte', 'central', 'sur'] as const).map((region) => (
                                        <motion.div
                                            key={region}
                                            className={`absolute cursor-pointer ${
                                                region === 'norte' ? 'top-[15%] left-[65%] md:left-[75%]' :
                                                region === 'central' ? 'top-[45%] left-[45%]' :
                                                'top-[65%] left-[35%]'
                                            }`}
                                            whileHover={{ scale: 1.2 }}
                                            animate={{ 
                                                scale: selectedRegion === region ? 1.5 : 1,
                                                transition: { duration: 0.3 }
                                            }}
                                            onClick={() => setSelectedRegion(region)}
                                        >
                                            {/* Anillo de pulso para la ubicación seleccionada */}
                                            {selectedRegion === region && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-[#b38f25]/30"
                                                    initial={{ scale: 1, opacity: 0.8 }}
                                                    animate={{
                                                        scale: [1, 2, 1],
                                                        opacity: [0.8, 0, 0.8],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            )}
                                            <motion.img 
                                                src={selectedRegion === region ? "/src/assets/icons/location-fijated.png" : "/src/assets/icons/location.svg"}
                                                alt={`Región ${region}`}
                                                className={`w-8 h-8 transition-all duration-300 ${
                                                    selectedRegion === region 
                                                        ? 'drop-shadow-[0_0_15px_rgba(179,143,37,1)] drop-shadow-[0_0_30px_rgba(179,143,37,0.8)] filter brightness-150' 
                                                        : 'hover:drop-shadow-[0_0_10px_rgba(179,143,37,0.5)]'
                                                }`}
                                                initial={{ opacity: 1 }}
                                                animate={selectedRegion === region ? {
                                                    opacity: [0.8, 1],
                                                    transition: {
                                                        duration: 0.8,
                                                        repeat: Infinity,
                                                        repeatType: "reverse"
                                                    }
                                                } : { opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            />
                                            {/* Etiqueta de región */}
                                            <motion.div
                                                className={`absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 px-3 py-1 rounded-full text-white text-sm ${
                                                    region === 'norte' ? '-top-8' :
                                                    region === 'central' ? '-top-8' :
                                                    '-top-8'
                                                }`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={selectedRegion === region ? {
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: { duration: 0.3 }
                                                } : { opacity: 0, y: 10 }}
                                            >
                                                {regionData[region].nombre}
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Panel de información o mensaje de bienvenida */}
                            <AnimatePresence mode="wait">
                                {selectedRegion ? (
                                    <motion.div
                                        key="region-info"
                                        className="w-full md:w-[500px] region-info-panel md:ml-8"
                                        initial={{ opacity: 0, x: window.innerWidth >= 768 ? 50 : 0, y: window.innerWidth < 768 ? 50 : 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        exit={{ opacity: 0, x: window.innerWidth >= 768 ? 50 : 0, y: window.innerWidth < 768 ? 50 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <DataPanel data={regionData[selectedRegion]} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="welcome-message"
                                        className="w-full md:w-[500px] md:ml-8"
                                        initial={{ opacity: 0, x: window.innerWidth >= 768 ? 50 : 0, y: window.innerWidth < 768 ? 50 : 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        exit={{ opacity: 0, x: window.innerWidth >= 768 ? 50 : 0, y: window.innerWidth < 768 ? 50 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-[#b38f25]/30 p-6">
                                            <h3 className="text-2xl font-bold text-white mb-4">
                                                Explora la Región Guayana
                                            </h3>
                                            <p className="text-white/90 mb-6">
                                                Bienvenido al mapa interactivo de la Región Guayana, una de las zonas más fascinantes de Venezuela. Esta región alberga algunos de los paisajes más espectaculares del mundo, incluyendo tepuyes milenarios, cascadas majestuosas y una rica diversidad cultural.
                                            </p>
                                            <p className="text-white/90 mb-4">
                                                Haz clic en cualquiera de los marcadores del mapa para descubrir:
                                            </p>
                                            <ul className="text-white/80 space-y-2 list-disc list-inside mb-6">
                                                <li>Información detallada de cada zona</li>
                                                <li>Historia y características geográficas</li>
                                                <li>Pueblos indígenas y su cultura</li>
                                                <li>Ubicaciones clave y puntos de interés</li>
                                            </ul>
                                            <div className="flex items-center gap-2 text-[#b38f25]">
                                                <img 
                                                    src="/src/assets/icons/location.svg"
                                                    alt="Marcador"
                                                    className="w-6 h-6 animate-bounce"
                                                />
                                                <span>Selecciona un marcador para comenzar tu exploración</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 