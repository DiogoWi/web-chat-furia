import { useState } from 'react';
import './App.css'
import Chat from './components/chat'
import Lista from './components/lista'
import Login from './components/login';
import { useLoginCadastro } from './context/LoginCadastroContext';

function App() {
  const { usuarioAtivo } = useLoginCadastro();
  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      {usuarioAtivo ? (
        <>
          <Lista setOpen={setOpen} open={open}/>
          <Chat setOpen={setOpen} />
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
