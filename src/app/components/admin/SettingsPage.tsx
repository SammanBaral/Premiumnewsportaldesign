import { useState } from 'react';
import { Save, Globe, Mail, Bell, Shield, Palette, Code } from 'lucide-react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
          Settings
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          Configure your site settings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto">
        {[
          { id: 'general', label: 'General', icon: Globe },
          { id: 'email', label: 'Email', icon: Mail },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'appearance', label: 'Appearance', icon: Palette },
          { id: 'advanced', label: 'Advanced', icon: Code },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-black text-black'
                : 'text-gray-600 hover:text-black'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="bg-white border border-border p-8">
          <h2 className="text-xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            General Settings
          </h2>
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Site Name
              </label>
              <input
                type="text"
                defaultValue="NepalNow"
                className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Tagline
              </label>
              <input
                type="text"
                defaultValue="Next-generation digital media for Gen Z"
                className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Site URL
              </label>
              <input
                type="url"
                defaultValue="https://nepalnow.com"
                className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Timezone
              </label>
              <select className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                <option>Asia/Kathmandu (UTC+5:45)</option>
                <option>Asia/Kolkata (UTC+5:30)</option>
                <option>UTC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Language
              </label>
              <select className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                <option>English</option>
                <option>Nepali</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Email Settings */}
      {activeTab === 'email' && (
        <div className="bg-white border border-border p-8">
          <h2 className="text-xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Email Settings
          </h2>
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                From Email
              </label>
              <input
                type="email"
                defaultValue="noreply@nepalnow.com"
                className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                From Name
              </label>
              <input
                type="text"
                defaultValue="NepalNow"
                className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                SMTP Host
              </label>
              <input
                type="text"
                placeholder="smtp.example.com"
                className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  SMTP Port
                </label>
                <input
                  type="text"
                  defaultValue="587"
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Encryption
                </label>
                <select className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <option>TLS</option>
                  <option>SSL</option>
                  <option>None</option>
                </select>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              <Save className="w-5 h-5" />
              Save Email Settings
            </button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-border p-8">
          <h2 className="text-xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Notification Preferences
          </h2>
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>New Comments</div>
                <div className="text-sm text-gray-600">Get notified when someone comments on your posts</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>New Posts</div>
                <div className="text-sm text-gray-600">Get notified when a new post is published</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>User Registrations</div>
                <div className="text-sm text-gray-600">Get notified when a new user signs up</div>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Analytics Reports</div>
                <div className="text-sm text-gray-600">Receive weekly analytics summary</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>System Alerts</div>
                <div className="text-sm text-gray-600">Important system updates and alerts</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              <Save className="w-5 h-5" />
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <div className="bg-white border border-border p-8">
          <h2 className="text-xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Security Settings
          </h2>
          <div className="space-y-8 max-w-2xl">
            <div>
              <h3 className="font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Update Password
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Two-Factor Authentication</h3>
              <div className="flex items-center justify-between py-4 mb-4">
                <div>
                  <div className="font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Enable 2FA</div>
                  <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <button className="px-6 py-3 border border-border hover:bg-gray-50 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                Configure 2FA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appearance */}
      {activeTab === 'appearance' && (
        <div className="bg-white border border-border p-8">
          <h2 className="text-xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Appearance Settings
          </h2>
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Accent Color
              </label>
              <div className="flex gap-4">
                <input
                  type="color"
                  defaultValue="#e63946"
                  className="w-20 h-12 border border-border cursor-pointer"
                />
                <input
                  type="text"
                  defaultValue="#e63946"
                  className="flex-1 px-4 py-3 border border-border focus:outline-none focus:border-black"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Homepage Layout
              </label>
              <select className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                <option>Editorial (Default)</option>
                <option>Grid</option>
                <option>Magazine</option>
                <option>Minimal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Posts Per Page
              </label>
              <input
                type="number"
                defaultValue="10"
                className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="dark-mode" className="w-4 h-4" />
              <label htmlFor="dark-mode" className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                Enable dark mode
              </label>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              <Save className="w-5 h-5" />
              Save Appearance
            </button>
          </div>
        </div>
      )}

      {/* Advanced */}
      {activeTab === 'advanced' && (
        <div className="bg-white border border-border p-8">
          <h2 className="text-xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Advanced Settings
          </h2>
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Custom CSS
              </label>
              <textarea
                rows={8}
                placeholder="/* Add your custom CSS here */"
                className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Google Analytics ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Facebook Pixel ID
              </label>
              <input
                type="text"
                placeholder="Enter your Facebook Pixel ID"
                className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="maintenance" className="w-4 h-4" />
              <label htmlFor="maintenance" className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                Enable maintenance mode
              </label>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              <Save className="w-5 h-5" />
              Save Advanced Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
