import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, Globe, Briefcase, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';

// Types
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

interface EmployeeData {
    Nationality: string;
    Status: string;
    'Employment Type': string;
}

interface DashboardCardProps {
    title: string;
    stats: { [key: string]: number };
    icon: React.ReactNode;
    totalCount?: number;
}

const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
};

// File processing functions
const processCSV = (csvText: string): EmployeeData[] => {
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

const processExcel = async (file: File): Promise<EmployeeData[]> => {
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

const calculateStats = (data: EmployeeData[]): EmployeeStats => {
    const stats: EmployeeStats = {
        totalEmployees: 0,
        nationality: { singaporean: 0, others: 0 },
        status: { active: 0, payrollOnly: 0, inviteSent: 0 },
        employmentType: { fullTime: 0, partTime: 0 }
    };

    data.forEach(employee => {
        stats.totalEmployees++;

        // Process nationality
        if (employee.Nationality?.toLowerCase() === 'singaporean') {
            stats.nationality.singaporean++;
        } else {
            stats.nationality.others++;
        }

        // Process status
        const status = employee.Status?.toLowerCase();
        if (status === 'active') stats.status.active++;
        else if (status === 'payroll only') stats.status.payrollOnly++;
        else if (status === 'invite sent') stats.status.inviteSent++;

        // Process employment type
        const empType = employee['Employment Type']?.toLowerCase();
        if (empType === 'full time') stats.employmentType.fullTime++;
        else if (empType === 'part time') stats.employmentType.partTime++;
    });

    return stats;
};

// File Upload Component
const FileUploadView = ({ onDataProcessed }: { onDataProcessed: (stats: EmployeeStats) => void }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const processFile = async (file: File) => {
        try {
            setLoading(true);
            let data: EmployeeData[];

            if (file.type === 'text/csv') {
                const text = await file.text();
                data = processCSV(text);
            } else {
                data = await processExcel(file);
            }

            const stats = calculateStats(data);
            onDataProcessed(stats);
        } catch (err) {
            setError("Error processing file. Please check the file format.");
        } finally {
            setLoading(false);
        }
    };

    const validateFile = (file: File) => {
        const validTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (!validTypes.includes(file.type)) {
            setError("Please upload only CSV or XLSX files");
            return false;
        }
        setError("");
        return true;
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && validateFile(droppedFile)) {
            setFile(droppedFile);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const selectedFile = e.target.files?.[0];
        if (selectedFile && validateFile(selectedFile)) {
            setFile(selectedFile);
        }
    };

    const handleContinue = async () => {
        if (!file) {
            setError("Please upload a file first");
            return;
        }

        await processFile(file);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardContent className="p-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Upload Employee Data</h2>
                        <p className="text-gray-600 mt-2">Drag and drop your CSV or XLSX file</p>
                    </div>

                    <div
                        className={classNames(
                            "border-2 border-dashed rounded-lg p-8 text-center",
                            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
                            "transition-all duration-200 ease-in-out"
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            accept=".csv,.xlsx"
                            onChange={handleChange}
                            className="hidden"
                        />

                        <div className="flex flex-col items-center gap-4">
                            <Upload className="h-12 w-12 text-gray-400" />
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    {file ? file.name : "Drop your file here, or"}
                                </p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => inputRef.current?.click()}
                                >
                                    Browse
                                </Button>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                    )}

                    <div className="mt-6">
                        <Button
                            className="w-full"
                            onClick={handleContinue}
                            disabled={!file || loading}
                        >
                            {loading ? "Processing..." : "Continue"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Dashboard Card Component
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

// Dashboard View Component
const DashboardView: React.FC<{ stats: EmployeeStats }> = ({ stats }) => {
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

// Main App Component
const App = () => {
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
        <div>
            {currentView === 'upload' ? (
                <FileUploadView onDataProcessed={handleDataProcessed} />
            ) : (
                <DashboardView stats={employeeStats} />
            )}
        </div>
    );
};

export default App;