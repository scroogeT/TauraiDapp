import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth/auth.guard';
import {AutoLoginGuard} from './guards/auto-login/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'chat/:room',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'chat-rooms',
    loadChildren: () => import('./pages/chat-rooms/chat-rooms.module').then(m => m.ChatRoomsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'new-room',
    loadChildren: () => import('./components/new-room/new-room.module').then( m => m.NewRoomPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
