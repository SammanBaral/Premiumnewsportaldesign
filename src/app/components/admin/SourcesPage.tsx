import { useState } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Search } from 'lucide-react';

const sources = [
  { id: 1, name: 'Nepal Startup Report 2026', url: 'https://nepalstartups.org/report-2026', logo: '📊', category: 'Research', usedIn: 23, verified: true },
  { id: 2, name: 'Asian Venture Capital Association', url: 'https://avca.asia', logo: '💼', category: 'Organization', usedIn: 18, verified: true },
  { id: 3, name: 'Government of Nepal - Digital Economy', url: 'https://gov.np/digital', logo: '🏛️', category: 'Government', usedIn: 45, verified: true },
  { id: 4, name: 'The Himalayan Times', url: 'https://thehimalayantimes.com', logo: '📰', category: 'News', usedIn: 67, verified: true },
  { id: 5, name: 'Kathmandu Post', url: 'https://kathmandupost.com', logo: '📰', category: 'News', usedIn: 89, verified: true },
  { id: 6, name: 'Nepal Climate Observatory', url: 'https://climateobservatory.np', logo: '🌍', category: 'Research', usedIn: 34, verified: true },
  { id: 7, name: 'World Bank Nepal', url: 'https://worldbank.org/nepal', logo: '🏦', category: 'Organization', usedIn: 56, verified: true },
  { id: 8, name: 'Nepal Football Association', url: 'https://nfa.org.np', logo: '⚽', category: 'Sports', usedIn: 28, verified: false },
];

export function SourcesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
              Sources
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Manage article sources and references
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Plus className="w-5 h-5" />
            Add Source
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search sources..."
            className="w-full pl-10 pr-4 py-3 border border-border focus:outline-none focus:border-black"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Total Sources</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {sources.length}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Verified</div>
          <div className="text-3xl font-black text-green-600" style={{ fontFamily: 'Merriweather, serif' }}>
            {sources.filter(s => s.verified).length}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Total Usage</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {sources.reduce((sum, s) => sum + s.usedIn, 0)}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Categories</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {new Set(sources.map(s => s.category)).size}
          </div>
        </div>
      </div>

      {/* Sources Table */}
      <div className="bg-white border border-border">
        <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-sm">Source</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Category</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">URL</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Used In</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Status</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sources.map((source) => (
              <tr key={source.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{source.logo}</div>
                    <div className="font-semibold">{source.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
                    {source.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[--color-accent-red] hover:underline text-sm flex items-center gap-1"
                  >
                    {source.url.replace('https://', '').substring(0, 30)}...
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{source.usedIn} articles</td>
                <td className="px-6 py-4">
                  {source.verified ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Verified
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
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

      {/* Create Source Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-lg w-full mx-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
              Add New Source
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Source Name</label>
                <input
                  type="text"
                  placeholder="e.g., Nepal Startup Report 2026"
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Source URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Logo/Emoji</label>
                <input
                  type="text"
                  placeholder="📊"
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black">
                  <option>Research</option>
                  <option>News</option>
                  <option>Government</option>
                  <option>Organization</option>
                  <option>Sports</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="verified" className="w-4 h-4" defaultChecked />
                <label htmlFor="verified" className="text-sm font-medium">
                  Mark as verified source
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
                Add Source
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
