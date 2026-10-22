import { HiSearchCircle } from 'react-icons/hi';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
        <HiSearchCircle className="w-8 h-8 text-slate-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-300 mb-1">No topics found</h3>
      <p className="text-sm text-slate-500 max-w-sm">
        Try adjusting your search query or filters to find what you're looking for.
      </p>
    </div>
  );
}
