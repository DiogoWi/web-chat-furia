/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from 'uuid';

export const LoginCadastroContext = createContext();
LoginCadastroContext.displayName = "Login"

const LoginCadastroProvider = ({ children }) => {
    // Initial Provider State
    const [usuarioAtivo, setUsuarioAtivo] = useState(false);

    return (
        <LoginCadastroContext.Provider value={{ usuarioAtivo, setUsuarioAtivo }}>
            {children}
        </LoginCadastroContext.Provider>
    );
}

export default LoginCadastroProvider;

export const useLoginCadastro = () => {
    const { usuarioAtivo, setUsuarioAtivo } = useContext(LoginCadastroContext);

    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
    });

    const handleAvatar = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64 = reader.result;
                setAvatar({
                    file: base64,
                    url: URL.createObjectURL(file),
                });
            };

            reader.readAsDataURL(file)
        };
    };

    const [cadastroUsername, setCadastroUsername] = useState("");
    const [cadastroEmail, setCadastroEmail] = useState("");
    const [cadastroSenha, setCadastroSenha] = useState("");

    const handleCadastrar = async (event) => {
        event.preventDefault();

        const usuario = {
            id: uuid(),
            username: cadastroUsername,
            email: cadastroEmail,
            senha: cadastroSenha,
            avatar
        }

        fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Usuário adicionado: ", data);
            setUsuarioAtivo(data);
        })
        .catch(error => console.log("Erro ao adicionar: ", error))
    }

    const [loginEmail, setLoginEmail] = useState("");
    const [loginSenha, setLoginSenha] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        let usuario = 0;

        fetch("http://localhost:3000/usuarios")
        .then(response => response.json())
        .then(data => {

            for (const key in data) {
                if (data[key].email == loginEmail && data[key].senha == loginSenha) {
                    usuario = data[key].id;
                    break
                }
            }

            if (usuario > 0) {
                fetch(`http://localhost:3000/usuarios/${usuario}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Usuário logado: ", data);
                    setUsuarioAtivo(data);
                })
                .catch(error => console.log("Falha no Login: ", error))
            } else {
                throw new Error("Falha no Login")
            }
        })
        .catch(error => console.log(error))
    }

    return {
        usuarioAtivo,
        avatar,
        handleAvatar,
        cadastroUsername,
        setCadastroUsername,
        cadastroEmail,
        setCadastroEmail,
        cadastroSenha,
        setCadastroSenha,
        handleCadastrar,
        loginEmail,
        setLoginEmail,
        loginSenha,
        setLoginSenha,
        handleLogin
    }
}