import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Border } from '@/components/ui'; // Por los momentos solo importo el Border
import { Aquarium, Library, Culture, Forum, ArticleDetail } from '@/pages'
import { motion } from 'framer-motion';
import '/src/css/App.css'

// const topToBottomVariants = {
//   initial: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
//   animate: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
//   exit: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
// };

function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/src/assets/background/background-desktop.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        userSelect: 'none',
      }}
    // initial="initial"
    // animate="animate"
    // exit="exit"
    // variants={pageVariants}
    // transition={{ duration: 0.5 }}
    >
      {/* Logo centrado horizontalmente */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <img
          src="/src/assets/logo/logo.svg"
          alt="Logo"
          className="w-80 h-auto"
          style={{ userSelect: 'none' }}
        />
        <img
          src="/src/assets/chatbot/kuai-mare.svg"
          alt="Kuai Mare"
          className="w-125 h-auto mt-18"
          style={{ userSelect: 'none' }}
        />
        <div
          className="w-300 h-60 text-center justify-start text-white text-3xl font-normal font-['Slackey']"
          style={{ userSelect: 'none' }}
        >
          <p>
            Kuai-Mare está aquí para guiarte en tu viaje por este océano de información. Con su sabiduría infinita y su comprensión profunda, te ayudará a navegar en las aguas turbulentas de la búsqueda del conocimiento, brindándote claridad y apoyo en cada paso del camino.
          </p>
        </div>
        <div className="w-100 justify-start text-white text-5xl font-normal font-['Slackey'] leading-none">
          KUAI-MARE
        </div>
      </div>

      {/* Imágenes debajo de las esquinas */}
      <div className="absolute top-0 left-0 z-0">
        <img
          src="/src/assets/background/sun.svg"
          alt="Top Left Image"
          className="w-250 h-250"
        />
      </div>
      <div className="absolute top-0 right-0 z-0">
        <img
          src="/src/assets/background/leaf.svg"
          alt="Top Right Image"
          className="w-100 h-100"
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
          alt="Top Right Background Image"
          className="w-300 h-300"
        />
      </div>
      <div className="absolute bottom-0 right-0 z-0">
        <img
          src="/src/assets/background/water.svg"
          alt="Top Right Background Image"
          className="w-225 h-125"
        />
      </div>

      {/* Esquinas decorativas con navegación */}
      <div className="absolute top-0 left-0 z-10" onClick={() => navigate('/forum')}>
        <Border src="/src/assets/icons/border_top_left.svg" alt="Top Left Border" />
      </div>
      <div className="absolute top-0 right-0 z-10" onClick={() => navigate('/culture')}>
        <Border src="/src/assets/icons/border_top_right.svg" alt="Top Right Border" />
      </div>
      <div className="absolute bottom-0 left-0 z-10" onClick={() => navigate('/library')}>
        <Border src="/src/assets/icons/border_bottom_left.svg" alt="Bottom Left Border" />
      </div>
      <div className="absolute bottom-0 right-0 z-10" onClick={() => navigate('/aquarium')}>
        <Border src="/src/assets/icons/border_bottom_right.svg" alt="Bottom Right Border" />
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aquarium" element={<Aquarium />} />
        <Route path="/library" element={<Library />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/forum" element={<Forum />} />
        {/* Ruta para el detalle del artículo */}
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}