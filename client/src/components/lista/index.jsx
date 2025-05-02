import './lista.css';
import ListaChat from './listaChat';

const Lista = ({ setOpen, open }) => {
    return (
        <div className={open ? 'lista ativo' : 'lista'}>
            <div className='info'>
                <img src="/furia_logo.png" alt="logo furia" />
                <h2>Furia Club</h2>
            </div>
            <ListaChat setOpen={setOpen}/>
        </div>
    );
}
 
export default Lista;