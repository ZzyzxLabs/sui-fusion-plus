"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavbarProps {
  activeTab?: "cross-chain-swap" | "manage-orders" | "resolver";
  onTabChange?: (
    tab: "cross-chain-swap" | "manage-orders" | "resolver"
  ) => void;
}

export default function Navbar({
  activeTab = "cross-chain-swap",
  onTabChange,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (
    tab: "cross-chain-swap" | "manage-orders" | "resolver"
  ) => {
    onTabChange?.(tab);
    setIsMobileMenuOpen(false);

    // Navigate to the appropriate route
    switch (tab) {
      case "cross-chain-swap":
        router.push("/");
        break;
      case "manage-orders":
        router.push("/manage-orders");
        break;
      case "resolver":
        router.push("/resolver");
        break;
    }
  };

  // Determine active tab based on current pathname
  const getActiveTab = () => {
    if (pathname === "/") return "cross-chain-swap";
    if (pathname === "/manage-orders") return "manage-orders";
    if (pathname === "/resolver") return "resolver";
    return "cross-chain-swap";
  };

  const currentActiveTab = getActiveTab();

  return (
    <nav className='bg-gray-900 shadow-lg border-b border-gray-700'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo and Brand */}
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <h1 className='text-xl font-bold text-white'>Sui Fusion Plus</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              <button
                onClick={() => handleTabClick("cross-chain-swap")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentActiveTab === "cross-chain-swap"
                    ? "bg-blue-600 text-white border-b-2 border-blue-400"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                Cross-Chain Swap
              </button>
              <button
                onClick={() => handleTabClick("manage-orders")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentActiveTab === "manage-orders"
                    ? "bg-blue-600 text-white border-b-2 border-blue-400"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                Manage Orders
              </button>
              <button
                onClick={() => handleTabClick("resolver")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentActiveTab === "resolver"
                    ? "bg-blue-600 text-white border-b-2 border-blue-400"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                Resolver
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
            >
              <span className='sr-only'>Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-700'>
          <button
            onClick={() => handleTabClick("cross-chain-swap")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              currentActiveTab === "cross-chain-swap"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
          >
            Cross-Chain Swap
          </button>
          <button
            onClick={() => handleTabClick("manage-orders")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              currentActiveTab === "manage-orders"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
          >
            Manage Orders
          </button>
          <button
            onClick={() => handleTabClick("resolver")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              currentActiveTab === "resolver"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
          >
            Resolver
          </button>
        </div>
      </div>
    </nav>
  );
}
