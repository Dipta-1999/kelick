import React, { useState, useCallback } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users, Upload, UserPlus, Download } from "lucide-react";


interface FileUploadDialogProps {
  onUploadComplete?: (file: File) => void;
}

const HomeContent: React.FC<FileUploadDialogProps> = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Handle file selection
  const handleFileSelect = (file: File | null) => {
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setSelectedFile(file);
    } else {
      alert('Please upload an XLSX file');
    }
  };

  // Handle file input change
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };

  // Handle drag and drop
  const handleDrag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setIsDragging(true);
    } else if (event.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0] || null;
    handleFileSelect(file);
  }, []);

  // Handle continue button click
  const handleContinue = () => {
    if (selectedFile) {
      // Here you would typically handle the file upload to your server
      console.log('Uploading file:', selectedFile);
      // Notify parent component that upload is complete
      if (onUploadComplete) {
        onUploadComplete(selectedFile);
      }
    } else {
      alert('Please select a file first');
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setSelectedFile(null);
  };


  // Handle template download
const handleDownloadTemplate = () => {
  // Define the data structure
  const data = [
    ['Employee ID', 'Employee Profile', 'Email', 'Role', 'Status'], // Headers
    ['FHAJ3717', 'profile 1', 'example@asure.pro', 'Senior Marketer', 'Active'],
    ['JFE5342', 'profile 3', 'example@asure.pro', 'Product Manager', 'Payroll Only']
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




  return (

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
          <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto p-6 bg-white rounded-2xl border border-[#B3BEBE]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">Upload File</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col sm:gap-6 gap-6 h-full">


              {/* Upload Section */}
              <div className={`flex-1 border-2 border-dashed border-gray-200 rounded-lg p-8 ${isDragging ? 'border-[#02B9B0] bg-[#F2F5F5]' : 'border-gray-200'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}>
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept=".xlsx"
                    onChange={handleFileInput}
                  />
                  <div className="p-4 rounded-full bg-gray-50">
                    <img src="./empty-folder.svg" width={72} />
                  </div>
                  <div className="space-y-2">
                    {selectedFile ? (
                      <p className="text-sm text-gray-600">
                        Selected file: {selectedFile.name}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Drag and drop your file here,<br /> or{" "}
                        <label
                          htmlFor="fileInput"
                          className="text-sm text-gray-600 font-medium cursor-pointer underline"
                        >
                          click to upload
                        </label>
                      </p>
                    )}
                  </div>
                </div>
              </div>


              {/* Template Download Section */}
              <div className="bg-[#F2F5F5] rounded-lg p-3 sm:p-4">
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
              <div className="flex justify-end gap-3 mt-auto">
                <Button variant="outline" className="rounded-xl" onClick={handleCancel}>Cancel</Button>
                <Button variant="outline" className="text-[#FFFFFF] bg-[#02B9B0] rounded-xl" onClick={handleContinue}>Continue</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button className="gap-2 bg-[#02B9B0] hover:bg-[#597a79]">
          <UserPlus className="h-6 w-6" />
          Add Employee
        </Button>
      </div>
    </Card>

  );
};
export default HomeContent;