import { Payment } from "./payment.model";

export interface Enrollment {
  enrollmentId: number;
  courseId: number;
  userId: number;
  courseTitle?: string;
  enrollmentDate: Date;
  paymentStatus: string;
  Payment: Payment;
}