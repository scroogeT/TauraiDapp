import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import {BehaviorSubject} from 'rxjs';
import {DisplayService} from '../display/display.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  isOnline: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  connectionType: string;

  constructor(private displayService: DisplayService) {}

  async init() {
    await this.getNetworkStatus();
    Network.addListener('networkStatusChange', async status => {
      this.isOnline.next(status.connected);
      this.connectionType = status.connectionType;
      const msg = status.connected ? `Network is now connected on ${status.connectionType}` : `Network is now disconnected`;
      const color = status.connected ? 'success' : 'danger';
      await this.displayService.showToast(msg, color);
    });
  }

  async getNetworkStatus() {
    Network.getStatus().then(status => {
      this.isOnline.next(status.connected);
      this.connectionType = status.connectionType;
      return status;
    });
  }
}
