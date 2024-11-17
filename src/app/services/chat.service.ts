/*import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage() {
    return this.socket.fromEvent<string>('message-receive');
    
  }
}*/

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/chatMessage.model';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private messageSubject = new Subject<ChatMessage>();

    // Este método envía un mensaje
    sendMessage(message: ChatMessage): void {
        this.messageSubject.next(message);
    }

    // Este método se suscribe para recibir mensajes
    getMessage() {
        return this.messageSubject.asObservable();
    }
}

