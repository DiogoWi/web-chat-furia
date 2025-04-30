/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext, useEffect } from "react";

export const MensagemContext = createContext();
MensagemContext.displayName = "Mensagem";

const MensagemContextProvider = ({ children }) => {
    // Initial Provider State
    const [chat, setChat] = useState({ sala: "cs_go", rota: "mensagens_cs_go"});

    const [mensagems, setMensagems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/${chat}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setMensagems(data)
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
        fetch(`http://localhost:3000/${chat.rota}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setMensagems(data)
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