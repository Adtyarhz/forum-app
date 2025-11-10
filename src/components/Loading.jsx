import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <LoadingBar style={{ backgroundColor: '#3182ce', height: '4px', position: 'fixed', top: 0, zIndex: 9999 }} />
    </div>
  );
}

export default Loading;