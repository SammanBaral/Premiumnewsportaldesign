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
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Eye
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FileText, label: 'Posts', active: false },
  { icon: Hash, label: 'Topics', active: false },
  { icon: ExternalLink, label: 'Sources', active: false },
  { icon: Image, label: 'Media', active: false },
  { icon: Gamepad2, label: 'Games', active: false },
  { icon: Users, label: 'Users', active: false },
  { icon: DollarSign, label: 'Ads', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const recentPosts = [
  { id: 1, title: "Nepal's Tech Startup Ecosystem Reaches $2 Billion", status: 'Published', views: 15234, date: 'Apr 13, 2026' },
  { id: 2, title: "Gen Z Activists Reshape Political Landscape", status: 'Published', views: 12456, date: 'Apr 12, 2026' },
  { id: 3, title: "Underground Music Scene Goes Global", status: 'Draft', views: 0, date: 'Apr 12, 2026' },
  { id: 4, title: "The Rise of Women's Football", status: 'Published', views: 8934, date: 'Apr 11, 2026' },
  { id: 5, title: "Climate Action: Youth Leading the Charge", status: 'Published', views: 10567, date: 'Apr 11, 2026' },
];

export function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border flex-shrink-0">
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

        <nav className="p-4">
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

        <div className="p-4 border-t border-border mt-auto">
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
        {/* Header */}
        <header className="bg-white border-b border-border px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
                Dashboard
              </h1>
              <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors">
              <Plus className="w-5 h-5" />
              New Post
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600">Total Posts</div>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-black mb-2">1,247</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>12% from last month</span>
              </div>
            </div>

            <div className="bg-white border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600">Total Users</div>
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-black mb-2">45,892</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>8% from last month</span>
              </div>
            </div>

            <div className="bg-white border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600">Daily Visitors</div>
                <Eye className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-black mb-2">8,456</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>24% from yesterday</span>
              </div>
            </div>

            <div className="bg-white border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600">Trending Topic</div>
                <Hash className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-black mb-2">#Tech</div>
              <div className="text-sm text-gray-600">
                15,234 mentions today
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Posts */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-border">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                  <h2 className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                    Recent Posts
                  </h2>
                  <button className="text-sm text-[--color-accent-red] hover:underline">
                    View All
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{post.title}</h3>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views.toLocaleString()} views
                            </span>
                            <span>•</span>
                            <span
                              className={`px-2 py-0.5 rounded ${
                                post.status === 'Published'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {post.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Viewed Posts */}
              <div className="bg-white border border-border mt-8">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                    Top Viewed Posts (This Week)
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentPosts.slice(0, 5).map((post, index) => (
                      <div key={post.id} className="flex items-center gap-4">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 font-black text-gray-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{post.title}</div>
                        </div>
                        <div className="text-sm font-semibold text-gray-600">
                          {post.views.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white border border-border p-6">
                <h3 className="font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 px-4 py-3 border border-border hover:bg-gray-50 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Create Post</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 border border-border hover:bg-gray-50 transition-colors">
                    <Gamepad2 className="w-5 h-5" />
                    <span className="font-medium">Create Wordle</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 border border-border hover:bg-gray-50 transition-colors">
                    <Gamepad2 className="w-5 h-5" />
                    <span className="font-medium">Create Crossword</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 border border-border hover:bg-gray-50 transition-colors">
                    <Image className="w-5 h-5" />
                    <span className="font-medium">Upload Media</span>
                  </button>
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-white border border-border p-6">
                <h3 className="font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                  Traffic Sources
                </h3>
                <div className="space-y-4">
                  {[
                    { source: 'Direct', percentage: 45, color: 'bg-[--color-accent-red]' },
                    { source: 'Social Media', percentage: 30, color: 'bg-blue-500' },
                    { source: 'Search', percentage: 18, color: 'bg-green-500' },
                    { source: 'Referral', percentage: 7, color: 'bg-purple-500' },
                  ].map((item) => (
                    <div key={item.source}>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="font-medium">{item.source}</span>
                        <span className="text-gray-600">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Ads */}
              <div className="bg-white border border-border p-6">
                <h3 className="font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                  Active Ads
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Leaderboard</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      Live
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sidebar</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      Live
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Footer Strip</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      Live
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Inline Feed</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                      Scheduled
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">
                  Manage Ads
                </button>
              </div>

              {/* System Status */}
              <div className="bg-white border border-border p-6">
                <h3 className="font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                  System Status
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Website</span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-green-600 font-medium">Online</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Database</span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-green-600 font-medium">Healthy</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">CDN</span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-green-600 font-medium">Active</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">API</span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-green-600 font-medium">Running</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
