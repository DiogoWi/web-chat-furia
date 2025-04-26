import './App.css'
import Chat from './components/chat'
import Lista from './components/lista'
import Login from './components/login';

function App() {
  const usuario = false;

  return (
    <div className="container">
      {usuario ? (
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
