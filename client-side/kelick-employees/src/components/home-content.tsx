import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Users, Upload, UserPlus } from "lucide-react";

const HomeContent = () => {
    return(
    
         <Card className="m-8 flex flex-col items-center justify-center h-[489px] gap-8">
          <div className="flex flex-col items-center gap-8">
            <div className="w-[220px] h-[220px] bg-gray-100 rounded-full flex items-center justify-center">
              {/* <Users size={100} className="text-gray-400" /> */}
              <img src="./users.svg" alt="users-pic" />
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-3xl font-bold text-[#2E3333]">Start building your team</h2>
              <p className="text-[#5F6969]">Add your first team member or import your entire team.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Upload className="h-6 w-6" />
              Bulk Upload
            </Button>
            <Button className="gap-2 bg-[#02B9B0] hover:bg-[#02A5A0]">
              <UserPlus className="h-6 w-6" />
              Add Employee
            </Button>
          </div>
        </Card>   
    
    );
};
export default HomeContent;