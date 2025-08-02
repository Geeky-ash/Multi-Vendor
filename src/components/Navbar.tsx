'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { LayoutDashboard, LogIn, LogOut, UserPlus, Store } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full bg-white shadow px-6 py-3 flex items-center justify-between">
      {/* Logo/Brand */}
      <Link href="/" className="text-2xl font-bold text-gray-900">
        Drappi
      </Link>
      <div className="flex gap-3 items-center">
        {status === 'loading' ? (
          <span className="text-gray-400">Loading...</span>
        ) : session ? (
          <>
            {/* Vendor link if applicable */}
            {session?.user?.role === 'vendor' && (
              <Link
                href="/dashboard"
                className="flex items-center gap-1 px-3 py-2 rounded text-gray-900 hover:bg-gray-100 transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1 px-3 py-2 rounded text-gray-900 hover:bg-gray-100 border border-gray-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="flex items-center gap-1 px-3 py-2 rounded text-gray-900 hover:bg-gray-100 transition"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-1 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>
            <Link
              href="/register/vendor"
              className="flex items-center gap-1 px-3 py-2 rounded border border-gray-300 text-gray-900 hover:bg-gray-100 transition"
            >
              <Store className="w-4 h-4" />
              Become a Vendor
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
