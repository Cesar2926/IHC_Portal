import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '/src/css/App.css'

const leftToRightVariants = {
    initial: { clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)' },
    animate: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
    exit: { clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)' },
};

export function Forum() {
    const navigate = useNavigate();

    const recentTopics = [
        { id: 1, title: '¿Cuál es tu libro favorito?', comments: 12 },
        { id: 2, title: 'Discusión sobre antropología', comments: 8 },
        { id: 3, title: 'Recomendaciones de lectura', comments: 15 },
        { id: 4, title: 'Eventos culturales en tu región', comments: 5 },
    ];

    const posts = [
        {
            id: 1,
            title: 'Bienvenidos al foro',
            content: 'Este es un espacio para compartir ideas, discutir temas y aprender juntos.',
            author: 'Admin',
            comments: 10,
        },
        {
            id: 2,
            title: 'Recomendaciones de libros',
            content: '¿Qué libros recomendarías para aprender sobre antropología?',
            author: 'Usuario123',
            comments: 5,
        },
    ];

    return (
        <motion.div
            className="relative w-full h-screen flex flex-col text-white "
            initial="initial"
            animate="animate"
            exit="exit"
            variants={leftToRightVariants}
            transition={{ duration: 0.5 }}
            style={{
                backgroundImage: "url('/src/assets/background/background-forum.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                userSelect: 'none',
            }}
        >
            {/* Contenedor del logo */}
            <div
                className="flex justify-center items-center py-5 "
                onClick={() => navigate('/')}
            >
                <img
                    src="/src/assets/logo/logo.svg"
                    alt="Logo"
                    className="w-60 h-auto"
                    style={{ userSelect: 'none' }}
                />
            </div>

            {/* Contenedor principal */}
            <div className="flex flex-1">
                {/* Sección principal */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="p-4 rounded-lg mb-4 shadow-md hover:shadow-lg transition-shadow bg-transparent" // Fondo transparente sin bordes
                        >
                            <h2 className="text-xl font-bold mb-2 font-['Slackey']">{post.title}</h2>
                            <p className="text-sm text-gray-300 mb-2 font-['Montserrat']">{post.content}</p>
                            <div className="text-sm text-gray-400 font-['Montserrat']">
                                Publicado por <span className="font-bold">{post.author}</span> · {post.comments} comentarios
                            </div>
                        </div>
                    ))}
                </div>

                {/* Panel lateral derecho */}
                <div className="w-80 p-4 bg-transparent border-l border-white"> {/* Separador vertical blanco */}
                    <h2 className="text-xl font-bold mb-4 border-b border-white pb-2 font-['Slackey']">Temas recientes</h2> {/* Separador horizontal blanco */}
                    <ul>
                        {recentTopics.map((topic) => (
                            <li
                                key={topic.id}
                                className="mb-3 p-2 rounded-lg transition-colors cursor-pointer border-t border-white font-['Montserrat'] hover:bg-black" // Hover negro con texto amarillo
                            >
                                <h3 className="text-sm font-bold font-['Montserrat']">{topic.title}</h3>
                                <p className="text-xs text-gray-400 font-['Montserrat']">{topic.comments} comentarios</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}