import bcrypt from "bcrypt";
interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isPasswordHashed?: boolean;
  _id?: string | unknown;
  threads?: string[] | object[];
  friends?: string[] | object[];
  communes?: string[] | object[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements UserProps {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public _id?: string | unknown;
  public threads: string[] | object[];
  public friends: string[] | object[];
  public communes: string[] | object[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public isPasswordHashed?: boolean | undefined;
  constructor({
    firstName,
    lastName,
    email,
    password,
    isPasswordHashed = true,
    _id,
    threads = [],
    friends = [],
    communes = [],
    createdAt,
    updatedAt
  }: UserProps) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    if (_id)
      this._id = _id;
    this.threads = threads;
    this.friends = friends;
    this.communes = communes;

    if (createdAt) {
      this.createdAt = createdAt;
    }
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
    if (!isPasswordHashed) {
      //hash and set password
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(password, salt);
    } else {
      this.password = password;
    }
  }

  // method to format object to send without password
  public format() {
    return {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      threads: this.threads,
      friends: this.friends,
      communes: this.communes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
