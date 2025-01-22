import { EmployeeData, EmployeeStats } from './types';
import * as XLSX from 'xlsx';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const processCSV = (csvText: string): EmployeeData[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    return row;
  }).filter(row => row.Nationality || row.Status || row['Employment Type']);
};

export const processExcel = async (file: File): Promise<EmployeeData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        // Convert binary string to employee data
        const bytes = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i++) {
          bytes[i] = data.charCodeAt(i) & 0xff;
        }
        const workbook = XLSX.read(bytes, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        resolve(jsonData as EmployeeData[]);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};

export const calculateStats = (data: EmployeeData[]): EmployeeStats => {
  const stats: EmployeeStats = {
    totalEmployees: 0,
    nationality: { singaporean: 0, others: 0 },
    status: { active: 0, payrollOnly: 0, inviteSent: 0 },
    employmentType: { fullTime: 0, partTime: 0 }
  };

  data.forEach(employee => {
    stats.totalEmployees++;

    if (employee.Nationality?.toLowerCase() === 'singaporean') {
      stats.nationality.singaporean++;
    } else {
      stats.nationality.others++;
    }

    const status = employee.Status?.toLowerCase();
    if (status === 'active') stats.status.active++;
    else if (status === 'payroll only') stats.status.payrollOnly++;
    else if (status === 'invite sent') stats.status.inviteSent++;

    const empType = employee['Employment Type']?.toLowerCase();
    if (empType === 'full time') stats.employmentType.fullTime++;
    else if (empType === 'part time') stats.employmentType.partTime++;
  });

  return stats;
};