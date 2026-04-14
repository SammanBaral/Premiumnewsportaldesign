import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Hash,
  ExternalLink,
  Image,
  Gamepad2,
  Users,
  DollarSign,
  BarChart3,
  Settings,
} from 'lucide-react';
import { DashboardPage } from '../components/admin/DashboardPage';
import { PostsPage } from '../components/admin/PostsPage';
import { TopicsPage } from '../components/admin/TopicsPage';
import { SourcesPage } from '../components/admin/SourcesPage';
import { MediaPage } from '../components/admin/MediaPage';
import { GamesPage } from '../components/admin/GamesPage';
import { UsersPage } from '../components/admin/UsersPage';
import { AdsPage } from '../components/admin/AdsPage';
import { AnalyticsPage } from '../components/admin/AnalyticsPage';
import { SettingsPage } from '../components/admin/SettingsPage';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: FileText, label: 'Posts' },
  { icon: Hash, label: 'Topics' },
  { icon: ExternalLink, label: 'Sources' },
  { icon: Image, label: 'Media' },
  { icon: Gamepad2, label: 'Games' },
  { icon: Users, label: 'Users' },
  { icon: DollarSign, label: 'Ads' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

export function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const renderPage = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Posts':
        return <PostsPage />;
      case 'Topics':
        return <TopicsPage />;
      case 'Sources':
        return <SourcesPage />;
      case 'Media':
        return <MediaPage />;
      case 'Games':
        return <GamesPage />;
      case 'Users':
        return <UsersPage />;
      case 'Ads':
        return <AdsPage />;
      case 'Analytics':
        return <AnalyticsPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[--color-accent-red] flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Merriweather, serif' }}>N</span>
            </div>
            <span className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
              NepalNow
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-2">Admin Dashboard</div>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setActiveMenu(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === item.label
                      ? 'bg-[--color-accent-red] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
              AD
            </div>
            <div>
              <div className="font-semibold text-sm">Admin User</div>
              <div className="text-xs text-gray-600">admin@nepalnow.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
