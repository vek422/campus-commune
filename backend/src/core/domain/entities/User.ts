import bcrypt from "bcrypt";
interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isPasswordHashed?: boolean;
  id?: string | unknown;
  threads?: string[] | object[];
  friends?: string[] | object[];
  communes?: string[] | object[];
}

export class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public id?: string | unknown;
  public threads: string[] | object[];
  public friends: string[] | object[];
  public communes: string[] | object[];

  constructor({
    firstName,
    lastName,
    email,
    password,
    isPasswordHashed = true,
    id,
    threads = [],
    friends = [],
    communes = [],
  }: UserProps) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = id;
    this.threads = threads;
    this.friends = friends;
    this.communes = communes;

    if (!isPasswordHashed) {
      //hash and set password
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(password, salt);
    } else {
      this.password = password;
    }
  }
}
