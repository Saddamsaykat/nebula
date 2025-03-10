import { Outlet } from "react-router-dom";
import DashboardSidePages from "./pages/DashboardSidePages";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-300 p-4 transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button
                    className="lg:hidden absolute top-4 right-4 text-xl"
                    onClick={() => setIsOpen(false)}
                >
                    ✖
                </button>
                <ul className="menu text-base-content h-full">
                    <DashboardSidePages />
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full ">
                {/* Mobile Menu Button */}
                <div className="lg:hidden p-4">
                    <button onClick={() => setIsOpen(true)} className="text-2xl">
                        <FiMenu />
                    </button>
                </div>
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;