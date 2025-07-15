"use client";
export default function Error({ message }) {
  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  );
}