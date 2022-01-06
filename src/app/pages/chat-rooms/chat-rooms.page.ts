import { Component, OnInit } from '@angular/core';
import {NgGunService} from 'ng-gun';
import {DisplayService} from '../../services/display/display.service';
import {NewRoomPage} from '../../components/new-room/new-room.page';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.page.html',
  styleUrls: ['./chat-rooms.page.scss'],
})
export class ChatRoomsPage implements OnInit {
  rooms: any[] = [];
  roomsHandle: any;

  constructor(private gunService: NgGunService, private displayService: DisplayService,
              private authService: AuthService) { }

  async ngOnInit() {
    this.roomsHandle = this.gunService.gun.get('chat-rooms');
    this.roomsHandle.map().once((room, id) => {
      this.rooms.push(id);
    });
  }

  async createRoom() {
    await this.displayService.showModal(NewRoomPage, true).then(async res => {
      if(res.data) {
        const room = this.gunService.gun.get(res.data.roomName);
        this.roomsHandle.set(room);
        await this.displayService.showToast(`room ${res.data.roomName} created !`, 'success');
      }
    });
  }

  async logout() {
    await this.authService.logout();
  }

}
