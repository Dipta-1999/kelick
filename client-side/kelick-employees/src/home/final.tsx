import React, { useState } from 'react';
import FileUploadView from '@/components/file-upload-view';
import DashboardView from '@/components/dashboard-view';
import { EmployeeStats } from '@/types';
import Navbar from '@/components/navbar';
import HomeContent from '@/components/home-content';

const HomePageAnother = () => {
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
            <Navbar/>
            <div className="absolute pl-32 ml-32 top-24 w-[90%] h-screen">
                {/* {currentView === 'upload' ? (
                    // <HomeContent/>
                    <FileUploadView onDataProcessed={handleDataProcessed} />
                ) : (
                    <DashboardView stats={employeeStats} />
                )} */}
                <HomeContent/>
            </div>
        </>
    );
};

export default HomePageAnother;