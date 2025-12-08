export interface ApiResponseType<T> {
  status: number;
  error?: string;
  messages?: string;
  data?: T;
}
