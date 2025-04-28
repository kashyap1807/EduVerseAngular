export interface Payment {
  paymentId: number;
  enrollmentId: number;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  paymentStatus: string;
}