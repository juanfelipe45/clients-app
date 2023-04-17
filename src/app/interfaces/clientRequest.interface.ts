export interface ClientSearch {
  sharedKey: string;
  name: string;
  email: string;
  phone: string;
  fromCreationDate: string | null;
  toCreationDate: string | null;
}

export interface ClientRequest {
  sharedKey: string;
  name: string;
  email: string;
  phone: string;
  creationDate: string;
}
