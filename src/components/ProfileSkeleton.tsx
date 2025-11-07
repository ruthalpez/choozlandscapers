import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <main>
      <div className="container xl:max-w-[1340px] mx-auto px-5 pt-5 pb-10">
        <div className="flex items-start flex-col lg:flex-row justify-between gap-16 sm:mt-5">
          <div className="w-full">
            <Skeleton className="h-10 w-[400px] animate-pulse bg-gray-200 mb-4" />

            <Skeleton className="h-5 w-[250px] animate-pulse bg-gray-200 mb-2" />

            <Skeleton className="h-5 w-[300px] animate-pulse bg-gray-200 mb-8" />

            <Skeleton className="h-80 w-full animate-pulse bg-gray-200 mb-10" />

            <Skeleton className="h-10 w-[400px] animate-pulse bg-gray-200 mb-4" />

            <Skeleton className="h-50 w-full animate-pulse bg-gray-200 mb-2" />

          </div>
          <div className="w-full lg:max-w-[408px]">
            <Skeleton className="h-[800px] w-full animate-pulse bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileSkeleton;
