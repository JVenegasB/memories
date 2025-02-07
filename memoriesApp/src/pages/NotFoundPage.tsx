import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return(
        <div>
            <p>Error, pagina no encontrada</p>
            <Link to="/">Volver a la pagina inicial</Link>
        </div>
    )
}