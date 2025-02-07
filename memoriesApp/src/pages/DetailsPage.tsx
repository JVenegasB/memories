import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Carousel from "../components/Carousel"
import { supabase } from '../supabase/client'

interface ImageDataType {
    url: string,
    ishighlight: boolean
}
interface dataType {
    title: string,
    date: Date,
    details: string
    momentimages: ImageDataType[],
    highlightImage: string
}

export default function DetailsPage() {
    const location = useLocation()
    const [images, setImages] = useState<(string | undefined)[]>([])
    const [content, setContent] = useState<dataType>()
    useEffect(() => {
        if (location.state) {
            initializeImages()
            setContent(location.state)
        }
    }, [location])
    console.log(images)

    const initializeImages = async () => {
        const imageUrls = await Promise.all(
            location.state?.momentimages.map(async (element: ImageDataType) => {
                return await fetchImage(element.url)
            })
        )
        setImages(imageUrls)
    }

    const fetchImage = async (address: string | undefined) => {
        if (!address) {
            console.error("Error obteniendo signed url")
            return
        }
        const { data, error } = await supabase.storage.from('Images').createSignedUrl(address, 60)
        if (error) {
            console.error(error)
            return
        }
        return data?.signedUrl
    }
    return (
        <div className="h-screen flex flex-col items-center ">
            <div className="w-full md:w-1/2 mt-10 mb-5 bg-gray-100/80 p-2 rounded-md flex justify-center items-center">
                <Carousel autoSlide={true}>
                    {images.map((url, index) => (
                        <div className="w-full h-64 md:h-96 overflow-hidden flex items-center justify-center" key={index}>
                            <img src={url} className="w-full h-full object-cover rounded-sm" />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className="w-1/2  bg-gray-100/80 rounded-md p-4 flex flex-col justify-center items-center">
                <h1>{content?.title}</h1>
                <p>{content?.date + ''}</p>
                <p >{content?.details}</p>
            </div>

        </div>
    )
}