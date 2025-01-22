// Types for Employee Data
export interface EmployeeStats {
    totalEmployees: number;
    nationality: {
      singaporean: number;
      others: number;
    };
    status: {
      active: number;
      payrollOnly: number;
      inviteSent: number;
    };
    employmentType: {
      fullTime: number;
      partTime: number;
    };
  }
  
  export interface EmployeeData {
    Nationality: string;
    Status: string;
    'Employment Type': string;
  }
  
  export interface DashboardCardProps {
    title: string;
    stats: { [key: string]: number };
    icon: React.ReactNode;
    totalCount?: number;
  }
  
  export interface FileUploadViewProps {
    onDataProcessed: (stats: EmployeeStats) => void;
  }
  
  export interface DashboardViewProps {
    stats: EmployeeStats;
  }