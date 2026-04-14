import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, DollarSign, TrendingUp } from 'lucide-react';

const adPlacements = [
  { id: 1, name: 'Homepage Leaderboard', position: 'Top Banner', size: '728x90', status: 'Active', impressions: 125430, clicks: 3421, revenue: 4235, ctr: 2.73 },
  { id: 2, name: 'Article Sidebar', position: 'Right Sidebar', size: '300x600', status: 'Active', impressions: 89234, clicks: 2145, revenue: 3120, ctr: 2.40 },
  { id: 3, name: 'Inline Feed Ad 1', position: 'Article Feed', size: '300x250', status: 'Active', impressions: 156789, clicks: 4523, revenue: 5680, ctr: 2.88 },
  { id: 4, name: 'Footer Strip', position: 'Footer', size: '728x90', status: 'Active', impressions: 98567, clicks: 1876, revenue: 2340, ctr: 1.90 },
  { id: 5, name: 'Mobile Banner', position: 'Mobile Top', size: '320x50', status: 'Active', impressions: 203456, clicks: 5234, revenue: 6780, ctr: 2.57 },
  { id: 6, name: 'Article Page Sticky', position: 'Sticky Sidebar', size: '160x600', status: 'Scheduled', impressions: 0, clicks: 0, revenue: 0, ctr: 0 },
];

export function AdsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const totalRevenue = adPlacements.reduce((sum, ad) => sum + ad.revenue, 0);
  const totalImpressions = adPlacements.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = adPlacements.reduce((sum, ad) => sum + ad.clicks, 0);
  const avgCTR = totalClicks / totalImpressions * 100;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
              Ad Management
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Manage ad placements and revenue
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Plus className="w-5 h-5" />
            Create Ad Placement
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Total Revenue
            </div>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-black text-green-600 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>18% from last month</span>
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Total Impressions
            </div>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
            {totalImpressions.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">This month</div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Total Clicks
            </div>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
            {totalClicks.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">This month</div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Avg CTR
            </div>
          </div>
          <div className="text-3xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
            {avgCTR.toFixed(2)}%
          </div>
          <div className="text-sm text-gray-600">Click-through rate</div>
        </div>
      </div>

      {/* Ad Placements Table */}
      <div className="bg-white border border-border mb-8">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            Active Placements
          </h2>
        </div>
        <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-sm">Name</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Position</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Size</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Status</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Impressions</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Clicks</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">CTR</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Revenue</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {adPlacements.map((ad) => (
              <tr key={ad.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold">{ad.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ad.position}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
                    {ad.size}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      ad.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{ad.impressions.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">{ad.clicks.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-semibold">{ad.ctr.toFixed(2)}%</td>
                <td className="px-6 py-4 font-semibold text-green-600">
                  ${ad.revenue.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="View">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Edit">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ad Position Guide */}
      <div className="bg-white border border-border p-6">
        <h2 className="text-xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
          Available Ad Positions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { position: 'Top Banner', size: '728x90 or 970x90', description: 'Leaderboard at top of page' },
            { position: 'Right Sidebar', size: '300x600 or 160x600', description: 'Skyscraper on article pages' },
            { position: 'Article Feed', size: '300x250', description: 'Inline between articles' },
            { position: 'Footer', size: '728x90', description: 'Bottom of page banner' },
            { position: 'Mobile Top', size: '320x50', description: 'Mobile banner ad' },
            { position: 'Sticky Sidebar', size: '160x600', description: 'Fixed position sidebar ad' },
          ].map((pos, index) => (
            <div key={index} className="p-4 border border-border hover:bg-gray-50 transition-colors">
              <div className="font-semibold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                {pos.position}
              </div>
              <div className="text-sm text-gray-600 mb-2">{pos.description}</div>
              <div className="text-xs text-gray-500">Recommended: {pos.size}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Ad Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-lg w-full mx-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
              Create Ad Placement
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Placement Name</label>
                <input
                  type="text"
                  placeholder="e.g., Homepage Leaderboard"
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Position</label>
                <select className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black">
                  <option>Top Banner</option>
                  <option>Right Sidebar</option>
                  <option>Article Feed</option>
                  <option>Footer</option>
                  <option>Mobile Top</option>
                  <option>Sticky Sidebar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ad Size</label>
                <select className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black">
                  <option>728x90 (Leaderboard)</option>
                  <option>300x250 (Medium Rectangle)</option>
                  <option>300x600 (Half Page)</option>
                  <option>160x600 (Skyscraper)</option>
                  <option>320x50 (Mobile Banner)</option>
                  <option>970x90 (Large Leaderboard)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ad Code</label>
                <textarea
                  placeholder="Paste your ad network code here..."
                  rows={4}
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" className="w-4 h-4" defaultChecked />
                <label htmlFor="active" className="text-sm font-medium">
                  Activate immediately
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border border-border hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-medium">
                Create Placement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
