import React, { useState } from 'react';
import '../../ts/style/Carousel.css'; // Assurez-vous de créer ce fichier pour les styles

interface CarouselProps {
    children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
    };

    return (
        <div className="carousel">
            <button className="carousel-button prev" onClick={prevSlide}><i
                className="fa-solid fa-circle-arrow-left coursel-nav"></i></button>
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {children.map((child, index) => (
                    <div className="carousel-item" key={index}>
                        {child}
                    </div>
                ))}
            </div>
            <button className="carousel-button next" onClick={nextSlide}><i
                className="fa-solid fa-circle-arrow-right coursel-nav"></i></button>
        </div>
    );
};

export default Carousel;