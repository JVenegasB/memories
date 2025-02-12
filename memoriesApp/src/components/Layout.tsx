import { Outlet, /*useNavigate*/ } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import BackGround from '../assets/KintsubiBackground.jpg';

export default function Layout() {
    const navigate = useNavigate();
    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate('/login');
            }
        })
    }, [])

    return (
        <div className='flex flex-row h-screen'>
            <Navbar />
            <div className='overflow-auto w-full max-h-screen object-cover' style={{
                backgroundImage: `url(${BackGround})`, // Set the background image
                backgroundSize: 'cover', // Adjust the size of the background image
                backgroundPosition: 'center', // Center the background image
                backgroundRepeat: 'no-repeat'
            }}>
                <Outlet />
            </div>
        </div>
    )
}