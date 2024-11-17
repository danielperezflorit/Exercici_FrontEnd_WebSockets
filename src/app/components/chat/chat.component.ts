import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../models/chatMessage.model'; 

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: ChatMessage[] = []; ;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.listMessage();
  }

  sendMessage(): void {
    if (this.message) {
        const newMessage: ChatMessage = {
            text: this.message,
            type: 'sent',
            date: new Date().toISOString() // Añadir la fecha actual
        };
        this.messages.push(newMessage);
        this.chatService.sendMessage(newMessage);
        this.message = '';
        this.scrollToBottom();
    }
}


  listMessage() {
    this.chatService.getMessage().subscribe((data: { text: string, date: string }) => {
        console.log('Mensaje recibido:', data);
        this.messages.push({ text: data.text, type: 'received', date: data.date });
        this.scrollToBottom();
    });
}
  
  scrollToBottom(): void {
    const messageContainer = document.querySelector('.chat-messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

}




