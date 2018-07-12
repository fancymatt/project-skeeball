export class User {
  public username: string;
  public password: string;
  public id: string;
  public isAdmin: boolean;

  constructor(username: string) {
    this.username = username;
  }
}
