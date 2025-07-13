export interface Enrollment {
  enrollmentId: number;
  courseId: number;
  courseTitle?: string;
  userId: number;
  enrollmentDate: Date;
  paymentStatus: string;
  coursePaymentDto: CoursePaymentDto;
}

export interface CoursePaymentDto {
  paymentId: number;
  enrollmentId: number;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  paymentStatus: string;
}