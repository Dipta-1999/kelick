import React, { useState, useCallback } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { EmployeeStats } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users, Upload, UserPlus, Download, Clock, Globe, Briefcase } from "lucide-react";
import * as XLSX from 'xlsx';
import FileUploadView from './file-upload-view';
import DashboardView from '@/components/dashboard-view';



const HomeContent = () => {


  const [currentView, setCurrentView] = useState<'upload' | 'dashboard'>('upload');
  const [employeeStats, setEmployeeStats] = useState<EmployeeStats>({
    totalEmployees: 0,
    nationality: { singaporean: 0, others: 0 },
    status: { active: 0, payrollOnly: 0, inviteSent: 0 },
    employmentType: { fullTime: 0, partTime: 0 }
  });

  const handleDataProcessed = (stats: EmployeeStats) => {
    setEmployeeStats(stats);
    setCurrentView('dashboard');
  };



  return (
    <>
    {currentView === 'upload' ? (
      <Card className="m-8 flex flex-col items-center justify-center h-auto w-auto gap-8">
        <div className="flex flex-col items-center gap-8 md:mx-2 relative">
          <div className="w-auto h-auto bg-gray-100 rounded-full flex items-center justify-center mt-8">
            <img src="./users.svg" alt="users-pic" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-bold text-[#2E3333]">Start building your team</h2>
            <p className="text-[#5F6969]">Add your first team member or import your entire team.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 col-span-2 mb-8">
          
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-6 w-6" />
                  Bulk Upload
                </Button>
              </DialogTrigger>
              <DialogTitle>

              </DialogTitle>
              <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto  p-6 bg-white rounded-2xl border border-[#B3BEBE]">
                <FileUploadView onDataProcessed={handleDataProcessed} />
              </DialogContent>
            </Dialog>
          
          <Button className="gap-2 bg-[#02B9B0] hover:bg-[#597a79]">
            <UserPlus className="h-6 w-6" />
            Add Employee
          </Button>
        </div>
      </Card>
      ) : (
        <DashboardView stats={employeeStats} />
      )}
    </>

  );
};
export default HomeContent;