import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DisplayService} from '../../services/display/display.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.page.html',
  styleUrls: ['./new-room.page.scss'],
})
export class NewRoomPage implements OnInit {
  roomForm: FormGroup;

  constructor(private displayService: DisplayService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      roomName: ['', Validators.required],
    });
  }

  async saveRoom() {
    await this.displayService.closeModal(this.roomForm.value);
  }

  async close() {
    await this.displayService.closeModal();
  }

}
