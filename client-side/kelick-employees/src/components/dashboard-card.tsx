import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DashboardCardProps } from '@/types';

const DashboardCard: React.FC<DashboardCardProps> = ({ title, stats, icon, totalCount }) => (
  <Card className="flex-1 bg-white rounded-xl shadow-sm">
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-[#F2F5F5] rounded-lg">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
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

export default DashboardCard;