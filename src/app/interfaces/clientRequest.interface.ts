export interface ClientSearch {
  sharedKey: string;
  name: string;
  email: string;
  phone: string;
  fromCreationDate: string;
  toCreationDate: string;
}

export interface ClientRequest {
  sharedKey: string;
  name: string;
  email: string;
  phone: string;
  creationDate: string;
}
