import { useEffect, useState } from "react";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";


export default function Carousel({ children: slides, autoSlide = false }: { children: JSX.Element[], autoSlide?: boolean }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const prev = () => setCurrentSlide((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
    const next = () => setCurrentSlide((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, 100000)
        return () => clearInterval(slideInterval)
    }, [])
    return (
        <div className="overflow-hidden relative w-full h-full">
            <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        {slide}
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between">
                <button className="p-1 rounded-full shadow bg-black mx-5 " onClick={prev}><FaChevronCircleLeft color="white" size={40} /></button>
                <button className="p-1 rounded-full shadow bg-black mx-5" onClick={next}><FaChevronCircleRight color="white" size={40} /></button>
            </div>
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2" >
                    {slides.map((_, i) => (
                        <div key={i} className={`transition-all w-3 h-3 bg-white rounded-full ${currentSlide === i ? 'p-2' : 'bg-opacity-50'} hover:cursor-pointer hover:bg-black`} onClick={() => setCurrentSlide(i)}/>
                    ))}
                </div>
            </div>
        </div>
    )
}