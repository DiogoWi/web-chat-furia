/* eslint-disable react-hooks/exhaustive-deps */
import EmojiPicker from 'emoji-picker-react';
import './chat.css';
import { v4 as uuid } from 'uuid';
import { useState, useRef, useEffect } from 'react';
import { useLoginCadastro } from '../../context/LoginCadastroContext';
import { socket } from '../../socket';
import { useMensagem } from '../../context/MensagemContext';

const Chat = () => {
    const [socketInstance] = useState(socket());

    useEffect(() => {
        socketInstance.on('mensagem', mensagem => {
            console.log('Mensagem recebida: ', mensagem)

            setMensagems(prev => [...prev, mensagem]);
        });

        return () => {
            socketInstance.off('mensagem')
        }
    }, [socketInstance])

    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const handleEmoji = (emojiClick) => {
        setText(prev => prev + emojiClick.emoji)
    };

    const { chat, mensagems, setMensagems } = useMensagem();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensagems]);

    const { usuarioAtivo } = useLoginCadastro();

    const data = new Date();
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const hora = data.getHours().toString().padStart(2, "0");
    const minuto = data.getMinutes().toString().padStart(2, "0");

    const horario = `${dia}/${mes} ${hora}:${minuto}`;

    const handleMensagem = texto => {
        // const newMensagemClient = {
        //     texto,
        //     horario,
        //     own: true
        // }

        // const newMensagemServer = {
        //     texto,
        //     horario,
        //     avatar: usuarioAtivo.avatar.file
        // }

        const mensagemTeste = {
            id: uuid(),
            usuario: usuarioAtivo.id,
            texto,
            horario,
            avatar: usuarioAtivo.avatar
        }

        fetch(`http://localhost:3000/${chat}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mensagemTeste)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Mensagem cadastrada: ", data);
            setMensagems(prev => [...prev, mensagemTeste])

            socketInstance.emit('mensagem', mensagemTeste)
        })
        .catch(error => console.log("Erro ao adicionar mensagem: ", error))
    }

    return (
        <div className="chat">
            <div className="top">
                <img src={usuarioAtivo.avatar.file || "/avatar.png"} alt="foto do usuário" />
                <div className="texts">
                    <span>{usuarioAtivo.username}</span>
                    <p>Lorem ipsum dolor, sit amet.</p>
                </div>
            </div>

            <div className="center">
                {mensagems.map((mensagem, index) => {
                    return (
                        <div className={mensagem.usuario == usuarioAtivo.id ? "message own" : "message"} key={index}>
                            {mensagem.usuario != usuarioAtivo.id ? <img src={mensagem.avatar.file} alt="foto de perfil" /> : ""}
                            <div className='texts'>
                                {mensagem.foto && <img src={mensagem.foto} alt="foto enviada" />}
                                {mensagem.texto && <p>{mensagem.texto}</p>}
                                <span>{mensagem.horario}</span>
                            </div>
                        </div>
                    )
                })}

                <div ref={endRef}></div>
            </div>

            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <ion-icon name="image-outline"></ion-icon>
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                </div>

                <input 
                    type="text" 
                    placeholder="Escreva uma mensagem..." 
                    onChange={e => setText(e.target.value)}
                    value={text}
                />

                <div className="emoji">
                    <ion-icon name="happy-outline" onClick={() => setOpen(prev => !prev)}></ion-icon>
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>

                <button className="sendButton" onClick={() => {
                    handleMensagem(text);
                    setText("");
                }}>Enviar</button>
            </div>
        </div>
    );
}

export default Chat;