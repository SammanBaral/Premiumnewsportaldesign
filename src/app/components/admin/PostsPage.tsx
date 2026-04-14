import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, Calendar, User } from 'lucide-react';

const posts = [
  { id: 1, title: "Nepal's Tech Startup Ecosystem Reaches $2 Billion", category: 'Tech', author: 'Priya Sharma', status: 'Published', views: 15234, date: 'Apr 13, 2026', featured: true },
  { id: 2, title: "Gen Z Activists Reshape Political Landscape", category: 'Politics', author: 'Rajesh Thapa', status: 'Published', views: 12456, date: 'Apr 12, 2026', featured: false },
  { id: 3, title: "Underground Music Scene Goes Global", category: 'Entertainment', author: 'Maya Gurung', status: 'Draft', views: 0, date: 'Apr 12, 2026', featured: false },
  { id: 4, title: "The Rise of Women's Football", category: 'Sports', author: 'Anjali Rai', status: 'Published', views: 8934, date: 'Apr 11, 2026', featured: false },
  { id: 5, title: "Climate Action: Youth Leading the Charge", category: 'Nepal', author: 'Suman Karki', status: 'Published', views: 10567, date: 'Apr 11, 2026', featured: true },
  { id: 6, title: "Digital Banking Revolution in Kathmandu", category: 'Tech', author: 'Priya Sharma', status: 'Scheduled', views: 0, date: 'Apr 15, 2026', featured: false },
  { id: 7, title: "Street Art Movement Transforms Urban Spaces", category: 'Entertainment', author: 'Maya Gurung', status: 'Draft', views: 0, date: 'Apr 10, 2026', featured: false },
  { id: 8, title: "Healthcare Startups Tackle Rural Access", category: 'Tech', author: 'Suman Karki', status: 'Published', views: 7823, date: 'Apr 10, 2026', featured: false },
];

export function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
              Posts
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Manage all articles and content
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Plus className="w-5 h-5" />
            Create New Post
          </button>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border focus:outline-none focus:border-black"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-border focus:outline-none focus:border-black"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Scheduled</option>
          </select>
          <select
            className="px-4 py-3 border border-border focus:outline-none focus:border-black"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <option>All Categories</option>
            <option>Tech</option>
            <option>Politics</option>
            <option>Entertainment</option>
            <option>Sports</option>
            <option>Nepal</option>
            <option>World</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white border border-border">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-sm">Title</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Category</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Author</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Views</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="font-semibold">{post.title}</div>
                        {post.featured && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-[--color-accent-red] text-white text-xs font-semibold">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        post.status === 'Published'
                          ? 'bg-green-100 text-green-700'
                          : post.status === 'Draft'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing 1 to 8 of 1,247 posts
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">
              Previous
            </button>
            <button className="px-4 py-2 bg-black text-white text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">
              2
            </button>
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">
              3
            </button>
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
