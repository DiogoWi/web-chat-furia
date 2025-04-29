/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext } from "react";

export const MensagemContext = createContext();
MensagemContext.displayName = "Mensagem";

const MensagemContextProvider = ({ children }) => {
    // Initial Provider State
    const [chat, setChat] = useState("mensagens_cs_go");

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
        fetch(`http://localhost:3000/${chat}`)
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