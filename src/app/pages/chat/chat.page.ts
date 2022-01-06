import {Component, OnInit, ViewChild} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Message} from '../../models/Message';
import {User} from '../../models/User';
import {IonContent} from '@ionic/angular';
import {NgGunService} from 'ng-gun';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  messages: Message[] = [];
  newMsg = '';
  currentUser: User;
  chatRoom: any;
  roomName = 'chatroom';

  constructor(private gunService: NgGunService, private authService: AuthService,
              private route: ActivatedRoute, private metaService: Meta) { }

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.roomName = params.room;
      this.chatRoom = this.gunService.gun.get('chat-rooms').get(this.roomName);

      this.metaService.addTags([
        { name: 'keywords', content: 'Angular chat, decentralised chat, ionic gun js chat' },
        { name: 'author', content: 'Isaac Chikutukutu' },
        { name: 'description', content: `Room ${this.roomName} with ID: ${params.room}`},
        { property: 'og:type', content: 'image/*'},
        { property: 'og:title', content: this.roomName},
        { property: 'og:description', content: `Room ${this.roomName} with ID: ${params.room}`},
        { property: 'og:url', content: 'https://app.momint.so/m/60b0c06862cc4b0264b2c69e' },
        { property: 'og:image', content: 'https://momintdev.blob.core.windows.net/uploads/f4470c3b-e59c-46f3-bbd0-00fd17295bcf.PNG' },
      ]);

      await this.chatRoom.get('messages').map().once(async (message, id) => {
        this.messages.push(message);
        await this.content.scrollToBottom();
      });
    });
    this.authService.getUsername().then(res => {
      this.currentUser = new User('person', res.value);
    });
  }

  async sendMessage() {
    const index = new Date().toISOString();
    // const msg = this.chatRoom.get(index).put({
    //       content: this.newMsg,
    //       sender: this.currentUser.username,
    //       createdAt: index
    //     });

    this.chatRoom.get('messages').set({
      content: this.newMsg,
      sender: this.currentUser.username,
      createdAt: index
    });
    this.newMsg = '';
    await this.content.scrollToBottom();
  }

}
