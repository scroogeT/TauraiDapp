import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {NgGunModule} from 'ng-gun';
import {NewRoomPageModule} from './components/new-room/new-room.module';
// import 'gun/sea';
// import 'gun/axe';

const gunConfig = {
  peers: ['https://gun-slinger.herokuapp.com/gun',], // 'http://localhost:8000/gun', 'https://gun-manhattan.herokuapp.com/gun'
  modules: {}
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NewRoomPageModule,
    NgGunModule.forRoot(gunConfig)
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
