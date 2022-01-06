import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomMetaService {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot) {
    return route.paramMap.get('id');
  }
}
