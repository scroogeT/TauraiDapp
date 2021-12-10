import {User} from './User';

export class Message {
  constructor(public content: string, public sender: string, public createdAt: string) {
  }
}
