import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import HomeContent from './components/home-content'
import HomePage from './home/entry-page'
import EmployeeDashboard from './components/employee-dashboard'
import HomePageAnother from './home/final'

function App() {

  return (
    <>
      {/* <HomePage/> */}
      <HomePageAnother/>
      {/* <EmployeeDashboard/> */}
    </>
  )
}

export default App
// import React, { useState } from "react";
// import {useDropzone} from "react-dropzone";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Users, Clock, Globe, Briefcase } from "lucide-react";

// interface EmployeeStats {
//   totalEmployees: number;
//   nationality: {
//     singaporean: number;
//     others: number;
//   };
//   status: {
//     active: number;
//     payrollOnly: number;
//     inviteSent: number;
//   };
//   employmentType: {
//     fullTime: number;
//     partTime: number;
//   };
// }

// const parseCSVorXLSX = async (file: File): Promise<any[]> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const text = e.target?.result as string;
//       const lines = text.split(/\r?\n/);
//       const headers = lines[0].split(",");

//       const data = lines.slice(1).map((line) => {
//         const values = line.split(",");
//         const obj: Record<string, string> = {};
//         headers.forEach((header, index) => {
//           obj[header.trim()] = values[index]?.trim() || "";
//         });
//         return obj;
//       });

//       resolve(data);
//     };

//     reader.onerror = (error) => reject(error);
//     reader.readAsText(file);
//   });
// };

// const calculateStats = (employeeData: any[]): EmployeeStats => {
//   const initialStats: EmployeeStats = {
//     totalEmployees: 0,
//     nationality: { singaporean: 0, others: 0 },
//     status: { active: 0, payrollOnly: 0, inviteSent: 0 },
//     employmentType: { fullTime: 0, partTime: 0 },
//   };

//   return employeeData.reduce((acc, employee) => {
//     if (!employee) return acc;

//     acc.totalEmployees++;

//     const nationality = employee.Nationality?.toLowerCase() || "";
//     if (nationality === "singaporean") {
//       acc.nationality.singaporean++;
//     } else {
//       acc.nationality.others++;
//     }

//     const status = employee.Status?.toLowerCase() || "";
//     if (status === "active") acc.status.active++;
//     else if (status === "payroll only") acc.status.payrollOnly++;
//     else if (status === "invite sent") acc.status.inviteSent++;

//     const employmentType = employee["Employment Type"]?.toLowerCase() || "";
//     if (employmentType === "full time") acc.employmentType.fullTime++;
//     else if (employmentType === "part time") acc.employmentType.partTime++;

//     return acc;
//   }, initialStats);
// };

// const EmployeeDashboard: React.FC<{ employeeStats: EmployeeStats }> = ({ employeeStats }) => (
//   <div className="space-y-4">
//     <div className="flex flex-row items-center gap-4">
//       <DashboardCard
//         title="Total Employees"
//         stats={{ Total: employeeStats.totalEmployees }}
//         icon={<Users className="h-6 w-6 text-[#02B9B0]" />}
//       />

//       <DashboardCard
//         title="Status"
//         stats={employeeStats.status}
//         icon={<Clock className="h-6 w-6 text-[#02B9B0]" />}
//         totalCount={employeeStats.totalEmployees}
//       />

//       <DashboardCard
//         title="Nationality"
//         stats={employeeStats.nationality}
//         icon={<Globe className="h-6 w-6 text-[#02B9B0]" />}
//         totalCount={employeeStats.totalEmployees}
//       />

//       <DashboardCard
//         title="Employment Type"
//         stats={employeeStats.employmentType}
//         icon={<Briefcase className="h-6 w-6 text-[#02B9B0]" />}
//         totalCount={employeeStats.totalEmployees}
//       />
//     </div>
//   </div>
// );

// const DashboardCard: React.FC<{
//   title: string;
//   stats: { [key: string]: number };
//   icon: React.ReactNode;
//   totalCount?: number;
// }> = ({ title, stats, icon, totalCount }) => (
//   <Card className="flex-1 bg-white rounded-xl shadow-sm">
//     <CardContent className="p-6">
//       <div className="flex items-center gap-4 mb-4">
//         <div className="p-3 bg-[#F2F5F5] rounded-lg">{icon}</div>
//         <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//       </div>
//       <div className="space-y-3">
//         {Object.entries(stats).map(([key, value]) => (
//           <div key={key} className="flex justify-between items-center">
//             <span className="text-gray-600 capitalize">
//               {key.replace(/([A-Z])/g, " $1").trim()}
//             </span>
//             <div className="flex items-center gap-2">
//               <span className="font-semibold">{value}</span>
//               {totalCount && totalCount > 0 && (
//                 <span className="text-gray-400 text-sm">
//                   ({((value / totalCount) * 100).toFixed(1)}%)
//                 </span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </CardContent>
//   </Card>
// );

// const App: React.FC = () => {
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [employeeStats, setEmployeeStats] = useState<EmployeeStats | null>(null);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       "text/csv": [".csv"],
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
//     },
//     onDrop: async (acceptedFiles:any) => {
//       if (acceptedFiles.length > 0) {
//         const file = acceptedFiles[0];
//         setUploadedFile(file);
//         const data = await parseCSVorXLSX(file);
//         const stats = calculateStats(data);
//         setEmployeeStats(stats);
//       }
//     },
//   });

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//       {!employeeStats ? (
//         <div className="space-y-6">
//           <div
//             {...getRootProps({
//               className: `p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
//                 isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
//               }`,
//             })}
//           >
//             <input {...getInputProps()} />
//             <p className="text-gray-500 text-center">
//               Drag and drop your .csv or .xlsx file here, or click to upload.
//             </p>
//           </div>
//           {uploadedFile && (
//             <div className="text-center">
//               <p className="text-gray-700">Selected File: {uploadedFile.name}</p>
//               <Button onClick={() => {}} variant="outline">
//                 Continue
//               </Button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <EmployeeDashboard employeeStats={employeeStats} />
//       )}
//     </div>
//   );
// };

// export default App;
