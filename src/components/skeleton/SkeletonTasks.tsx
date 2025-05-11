import { Skeleton } from "../ui/skeleton";

const SkeletonTasks = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <Skeleton className="h-6 w-1/5 mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="h-6 w-1/5 mb-4" />
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonTasks;
