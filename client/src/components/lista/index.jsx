import './lista.css';
import ListaChat from './listaChat';

const Lista = () => {
    return (
        <div className='lista'>
            <div className='info'>
                <img src="/furia_logo.png" alt="logo furia" />
                <h2>Furia Club</h2>
            </div>
            <ListaChat />
        </div>
    );
}
 
export default Lista;