import React, { memo } from 'react';

const Loader = () => (
  <div className="flex justify-center items-center py-3">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-700" />
  </div>
);

export const MemoizedLoader = memo(Loader);
