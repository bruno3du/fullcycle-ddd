import Address from "../address";

interface CustomerProps {
  id: string;
  name: string;
  address: Address;
}

export default class Customer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active = false;

  constructor(props: CustomerProps) {
    this._id = props.id;
    this._name = props.name;
    this._address = props.address;

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get isActive(): boolean {
    return this._active;
  }

  set address(address: Address) {
    this._address = address;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
