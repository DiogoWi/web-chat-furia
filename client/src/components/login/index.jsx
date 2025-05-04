import './login.css';
import { useLoginCadastro } from '../../context/LoginCadastroContext';
import { useState } from 'react';

const Login = () => {
    const { 
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
    } = useLoginCadastro();

    const [cadastroOpen, setCadastroOpen] = useState(false);

    return (
        <div className="loginContainer">
            <div className={cadastroOpen ? 'item transparente' : 'item'}>
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
                    <button onClick={() => setCadastroOpen(true)}>Cadastrar</button>
            </div>

            <div className="separator"></div>

            <div className={cadastroOpen ? 'item' : 'item transparente'}>
                <h2>Criar uma Conta</h2>
                <form onSubmit={handleCadastrar}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.jpg"} alt="foto do avatar" />
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
                <button onClick={() => setCadastroOpen(false)}>Logar</button>
            </div>

            <img src="/bg.jpg" alt="teste" className={cadastroOpen ? 'capa ativo' : 'capa'} />
        </div>
    );
}

export default Login;