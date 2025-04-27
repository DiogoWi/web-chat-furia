import './App.css'
import Chat from './components/chat'
import Lista from './components/lista'
import Login from './components/login';
import { useLoginCadastro } from './context/LoginCadastroContext';

function App() {
  const { usuarioAtivo } = useLoginCadastro();

  return (
    <div className="container">
      {usuarioAtivo ? (
        <>
          <Lista />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
