interface StudentInfo {
    name?: string;
    image?: string;
    studentId?: string;
  }
  
  interface UserInfo {
    student?: StudentInfo;
    batch?: string | number;
    department?: string;
  }
  
 export interface DashboardSidePagesProps {
    userInfo: UserInfo | null;
    userEmail?: string;
  }
  