interface StudentInfo {
    name?: string;
    image?: string;
    studentId?: string;
  }
  
  
 export interface DashboardSidePagesProps {
  student?: StudentInfo;
  batch?: string | number;
  department?: string;
  }
  