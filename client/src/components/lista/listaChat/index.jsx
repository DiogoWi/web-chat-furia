/* eslint-disable react-hooks/exhaustive-deps */
import './listaChat.css';
import { socket } from '../../../socket';
import { useEffect, useState } from 'react';
import { useMensagem } from '../../../context/MensagemContext';

const ListaChat = () => {
    const [socketInstance] = useState(socket());
    const { chat, setChat, trocarMensagens } = useMensagem();

    useEffect(() => {
        trocarMensagens();
    }, [chat]);

    const handleSala = sala => {
        socketInstance.emit('entrarNaSala', sala);

        if (sala === "CS:GO") {
            setChat('mensagens_cs_go');
        } else if (sala === "Valorant") {
            setChat('mensagens_valorant');
        } else {
            setChat('mensagens_lol');
        }
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