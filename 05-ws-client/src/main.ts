import './style.css'
import { connectToServer } from './socket-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h1>Websocket - Client</h1>
   <span id="server-status">Offline</span>
   <ul id="client-ul"></ul>

   <form id="message-form">
    <input placeholder="message" id="message-input" />
   </form>

   <h3>Messages</h3>
   <ul id="messages-ul"></ul>
  </div>
`
connectToServer();