export interface Exception {
  statusCode: number;
  name: string;
  message: string;
  stack?: string;
}
