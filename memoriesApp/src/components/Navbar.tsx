import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowCircleLeft, FaArrowAltCircleRight, FaHeart, FaCamera, FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import {GrGallery} from 'react-icons/gr';
import { IconType } from "react-icons";


interface LinkComponentProps {
    destiny: string;
    text: string;
    icon: IconType;
    isTriggered: boolean;
}

function LinkComponent({ destiny, text, icon: Icon, isTriggered }: LinkComponentProps) {
    return (
        <Link to={destiny} className='mb-2 px-2 block text-md font-bold'>
            <div className="flex flex-row items-center gap-x-2 hover:bg-black px-2 h-12 border-b-2">
                <Icon />
                {isTriggered && <span>{text}</span>}
            </div>
        </Link>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen(!isOpen);
    return (
        <div className="z-50">
            <div className={`bg-gray-700 h-full text-white  ${isOpen ? 'w-64 sm:static absolute' : 'hidden'} md:block `}>
                <div className="">
                    <h3 className="mb-5 flex justify-center w-full pt-4 pb-5 border-b-4 ">{isOpen ? (<img src="/src/assets/Ao.png" alt="Logo" className="w-52"/>):(<FaHeart />)}</h3>
                    <LinkComponent destiny='/' text='Galeria' icon={GrGallery} isTriggered={isOpen} />
                    <LinkComponent destiny='/new-memory' text='Agregar una memoria' icon={FaCamera} isTriggered={isOpen} />
                    <LinkComponent destiny='/todo-list' text='To-Do List' icon={FaClipboardList} isTriggered={isOpen}/>
                    <LinkComponent destiny='/calendar' text='Calendario' icon={FaCalendarAlt } isTriggered={isOpen}/>
                </div>
            </div>
            <div className={`bg-black text-white px-3 py-1 absolute top-2 left-2 md:hidden`}>
                <button onClick={toggleIsOpen}>
                    {isOpen ? "←" : "☰"}
                </button>
            </div>
            <div className={`relative md:block hidden`}>
                <div className="absolute bottom-0 -right-8 text-black">
                    <button className="rounded-full bg-black p-2 text-white" onClick={toggleIsOpen}>
                        {isOpen ? (<FaArrowCircleLeft />) : (<FaArrowAltCircleRight />)}
                    </button>
                </div>
            </div>
        </div>
    )
}