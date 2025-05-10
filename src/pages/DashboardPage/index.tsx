import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ListsContainer from "@/components/dashboard/ListsContainer";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-8">
        <DashboardHeader />

        <ListsContainer />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
