export default function AuthProvider({ children }) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    );
  }