import './listaChat.css';
import { socket } from '../../../socket';
import { useState } from 'react';

const ListaChat = () => {
    const [socketInstance] = useState(socket());

    const handleSala = sala => {
        socketInstance.emit('entrarNaSala', sala);
    }

    return ( 
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <ion-icon name="search-outline"></ion-icon>
                    <input type="text" placeholder="Pesquisar" />
                </div>
            </div>

            <div className="item" onClick={() => handleSala("CS:GO")}>
                <img src="/avatar.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia CS:GO</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item" onClick={() => handleSala("Valorant")}>
                <img src="/avatar.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia Valorant</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item" onClick={() => handleSala("LOL")}>
                <img src="/avatar.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia LOL</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Usuário</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Usuário</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
        </div>
    );
}
 
export default ListaChat;