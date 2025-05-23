import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { MobileMenu } from './components/MobileMenu';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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

type RiverData = {
    nombre: string;
    longitud: string;
    caudal: string;
    cuenca: string;
    importancia: string;
    historia: string;
};

// Datos numéricos para comparación
const riverMetrics = {
    longitud: {
        orinoco: 2140,
        caroni: 952,
        label: 'Longitud (km)'
    },
    caudal: {
        orinoco: 33000,
        caroni: 5093,
        label: 'Caudal (m³/s)'
    },
    cuenca: {
        orinoco: 880000,
        caroni: 95000,
        label: 'Cuenca (km²)'
    }
};

type MetricKey = keyof typeof riverMetrics;

const riverData: { [key: string]: RiverData } = {
    orinoco: {
        nombre: "Río Orinoco",
        longitud: "2.140 km",
        caudal: "33.000 m³/s",
        cuenca: "880.000 km²",
        importancia: "Tercero más caudaloso del mundo y arteria vital de Venezuela. Sus aguas sostienen una rica biodiversidad y son fundamentales para el desarrollo económico del país.",
        historia: "Los indígenas lo llamaban 'Paragua', que significa 'Gran Río'. Para las culturas originarias, el Orinoco era considerado el padre de todas las aguas, un gigante sabio y poderoso que cuidaba de todas las criaturas en sus dominios."
    },
    caroni: {
        nombre: "Río Caroní",
        longitud: "952 km",
        caudal: "5.093 m³/s",
        cuenca: "95.000 km²",
        importancia: "Principal fuente de energía hidroeléctrica de Venezuela. Sus aguas alimentan la represa de Guri, una de las más grandes del mundo.",
        historia: "Conocido como el 'Río de Aguas Negras' por su característico color oscuro, producto de los taninos de la vegetación. Los indígenas Pemón lo consideraban sagrado y guardián de antiguos secretos."
    }
};

const pageTransition = {
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
        x: '100%',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const RiverCard = ({ data, isExpanded, onClick }: { 
    data: RiverData; 
    isExpanded: boolean;
    onClick: () => void;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative overflow-hidden ${isExpanded ? 'col-span-1 md:col-span-2' : 'col-span-1'}`}
            layout
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
        >
            <motion.div 
                className="bg-black/60 backdrop-blur-sm rounded-3xl border border-[#b38f25]/30 p-4 md:p-8 h-full cursor-pointer relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {/* Indicador de click */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl opacity-0 transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0 }}
                >
                    <div className="text-white text-base md:text-xl font-medium flex items-center gap-3">
                        Click para {isExpanded ? 'minimizar' : 'más información'}
                    </div>
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">{data.nombre}</h3>
                <div className="space-y-3 md:space-y-4">
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                        <div className="bg-white/10 rounded-xl p-3 md:p-4 transition-all duration-300 hover:bg-white/20">
                            <span className="text-white/60 text-base md:text-lg">Longitud</span>
                            <p className="text-white font-bold text-lg md:text-xl">{data.longitud}</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3 md:p-4 transition-all duration-300 hover:bg-white/20">
                            <span className="text-white/60 text-base md:text-lg">Caudal</span>
                            <p className="text-white font-bold text-lg md:text-xl">{data.caudal}</p>
                        </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 md:p-4 transition-all duration-300 hover:bg-white/20">
                        <span className="text-white/60 text-base md:text-lg">Cuenca</span>
                        <p className="text-white font-bold text-lg md:text-xl">{data.cuenca}</p>
                    </div>
                    
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3 md:space-y-4"
                            >
                                <div className="bg-white/10 rounded-xl p-3 md:p-4 transition-all duration-300 hover:bg-white/20">
                                    <span className="text-white/60 text-base md:text-lg">Importancia</span>
                                    <p className="text-white text-base md:text-lg leading-relaxed">{data.importancia}</p>
                                </div>
                                <div className="bg-white/10 rounded-xl p-3 md:p-4 transition-all duration-300 hover:bg-white/20">
                                    <span className="text-white/60 text-base md:text-lg">Historia</span>
                                    <p className="text-white text-base md:text-lg leading-relaxed">{data.historia}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ComparisonChart = ({ metricKey }: { metricKey: MetricKey }) => {
    const metric = riverMetrics[metricKey];
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'white',
                    font: {
                        size: 16
                    }
                }
            },
            title: {
                display: true,
                text: `Comparación - ${metric.label}`,
                color: 'white',
                font: {
                    size: 20
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: 'white',
                    font: {
                        size: 14
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: 'white',
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false
                }
            }
        }
    };

    const data = {
        labels: ['Río Orinoco', 'Río Caroní'],
        datasets: [
            {
                label: metric.label,
                data: [metric.orinoco, metric.caroni],
                backgroundColor: ['rgba(179, 143, 37, 0.8)', 'rgba(65, 105, 225, 0.8)'],
                borderColor: ['rgb(179, 143, 37)', 'rgb(65, 105, 225)'],
                borderWidth: 2,
            }
        ]
    };

    return (
        <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
            <Bar options={options} data={data} />
        </div>
    );
};

const LegendSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-2 bg-black/60 backdrop-blur-sm rounded-3xl border border-[#b38f25]/30 p-4 md:p-8"
        >
            <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
                <div className="flex-1 space-y-4 md:space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">La Leyenda del Amor entre el Orinoco y el Caroní</h3>
                    <div className="space-y-4 md:space-y-6 text-base md:text-lg">
                        <p className="text-white/90 leading-relaxed">
                            Cuenta la leyenda que el poderoso Orinoco, gigante de aguas pardas, se enamoró perdidamente de Caroní, 
                            una hermosa ninfa de aguas negras y cristalinas. Caroní, hija de la Gran Sabana y guardiana de los tepuyes, 
                            bailaba entre las rocas mientras descendía desde las alturas, cautivando al gran río con su gracia y pureza.
                        </p>
                        <p className="text-white/90 leading-relaxed">
                            El Orinoco, determinado a unirse con su amada, viajó miles de kilómetros, atravesando selvas y llanuras. 
                            Caroní, igualmente enamorada, descendió desde las antiguas mesetas de Guayana, llevando consigo los secretos 
                            y la fuerza de las montañas sagradas.
                        </p>
                        <p className="text-white/90 leading-relaxed">
                            Finalmente, en lo que hoy es Ciudad Guayana, los amantes se encontraron en un abrazo eterno. Sus aguas, 
                            aunque diferentes en color y temperamento, se mezclaron en una danza perpetua. Desde entonces, el punto 
                            donde se unen es considerado sagrado por los pueblos indígenas, que ven en la confluencia de estos ríos 
                            el símbolo perfecto del amor eterno y la armonía entre las fuerzas de la naturaleza.
                        </p>
                    </div>
                </div>
                <motion.div 
                    className="w-full lg:w-[500px] relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <div className="sticky top-8">
                        <div className="h-[300px] md:h-[400px] lg:h-[600px]">
                            <img 
                                src="/src/assets/icons/orinoco-caroni.avif" 
                                alt="Confluencia del Orinoco y el Caroní" 
                                className="w-full h-full object-cover object-center rounded-2xl shadow-2xl"
                            />
                        </div>
                        <p className="text-white/60 text-xs md:text-sm mt-2 md:mt-4 text-center italic">
                            Confluencia del río Orinoco y el río Caroní
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export function River() {
    const navigate = useNavigate();
    const [expandedRiver, setExpandedRiver] = useState<string | null>(null);
    const [selectedMetric, setSelectedMetric] = useState<MetricKey>('longitud');

    const handleNavigateBack = () => {
        navigate('/aqua', { state: { from: 'river' } });
    };

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
                        backgroundImage: "url('/src/assets/background/background_river.svg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Overlay oscuro */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Barra superior con ícono y título - Ahora fixed */}
                    <div className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-sm z-50 py-2 md:py-5">
                        <div className="flex items-center px-4 md:px-8">
                            <div className="flex items-center gap-2 md:gap-3 flex-1">
                                <motion.div 
                                    className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center"
                                    variants={iconAnimation}
                                >
                                    <img 
                                        src="/src/assets/icons/river.png"
                                        alt="River Icon"
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                                <motion.div
                                    className="flex flex-col"
                                    variants={pageIndicatorAnimation}
                                >
                                    <h2 className="text-xl md:text-3xl font-bold text-white md:leading-tight">
                                        <span className="md:block">Ríos de</span>
                                        <span className="md:block">Guayana</span>
                                    </h2>
                                </motion.div>
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

                    {/* Contenido principal */}
                    <div className="relative flex-1 overflow-y-auto px-4 md:px-8 pt-24 md:pt-36 pb-8 custom-scrollbar-blue">
                        <div className="max-w-7xl mx-auto space-y-4 md:space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <RiverCard
                                    data={riverData.orinoco}
                                    isExpanded={expandedRiver === 'orinoco'}
                                    onClick={() => setExpandedRiver(expandedRiver === 'orinoco' ? null : 'orinoco')}
                                />
                                <RiverCard
                                    data={riverData.caroni}
                                    isExpanded={expandedRiver === 'caroni'}
                                    onClick={() => setExpandedRiver(expandedRiver === 'caroni' ? null : 'caroni')}
                                />
                            </div>

                            {/* Sección de comparación */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-black/60 backdrop-blur-sm rounded-3xl border border-[#b38f25]/30 p-4 md:p-8"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-8">Comparación de Ríos</h3>
                                <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-8">
                                    {(Object.keys(riverMetrics) as MetricKey[]).map((metric) => (
                                        <button
                                            key={metric}
                                            onClick={() => setSelectedMetric(metric)}
                                            className={`px-3 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 text-sm md:text-base ${
                                                selectedMetric === metric
                                                    ? 'bg-[#b38f25] text-white'
                                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                            }`}
                                        >
                                            {riverMetrics[metric].label}
                                        </button>
                                    ))}
                                </div>
                                <ComparisonChart metricKey={selectedMetric} />
                            </motion.div>
                            
                            <LegendSection />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 