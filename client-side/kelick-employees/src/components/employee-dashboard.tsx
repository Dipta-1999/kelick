import React, { useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Globe, Briefcase } from 'lucide-react';

interface EmployeeStats {
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

interface DashboardCardProps {
  title: string;
  stats: { [key: string]: number };
  icon: React.ReactNode;
  totalCount?: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, stats, icon, totalCount }) => (
  <Card className="flex-1 bg-white rounded-xl shadow-sm">
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-[#F2F5F5] rounded-lg">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{value}</span>
              {totalCount && totalCount > 0 && (
                <span className="text-gray-400 text-sm">
                  ({((value / totalCount) * 100).toFixed(1)}%)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const EmployeeDashboard: React.FC = () => {
  const [employeeStats, setEmployeeStats] = useState<EmployeeStats>({
    totalEmployees: 0,
    nationality: { singaporean: 0, others: 0 },
    status: { active: 0, payrollOnly: 0, inviteSent: 0 },
    employmentType: { fullTime: 0, partTime: 0 },
  });

  const calculateStats = (employeeData: string[][]): EmployeeStats => {
    const initialStats: EmployeeStats = {
      totalEmployees: 0,
      nationality: { singaporean: 0, others: 0 },
      status: { active: 0, payrollOnly: 0, inviteSent: 0 },
      employmentType: { fullTime: 0, partTime: 0 },
    };

    return employeeData.reduce((acc, employee) => {
      if (!employee || employee.length < 4) return acc;

      acc.totalEmployees++;

      const nationality = employee[1]?.toLowerCase() || '';
      if (nationality === 'singaporean') acc.nationality.singaporean++;
      else acc.nationality.others++;

      const status = employee[2]?.toLowerCase() || '';
      if (status === 'active') acc.status.active++;
      else if (status === 'payroll only') acc.status.payrollOnly++;
      else if (status === 'invite sent') acc.status.inviteSent++;

      const employmentType = employee[3]?.toLowerCase() || '';
      if (employmentType === 'full time') acc.employmentType.fullTime++;
      else if (employmentType === 'part time') acc.employmentType.partTime++;

      return acc;
    }, initialStats);
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').map((row) => row.split(','));
      const stats = calculateStats(rows.slice(1)); // Skip header row
      setEmployeeStats(stats);
    };
    reader.readAsText(file);
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-4 p-2 border rounded"
        />
      </div>
      <div
        className="flex flex-row items-center gap-4"
        style={{
          width: '1124px',
          height: '202px',
        }}
      >
        <DashboardCard
          title="Total Employees"
          stats={{ Total: employeeStats.totalEmployees }}
          icon={<Users className="h-6 w-6 text-[#02B9B0]" />}
        />

        <DashboardCard
          title="Status"
          stats={employeeStats.status}
          icon={<Clock className="h-6 w-6 text-[#02B9B0]" />}
          totalCount={employeeStats.totalEmployees}
        />

        <DashboardCard
          title="Nationality"
          stats={employeeStats.nationality}
          icon={<Globe className="h-6 w-6 text-[#02B9B0]" />}
          totalCount={employeeStats.totalEmployees}
        />

        <DashboardCard
          title="Employment Type"
          stats={employeeStats.employmentType}
          icon={<Briefcase className="h-6 w-6 text-[#02B9B0]" />}
          totalCount={employeeStats.totalEmployees}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
