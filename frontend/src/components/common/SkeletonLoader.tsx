import React from 'react';

export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = 'h-4 w-full' }) => {
  return <div className={`bg-slate-200 dark:bg-dark-800 rounded-md animate-pulse ${className}`} />;
};

export const CarCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 rounded-2xl overflow-hidden shadow-sm animate-pulse flex flex-col">
      {/* Image Skeleton */}
      <div className="h-52 bg-slate-200 dark:bg-dark-800 w-full" />
      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="h-6 bg-slate-200 dark:bg-dark-800 rounded-md w-3/5" />
            <div className="h-5 bg-slate-200 dark:bg-dark-800 rounded-full w-14" />
          </div>
          <div className="h-4 bg-slate-200 dark:bg-dark-800 rounded-md w-2/5 mb-4" />

          {/* Specs grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-dark-800">
            <div className="h-4 bg-slate-200 dark:bg-dark-800 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-dark-800 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-dark-800 rounded w-full" />
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="h-3 bg-slate-200 dark:bg-dark-800 rounded w-12" />
            <div className="h-6 bg-slate-200 dark:bg-dark-800 rounded w-20" />
          </div>
          <div className="h-10 bg-slate-200 dark:bg-dark-800 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC<{ cols?: number }> = ({ cols = 5 }) => {
  return (
    <tr className="border-b border-slate-100 dark:border-dark-800 animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <div className="h-4 bg-slate-200 dark:bg-dark-800 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
};

export const StatCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 rounded-2xl p-6 shadow-sm animate-pulse space-y-3">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-slate-200 dark:bg-dark-800 rounded w-24" />
        <div className="w-10 h-10 bg-slate-200 dark:bg-dark-800 rounded-xl" />
      </div>
      <div className="h-8 bg-slate-200 dark:bg-dark-800 rounded w-32" />
      <div className="h-3 bg-slate-200 dark:bg-dark-800 rounded w-20" />
    </div>
  );
};

export default SkeletonLoader;
