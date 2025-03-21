// import {supabase} from '../supabase/client';
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { supabase } from '../supabase/client';
import { PiSpinnerGapBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface InputElementProps {
    label: string;
    type: React.HTMLInputTypeAttribute;
    name: string;
    id: string;
    value: string;
    action: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface TextAreaElementProps {
    label: string;
    name: string;
    id: string;
    value: string;
    action: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
interface ImageDataType {
    url: string;
    ishighlight: boolean;
}

const InputElement = ({ label, type, name, id, value, action }: InputElementProps) => {
    return (
        <div className="flex flex-col space-y-2 ">
            <label htmlFor={id} className="font-bold">{label}</label>
            <input type={type} name={name} id={id} className="rounded-md border-2 px-2" value={value} onChange={action} />
        </div>
    )
}
const TextAreaElement = ({ label, name, id, value, action }: TextAreaElementProps) => {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={id} className="font-bold">{label}</label>
            <textarea name={name} id={id} rows={5} className="rounded-md border-2 px-2" value={value} onChange={action} />
        </div>
    )
}


interface ImageType {
    url: string;
    name: string;
    file: File;
}
export default function CreateNewMemory() {
    const navigate = useNavigate();
    const [images, setImages] = useState<ImageType[]>([]);
    const [highlightImage, setHighlightImage] = useState<ImageType>();
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            const newImages = Array.from(files).map(file => {
                return {
                    url: URL.createObjectURL(file),
                    name: file.name,
                    file
                }
            });
            setImages((prev) => [...prev, ...newImages]);
        }
    }
    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        if (highlightImage && index === images.indexOf(highlightImage)) {
            setHighlightImage(undefined);
        }
    }
    const handleHighlightImage = (index: number) => {
        setHighlightImage(images[index]);
    }
    useEffect(() => {
        console.log(images)
    }, [images])
    const [disableSend, setDisableSend] = useState(true);
    const [data, setData] = useState({
        title: '',
        date: '',
        description: '',
    })
    const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if (data.title && data.date && data.description && images.length > 0 && highlightImage) {
            setDisableSend(false);
        } else {
            setDisableSend(true);
        }
    }, [images, highlightImage, data])

    const sentData = async () => {
        setDisableSend(true);
        setLoading(true)
        const uploadPromise = images.map((file) => {
            const filePath = 'Images/' + data.date + '/' + file.name;
            return supabase.storage.from('Images').upload(filePath, file.file, { upsert: false })
        })
        const results = await Promise.all(uploadPromise);
        const imageData: ImageDataType[] = [];
        results.forEach(({ data, error }, index) => {
            if (error) {
                console.error(`Error uploading file ${images[index].name}:`, error);
            } else {
                const isHighLight = images[index].name === highlightImage?.name;
                imageData.push({
                    url: data.path,
                    ishighlight: isHighLight 
                });

                console.log(`File ${images[index].name} uploaded successfully:`, data);
            }
        });
        console.log(data,imageData)
        const { data: uploadData, error: uploadError } = await supabase.rpc('create_memory', {
            date: data.date,
            details: data.description,
            title: data.title,
            imagedata: imageData
        })
        if (uploadError) {
            console.error('Error uploading memory:', uploadError);
            return;
        }
        if (uploadData) {
            console.log('Memory uploaded successfully:', uploadData);
            navigate('/')
        }
        setLoading(false);
        setDisableSend(false);
    }
    const [loading, setLoading] = useState(false);	





    return (
        <div className="w-full overflow-auto flex items-center justify-center min-h-screen">
            <div className="md:w-1/2 w-full mx-2 my-2 p-4 border-black border-2 rounded-md text-black flex justify-center space-y-4 flex-col bg-white/95">
                <h1 className="text-2xl font-bold">Nueva memory</h1>
                <InputElement label='Titulo' type='text' name='title' id='title' value={data.title} action={handleData} />
                <InputElement label='Fecha' type='date' name='date' id='date' value={data.date} action={handleData} />
                <TextAreaElement label="Descripción" name="description" id="description" value={data.description} action={handleData} />

                <div className="flex flex-col space-y-2">
                    <label htmlFor="image" className="font-bold">Imagen</label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 border-2 w-fit p-2 rounded-md">
                            <input id="images" type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                            <button type="button" onClick={() => document.getElementById("images")?.click()}>
                                <div className="flex flex-row items-center space-x-2">
                                    <FaImage />
                                    <p>Add Images</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    {highlightImage && (
                        <div>
                            <img src={highlightImage.url} alt={highlightImage.name} className="w-full h-64 object-cover rounded-md" />
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                    {images.length > 0 && (
                        images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img src={image.url} alt={image.name} className="w-full h-24 object-cover rounded-md cursor-pointer" onClick={() => handleHighlightImage(index)} />
                                <button className="absolute top-1 right-1 bg-red-500 text-white group-hover:opacity-100 transition-opacity" onClick={() => removeImage(index)}><IoClose /></button>
                            </div>
                        ))
                    )}
                </div>
                
                <button className={`text-white rounded-md p-2 ${disableSend ? 'bg-black/25' : 'bg-black'}`} disabled={disableSend} onClick={sentData} >{loading ? (<div className="flex flex-row items-center justify-center space-x-2">
                        <p>Cargando datos</p><PiSpinnerGapBold/>
                    </div>) : (
                    <div>
                        <p>Crea una memoria</p>
                    </div>
                )}</button>
            </div>
        </div>
    )
}