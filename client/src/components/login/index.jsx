import './login.css';
import { useLoginCadastro } from '../../context/LoginCadastroContext';

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
            </div>
        </div>
    );
}

export default Login;