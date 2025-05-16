import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Border } from '@/components/ui'; // Por los momentos solo importo el Border
import { Aquarium, Library, Culture, Forum, ArticleDetail, PostDetail } from '@/pages'; // Importamos PostDetail
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

function Home() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Estado para la posición relativa del mouse respecto al centro de la pantalla
  const [kuaiPos, setKuaiPos] = useState({ x: 0, y: 0 });

  // Estado para el texto tipo máquina de escribir
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState(KUAIMARE_TEXT);
  const [currentImage, setCurrentImage] = useState(1);

  // Función para manejar el hover en las esquinas
  const handleCornerHover = (index: number) => {
    const newText = index === -1 ? KUAIMARE_TEXT : KUAIMARE_TEXT_VARIATIONS[index];
    if (newText !== currentText) {
      setCurrentText(newText);
      setDisplayedText('');
      setTextIndex(0);
      setCurrentImage(1);
    }
  };

  // Efecto para mostrar el texto caracter por caracter y alternar la imagen
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (textIndex < currentText.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(currentText.substring(0, textIndex + 1));
        setTextIndex((prev) => prev + 1);
        // Cambia la imagen cada 5 caracteres, pero asegura que termine en 1
        if (textIndex % 4 === 0) {
          if (textIndex < currentText.length - 4) {
            setCurrentImage((prev) => prev === 1 ? 2 : 1);
          } else {
            setCurrentImage(1);
          }
        }
      }, 22);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [textIndex, currentText]);

  // Permitir que al hacer click se muestre todo el texto de una vez
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
        
        {/* Capa de hojas animadas */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light opacity-30">
          <img
            src="/src/assets/background/leaves.gif"
            alt="Animated Leaves"
            className="w-full h-full object-cover"
          />
        </div>

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
            src="/src/assets/background/leaf.svg"
            alt="Top Right Background Image"
            className="w-200 h-200"
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