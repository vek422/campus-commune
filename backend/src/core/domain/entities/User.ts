export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public threads: string[] | object[],
    public friends: string[] | object[],
    public communes: string[] | object[],
    public password: string,
    public id: string | unknown
  ) {}
}
