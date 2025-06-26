"use client";
import AuthProvider from '@/components/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('authToken', 'dummy-token');
    router.push('/');
  };

  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex justify-center items-center py-16">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Login</h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">Username or Email Address *</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                placeholder="Enter your username or email"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Password *</label>
              <input 
                type="password" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="h-4 w-4 text-red-500 rounded focus:ring-red-500"
              />
              <label htmlFor="remember" className="ml-2 text-gray-700">Remember me</label>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Log In
            </button>
            
            <div className="text-center mt-4">
              <Link href="/forgot-password" className="text-red-500 hover:underline">Lost your password?</Link>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <Link href="/register" className="text-red-500 font-medium hover:underline">Register now</Link>
          </div>
        </div>
      </main>
    </div>
    </AuthProvider>
  );
}