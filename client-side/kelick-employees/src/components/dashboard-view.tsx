import React from 'react';
import { Users, Clock, Globe, Briefcase } from 'lucide-react';
import DashboardCard from './dashboard-card';
import { DashboardViewProps } from '@/types';

const DashboardView: React.FC<DashboardViewProps> = ({ stats }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Employees"
            stats={{ Total: stats.totalEmployees }}
            icon={<Users className="h-6 w-6 text-[#02B9B0]" />}
          />

          <DashboardCard
            title="Status"
            stats={stats.status}
            icon={<Clock className="h-6 w-6 text-[#02B9B0]" />}
            totalCount={stats.totalEmployees}
          />

          <DashboardCard
            title="Nationality"
            stats={stats.nationality}
            icon={<Globe className="h-6 w-6 text-[#02B9B0]" />}
            totalCount={stats.totalEmployees}
          />

          <DashboardCard
            title="Employment Type"
            stats={stats.employmentType}
            icon={<Briefcase className="h-6 w-6 text-[#02B9B0]" />}
            totalCount={stats.totalEmployees}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;