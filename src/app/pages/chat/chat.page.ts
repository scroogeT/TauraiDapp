import {Component, OnInit, ViewChild} from '@angular/core';
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
              private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.roomName = params.room;
      this.chatRoom = this.gunService.gun.get('chat-rooms').get(this.roomName);

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
