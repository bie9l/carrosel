import React, { useState, useEffect, useCallback } from 'react';

// Componente para o ícone de seta (chevron)
const ChevronIcon = ({ direction = 'left', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
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
    url: 'https://bielandrade1.s3.us-east-2.amazonaws.com/aniversario2.jpeg',
    title: 'Prudente de Morais',
    description: 'Uma vista deslumbrante do pico de uma montanha ao amanhecer, com os primeiros raios de sol a iluminar a paisagem.'
  },
  {
    url: 'https://bielandrade1.s3.us-east-2.amazonaws.com/aniversario3.jpeg',
    title: 'Prudente de Morais',
    description: 'Águas cristalinas banhando uma bela praia de areia branca, um paraíso tropical perfeito para relaxar.'
  },
  {
    url: 'https://bielandrade1.s3.us-east-2.amazonaws.com/aniversario1.jpeg',
    title: 'Prudente de Morais',
    description: 'A luz do sol a infiltrar-se por entre as árvores de uma floresta densa, criando uma atmosfera de encanto e mistério.'
  },
  {
    url: 'https://bielandrade1.s3.us-east-2.amazonaws.com/biel-camp-futsal.jpeg',
    title: 'União Recanto Clube',
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
    <div className="carousel-container">
      {/* Container para todos os slides - este é o que se move */}
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* Mapeia os slides para criar cada painel */}
        {slides.map((slide, index) => (
          <div key={slide.title} className={`carousel-slide ${currentIndex === index ? 'active' : ''}`}>
            {/* Imagem usando a tag <img> para melhor controlo de animação */}
            <img
              src={slide.url}
              alt={slide.title}
            />
            {/* Overlay em gradiente para melhor legibilidade */}
            <div className="carousel-overlay"></div>
            
            {/* Conteúdo de texto */}
            <div className="carousel-content">
              <h2 className="carousel-title">
                {slide.title}
              </h2>
              <p className="carousel-description">
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
        className="carousel-nav-button prev"
        aria-label="Slide anterior"
      >
        <ChevronIcon direction="left" />
      </button>

      {/* Botão de navegação - Direita */}
      <button
        onClick={nextSlide}
        className="carousel-nav-button next"
        aria-label="Próximo slide"
      >
        <ChevronIcon direction="right" />
      </button>

      {/* Indicadores de navegação (estilo pílula) */}
      <div className="carousel-indicators">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`carousel-indicator ${currentIndex === slideIndex ? 'active' : ''}`}
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
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Galeria de Destaques</h1>
        <p className="app-subtitle">Explore a nossa coleção de paisagens incríveis.</p>
      </div>
      <ImageCarousel />
    </div>
  );
}

