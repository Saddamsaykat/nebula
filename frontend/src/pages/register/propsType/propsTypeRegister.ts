export interface Student {
  name: string;
  email: string;
  number: string;
  presentAddress: string;
  permanentAddress: string;
  // imageUrl: string;
  role: string;
  generateStudentRandomNumber: string;
  studentId: string;
}

export interface DepartmentData {
  [key: string]: Student[]; // Key is department name, value is an array of students
}

export interface BatchData {
  _id: string;
  batch: string;
  department: DepartmentData;
}
