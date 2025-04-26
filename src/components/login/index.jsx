import { useState } from 'react';
import './login.css';

const Login = () => {
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
            id: 1,
            cadastroUsername,
            cadastroEmail,
            cadastroSenha,
            avatar
        }

        fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(data => console.log("Usuário adicionado: ", data))
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
                    usuario = Number(key) + 1;
                    break
                }
            }

            if (usuario > 0) {
                fetch(`http://localhost:3000/usuarios/${usuario}`)
                .then(response => response.json())
                .then(data => console.log("Usuário logado: ", data))
                .catch(error => console.log("Usuário não encontrado: ", error))
            } else {
                throw new Error("Usuário não existe")
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="login">
            <div className="item">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        name="email" 
                        onChange={(event) => setLoginEmail(event.target.value)}
                        value={loginEmail}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        name="password" 
                        onChange={(event) => setLoginSenha(event.target.value)}
                        value={loginSenha}
                        required 
                    />
                    <button>Logar</button>
                </form>
            </div>

            <div className="separator"></div>

            <div className="item">
                <h2>Criar uma Conta</h2>
                <form onSubmit={handleCadastrar}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="foto do avatar" />
                        Trocar Foto
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                    <input 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                        onChange={(event) => setCadastroUsername(event.target.value)}
                        value={cadastroUsername} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        name="email" 
                        onChange={(event) => setCadastroEmail(event.target.value)}
                        value={cadastroEmail}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        name="password" 
                        onChange={(event) => setCadastroSenha(event.target.value)}
                        value={cadastroSenha}
                        required 
                    />
                    <button>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;