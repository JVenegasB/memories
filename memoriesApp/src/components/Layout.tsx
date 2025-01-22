import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <div className='flex flex-row h-screen'>
            <Navbar />
            <div className='overflow-auto'>
                <Outlet />
            </div>
        </div>
    )
}