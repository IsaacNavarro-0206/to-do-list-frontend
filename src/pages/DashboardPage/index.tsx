import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ListsContainer from "@/components/dashboard/ListsContainer";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <DashboardHeader />

      <ListsContainer />
    </div>
  );
};

export default DashboardPage;
