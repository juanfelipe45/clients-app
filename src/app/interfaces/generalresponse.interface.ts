export interface GeneralResponse<T> {
  header: HeaderResponse;
  body: T;
}

export interface HeaderResponse {
  code: number;
  message: string;
}
