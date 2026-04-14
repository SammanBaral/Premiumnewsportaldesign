import { useState } from 'react';
import { Plus, Edit, Trash2, TrendingUp, Hash } from 'lucide-react';

const topics = [
  { id: 1, name: 'Startups', slug: 'startups', posts: 142, mentions: 3421, trending: true, color: '#e63946' },
  { id: 2, name: 'Politics', slug: 'politics', posts: 289, mentions: 5234, trending: true, color: '#457b9d' },
  { id: 3, name: 'Climate', slug: 'climate', posts: 167, mentions: 2876, trending: false, color: '#06a77d' },
  { id: 4, name: 'Music', slug: 'music', posts: 203, mentions: 4123, trending: true, color: '#f72585' },
  { id: 5, name: 'Sports', slug: 'sports', posts: 312, mentions: 6234, trending: false, color: '#f77f00' },
  { id: 6, name: 'Tech', slug: 'tech', posts: 456, mentions: 8765, trending: true, color: '#4361ee' },
  { id: 7, name: 'Culture', slug: 'culture', posts: 178, mentions: 2987, trending: false, color: '#9d4edd' },
  { id: 8, name: 'Youth', slug: 'youth', posts: 234, mentions: 4321, trending: true, color: '#06d6a0' },
];

export function TopicsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
              Topics
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Manage content topics and hashtags
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Plus className="w-5 h-5" />
            Create Topic
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Total Topics</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {topics.length}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Trending</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {topics.filter(t => t.trending).length}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Total Posts</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {topics.reduce((sum, t) => sum + t.posts, 0)}
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Total Mentions</div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {topics.reduce((sum, t) => sum + t.mentions, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div key={topic.id} className="bg-white border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: topic.color + '20' }}
                >
                  <Hash className="w-6 h-6" style={{ color: topic.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                    {topic.name}
                  </h3>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    /{topic.slug}
                  </p>
                </div>
              </div>
              {topic.trending && (
                <div className="flex items-center gap-1 px-2 py-1 bg-[--color-accent-red] text-white text-xs font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  HOT
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div>
                <div className="text-2xl font-black">{topic.posts}</div>
                <div className="text-xs text-gray-600">Posts</div>
              </div>
              <div>
                <div className="text-2xl font-black">{topic.mentions.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Mentions</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">
                <Edit className="w-4 h-4 inline mr-2" />
                Edit
              </button>
              <button className="px-4 py-2 border border-border hover:bg-red-50 hover:border-red-200 transition-colors">
                <Trash2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Topic Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-md w-full mx-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
              Create New Topic
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Topic Name</label>
                <input
                  type="text"
                  placeholder="e.g., Technology"
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  placeholder="e.g., technology"
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <input
                  type="color"
                  defaultValue="#e63946"
                  className="w-full h-12 border border-border cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="trending" className="w-4 h-4" />
                <label htmlFor="trending" className="text-sm font-medium">
                  Mark as trending
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
                Create Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
