import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload } from 'lucide-react';
import { FileUploadViewProps } from '@/types';
import { classNames, processCSV, processExcel, calculateStats } from '@/utils';

const FileUploadView: React.FC<FileUploadViewProps> = ({ onDataProcessed }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDownloadTemplate = () => {
        // Define the data structure
        const data = [
            ['Employee ID', 'Employee Profile', 'Email', 'Role', 'Status', 'Nationality', 'Emloyment Type'], // Headers
            ['FHAJ3717', 'profile 1', 'example@asure.pro', 'Senior Marketer', 'Active', 'Singaporean', 'Full Time'],
            ['JFE5342', 'profile 3', 'example@asure.pro', 'Product Manager', 'Payroll Only', 'Singaporean', 'Full Time']
        ];

        // Convert the data to a CSV string
        const csvContent = data.map(row => row.join(',')).join('\n');

        // Create a Blob with the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a download link
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'employee_template.csv';

        // Trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up the link
        document.body.removeChild(link);
    };

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
            let data;

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

    const handleCancel = () => {
        setSelectedFile(null);
      };

    return (
        // <div className="min-h-screen  flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl h-auto">
                <CardContent className="p-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold">Upload File</h2>
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
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <input
                                ref={inputRef}
                                type="file"
                                accept=".csv,.xlsx"
                                onChange={handleChange}
                                className="hidden"
                            />
                            <div className="p-4 rounded-full bg-gray-50">
                                <img src="./empty-folder.svg" width={72} />
                            </div>
                            <div className="flex flex-col items-center gap-4">

                                <div className="space-y-2">
                                    <p className="text-gray-600">
                                        {file ? file.name : "Drag and drop your file here,"} <br /> or {" "}
                                        <label
                                            htmlFor="fileInput"
                                            className="text-sm text-gray-600 font-medium cursor-pointer underline"
                                            onClick={() => inputRef.current?.click()}
                                        >
                                            click to upload
                                        </label>
                                    </p>

                                </div>
                            </div>
                        </div>

                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                    )}

                    {/* Template Download Section */}
                    <div className="bg-[#F2F5F5] rounded-lg p-3 sm:p-4 mt-3">
                        <div className="flex items-center justify-between">
                            <img src="./microsoft-excel.svg" />
                            <div className="space-y-2  px-7">
                                <h3 className="font-medium">Table Example</h3>
                                <div className="flex flex-row justify-between space-x-7">

                                    <p className="text-sm text-gray-500 pr-7">
                                        You can download the attached example and use them as a starting point for your own file.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={handleDownloadTemplate}
                                        className="flex items-center gap-2 rounded-xl"
                                    >
                                        <Download size={16} />
                                        Template XLSX
                                    </Button>
                                </div>

                            </div>

                        </div>
                    </div>


                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" className="rounded-xl" onClick={handleCancel}>Cancel</Button>
                        <Button variant="outline" className="text-[#FFFFFF] bg-[#02B9B0] rounded-xl" onClick={handleContinue} disabled={!file || loading}>
                            {loading ? "Processing..." : "Continue"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        // </div >
    );
};

export default FileUploadView;