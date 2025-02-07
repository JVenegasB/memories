import Card from '../components/Card'
import { supabase } from '../supabase/client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface dataType {
    title: string,
    date: Date,
    details: string
    momentimages: ImageDataType[],
    highlightImage: string
}
interface ImageDataType {
    url: string,
    ishighlight: boolean
}
export default function Home() {
    const navigate = useNavigate()
    const [data, setData] = useState<dataType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const fetchData = async () => {
        const { data, error } = await supabase.rpc('fetch_memories')

        if (error) {
            console.error(error)
            return
        }
        const newData = await Promise.all(data.map(async (element: dataType) => {
            const highlight = element.momentimages.find((img: ImageDataType) => img.ishighlight);
            let highlightImage = '';
            if (highlight) {
                highlightImage = await fetchImage(highlight.url) || '';
            }
            const dateObj = new Date(element.date);
            const newDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;

            return {
                title: element.title,
                date: newDate,
                details: element.details,
                highlightImage,
                momentimages: element.momentimages,
            };
        }));

        newData.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return dateB.getTime() - dateA.getTime();
        });

        setData(newData)
        setLoading(false)
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

    useEffect(() => {
        fetchData()
    }, [])
    const handleClick = (element: dataType) => {
        navigate('/details', { state: element })
    }
    return (
        <div className="w-full overflow-auto flex flex-col items-center justify-center py-5">
            <h1 className="mb-5 text-2xl font-semibold">Memories</h1>
            <div className="w-full lg:px-20 md:px-14 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {loading ? (<div className='h-full flex justify-center items-center w-full col-span-full bg-gray-200 text-gray-700 text-xl font-semibold p-4 rounded-md shadow-md'>
                    Cargando memorias...
                </div>) : (
                    data.map((element, key) => (
                        <div key={key} onClick={() => handleClick(element)}>
                            <Card id={key} image={element.highlightImage} title={element.title} date={element.date} details={element.details} images={element.momentimages} />
                        </div>
                    ))
                )}


            </div>
        </div>
    )
}