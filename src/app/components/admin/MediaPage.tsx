import { useState } from 'react';
import { Upload, Image as ImageIcon, Video, File, Search, Trash2, Download, ExternalLink } from 'lucide-react';

const mediaItems = [
  { id: 1, name: 'startup-office.jpg', type: 'image', size: '2.4 MB', date: 'Apr 13, 2026', usedIn: 5, url: 'https://images.unsplash.com/photo-1759752393882-1b6587a7c887?w=400' },
  { id: 2, name: 'protest-crowd.jpg', type: 'image', size: '3.1 MB', date: 'Apr 12, 2026', usedIn: 3, url: 'https://images.unsplash.com/photo-1593656088480-8055f13aed00?w=400' },
  { id: 3, name: 'concert-crowd.jpg', type: 'image', size: '2.8 MB', date: 'Apr 12, 2026', usedIn: 2, url: 'https://images.unsplash.com/photo-1672841852639-9e758334c690?w=400' },
  { id: 4, name: 'football-action.jpg', type: 'image', size: '1.9 MB', date: 'Apr 11, 2026', usedIn: 4, url: 'https://images.unsplash.com/photo-1745104172230-42630f9b75d4?w=400' },
  { id: 5, name: 'kathmandu-landscape.jpg', type: 'image', size: '4.2 MB', date: 'Apr 11, 2026', usedIn: 8, url: 'https://images.unsplash.com/photo-1597228887398-6aa9bcadf134?w=400' },
  { id: 6, name: 'interview-video.mp4', type: 'video', size: '45.3 MB', date: 'Apr 10, 2026', usedIn: 1, url: '' },
  { id: 7, name: 'tech-workspace.jpg', type: 'image', size: '2.1 MB', date: 'Apr 10, 2026', usedIn: 6, url: 'https://images.unsplash.com/photo-1596784326488-23581279e33d?w=400' },
  { id: 8, name: 'annual-report.pdf', type: 'document', size: '8.7 MB', date: 'Apr 9, 2026', usedIn: 2, url: '' },
];

export function MediaPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState('All');

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
              Media Library
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Manage images, videos, and documents
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Upload className="w-5 h-5" />
            Upload Files
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search media..."
              className="w-full pl-10 pr-4 py-3 border border-border focus:outline-none focus:border-black"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-border focus:outline-none focus:border-black"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <option>All Types</option>
            <option>Images</option>
            <option>Videos</option>
            <option>Documents</option>
          </select>
          <div className="flex gap-2 border border-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-3 ${viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Total Files</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {mediaItems.length}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Images</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {mediaItems.filter(m => m.type === 'image').length}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Videos</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {mediaItems.filter(m => m.type === 'video').length}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Storage Used</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            73 MB
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaItems.map((item) => (
            <div key={item.id} className="bg-white border border-border hover:shadow-lg transition-shadow group">
              <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                {item.type === 'image' && item.url ? (
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                ) : item.type === 'video' ? (
                  <Video className="w-12 h-12 text-gray-400" />
                ) : (
                  <File className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div className="p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div className="font-semibold text-sm mb-1 truncate">{item.name}</div>
                <div className="text-xs text-gray-600 mb-2">{item.size} • {item.date}</div>
                <div className="text-xs text-gray-600 mb-3">Used in {item.usedIn} posts</div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 border border-border hover:bg-gray-50 transition-colors text-xs font-medium">
                    <Download className="w-3 h-3 inline mr-1" />
                    Download
                  </button>
                  <button className="px-3 py-2 border border-border hover:bg-red-50 hover:border-red-200 transition-colors">
                    <Trash2 className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-border">
          <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-sm">Preview</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Type</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Size</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Used In</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mediaItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {item.type === 'image' && item.url ? (
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                      ) : item.type === 'video' ? (
                        <Video className="w-6 h-6 text-gray-400" />
                      ) : (
                        <File className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium capitalize">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.usedIn} posts</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="Download">
                        <Download className="w-4 h-4 text-gray-600" />
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
      )}
    </div>
  );
}
