import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}
  handleConnection(client: Socket) {

    const token = client.handshake.headers.autentication as string;

    console.log('token: ', token);

    this.messagesWsService.registerClient(client);

    this.wss.emit('client-updated', this.messagesWsService.getConnectedClients());
  }
  handleDisconnect(client: Socket) {
    /* console.log('Cliente desconectado: ', client.id); */
    this.messagesWsService.removeClient(client.id);
    
    this.wss.emit('client-updated', this.messagesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto){
    
    //! Emite únicamente al cliente
    /* client.emit('message-from-server', {
      fullName: 'Soy Yo!',
      message: payload.message || 'no message!!!'
    }); */

    //! Emitir a todos MENOS, al cliente inicial
    /* client.broadcast.emit('message-from-server', {
      fullName: 'Soy Yo!',
      message: payload.message || 'no message!!!'
    }) */

    this.wss.emit('message-from-server', {
      fullName: 'Soy Yo!',
      message: payload.message || 'no message!!!'
    });
  }
}
