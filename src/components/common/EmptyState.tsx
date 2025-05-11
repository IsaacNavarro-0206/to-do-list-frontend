import React from "react";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-lg">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default EmptyState;
