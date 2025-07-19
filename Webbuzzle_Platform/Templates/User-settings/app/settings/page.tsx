"use client";

import React, { useState, useEffect } from 'react';

interface SettingsData {
  email: string;
  twoFactorEnabled: boolean;
  loginHistory: string[];
  connectedAccounts: string[];
  activeSessions: string[];
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch settings from the real API endpoint
  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();
      setSettings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Toggle two-factor authentication status using a real API endpoint
  const toggleTwoFactor = async () => {
    try {
      const response = await fetch('/api/settings/twofactor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ twoFactorEnabled: !settings?.twoFactorEnabled })
      });
      if (!response.ok) {
        throw new Error('Failed to update two-factor authentication');
      }
      const updatedData = await response.json();
      setSettings(updatedData);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg">Loading settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p>No settings data available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 mr-3" />
            <h1 className="text-3xl font-bold text-white">My App Dashboard</h1>
          </div>
          <nav className="space-x-4">
            <a href="/dashboard" className="text-white hover:text-gray-200">Dashboard</a>
            <a href="/settings" className="text-white font-semibold">Settings</a>
            <a href="/profile" className="text-white hover:text-gray-200">Profile</a>
          </nav>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="hidden md:block w-64 bg-white shadow-xl p-6">
          <nav>
            <ul className="space-y-4">
              <li>
                <a href="/dashboard" className="block text-gray-700 hover:text-blue-600">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/settings" className="block text-blue-600 font-semibold">
                  Settings
                </a>
              </li>
              <li>
                <a href="/profile" className="block text-gray-700 hover:text-blue-600">
                  Profile
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-10">
          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">User Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Information */}
              <div className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Account Information</h3>
                <p className="text-gray-600">
                  <span className="font-bold">Email:</span> {settings.email}
                </p>
              </div>

              {/* Security */}
              <div className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Security</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.twoFactorEnabled}
                    onChange={toggleTwoFactor}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-gray-600">
                    Enable Two-Factor Authentication
                  </span>
                </div>
              </div>

              {/* Login History */}
              <div className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Login History</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {settings.loginHistory.map((entry, index) => (
                    <li key={index}>{entry}</li>
                  ))}
                </ul>
              </div>

              {/* Connected Accounts */}
              <div className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Connected Accounts</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {settings.connectedAccounts.map((account, index) => (
                    <li key={index}>{account}</li>
                  ))}
                </ul>
              </div>

              {/* Active Sessions */}
              <div className="border rounded-lg p-4 md:col-span-2">
                <h3 className="text-xl font-semibold mb-2">Active Sessions</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {settings.activeSessions.map((session, index) => (
                    <li key={index}>{session}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          &copy; 2025 My App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SettingsPage;
