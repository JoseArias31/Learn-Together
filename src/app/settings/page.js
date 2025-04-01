"use client"

import { useState } from "react"
import NavBar from "../components/navBar"
import Footer from "../components/footer"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen bg-[#050505] text-white ">
        <NavBar/>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account preferences and settings</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-black/40 border border-green-500/10 rounded-lg overflow-hidden backdrop-blur-sm">
              <nav className="flex flex-col">
                {[
                  { id: "profile", label: "Profile", icon: "user" },
                  { id: "account", label: "Account", icon: "shield" },
                  { id: "appearance", label: "Appearance", icon: "palette" },
                  { id: "notifications", label: "Notifications", icon: "bell" },
                  { id: "privacy", label: "Privacy", icon: "lock" },
                  { id: "integrations", label: "Integrations", icon: "plug" },
                  { id: "billing", label: "Billing", icon: "credit-card" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-green-500/10 text-green-400 border-l-2 border-green-500"
                        : "text-gray-300 hover:bg-black/60 hover:text-white"
                    }`}
                  >
                    <TabIcon name={item.icon} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-black/40 border border-green-500/10 rounded-lg p-6 backdrop-blur-sm">
              {activeTab === "profile" && <ProfileSettings />}
              {activeTab === "account" && <AccountSettings />}
              {activeTab === "appearance" && <AppearanceSettings />}
              {activeTab === "notifications" && <NotificationSettings />}
              {activeTab === "privacy" && <PrivacySettings />}
              {activeTab === "integrations" && <IntegrationSettings />}
              {activeTab === "billing" && <BillingSettings />}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

// Tab sections
const ProfileSettings = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-3 mb-6">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your personal information</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-green-500/20 group-hover:border-green-500/40 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white"
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
            <textarea
              className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white min-h-[100px] resize-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 mt-6 flex justify-end">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  )
}

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-3 mb-6">
        <h2 className="text-xl font-semibold">Account Settings</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your account security and preferences</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-medium mb-3">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between p-4 bg-black/60 border border-gray-700 rounded-md">
            <div>
              <p className="font-medium">Protect your account with 2FA</p>
              <p className="text-sm text-gray-400 mt-1">Add an extra layer of security to your account</p>
            </div>
            <Toggle />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-medium mb-3 text-red-500">Danger Zone</h3>
          <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-md">
            <p className="font-medium">Delete Account</p>
            <p className="text-sm text-gray-400 mt-1 mb-3">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const AppearanceSettings = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-3 mb-6">
        <h2 className="text-xl font-semibold">Appearance</h2>
        <p className="text-gray-400 text-sm mt-1">Customize how Learn Together looks for you</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Theme</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "dark", name: "Dark", color: "bg-gray-900" },
              { id: "light", name: "Light", color: "bg-gray-100" },
              { id: "system", name: "System", color: "bg-gradient-to-r from-gray-900 to-gray-100" },
            ].map((theme) => (
              <div key={theme.id} className="relative">
                <input
                  type="radio"
                  name="theme"
                  id={`theme-${theme.id}`}
                  className="peer sr-only"
                  defaultChecked={theme.id === "dark"}
                />
                <label
                  htmlFor={`theme-${theme.id}`}
                  className="flex flex-col items-center p-4 bg-black/60 border border-gray-700 rounded-md cursor-pointer transition-all peer-checked:border-green-500 peer-checked:ring-1 peer-checked:ring-green-500 hover:bg-black/80"
                >
                  <div className={`w-full h-20 rounded-md ${theme.color} mb-3`}></div>
                  <span className="font-medium">{theme.name}</span>
                </label>
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-green-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-medium mb-3">Accent Color</h3>
          <div className="grid grid-cols-6 gap-3">
            {[
              { id: "green", color: "bg-green-500" },
              { id: "blue", color: "bg-blue-500" },
              { id: "purple", color: "bg-purple-500" },
              { id: "pink", color: "bg-pink-500" },
              { id: "yellow", color: "bg-yellow-500" },
              { id: "red", color: "bg-red-500" },
            ].map((color) => (
              <div key={color.id} className="relative">
                <input
                  type="radio"
                  name="accent"
                  id={`accent-${color.id}`}
                  className="peer sr-only"
                  defaultChecked={color.id === "green"}
                />
                <label
                  htmlFor={`accent-${color.id}`}
                  className={`block w-full aspect-square rounded-full ${color.color} cursor-pointer transition-all peer-checked:ring-2 peer-checked:ring-white peer-checked:ring-offset-2 peer-checked:ring-offset-black`}
                ></label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-medium mb-3">Font Size</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">A</span>
              <input type="range" min="1" max="5" defaultValue="3" className="w-full mx-4 accent-green-500" />
              <span className="text-lg">A</span>
            </div>
            <p className="text-sm text-gray-400">Adjust the font size used throughout the application</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 flex justify-end">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  )
}

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-3 mb-6">
        <h2 className="text-xl font-semibold">Notification Settings</h2>
        <p className="text-gray-400 text-sm mt-1">Control when and how you receive notifications</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
          <div className="space-y-3">
            {[
              { id: "course-updates", label: "Course updates and announcements" },
              { id: "new-lessons", label: "New lessons and materials" },
              { id: "assignment-reminders", label: "Assignment reminders" },
              { id: "feedback", label: "Feedback on submissions" },
              { id: "promotions", label: "Promotions and special offers" },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-black/60 border border-gray-700 rounded-md"
              >
                <span>{item.label}</span>
                <Toggle defaultChecked={item.id !== "promotions"} />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-medium mb-3">Push Notifications</h3>
          <div className="space-y-3">
            {[
              { id: "push-messages", label: "Direct messages" },
              { id: "push-reminders", label: "Class reminders" },
              { id: "push-announcements", label: "Important announcements" },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-black/60 border border-gray-700 rounded-md"
              >
                <span>{item.label}</span>
                <Toggle defaultChecked />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-medium mb-3">Notification Schedule</h3>
          <div className="p-4 bg-black/60 border border-gray-700 rounded-md">
            <p className="mb-3">Only send notifications during these hours:</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">From</label>
                <select className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i} selected={i === 9}>
                      {i.toString().padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">To</label>
                <select className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i} selected={i === 18}>
                      {i.toString().padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 flex justify-end">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
          Save Notification Settings
        </button>
      </div>
    </div>
  )
}

// Placeholder components for other settings tabs
const PrivacySettings = () => (
  <div className="space-y-6">
    <div className="border-b border-gray-800 pb-3 mb-6">
      <h2 className="text-xl font-semibold">Privacy Settings</h2>
      <p className="text-gray-400 text-sm mt-1">Control your privacy and data sharing preferences</p>
    </div>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-black/60 border border-gray-700 rounded-md">
        <div>
          <p className="font-medium">Profile Visibility</p>
          <p className="text-sm text-gray-400 mt-1">Control who can see your profile information</p>
        </div>
        <select className="px-3 py-2 bg-black/60 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white">
          <option>Public</option>
          <option selected>Students Only</option>
          <option>Private</option>
        </select>
      </div>

      <div className="flex items-center justify-between p-4 bg-black/60 border border-gray-700 rounded-md">
        <div>
          <p className="font-medium">Data Collection</p>
          <p className="text-sm text-gray-400 mt-1">Allow us to collect usage data to improve your experience</p>
        </div>
        <Toggle defaultChecked />
      </div>
    </div>
  </div>
)

const IntegrationSettings = () => (
  <div className="space-y-6">
    <div className="border-b border-gray-800 pb-3 mb-6">
      <h2 className="text-xl font-semibold">Integrations</h2>
      <p className="text-gray-400 text-sm mt-1">Connect your account with other services</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { name: "GitHub", icon: "github", connected: true },
        { name: "Google", icon: "google", connected: true },
        { name: "Discord", icon: "discord", connected: false },
        { name: "Slack", icon: "slack", connected: false },
      ].map((integration) => (
        <div
          key={integration.name}
          className="p-4 bg-black/60 border border-gray-700 rounded-md flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
              <IntegrationIcon name={integration.icon} />
            </div>
            <div>
              <p className="font-medium">{integration.name}</p>
              <p className="text-xs text-gray-400">{integration.connected ? "Connected" : "Not connected"}</p>
            </div>
          </div>
          <button
            className={`px-3 py-1.5 rounded text-sm ${
              integration.connected
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            } transition-colors`}
          >
            {integration.connected ? "Disconnect" : "Connect"}
          </button>
        </div>
      ))}
    </div>
  </div>
)

const BillingSettings = () => (
  <div className="space-y-6">
    <div className="border-b border-gray-800 pb-3 mb-6">
      <h2 className="text-xl font-semibold">Billing & Subscription</h2>
      <p className="text-gray-400 text-sm mt-1">Manage your subscription and payment methods</p>
    </div>

    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-md mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">
          Current Plan: <span className="text-green-400">Pro</span>
        </h3>
        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span>
      </div>
      <p className="text-sm text-gray-400 mb-3">Your subscription renews on October 15, 2023</p>
      <div className="flex gap-3">
        <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors">
          Upgrade Plan
        </button>
        <button className="px-3 py-1.5 bg-transparent border border-gray-600 hover:border-gray-500 text-white rounded-md text-sm transition-colors">
          Cancel Subscription
        </button>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-medium mb-3">Payment Methods</h3>
      <div className="space-y-3 mb-4">
        <div className="p-3 bg-black/60 border border-gray-700 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 bg-blue-500 rounded"></div>
            <span>•••• •••• •••• 4242</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">Default</span>
            <button className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <span>Add Payment Method</span>
      </button>
    </div>

    <div className="border-t border-gray-800 pt-6">
      <h3 className="text-lg font-medium mb-3">Billing History</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "Sep 15, 2023", desc: "Pro Plan - Monthly", amount: "$29.99", status: "Paid" },
              { date: "Aug 15, 2023", desc: "Pro Plan - Monthly", amount: "$29.99", status: "Paid" },
              { date: "Jul 15, 2023", desc: "Pro Plan - Monthly", amount: "$29.99", status: "Paid" },
            ].map((item, i) => (
              <tr key={i} className="border-b border-gray-800">
                <td className="py-4 text-sm">{item.date}</td>
                <td className="py-4 text-sm">{item.desc}</td>
                <td className="py-4 text-sm">{item.amount}</td>
                <td className="py-4 text-sm">
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">{item.status}</span>
                </td>
                <td className="py-4 text-sm">
                  <button className="text-green-400 hover:text-green-300">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
    
  </div>
)

// Reusable components
const Toggle = ({ defaultChecked = false }) => {
  const [enabled, setEnabled] = useState(defaultChecked)

  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black ${
        enabled ? "bg-green-500" : "bg-gray-700"
      }`}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  )
}

// Icon components
const TabIcon = ({ name }) => {
  const icons = {
    user: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    shield: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    palette: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="13.5" cy="6.5" r=".5"></circle>
        <circle cx="17.5" cy="10.5" r=".5"></circle>
        <circle cx="8.5" cy="7.5" r=".5"></circle>
        <circle cx="6.5" cy="12.5" r=".5"></circle>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
      </svg>
    ),
    bell: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
    lock: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    plug: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 3v4"></path>
        <path d="M8 3v4"></path>
        <path d="M12 9v12"></path>
        <path d="M4 13h16"></path>
        <path d="M20 7H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"></path>
      </svg>
    ),
    "credit-card": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    ),
  }

  return icons[name] || null
}

const IntegrationIcon = ({ name }) => {
  const icons = {
    github: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
    google: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 12h8"></path>
        <path d="M12 8v8"></path>
      </svg>
    ),
    discord: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <circle cx="9" cy="12" r="1"></circle>
        <circle cx="15" cy="12" r="1"></circle>
        <path d="M7.5 7.5c3.5-1 5.5-1 9 0"></path>
        <path d="M7 16.5c3.5 1 6.5 1 10 0"></path>
        <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2-1.5 2-3 0-1.5-3-1.5-3-5C16.5 10.5 15.5 7 12 7s-4.5 3.5-4.5 5c0 3.5-3 3.5-3 5 0 1.5.5 3 2 3 .5 0 2-2 2-3"></path>
      </svg>
    ),
    slack: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <rect x="13" y="2" width="3" height="8" rx="1.5"></rect>
        <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5"></path>
        <rect x="8" y="14" width="3" height="8" rx="1.5"></rect>
        <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5"></path>
        <rect x="14" y="13" width="8" height="3" rx="1.5"></rect>
        <path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5"></path>
        <rect x="2" y="8" width="8" height="3" rx="1.5"></rect>
        <path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5"></path>
      </svg>
    ),
  }

  return icons[name] || null
}

