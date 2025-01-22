import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return(
        <div>
            Error, pagina no encontrada
            <Link to="/">Volver a la pagina inicial</Link>
        </div>
    )
}