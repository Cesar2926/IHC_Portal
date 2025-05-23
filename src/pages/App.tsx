import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Border } from '@/components/ui';
import { Aquarium, Library, Culture, Forum, ArticleDetail, PostDetail } from '@/pages';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import '/src/css/App.css';
import { Aqua } from './Aqua';
import { Map } from './Map';
import { River } from './River';

const homeVariants = {
    initial: {
        opacity: 0,
        scale: 0.95
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        opacity: 0,
        scale: 1.05,
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Texto que aparecerá caracter por caracter
const KUAIMARE_TEXT =
    "Kuai-Mare está aquí para guiarte en tu viaje por este océano de información. Con su sabiduría infinita y su comprensión profunda, te ayudará a navegar en las aguas turbulentas de la búsqueda del conocimiento, brindándote claridad y apoyo en cada paso del camino.";

// Variaciones
const KUAIMARE_TEXT_VARIATIONS = [
    "Kuai-Mare escucha las voces que surgen del río del diálogo. En este espacio de encuentro, él te invita a compartir tus pensamientos, aprender de otros viajeros y construir juntos un cauce de sabiduría colectiva.",
    "En los reflejos del agua, Kuai-Mare guarda los relatos antiguos y las costumbres vivas. Aquí te guía a través de los mitos, los cantos, y los saberes que dan alma a la región Guayana, despertando en ti la memoria del espíritu warao.",
    "Como guardián del conocimiento ancestral, Kuai-Mare te abre las puertas de esta vasta corriente de libros, textos y saberes. Sumérgete con él en la profundidad del conocimiento, donde cada página es una gota del río eterno del aprendizaje.",
    "Kuai-Mare fluye donde el agua canta. Conoce los secretos de los ríos, las lagunas y los caños que dan vida a la Guayana. A través de su mirada ancestral, entenderás la conexión sagrada entre el mundo líquido y los seres que lo habitan.",
];

// Componente para la versión móvil/tablet
function MobileHome() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState(KUAIMARE_TEXT);
  const [rotation, setRotation] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [previousHoveredItem, setPreviousHoveredItem] = useState<number | null>(null);
  const [shouldTransition, setShouldTransition] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);

  const menuItems = [
    { 
      path: '/forum', 
      icon: '/src/assets/icons/forum-icon.png',
      label: 'FORO', 
      angle: 225,
      bgColor: 'rgba(255, 183, 0, 0.75)',
      hoverBgColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(255, 183, 0, 0.3)',
      textColor: 'rgb(255, 183, 0)'
    },
    { 
      path: '/culture', 
      icon: '/src/assets/icons/culture-icon.png',
      label: 'CULTURA', 
      angle: 315,
      bgColor: 'rgba(59, 161, 0, 0.75)',
      hoverBgColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(59, 161, 0, 0.3)',
      textColor: 'rgb(59, 161, 0)'
    },
    { 
      path: '/library', 
      icon: '/src/assets/icons/library-icon.png',
      label: 'BIBLIOTECA', 
      angle: 135,
      bgColor: 'rgba(77, 35, 8, 0.75)',
      hoverBgColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(77, 35, 8, 0.3)',
      textColor: 'rgb(77, 35, 8)'
    },
    { 
      path: '/aqua', 
      icon: '/src/assets/icons/fish-icon.png',
      label: 'AGUA', 
      angle: 45,
      bgColor: 'rgba(0, 168, 154, 0.75)',
      hoverBgColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(0, 168, 154, 0.3)',
      textColor: 'rgb(0, 168, 154)'
    }
  ];

  const handleItemHover = (index: number | null) => {
    if (index !== previousHoveredItem && index !== null) {
      setShouldTransition(true);
      setIsTextVisible(false);
      setTimeout(() => {
        setHoveredItem(index);
        const targetAngle = menuItems[index].angle;
        let newRotation = targetAngle;
        const currentRotation = rotation % 360;
        const diff = ((targetAngle - currentRotation + 540) % 360) - 180;
        newRotation = currentRotation + diff;
        setRotation(newRotation);
        handleCornerHover(index);
        setIsTextVisible(true);
        setShouldTransition(false);
      }, 300);
    } else {
      setHoveredItem(index);
      if (index !== null) {
        handleCornerHover(index);
      }
    }
    setPreviousHoveredItem(index);
  };

  const handleCornerHover = (index: number) => {
    const newText = KUAIMARE_TEXT_VARIATIONS[index];
    if (newText !== currentText) {
      setCurrentText(newText);
      setDisplayedText('');
      setTextIndex(0);
      setCurrentImage(1);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (textIndex < currentText.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(currentText.substring(0, textIndex + 1));
        setTextIndex((prev) => prev + 1);
        if (textIndex % 4 === 0) {
          if (textIndex < currentText.length - 4) {
            setCurrentImage((prev) => prev === 1 ? 2 : 1);
          } else {
            setCurrentImage(1);
          }
        }
      }, 22);
    } else {
      setCurrentImage(1);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [textIndex, currentText]);

  useEffect(() => {
    setCurrentText(KUAIMARE_TEXT);
  }, []);

  const handleTextClick = () => {
    if (textIndex < currentText.length) {
      setDisplayedText(currentText);
      setTextIndex(currentText.length);
      setCurrentImage(1);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/src/assets/background/background-desktop.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          userSelect: 'none',
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={homeVariants}
      >
        {/* Logo centrado para móviles */}
        <div className="flex justify-center items-center mt-4 mb-16">
          <img
            src="/src/assets/logo/logo.svg"
            alt="Logo"
            className="w-64 h-auto"
            style={{ userSelect: 'none' }}
          />
        </div>

        {/* Contenedor principal del medallón */}
        <div className="relative w-[400px] h-[400px] md:w-[700px] md:h-[700px] lg:w-[400px] lg:h-[400px] flex items-center justify-center mt-[-20px] md:mt-[-40px] lg:mt-[-20px]">
          {/* Kuai Mare decorativo de fondo */}
          <div className="absolute top-[-50px] md:top-[-100px] lg:top-0 left-1/2 transform -translate-x-1/2" style={{ zIndex: 40 }}>
            <motion.img
              src={`/src/assets/chatbot/kuai-mare-${currentImage}.svg`}
              alt="Kuai Mare Background"
              className="w-[180px] h-[180px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px]"
              style={{ 
                opacity: 1,
                filter: 'brightness(1.5) contrast(1.3) drop-shadow(0 0 15px rgba(255,255,255,0.9)) drop-shadow(0 0 30px rgba(0,0,0,0.5))',
                transform: 'translateY(-100%) md:translateY(-120%) lg:translateY(-90%)',
                userSelect: 'none'
              }}
            />
          </div>

          {/* Círculo Warao decorativo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.img
              src="/src/assets/icons/circle-warao.png"
              alt="Círculo Warao"
              className="w-[350px] h-[350px] md:w-[650px] md:h-[650px] lg:w-[350px] lg:h-[350px] absolute"
              style={{
                filter: hoveredItem !== null
                  ? `brightness(2) contrast(1.2) sepia(1) saturate(200%) hue-rotate(${
                      menuItems[hoveredItem].textColor === 'rgb(255, 183, 0)' ? '0deg' : // naranja
                      menuItems[hoveredItem].textColor === 'rgb(59, 161, 0)' ? '70deg' : // verde
                      menuItems[hoveredItem].textColor === 'rgb(77, 35, 8)' ? '320deg' : // marrón
                      '160deg' // turquesa
                    })`
                  : 'brightness(2) contrast(1.2) sepia(0.5) saturate(120%) hue-rotate(70deg)',
                opacity: 0.8,
                mixBlendMode: 'screen'
              }}
              animate={{
                rotate: rotation
              }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 15
              }}
            />
          </div>

          {/* Medallón base */}
          <div
            className="absolute w-[350px] h-[350px] md:w-[650px] md:h-[650px] lg:w-[350px] lg:h-[350px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,20,0,0.9) 0%, rgba(0,10,0,0.7) 100%)',
              border: '3px solid rgba(0,255,100,0.15)',
              boxShadow: 'inset 0 0 50px rgba(0,50,0,0.5), 0 0 30px rgba(0,50,0,0.5)'
            }}
          />

          {/* Texto descriptivo */}
          <div 
            className="absolute w-[200px] md:w-[300px] lg:w-[200px] text-center text-white text-xs md:text-lg lg:text-xs font-normal z-30 transition-all duration-300 cursor-pointer"
            style={{
              opacity: shouldTransition ? (isTextVisible ? 1 : 0) : 1,
              filter: shouldTransition ? (isTextVisible ? 'blur(0px)' : 'blur(4px)') : 'blur(0px)',
              textShadow: '0 0 10px rgba(0,255,100,0.3)',
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleTextClick}
          >
            <p className="text-[11px] md:text-[19px] lg:text-[11px] leading-tight mx-auto">
              {displayedText}
              <span className="animate-pulse">
                {displayedText.length < currentText.length ? '▋' : ''}
              </span>
            </p>
          </div>

          {/* Menú circular */}
          <div className="absolute w-full h-full">
            {menuItems.map((item, index) => {
              const angleRad = (item.angle * Math.PI) / 180;
              const radius = window.innerWidth >= 768 && window.innerWidth < 1024 ? 300 : 170;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              return (
                <motion.div
                  key={item.path}
                  className="absolute z-30"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                  }}
                >
                  <div
                    className="w-20 h-20 md:w-32 md:h-32 lg:w-20 lg:h-20 rounded-full flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                    style={{
                      background: hoveredItem === index 
                        ? item.hoverBgColor
                        : item.bgColor,
                      border: hoveredItem === index 
                        ? '2px solid rgba(0, 0, 0, 0.1)'
                        : `2px solid ${item.borderColor}`,
                      transform: hoveredItem === index ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: hoveredItem === index
                        ? '0 0 10px rgba(0,0,0,0.1)'
                        : `0 0 20px ${item.borderColor}`
                    }}
                    onMouseEnter={() => handleItemHover(index)}
                    onMouseLeave={() => handleItemHover(null)}
                    onTouchStart={() => handleItemHover(index)}
                    onTouchEnd={() => handleItemHover(null)}
                    onClick={() => navigate(item.path)}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-8 h-8 md:w-14 md:h-14 lg:w-8 lg:h-8 transition-all duration-200"
                      style={{
                        filter: hoveredItem === index 
                          ? `brightness(0) saturate(100%) ${
                              item.textColor === 'rgb(255, 183, 0)' ? 'invert(72%) sepia(75%) saturate(1128%) hue-rotate(360deg) brightness(103%) contrast(106%)' : // naranja
                              item.textColor === 'rgb(59, 161, 0)' ? 'invert(58%) sepia(69%) saturate(1217%) hue-rotate(71deg) brightness(92%) contrast(106%)' : // verde
                              item.textColor === 'rgb(77, 35, 8)' ? 'invert(15%) sepia(51%) saturate(1011%) hue-rotate(357deg) brightness(91%) contrast(95%)' : // marrón
                              'invert(45%) sepia(96%) saturate(401%) hue-rotate(143deg) brightness(97%) contrast(101%)' // turquesa
                            }`
                          : 'brightness(0) invert(1)'
                      }}
                    />
                    <span 
                      className="text-[10px] md:text-[16px] lg:text-[10px] font-bold transition-all duration-200"
                      style={{
                        color: hoveredItem === index ? item.textColor : '#ffffff',
                        textShadow: hoveredItem === index 
                          ? 'none'
                          : '0 0 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Componente para la versión desktop
function DesktopHome() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [kuaiPos, setKuaiPos] = useState({ x: 0, y: 0 });
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState(KUAIMARE_TEXT);
  const [currentImage, setCurrentImage] = useState(1);

  const handleCornerHover = (index: number) => {
    const newText = index === -1 ? KUAIMARE_TEXT : KUAIMARE_TEXT_VARIATIONS[index];
    if (newText !== currentText) {
      setCurrentText(newText);
      setDisplayedText('');
      setTextIndex(0);
      setCurrentImage(1);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (textIndex < currentText.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(currentText.substring(0, textIndex + 1));
        setTextIndex((prev) => prev + 1);
        if (textIndex % 4 === 0) {
          if (textIndex < currentText.length - 4) {
            setCurrentImage((prev) => prev === 1 ? 2 : 1);
          } else {
            setCurrentImage(1);
          }
        }
      }, 22);
    } else {
      setCurrentImage(1);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [textIndex, currentText]);

  const handleTextClick = () => {
    if (textIndex < currentText.length) {
      setDisplayedText(currentText);
      setTextIndex(currentText.length);
      setCurrentImage(1);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;
      const maxMove = 40;
      const limitedX = Math.max(-maxMove, Math.min(maxMove, offsetX / 10));
      const limitedY = Math.max(-maxMove, Math.min(maxMove, offsetY / 10));
      setKuaiPos({ x: limitedX, y: limitedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
        style={{
          backgroundImage: "url('/src/assets/background/background-desktop.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          userSelect: 'none',
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={homeVariants}
      >
        {/* Logo en la parte superior */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20">
            <img
                src="/src/assets/logo/logo.svg"
                alt="Logo"
                className="w-80 h-auto"
                style={{ userSelect: 'none' }}
            />
        </div>

        {/* Contenido centrado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <motion.img
                src={`/src/assets/chatbot/kuai-mare-${currentImage}.svg`}
                alt="Kuai Mare"
                className="w-125 h-auto mb-8"
                style={{ userSelect: 'none' }}
                animate={{
                  x: kuaiPos.x,
                  y: kuaiPos.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 40,
                  damping: 15,
                  mass: 0.8,
                }}
            />
            <div
                className="w-[1030px] h-60 text-center justify-start text-white text-3xl font-normal pointer-events-auto cursor-pointer relative z-20"
                onClick={handleTextClick}
            >
                <p>
                  {displayedText}
                  <span className="animate-pulse">{displayedText.length < currentText.length ? '▋' : ''}</span>
                </p>
            </div>
        </div>

        {/* Imágenes debajo de las esquinas */}
        <div className="absolute top-0 left-0 z-0">
          <img
            src="/src/assets/background/sun.svg"
            alt="Top Left Image"
            className="w-200 h-200"
          />
        </div>
        <div className="absolute top-0 right-0 z-0">
          <img
            src="/src/assets/background/leaf.svg"
            alt="Top Right Image"
            className="w-110 h-110"
          />
        </div>
        <div className="absolute top-0 right-0 z-0 mix-blend-saturation">
          <img
            src="/src/assets/background/leaf-background.svg"
            alt="Top Right Background Image"
            className="w-150 h-150"
          />
        </div>
        <div className="absolute bottom-0 left-0 z-0">
          <img
            src="/src/assets/background/fire.svg"
            alt="Bottom Left Image"
            className="w-300 h-300"
          />
        </div>
        <div className="absolute bottom-0 right-0 z-0">
            <img
              src="/src/assets/background/water.svg"
              alt="Bottom Right Image"
              className="w-225 h-125"
            />
        </div>

        {/* Esquinas decorativas con navegación */}
        <div 
          className="absolute top-0 left-0 z-30" 
          onClick={() => navigate('/forum')}
          onMouseEnter={() => handleCornerHover(0)}
        >
          <Border src="/src/assets/icons/border_top_left.svg" alt="Top Left Border" />
        </div>
        <div 
          className="absolute top-0 right-0 z-30" 
          onClick={() => navigate('/culture')}
          onMouseEnter={() => handleCornerHover(1)}
        >
          <Border src="/src/assets/icons/border_top_right.svg" alt="Top Right Border" />
        </div>
        <div 
          className="absolute bottom-0 left-0 z-30" 
          onClick={() => navigate('/library')}
          onMouseEnter={() => handleCornerHover(2)}
        >
          <Border src="/src/assets/icons/border_bottom_left.svg" alt="Bottom Left Border" />
        </div>
        <div 
          className="absolute bottom-0 right-0 z-30" 
          onClick={() => navigate('/aqua')}
          onMouseEnter={() => handleCornerHover(3)}
        >
          <Border src="/src/assets/icons/border_bottom_right.svg" alt="Bottom Right Border" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Componente Home que decide qué versión mostrar
function Home() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop ? <DesktopHome /> : <MobileHome />;
}

export default function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aqua" element={<Aqua />} />
          <Route path="/aquarium" element={<Aquarium />} />
          <Route path="/map" element={<Map />} />
          <Route path="/library" element={<Library />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/river" element={<River />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}