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

        if (sala === "csgo") {
            setChat({ sala, rota: 'mensagens_cs_go'});
        } else if (sala === "valorant") {
            setChat({ sala, rota: 'mensagens_valorant'});
        } else if (sala === "lol") {
            setChat({ sala, rota: 'mensagens_lol'});
        } else if (sala === "rl") {
            setChat({ sala, rota: 'mensagens_rocketLeague'});
        } else {
            setChat({ sala, rota: 'mensagens_r6'});
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

            <div className="item" onClick={() => handleSala("csgo")}>
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
            <div className="item" onClick={() => handleSala("rl")}>
                <img src="/avatar.jpg" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia Rocket League</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item" onClick={() => handleSala("r6siege")}>
                <img src="/avatar.jpg" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia Rainbow 6 Siege</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
        </div>
    );
}
 
export default ListaChat;