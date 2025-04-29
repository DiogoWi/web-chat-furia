import EmojiPicker from 'emoji-picker-react';
import './chat.css';
import { useState, useRef, useEffect } from 'react';
import { useLoginCadastro } from '../../context/LoginCadastroContext';
import { socket } from '../../socket';

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

    const { usuarioAtivo } = useLoginCadastro();

    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const handleEmoji = (emojiClick) => {
        setText(prev => prev + emojiClick.emoji)
    };

    const [mensagems, setMensagems] = useState([
        {
            avatar: "src/assets/imagem1.png",
            foto: "src/assets/imagem1.png",
            texto: "Mensagem enviada",
            horario: "02/03/2000"
        },
        {
            foto: "src/assets/imagem2.jpg",
            horario: "02/03/2000",
            own: true
        },
        {
            avatar: "src/assets/imagem1.png",
            texto: "Cara não acredito, a furia tá jogando muito",
            horario: "02/03/2000",
        },
        {
            texto: "Cê é loco, não compensa bater de frente",
            horario: "02/03/2000",
            own: true
        }
    ]); 

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensagems]);

    const data = new Date();
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const hora = data.getHours().toString().padStart(2, "0");
    const minuto = data.getMinutes().toString().padStart(2, "0");

    const horario = `${dia}/${mes} ${hora}:${minuto}`;

    const handleMensagem = texto => {
        const newMensagemClient = {
            texto,
            horario,
            own: true
        }

        const newMensagemServer = {
            texto,
            horario,
            avatar: usuarioAtivo.avatar.file
        }

        setMensagems(prev => [...prev, newMensagemClient])

        socketInstance.emit('mensagem', newMensagemServer)
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
                        <div className={mensagem.own ? "message own" : "message"} key={index}>
                            {mensagem.avatar && <img src={mensagem.avatar} alt="foto de perfil" />}
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