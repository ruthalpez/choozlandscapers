import { Skeleton } from "@/components/ui/skeleton";

const ListingSkeleton = () => {
  return (
    <main>
      <div className="container xl:max-w-[1340px] mx-auto px-5 pt-5 pb-10">
        <div className="w-full">
          <Skeleton className="h-10 w-[400px] animate-pulse bg-gray-200 mb-5" />

          <Skeleton className="h-5 w-[250px] animate-pulse bg-gray-200 mb-10" />

          <Skeleton className="h-120 w-full rounded-3xl animate-pulse bg-gray-200 mb-10" />
        </div>
      </div>
    </main>
  );
};

export default ListingSkeleton;
