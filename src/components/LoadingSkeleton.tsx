import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-zinc-100 to-slate-100 min-h-screen">
          <div className="max-w-lg mx-auto p-6 text-center bg-gradient-to-r from-slate-200 to-zinc-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 tracking-wide">Ticket Information</h1>
            <div className="bg-gradient-to-r from-zinc-100 to-slate-200 p-4 rounded-lg shadow-lg text-xl tracking-tight">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-6 w-1/4 mb-2" />
              <Skeleton className="h-6 w-2/3 mb-2" />
              <Skeleton className="h-6 w-1/4 mb-2" />
            </div>
          </div>
        </div>
      );
}

export default LoadingSkeleton;
