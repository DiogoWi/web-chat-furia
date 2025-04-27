import './listaChat.css';

const ListaChat = () => {
    return ( 
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <ion-icon name="search-outline"></ion-icon>
                    <input type="text" placeholder="Pesquisar" />
                </div>
            </div>

            <div className="item">
                <img src="/avatar.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Usuário</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Usuário</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Usuário</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Usuário</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
            <div className="item">
                <img src="/avatar.png" alt="foto avatar"/>
                <div className="texts">
                    <span>Usuário</span>
                    <p>Ultima mensagem</p>
                </div>
            </div>
        </div>
    );
}
 
export default ListaChat;