import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Star, X } from 'lucide-react';
import { PostEditor } from './PostEditor';
import { ConfirmDialog } from './ConfirmDialog';

type Post = {
  id: number;
  title: string;
  category: string;
  author: string;
  status: string;
  views: number;
  date: string;
  featured: boolean;
  subtitle?: string;
  content?: string;
  tags?: string[];
  image?: string;
};

const initialPosts: Post[] = [
  { id: 1, title: "Nepal's Tech Startup Ecosystem Reaches $2 Billion", category: 'Tech', author: 'Priya Sharma', status: 'Published', views: 15234, date: 'Apr 13, 2026', featured: true, subtitle: 'A deep dive into Nepal's entrepreneurial revolution', tags: ['Startups', 'Tech'], image: 'https://images.unsplash.com/photo-1596784326488-23581279e33d?w=800' },
  { id: 2, title: "Gen Z Activists Reshape Political Landscape", category: 'Politics', author: 'Rajesh Thapa', status: 'Published', views: 12456, date: 'Apr 12, 2026', featured: false, tags: ['Politics', 'Youth'] },
  { id: 3, title: "Underground Music Scene Goes Global", category: 'Entertainment', author: 'Maya Gurung', status: 'Draft', views: 0, date: 'Apr 12, 2026', featured: false },
  { id: 4, title: "The Rise of Women's Football", category: 'Sports', author: 'Anjali Rai', status: 'Published', views: 8934, date: 'Apr 11, 2026', featured: false },
  { id: 5, title: "Climate Action: Youth Leading the Charge", category: 'Nepal', author: 'Suman Karki', status: 'Published', views: 10567, date: 'Apr 11, 2026', featured: true },
  { id: 6, title: "Digital Banking Revolution in Kathmandu", category: 'Tech', author: 'Priya Sharma', status: 'Scheduled', views: 0, date: 'Apr 15, 2026', featured: false },
  { id: 7, title: "Street Art Movement Transforms Urban Spaces", category: 'Entertainment', author: 'Maya Gurung', status: 'Draft', views: 0, date: 'Apr 10, 2026', featured: false },
  { id: 8, title: "Healthcare Startups Tackle Rural Access", category: 'Tech', author: 'Suman Karki', status: 'Published', views: 7823, date: 'Apr 10, 2026', featured: false },
];

export function PostsPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [editingPost, setEditingPost] = useState<Post | null | 'new'>(null);
  const [viewPost, setViewPost] = useState<Post | null>(null);
  const [deletePost, setDeletePost] = useState<Post | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'All Status' || p.status === filterStatus;
    const matchCat = filterCategory === 'All Categories' || p.category === filterCategory;
    return matchSearch && matchStatus && matchCat;
  });

  const handleDelete = (post: Post) => {
    setPosts(posts.filter(p => p.id !== post.id));
    setDeletePost(null);
    showToast(`"${post.title.slice(0, 40)}..." deleted`);
  };

  const handleBulkDelete = () => {
    setPosts(posts.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    showToast(`${selectedIds.length} posts deleted`);
  };

  const toggleStatus = (post: Post) => {
    const newStatus = post.status === 'Published' ? 'Draft' : 'Published';
    setPosts(posts.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
    showToast(`"${post.title.slice(0, 30)}..." set to ${newStatus}`);
  };

  const toggleFeatured = (post: Post) => {
    setPosts(posts.map(p => p.id === post.id ? { ...p, featured: !p.featured } : p));
    showToast(post.featured ? 'Removed from featured' : 'Marked as featured');
  };

  const handleSavePost = (saved: any) => {
    if (editingPost === 'new') {
      const newPost: Post = { ...saved, id: Date.now(), views: 0, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
      setPosts([newPost, ...posts]);
      showToast('Post created!');
    } else if (editingPost) {
      setPosts(posts.map(p => p.id === (editingPost as Post).id ? { ...p, ...saved } : p));
      showToast('Post updated!');
    }
    setEditingPost(null);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map(p => p.id));
  };

  if (editingPost !== null) {
    return (
      <PostEditor
        post={editingPost === 'new' ? undefined : editingPost}
        onBack={() => setEditingPost(null)}
        onSave={handleSavePost}
      />
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 text-sm font-medium z-50 shadow-xl">
          {toast}
        </div>
      )}

      {/* Confirm Delete */}
      {deletePost && (
        <ConfirmDialog
          title="Delete Post"
          message={`Are you sure you want to delete "${deletePost.title}"? This action cannot be undone.`}
          confirmLabel="Delete Post"
          danger
          onConfirm={() => handleDelete(deletePost)}
          onCancel={() => setDeletePost(null)}
        />
      )}

      {/* View Post Modal */}
      {viewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>Post Preview</h2>
              <button onClick={() => setViewPost(null)} className="p-2 hover:bg-gray-100 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-xs font-bold text-[--color-accent-red] mb-2">{viewPost.category.toUpperCase()}</div>
              <h1 className="text-3xl font-black mb-3 leading-tight" style={{ fontFamily: 'Merriweather, serif' }}>{viewPost.title}</h1>
              {viewPost.subtitle && <p className="text-gray-600 mb-4 text-lg">{viewPost.subtitle}</p>}
              {viewPost.image && <img src={viewPost.image} alt={viewPost.title} className="w-full aspect-video object-cover mb-4" />}
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 pb-4 border-b border-border">
                <span className="font-medium text-gray-800">{viewPost.author}</span>
                <span>•</span><span>{viewPost.date}</span>
                <span>•</span>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${viewPost.status === 'Published' ? 'bg-green-100 text-green-700' : viewPost.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{viewPost.status}</span>
                <span>•</span><span>{viewPost.views.toLocaleString()} views</span>
              </div>
              {viewPost.content ? (
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{viewPost.content}</div>
              ) : (
                <div className="text-gray-400 italic text-sm">No content written yet.</div>
              )}
              {viewPost.tags && viewPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                  {viewPost.tags.map(t => <span key={t} className="px-2 py-1 border border-gray-200 text-xs">#{t}</span>)}
                </div>
              )}
            </div>
            <div className="p-6 border-t border-border flex gap-3">
              <button
                onClick={() => { setViewPost(null); setEditingPost(viewPost); }}
                className="flex-1 px-4 py-2.5 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Edit Post
              </button>
              <button onClick={() => setViewPost(null)} className="flex-1 px-4 py-2.5 border border-border hover:bg-gray-50 text-sm font-medium">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>Posts</h1>
            <p className="text-gray-600">Manage all articles and content</p>
          </div>
          <button
            onClick={() => setEditingPost('new')}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-semibold"
          >
            <Plus className="w-5 h-5" />
            Create New Post
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 border border-blue-200">
            <span className="text-sm font-medium text-blue-800">{selectedIds.length} post{selectedIds.length > 1 ? 's' : ''} selected</span>
            <button onClick={handleBulkDelete} className="px-3 py-1 bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors flex items-center gap-1">
              <Trash2 className="w-3 h-3" /> Delete Selected
            </button>
            <button onClick={() => { setPosts(posts.map(p => selectedIds.includes(p.id) ? { ...p, status: 'Published' } : p)); setSelectedIds([]); showToast('Published!'); }}
              className="px-3 py-1 bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors">
              Publish Selected
            </button>
            <button onClick={() => setSelectedIds([])} className="ml-auto text-xs text-gray-500 hover:text-gray-800">
              Clear
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts by title or author..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border focus:outline-none focus:border-black"
            />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-3 border border-border focus:outline-none focus:border-black">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Scheduled</option>
          </select>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-4 py-3 border border-border focus:outline-none focus:border-black">
            <option>All Categories</option>
            <option>Tech</option><option>Politics</option><option>Entertainment</option>
            <option>Sports</option><option>Nepal</option><option>World</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-4 py-4 w-10">
                  <input type="checkbox" checked={selectedIds.length === filtered.length && filtered.length > 0} onChange={toggleSelectAll} className="w-4 h-4" />
                </th>
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-gray-400">
                    <div className="text-4xl mb-3">📭</div>
                    <div className="font-medium">No posts found</div>
                    <div className="text-sm mt-1">Try adjusting your search or filters</div>
                  </td>
                </tr>
              ) : (
                filtered.map(post => (
                  <tr key={post.id} className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(post.id) ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-4">
                      <input type="checkbox" checked={selectedIds.includes(post.id)} onChange={() => toggleSelect(post.id)} className="w-4 h-4" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                        <div>
                          <div className="font-semibold max-w-xs leading-snug">{post.title}</div>
                          {post.featured && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-[--color-accent-red] text-white text-xs font-semibold">FEATURED</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium">{post.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(post)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all hover:opacity-80 ${
                          post.status === 'Published' ? 'bg-green-100 text-green-700' :
                          post.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}
                        title="Click to toggle status"
                      >
                        {post.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{post.views.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewPost(post)} className="p-2 hover:bg-gray-100 rounded transition-colors" title="Preview">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button onClick={() => setEditingPost(post)} className="p-2 hover:bg-gray-100 rounded transition-colors" title="Edit">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button onClick={() => toggleFeatured(post)} className="p-2 hover:bg-gray-100 rounded transition-colors" title="Toggle Featured">
                          <Star className={`w-4 h-4 ${post.featured ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                        </button>
                        <button onClick={() => setDeletePost(post)} className="p-2 hover:bg-red-50 rounded transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filtered.length} of {posts.length} posts
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">Previous</button>
            <button className="px-4 py-2 bg-black text-white text-sm font-medium">1</button>
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">2</button>
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">3</button>
            <button className="px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
