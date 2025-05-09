/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext, useEffect } from "react";
const url = import.meta.env.VITE_URL;

export const MensagemContext = createContext();
MensagemContext.displayName = "Mensagem";

const MensagemContextProvider = ({ children }) => {
    // Initial Provider State
    const [chat, setChat] = useState({ sala: "csgo", rota: "mensagens_cs_go"});

    const [mensagems, setMensagems] = useState([]);

    useEffect(() => {
        fetch(`${url}/api/${chat.rota}`)
        .then(response => response.json())
        .then(data => {
            setMensagems(data);
        })
    }, []);

    return (
        <MensagemContext.Provider value={{ chat, setChat, mensagems, setMensagems }}>
            {children}
        </MensagemContext.Provider>
    );
}

export default MensagemContextProvider;

export const useMensagem = () => {
    const { chat, setChat, mensagems, setMensagems } = useContext(MensagemContext);

    const trocarMensagens = async () => {
        fetch(`${url}/api/${chat.rota}`)
        .then(response => response.json())
        .then(data => {
            setMensagems(data);
        })
    }

    return {
        chat,
        setChat,
        mensagems,
        setMensagems,
        trocarMensagens
    }
}