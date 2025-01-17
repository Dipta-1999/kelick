import { Button } from './ui/button';
import {
    Users,
    Building2,
    Wallet,
    Calendar,
    Bell,
    MoreHorizontal,
    HomeIcon,
    Wallet2
} from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import Logo from "@/assets/kelicklogo.png";
const Navbar = () => {
    return (
        <div className="w-[1440px] h-auto max-h-screen">
            {/* Sidebar */}
            <div className="flex flex-col justify-between items-start p-4 w-1/6  h-auto min-h-screen bg-white border-r border-[rgba(26,26,26,0.12)]">
                {/* Logo and Navigation */}
                <div className="flex flex-col items-start gap-2 w-8">
                    {/* Logo */}
                    <div className="flex items-center p-2 px-4 gap-2">
                        <Avatar className="h-[34px] w-[100px]">
                            <AvatarImage
                                src={Logo}
                                width={33}
                                height={100}
                                alt='LOGO'
                            />
                        </Avatar>

                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-3">


                        {/* Dashboard Items */}
                        <Button variant="ghost" className="flex items-center justify-start gap-2 h-11 w-full">
                            <HomeIcon className="h-6 w-6" />
                            <span>Dashboard</span>
                        </Button>

                        <div className="px-4">
                            <span className="text-[#7A8484] font-bold tracking-[2px] text-sm">
                                ORGANIZATION
                            </span>
                        </div>

                        <Button variant="ghost" className="flex items-center justify-start gap-2 h-11 w-full">
                            <Building2 className="h-6 w-6" />
                            <span>Kelick</span>
                        </Button>

                        <div className="px-4">
                            <span className="text-[#7A8484] font-bold tracking-[2px] text-sm">
                                MANAGE
                            </span>
                        </div>
                        <Button variant="secondary" className="flex items-center justify-start gap-2 h-11 w-full bg-[#F2F5F5] border border-[#B3BEBE]">
                            <Users className="h-6 w-6" />
                            <span>Employees</span>
                        </Button>

                        <Button variant="ghost" className="flex items-center justify-start gap-2 h-11 w-full">
                            <Wallet className="h-6 w-6" />
                            <span>Payroll</span>
                        </Button>

                        <Button variant="ghost" className="flex items-center justify-start gap-2 h-11 w-full">
                            <Calendar className="h-6 w-6" />
                            <span>Leaves</span>
                        </Button>

                        <Button variant="ghost" className="flex items-center justify-start gap-2 h-11 w-full">
                            <Wallet2 className="h-6 w-6" />
                            <span>Claims</span>
                        </Button>

                        <Button variant="ghost" className="flex items-center justify-start gap-2 h-11 w-full">
                            <MoreHorizontal className="h-6 w-6" />
                            <span>More</span>
                        </Button>
                    </div>
                </div>

                {/* Footer Menu */}
                <div className="flex flex-col gap-2 w-auto mt-4">
                    <hr />
                    <Button variant="ghost" className="flex items-center justify-start gap-2 h-1 w-full my-2">
                        <Wallet2 className="h-6 w-6" />
                        <span>Free Plan</span>
                    </Button>
                    {/* Progress Section */}
                    <div className="px-4">
                        <div className="text-sm mb-2">1/10 Employees</div>
                        <div className="w-full bg-[#F2F5F5] h-1 rounded-full">
                            <div className="w-[10%] bg-[#02B9B0] h-1 rounded-full" />
                        </div>
                    </div>
                    <hr />
                    <Button variant="ghost" className="flex items-center justify-start gap-2 h-1 w-full my-2">
                        <Bell className="h-6 w-6" />
                        <span>Notification</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center justify-start gap-2  w-full">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-[#B3BEBE] bg-gray-100" />
                            <div className="flex flex-col items-start">
                                <span className="text-xs">John Doe</span>
                                <span className="text-xs text-[#5F6969]">johndoe@asure.pro</span>
                            </div>
                        </div>
                    </Button>
                    {/* <div className="border-t border-[#F2F5F5]" /> */}
                </div>
                <div className="absolute right-0 top-0 w-screen left-60">
                    {/* Header */}
                    <div className="flex items-start px-8 py-6 bg-white border-b border-[rgba(26,26,26,0.08)]">
                        <h1 className="text-3xl font-bold text-[#2E3333]">Employees</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;