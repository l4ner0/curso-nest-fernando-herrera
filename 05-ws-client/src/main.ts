import './style.css'
import { connectToServer } from './socket-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h1>Websocket - Client</h1>
   <span id="server-status">Offline</span>
   <ul id="client-ul">
   <li>ASDAS</li>
   </ul>
  </div>
`
connectToServer();