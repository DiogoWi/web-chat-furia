import EmojiPicker from 'emoji-picker-react';
import './chat.css';
import { useState, useRef, useEffect } from 'react';
import { useLoginCadastro } from '../../context/LoginCadastroContext';

const Chat = () => {
    const { usuarioAtivo } = useLoginCadastro();

    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleEmoji = (emojiClick) => {
        setText(prev => prev + emojiClick.emoji)
    };

    return (
        <div className="chat">
            <div className="top">
                <img src={usuarioAtivo.avatar.file} alt="foto do usuário" />
                <div className="texts">
                    <span>{usuarioAtivo.username}</span>
                    <p>Lorem ipsum dolor, sit amet.</p>
                </div>
            </div>

            <div className="center">
                <div className="message">
                    <img src="src/assets/imagem1.png" alt="foto enviada" />
                    <div className="texts">
                        <img src="src/assets/imagem1.png" alt="foto enviada" />
                        <p>Mensagem enviada</p>
                        <span>02/03/2000</span>
                    </div>
                </div>
                
                <div className="message own">
                    <div className="texts">
                        <img src="src/assets/imagem2.jpg" alt="foto enviada" />
                        <span>02/03/2000</span>
                    </div>
                </div>

                <div className="message">
                    <img src="src/assets/imagem1.png" alt="foto enviada" />
                    <div className="texts">
                        <p>Cara não acredito a furia tá jogando muito</p>
                        <span>02/03/2000</span>
                    </div>
                </div>

                <div className="message own">
                    <div className="texts">
                        <p>Cê é loco, não compensa bater de frente</p>
                        <span>02/03/2000</span>
                    </div>
                </div>

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

                <button className="sendButton">Send</button>
            </div>
        </div>
    );
}

export default Chat;