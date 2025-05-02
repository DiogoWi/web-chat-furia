/* eslint-disable react-hooks/exhaustive-deps */
import './listaChat.css';
import socket from '../../../socket';
import { useEffect } from 'react';
import { useMensagem } from '../../../context/MensagemContext';

const ListaChat = ({ setOpen }) => {
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
            <div className="item" onClick={() => {
                handleSala("csgo");
                setOpen(false);
            }}>
                <img src="/capaCSGO.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia CS:GO</span>
                    <p>Smoke no meio, bora!</p>
                </div>
            </div>
            <div className="item" onClick={() => {
                handleSala("valorant");
                setOpen(false);
            }}>
                <img src="/capaValorant.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia Valorant</span>
                    <p>Planta no site A!</p>
                </div>
            </div>
            <div className="item" onClick={() => {
                handleSala("lol");
                setOpen(false);
            }}>
                <img src="/capaLOL.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia LOL</span>
                    <p>Dragão em 30s</p>
                </div>
            </div>
            <div className="item" onClick={() => {
                handleSala("rl");
                setOpen(false);
            }}>
                <img src="/capaRocket.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia Rocket League</span>
                    <p>Gol de placa!</p>
                </div>
            </div>
            <div className="item" onClick={() => {
                handleSala("r6siege");
                setOpen(false);
            }}>
                <img src="/capaRainbow.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Furia Rainbow 6 Siege</span>
                    <p>Invasão pelo teto!</p>
                </div>
            </div>
        </div>
    );
}
 
export default ListaChat;