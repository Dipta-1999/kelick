import EmployeeDash from "@/components/employee-dash";
import EmployeeDashboard from "@/components/employee-dashboard";
import HomeContent from "@/components/home-content";
import Navbar from "@/components/navbar";

const HomePage = () => {
    return (
        <>
            <Navbar/>
            <div className="absolute pl-32 ml-32 top-20 w-[90%] h-screen">
                <HomeContent/>
                
            </div>
        </>
    );
};
export default HomePage;
