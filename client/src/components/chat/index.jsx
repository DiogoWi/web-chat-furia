/* eslint-disable react-hooks/exhaustive-deps */
import EmojiPicker from 'emoji-picker-react';
import './chat.css';
import { v4 as uuid } from 'uuid';
import { useState, useRef, useEffect } from 'react';
import { useLoginCadastro } from '../../context/LoginCadastroContext';
import socket from '../../socket';
import { useMensagem } from '../../context/MensagemContext';
import buscarPlacarDaFuria from '../../service/buscarPlacar';

const Chat = () => {
    useEffect(() => {
        socket.on('mensagem', mensagem => {
            setMensagems(prev => [...prev, mensagem]);
        });

        socket.emit('entrarNaSala', chat.sala);

        return () => {
            socket.off('mensagem');
            socket.off('entrarNaSala');
        }
    }, [])

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

    const [foto, setFoto] = useState(false);

    const handleImagem = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64 = reader.result;
                setFoto({
                    nome: file.name,
                    file: base64,
                    url: URL.createObjectURL(file),
                });
            };

            reader.readAsDataURL(file)
        };
    };

    const handleMensagem = async texto => {
        let mensagemNova = {};

        if (texto === "/ultima") {
            const placarMessage = await buscarPlacarDaFuria(chat.sala, 'past');
            const mensagem = {
                id: uuid(),
                tipo: 'placar',
                placar: placarMessage,
                horario
            }

            mensagemNova = mensagem;
        } else if (texto.startsWith('/ultimas')) {
            const quantidade = texto.split(' ')[1];
            const placarMessage = await buscarPlacarDaFuria(chat.sala, 'past', quantidade);
            const mensagem = {
                id: uuid(),
                tipo: 'placar',
                placar: placarMessage,
                horario
            }

            mensagemNova = mensagem;
        }else if (texto === "/proxima") {
            const placarMessage = await buscarPlacarDaFuria(chat.sala, 'upcoming');
            const mensagem = {
                id: uuid(),
                tipo: 'placar',
                placar: placarMessage,
                horario
            }

            mensagemNova = mensagem;
        } else if (texto.startsWith('/proximas')) {
            const quantidade = texto.split(' ')[1];
            const placarMessage = await buscarPlacarDaFuria(chat.sala, 'upcoming', quantidade);
            const mensagem = {
                id: uuid(),
                tipo: 'placar',
                placar: placarMessage,
                horario
            }

            mensagemNova = mensagem;
        } else {
            const mensagem = {
                id: uuid(),
                tipo: 'mensagem',
                usuario: usuarioAtivo.id,
                foto,
                texto,
                horario,
                avatar: usuarioAtivo.avatar
            }

            mensagemNova = mensagem;
        }

        if (typeof mensagemNova.placar !== "string") {
            fetch(`http://localhost:3000/${chat.rota}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mensagemNova)
            })
            .then(response => response.json())
            .then(() => {
                setMensagems(prev => [...prev, mensagemNova])
    
                socket.emit('mensagem', { sala: chat.sala, mensagem: mensagemNova})
            })
            .catch(error => console.log("Erro ao adicionar mensagem: ", error))
        } else {
            setMensagems(prev => [...prev, mensagemNova])
        }
    }

    return (
        <div className="chat">
            <div className="top">
                <img src={usuarioAtivo.avatar.file || "/avatar.jpg"} alt="foto do usuário" />
                <div className="texts">
                    <span>{usuarioAtivo.username}</span>
                    <p>Lorem ipsum dolor, sit amet.</p>
                </div>
            </div>

            <div className="center">
                {mensagems.map((mensagem, index) => {
                    if (mensagem.tipo == 'mensagem') {
                        return (
                            <div className={mensagem.usuario == usuarioAtivo.id ? "message own" : "message"} key={index}>
                                {mensagem.usuario != usuarioAtivo.id ? <img src={mensagem.avatar.file} alt="foto de perfil" /> : ""}
                                <div className='texts'>
                                    {mensagem.foto && <img src={mensagem.foto.file} alt="foto enviada" />}
                                    {mensagem.texto && <p>{mensagem.texto}</p>}
                                    <span>{mensagem.horario}</span>
                                </div>
                            </div>
                        )
                    } else {
                        if (Array.isArray(mensagem.placar)) {
                            return mensagem.placar.map((placar, index) => (
                                <div className="placar" key={index}>
                                    <label className='ligua'>{placar.ligua}</label>
                                    <div className="dados">
                                        <div className='oponente'>
                                            <p>{placar.oponente1.name}</p>
                                            <img src={placar.oponente1.image} alt="logo" />
                                        </div>
                                        <p>{placar.oponente1.pontos} X {placar.oponente2.pontos}</p>
                                        <div className='oponente'>
                                            <img src={placar.oponente2.image} alt="logo" />
                                            <p>{placar.oponente2.name}</p>
                                        </div>
                                    </div>
                                    <span>{mensagem.horario}</span>
                                </div>
                            ))
                        } else {
                            return (
                                <div className="placar" key={index}>
                                    <p className='nenhuma_partida'>{mensagem.placar}</p>
                                </div>
                            )
                        }
                    }
                })}

                <div ref={endRef}></div>
            </div>

            <div className="bottom">
                <div className={foto ? 'preview ativo' : 'preview'}>
                    {foto && (
                        <div className='foto'>
                            <img src={foto.url} alt="preview" />
                            <p>{foto.nome}</p>
                        </div>
                    )}

                    <ion-icon name="close" onClick={() => {
                        let file = document.querySelector('#file');
                        
                        setFoto(false);
                        file.value = '';
                    }}></ion-icon>
                </div>

                <div className="icons">
                    <label htmlFor="file">
                        <ion-icon name="image-outline"></ion-icon>
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleImagem}/>
                </div>

                <input 
                    type="text" 
                    placeholder="Escreva uma mensagem..." 
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            let file = document.querySelector('#file');

                            handleMensagem(text);
                            setFoto(false);
                            file.value = '';
                            setText("");
                        }
                    }}
                    value={text}
                />

                <div className="emoji">
                    <ion-icon name="happy-outline" onClick={() => setOpen(prev => !prev)}></ion-icon>
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>

                <button className="sendButton" onClick={() => {
                    let file = document.querySelector('#file');

                    handleMensagem(text);
                    setFoto(false);
                    file.value = '';
                    setText("");
                }}>Enviar</button>
            </div>
        </div>
    );
}

export default Chat;