import React, { useState, useEffect, useCallback } from 'react';

// Componente para o ícone de seta (chevron)
const ChevronIcon = ({ direction = 'left', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-right"
    {...props}
  >
    {direction === 'left' ? (
      <path d="m15 18-6-6 6-6" />
    ) : (
      <path d="m9 18 6-6-6-6" />
    )}
  </svg>
);


// Dados das imagens do carrossel
const slides = [
  {
    url: 'https://placehold.co/1200x800/313442/ffffff?text=Paisagem+1',
    title: 'Montanhas Serenas',
    description: 'Uma vista deslumbrante do pico de uma montanha ao amanhecer, com os primeiros raios de sol a iluminar a paisagem.'
  },
  {
    url: 'https://placehold.co/1200x800/7a3e48/ffffff?text=Paisagem+2',
    title: 'Costa Ensolarada',
    description: 'Águas cristalinas banhando uma bela praia de areia branca, um paraíso tropical perfeito para relaxar.'
  },
  {
    url: 'https://placehold.co/1200x800/4a5b6f/ffffff?text=Paisagem+3',
    title: 'Floresta Mágica',
    description: 'A luz do sol a infiltrar-se por entre as árvores de uma floresta densa, criando uma atmosfera de encanto e mistério.'
  },
  {
    url: 'https://placehold.co/1200x800/8a8d91/ffffff?text=Paisagem+4',
    title: 'Arquitetura Urbana',
    description: 'Arranha-céus modernos que refletem o céu da cidade, um testemunho da engenhosidade e do design contemporâneo.'
  },
];

// Componente principal do carrossel
function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  
  // Efeito para avançar os slides automaticamente
  useEffect(() => {
    const autoPlay = setInterval(nextSlide, 6000); // Muda a cada 6 segundos
    return () => clearInterval(autoPlay);
  }, [nextSlide]);

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
      {/* Container para todos os slides - este é o que se move */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* Mapeia os slides para criar cada painel */}
        {slides.map((slide, index) => (
          <div key={slide.title} className="relative w-full flex-shrink-0 h-96 md:h-[550px]">
            {/* Imagem usando a tag <img> para melhor controlo de animação */}
            <img
              src={slide.url}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${
                currentIndex === index ? 'scale-110' : 'scale-100' // Efeito Ken Burns
              }`}
            />
            {/* Overlay em gradiente para melhor legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            {/* Conteúdo de texto */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
              <h2 className={`text-3xl md:text-5xl font-extrabold mb-3 transition-all duration-700 transform ${
                  currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                {slide.title}
              </h2>
              <p className={`text-base md:text-lg max-w-lg transition-all duration-700 delay-200 transform ${
                  currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Controlos são colocados por cima do container deslizante */}

      {/* Botão de navegação - Esquerda */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-4 z-10 flex justify-center items-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Slide anterior"
      >
        <ChevronIcon direction="left" />
      </button>

      {/* Botão de navegação - Direita */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-4 z-10 flex justify-center items-center w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Próximo slide"
      >
        <ChevronIcon direction="right" />
      </button>

      {/* Indicadores de navegação (estilo pílula) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              currentIndex === slideIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para o slide ${slideIndex + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

// Componente principal da aplicação
export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 font-sans p-4 text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Galeria de Destaques</h1>
        <p className="text-lg text-gray-400">Explore a nossa coleção de paisagens incríveis.</p>
      </div>
      <ImageCarousel />
    </div>
  );
}

