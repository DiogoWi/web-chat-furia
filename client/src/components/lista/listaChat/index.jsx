/* eslint-disable react-hooks/exhaustive-deps */
import './listaChat.css';
import socket from '../../../socket';
import { useEffect } from 'react';
import { useMensagem } from '../../../context/MensagemContext';

const ListaChat = () => {
    const { chat, setChat, trocarMensagens } = useMensagem();

    useEffect(() => {
        trocarMensagens();
    }, [chat]);

    const handleSala = sala => {
        socket.emit('entrarNaSala', sala);

        if (sala === "cs_go") {
            setChat({ sala, rota: 'mensagens_cs_go'});
        } else if (sala === "valorant") {
            setChat({ sala, rota: 'mensagens_valorant'});
        } else {
            setChat({ sala, rota: 'mensagens_lol'});
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

            <div className="item" onClick={() => handleSala("cs_go")}>
                <img src="/avatar.jpg" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia CS:GO</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item" onClick={() => handleSala("valorant")}>
                <img src="/avatar.jpg" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia Valorant</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item" onClick={() => handleSala("lol")}>
                <img src="/avatar.jpg" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia LOL</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
        </div>
    );
}
 
export default ListaChat;