import {
  ArrowLeft,
  Ban,
  BarChart3,
  CheckCircle,
  DollarSign,
  Download,
  Edit,
  ExternalLink,
  Eye,
  File as FileIcon,
  FileText,
  Gamepad2,
  Hash,
  Image,
  LayoutDashboard,
  List,
  Mail,
  Menu,
  Plus,
  Quote,
  Save,
  Search,
  Settings,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
  Video,
  X
} from 'lucide-react';
import { useState } from 'react';
import { AdsPage } from '../components/admin/AdsPage';
import { AnalyticsPage } from '../components/admin/AnalyticsPage';
import { GamesPage as GamesAdmin } from '../components/admin/GamesPage';
import { SettingsPage } from '../components/admin/SettingsPage';
import { SourcesPage } from '../components/admin/SourcesPage';

// ─── Sub-components ─────────────────────────────────────────────────

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 text-sm font-medium z-[100] shadow-xl animate-in slide-in-from-bottom-2 duration-200">
      {message}
    </div>
  );
}

function ConfirmDialog({ title, message, confirmLabel = 'Confirm', danger = false, onConfirm, onCancel }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-white p-8 max-w-sm w-full mx-4 shadow-xl">
        <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>{title}</h2>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-3 border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-sm">Cancel</button>
          <button onClick={onConfirm} className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors ${danger ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-black text-white hover:bg-gray-800'}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Post Editor ─────────────────────────────────────────────────────

function PostEditor({ post, onBack, onSave }: any) {
  const isEditing = !!post?.id;
  const [title, setTitle] = useState(post?.title || '');
  const [subtitle, setSubtitle] = useState(post?.subtitle || '');
  const [category, setCategory] = useState(post?.category || 'Tech');
  const [author, setAuthor] = useState(post?.author || 'Priya Sharma');
  const [status, setStatus] = useState(post?.status || 'Draft');
  const [content, setContent] = useState(post?.content || '');
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [featured, setFeatured] = useState(post?.featured || false);
  const [showPreview, setShowPreview] = useState(false);
  const [imageUrl, setImageUrl] = useState(post?.image || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  const addTag = () => { const t = tagInput.trim(); if (t && !tags.includes(t)) { setTags([...tags, t]); setTagInput(''); } };
  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleSave = async (publishStatus?: string) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    onSave?.({ title, subtitle, category, author, status: publishStatus || status, content, tags, featured, image: imageUrl });
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /><span className="font-medium">Back to Posts</span>
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <h1 className="text-2xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 text-sm font-medium">
            <Eye className="w-4 h-4" />{showPreview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={() => handleSave('Draft')} disabled={saving} className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 text-sm font-medium disabled:opacity-50">
            <Save className="w-4 h-4" />Save Draft
          </button>
          <button onClick={() => handleSave('Published')} disabled={saving || !title.trim()} className="flex items-center gap-2 px-5 py-2 bg-black text-white hover:bg-gray-800 text-sm font-semibold disabled:opacity-50 min-w-[100px] justify-center">
            {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : saved ? '✓ Saved!' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {showPreview ? (
            <div className="bg-white border border-gray-200 p-8">
              <div className="text-xs font-bold text-[--color-accent-red] mb-3">{category.toUpperCase()}</div>
              <h1 className="text-4xl font-black leading-tight mb-4" style={{ fontFamily: 'Merriweather, serif' }}>{title || <span className="text-gray-200">No title yet...</span>}</h1>
              {subtitle && <p className="text-xl text-gray-600 mb-6">{subtitle}</p>}
              {imageUrl && <img src={imageUrl} alt="" className="w-full aspect-video object-cover mb-6" onError={e => (e.currentTarget.style.display = 'none')} />}
              <div className="flex gap-3 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <span className="font-medium text-gray-800">{author}</span><span>•</span>
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span><span>•</span>
                <span>{readTime} min read</span>
              </div>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content || <span className="text-gray-300 italic">No content yet...</span>}</div>
              {tags.length > 0 && <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100">{tags.map(t => <span key={t} className="px-3 py-1 border border-black text-sm">#{t}</span>)}</div>}
            </div>
          ) : (
            <>
              <div className="bg-white border border-gray-200 p-6">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Title *</label>
                <textarea value={title} onChange={e => setTitle(e.target.value)} placeholder="Write your headline..." rows={2} className="w-full text-3xl font-black resize-none focus:outline-none placeholder:text-gray-200 leading-tight" style={{ fontFamily: 'Merriweather, serif' }} />
                <div className="text-xs text-gray-300 mt-1">{title.length}/100</div>
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Subtitle</label>
                <textarea value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="A brief description below the headline..." rows={2} className="w-full text-lg resize-none focus:outline-none placeholder:text-gray-200 leading-relaxed" />
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Featured Image</label>
                {imageUrl ? (
                  <div>
                    <div className="relative aspect-video overflow-hidden bg-gray-100 mb-2">
                      <img src={imageUrl} alt="" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                      <button onClick={() => setImageUrl('')} className="absolute top-2 right-2 w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-gray-800"><X className="w-4 h-4" /></button>
                    </div>
                    <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                  </div>
                ) : (
                  <>
                    <div className="border-2 border-dashed border-gray-200 p-8 text-center cursor-pointer hover:border-black transition-colors" onClick={() => document.getElementById('img-url')?.focus()}>
                      <Image className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Drag & drop or paste image URL</p>
                      <p className="text-xs text-gray-300 mt-1">Recommended: 1200×675px</p>
                    </div>
                    <input id="img-url" type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Or paste image URL..." className="w-full mt-2 px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                  </>
                )}
              </div>

              <div className="bg-white border border-gray-200">
                <div className="border-b border-gray-100 px-4 py-2 flex items-center gap-1 flex-wrap">
                  <span className="text-xs text-gray-300 mr-1">FORMAT</span>
                  {[
                    { label: 'B', cmd: '**', title: 'Bold' },
                    { label: 'I', cmd: '_', title: 'Italic' },
                  ].map(({ label, cmd, title }) => (
                    <button key={title} title={title} className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded text-sm font-bold transition-colors"
                      onClick={() => { const ta = document.getElementById('content-ta') as HTMLTextAreaElement; if (!ta) return; const s = ta.selectionStart, e = ta.selectionEnd; const sel = content.slice(s, e); setContent(content.slice(0, s) + cmd + sel + cmd + content.slice(e)); }}>
                      {label}
                    </button>
                  ))}
                  <div className="w-px h-4 bg-gray-200 mx-1" />
                  <button onClick={() => setContent(content + '\n\n## ')} className="px-2 py-1 text-xs hover:bg-gray-100 rounded font-bold">H2</button>
                  <button onClick={() => setContent(content + '\n\n### ')} className="px-2 py-1 text-xs hover:bg-gray-100 rounded font-bold">H3</button>
                  <button onClick={() => setContent(content + '\n\n> ')} className="p-1.5 hover:bg-gray-100 rounded"><Quote className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setContent(content + '\n• ')} className="p-1.5 hover:bg-gray-100 rounded"><List className="w-3.5 h-3.5" /></button>
                  <div className="ml-auto text-xs text-gray-300">{wordCount} words · {readTime}m</div>
                </div>
                <textarea id="content-ta" value={content} onChange={e => setContent(e.target.value)} placeholder={"Start writing your article...\n\n## Use headings\n**bold** and _italic_ text\n> blockquote\n• bullet list"} className="w-full p-6 min-h-[420px] resize-none focus:outline-none text-base leading-relaxed placeholder:text-gray-200" style={{ fontFamily: 'Georgia, serif' }} />
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <h3 className="font-bold text-sm mb-4">SEO Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">SEO Title</label>
                    <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder={title || 'Defaults to post title'} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm" />
                    <div className="text-xs text-gray-300 mt-1">{seoTitle.length}/60 recommended</div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Meta Description</label>
                    <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)} placeholder="Brief description for search engines..." rows={2} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm resize-none" />
                    <div className="text-xs text-gray-300 mt-1">{seoDesc.length}/160 recommended</div>
                  </div>
                  {(title || seoTitle) && (
                    <div className="p-3 bg-gray-50 rounded text-xs border border-gray-100">
                      <div className="text-blue-700 font-medium truncate">{seoTitle || title}</div>
                      <div className="text-green-700 text-[11px]">nepalnow.com › {category.toLowerCase()}</div>
                      <div className="text-gray-500 mt-0.5 line-clamp-2">{seoDesc || subtitle || 'No description provided.'}</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 p-5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">Publish</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm">
                  <option>Draft</option><option>Published</option><option>Scheduled</option>
                </select>
              </div>
              {status === 'Scheduled' && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Publish Date</label>
                  <input type="datetime-local" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm" />
                </div>
              )}
              <div className="flex items-center justify-between py-1">
                <div>
                  <div className="text-sm font-medium">Featured</div>
                  <div className="text-xs text-gray-400">Show in hero section</div>
                </div>
                <button onClick={() => setFeatured(!featured)} className={`w-10 h-6 rounded-full transition-colors relative ${featured ? 'bg-black' : 'bg-gray-200'}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${featured ? 'left-5' : 'left-1'}`} />
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <button onClick={() => handleSave('Draft')} className="flex-1 px-3 py-2 border border-gray-200 hover:bg-gray-50 text-sm font-medium">Draft</button>
              <button onClick={() => handleSave('Published')} disabled={!title.trim()} className="flex-1 px-3 py-2 bg-black text-white hover:bg-gray-800 text-sm font-semibold disabled:opacity-40">Publish</button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4">Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm">
                  {['Tech', 'Politics', 'Entertainment', 'Sports', 'Nepal', 'World'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Author</label>
                <select value={author} onChange={e => setAuthor(e.target.value)} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm">
                  {['Priya Sharma', 'Rajesh Thapa', 'Maya Gurung', 'Suman Karki', 'Anjali Rai'].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs font-medium rounded">
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-red-500 ml-0.5"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add tag..." className="flex-1 px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm" />
              <button onClick={addTag} className="px-3 py-2 bg-black text-white hover:bg-gray-800 transition-colors"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Stats</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              {[{ v: wordCount, l: 'Words' }, { v: `${readTime}m`, l: 'Read Time' }, { v: tags.length, l: 'Tags' }, { v: title.split(' ').length, l: 'Title Words' }].map(({ v, l }) => (
                <div key={l} className="bg-white p-2 rounded border border-gray-100">
                  <div className="text-xl font-black">{v}</div>
                  <div className="text-xs text-gray-400">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Posts Page ───────────────────────────────────────────────────────

type Post = { id: number; title: string; category: string; author: string; status: string; views: number; date: string; featured: boolean; subtitle?: string; content?: string; tags?: string[]; image?: string; };

const initialPosts: Post[] = [
  { id: 1, title: "Nepal's Tech Startup Ecosystem Reaches $2 Billion", category: 'Tech', author: 'Priya Sharma', status: 'Published', views: 15234, date: 'Apr 13, 2026', featured: true, tags: ['Startups', 'Tech'], image: 'https://images.unsplash.com/photo-1596784326488-23581279e33d?w=600' },
  { id: 2, title: "Gen Z Activists Reshape Political Landscape", category: 'Politics', author: 'Rajesh Thapa', status: 'Published', views: 12456, date: 'Apr 12, 2026', featured: false },
  { id: 3, title: "Underground Music Scene Goes Global", category: 'Entertainment', author: 'Maya Gurung', status: 'Draft', views: 0, date: 'Apr 12, 2026', featured: false },
  { id: 4, title: "The Rise of Women's Football", category: 'Sports', author: 'Anjali Rai', status: 'Published', views: 8934, date: 'Apr 11, 2026', featured: false },
  { id: 5, title: "Climate Action: Youth Leading the Charge", category: 'Nepal', author: 'Suman Karki', status: 'Published', views: 10567, date: 'Apr 11, 2026', featured: true },
  { id: 6, title: "Digital Banking Revolution in Kathmandu", category: 'Tech', author: 'Priya Sharma', status: 'Scheduled', views: 0, date: 'Apr 15, 2026', featured: false },
  { id: 7, title: "Street Art Movement Transforms Urban Spaces", category: 'Entertainment', author: 'Maya Gurung', status: 'Draft', views: 0, date: 'Apr 10, 2026', featured: false },
  { id: 8, title: "Healthcare Startups Tackle Rural Access", category: 'Tech', author: 'Suman Karki', status: 'Published', views: 7823, date: 'Apr 10, 2026', featured: false },
];

function PostsPage({ initialAction, onToast }: { initialAction?: string; onToast: (m: string) => void }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [editingPost, setEditingPost] = useState<Post | null | 'new'>(initialAction === 'new' ? 'new' : null);
  const [viewPost, setViewPost] = useState<Post | null>(null);
  const [deletePost, setDeletePost] = useState<Post | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filtered = posts.filter(p => {
    const s = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.author.toLowerCase().includes(searchQuery.toLowerCase());
    const st = filterStatus === 'All Status' || p.status === filterStatus;
    const ca = filterCategory === 'All Categories' || p.category === filterCategory;
    return s && st && ca;
  });

  if (editingPost !== null) {
    return <PostEditor post={editingPost === 'new' ? undefined : editingPost} onBack={() => setEditingPost(null)}
      onSave={(saved: any) => {
        if (editingPost === 'new') { setPosts([{ ...saved, id: Date.now(), views: 0, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...posts]); onToast('Post created!'); }
        else { setPosts(posts.map(p => p.id === (editingPost as Post).id ? { ...p, ...saved } : p)); onToast('Post updated!'); }
        setEditingPost(null);
      }}
    />;
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {deletePost && <ConfirmDialog title="Delete Post" message={`Delete "${deletePost.title.slice(0, 50)}..."? This cannot be undone.`} confirmLabel="Delete" danger onConfirm={() => { setPosts(posts.filter(p => p.id !== deletePost.id)); setDeletePost(null); onToast('Post deleted'); }} onCancel={() => setDeletePost(null)} />}

      {viewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>Post Preview</h2>
              <button onClick={() => setViewPost(null)} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="text-xs font-bold text-[--color-accent-red] mb-2">{viewPost.category.toUpperCase()}</div>
              <h1 className="text-3xl font-black mb-3 leading-tight" style={{ fontFamily: 'Merriweather, serif' }}>{viewPost.title}</h1>
              {viewPost.image && <img src={viewPost.image} alt="" className="w-full aspect-video object-cover mb-4 rounded" onError={e => (e.currentTarget.style.display = 'none')} />}
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                <span className="font-medium text-gray-800">{viewPost.author}</span><span>•</span><span>{viewPost.date}</span><span>•</span>
                <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${viewPost.status === 'Published' ? 'bg-green-100 text-green-700' : viewPost.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{viewPost.status}</span>
                <span>•</span><span>{viewPost.views.toLocaleString()} views</span>
              </div>
              <div className="text-gray-600 text-sm italic">{viewPost.content || 'No content written yet.'}</div>
              {viewPost.tags && viewPost.tags.length > 0 && <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">{viewPost.tags.map(t => <span key={t} className="px-2 py-1 border border-gray-200 text-xs">#{t}</span>)}</div>}
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => { setViewPost(null); setEditingPost(viewPost); }} className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800">Edit Post</button>
              <button onClick={() => setViewPost(null)} className="flex-1 px-4 py-2.5 border border-gray-200 text-sm font-medium hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>Posts</h1>
            <p className="text-gray-600">Manage all articles and content</p>
          </div>
          <button onClick={() => setEditingPost('new')} className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 font-semibold">
            <Plus className="w-5 h-5" />Create New Post
          </button>
        </div>
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 border border-blue-100">
            <span className="text-sm font-medium text-blue-800">{selectedIds.length} selected</span>
            <button onClick={() => { setPosts(posts.filter(p => !selectedIds.includes(p.id))); setSelectedIds([]); onToast(`${selectedIds.length} posts deleted`); }} className="px-3 py-1 bg-red-600 text-white text-xs font-medium hover:bg-red-700 flex items-center gap-1"><Trash2 className="w-3 h-3" />Delete</button>
            <button onClick={() => { setPosts(posts.map(p => selectedIds.includes(p.id) ? { ...p, status: 'Published' } : p)); setSelectedIds([]); onToast('Published!'); }} className="px-3 py-1 bg-green-600 text-white text-xs font-medium hover:bg-green-700">Publish</button>
            <button onClick={() => setSelectedIds([])} className="ml-auto text-xs text-gray-500">Clear</button>
          </div>
        )}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search posts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:outline-none focus:border-black" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-3 border border-gray-200 focus:outline-none focus:border-black">
            <option>All Status</option><option>Published</option><option>Draft</option><option>Scheduled</option>
          </select>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-4 py-3 border border-gray-200 focus:outline-none focus:border-black">
            <option>All Categories</option><option>Tech</option><option>Politics</option><option>Entertainment</option><option>Sports</option><option>Nepal</option><option>World</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-4 w-10"><input type="checkbox" checked={selectedIds.length === filtered.length && filtered.length > 0} onChange={() => setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map(p => p.id))} className="w-4 h-4" /></th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Title</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Category</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Author</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Views</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-6 py-16 text-center text-gray-400"><div className="text-4xl mb-3">📭</div><div className="font-medium">No posts found</div><div className="text-sm mt-1">Try adjusting your search</div></td></tr>
              ) : filtered.map(post => (
                <tr key={post.id} className={`hover:bg-gray-50/50 transition-colors ${selectedIds.includes(post.id) ? 'bg-blue-50/50' : ''}`}>
                  <td className="px-4 py-4"><input type="checkbox" checked={selectedIds.includes(post.id)} onChange={() => setSelectedIds(prev => prev.includes(post.id) ? prev.filter(i => i !== post.id) : [...prev, post.id])} className="w-4 h-4" /></td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-sm leading-snug max-w-xs">{post.title}</div>
                    {post.featured && <span className="inline-block mt-1 px-2 py-0.5 bg-[--color-accent-red] text-white text-xs font-semibold">FEATURED</span>}
                  </td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium">{post.category}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => { const ns = post.status === 'Published' ? 'Draft' : 'Published'; setPosts(posts.map(p => p.id === post.id ? { ...p, status: ns } : p)); onToast(`Set to ${ns}`); }}
                      className={`px-3 py-1 text-xs font-semibold rounded-full hover:opacity-80 transition-all ${post.status === 'Published' ? 'bg-green-100 text-green-700' : post.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`} title="Click to toggle">
                      {post.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setViewPost(post)} className="p-1.5 hover:bg-gray-100 rounded" title="Preview"><Eye className="w-4 h-4 text-gray-500" /></button>
                      <button onClick={() => setEditingPost(post)} className="p-1.5 hover:bg-gray-100 rounded" title="Edit"><Edit className="w-4 h-4 text-gray-500" /></button>
                      <button onClick={() => { setPosts(posts.map(p => p.id === post.id ? { ...p, featured: !p.featured } : p)); onToast(post.featured ? 'Removed from featured' : 'Marked as featured'); }} className="p-1.5 hover:bg-gray-100 rounded" title="Toggle featured">
                        <Star className={`w-4 h-4 ${post.featured ? 'text-yellow-500 fill-yellow-400' : 'text-gray-400'}`} />
                      </button>
                      <button onClick={() => setDeletePost(post)} className="p-1.5 hover:bg-red-50 rounded" title="Delete"><Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing {filtered.length} of {posts.length} posts</div>
          <div className="flex gap-1">
            {['Previous', '1', '2', '3', 'Next'].map(p => (
              <button key={p} className={`px-3 py-2 text-sm font-medium border ${p === '1' ? 'bg-black text-white border-black' : 'border-gray-200 hover:bg-gray-50'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Users Page ────────────────────────────────────────────────────────

type User = { id: number; name: string; email: string; role: string; status: string; posts: number; joined: string; avatar: string; bio?: string; };
const initialUsers: User[] = [
  { id: 1, name: 'Priya Sharma', email: 'priya@example.com', role: 'Author', status: 'Active', posts: 24, joined: 'Jan 15, 2025', avatar: 'PS', bio: 'Senior tech reporter.' },
  { id: 2, name: 'Rajesh Thapa', email: 'rajesh@example.com', role: 'Author', status: 'Active', posts: 18, joined: 'Feb 3, 2025', avatar: 'RT' },
  { id: 3, name: 'Maya Gurung', email: 'maya@example.com', role: 'Author', status: 'Active', posts: 21, joined: 'Mar 12, 2025', avatar: 'MG' },
  { id: 4, name: 'Suman Karki', email: 'suman@example.com', role: 'Editor', status: 'Active', posts: 32, joined: 'Dec 8, 2024', avatar: 'SK' },
  { id: 5, name: 'Anjali Rai', email: 'anjali@example.com', role: 'Author', status: 'Active', posts: 15, joined: 'Mar 28, 2025', avatar: 'AR' },
  { id: 6, name: 'Deepak Basnet', email: 'deepak@example.com', role: 'Subscriber', status: 'Active', posts: 0, joined: 'Apr 1, 2026', avatar: 'DB' },
  { id: 7, name: 'Kavita Magar', email: 'kavita@example.com', role: 'Author', status: 'Suspended', posts: 8, joined: 'Jan 20, 2025', avatar: 'KM' },
  { id: 8, name: 'Ramesh Shrestha', email: 'ramesh@example.com', role: 'Admin', status: 'Active', posts: 45, joined: 'Oct 5, 2024', avatar: 'RS' },
];

function UsersPage({ onToast }: { onToast: (m: string) => void }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filterRole, setFilterRole] = useState('All Roles');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [search, setSearch] = useState('');
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [emailUser, setEmailUser] = useState<User | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Author', password: '' });

  const roleColor = (r: string) => r === 'Admin' ? 'bg-purple-100 text-purple-700' : r === 'Editor' ? 'bg-blue-100 text-blue-700' : r === 'Author' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';

  const filtered = users.filter(u => {
    const s = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const r = filterRole === 'All Roles' || u.role === filterRole;
    const st = filterStatus === 'All Status' || u.status === filterStatus;
    return s && r && st;
  });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {deleteUser && <ConfirmDialog title="Delete User" message={`Permanently delete ${deleteUser.name}? Their posts will remain but the account will be removed.`} confirmLabel="Delete User" danger onConfirm={() => { setUsers(users.filter(u => u.id !== deleteUser.id)); setDeleteUser(null); onToast(`${deleteUser.name} deleted`); }} onCancel={() => setDeleteUser(null)} />}

      {/* View User */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-black text-xl" style={{ fontFamily: 'Merriweather, serif' }}>User Profile</h2>
              <button onClick={() => setViewUser(null)} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold">{viewUser.avatar}</div>
                <div>
                  <div className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>{viewUser.name}</div>
                  <div className="text-sm text-gray-500">{viewUser.email}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[{ l: 'Role', v: <span className={`px-2 py-0.5 text-xs rounded font-medium ${roleColor(viewUser.role)}`}>{viewUser.role}</span> }, { l: 'Status', v: <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${viewUser.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{viewUser.status}</span> }, { l: 'Posts', v: <span className="font-bold">{viewUser.posts}</span> }, { l: 'Joined', v: viewUser.joined }].map(({ l, v }) => (
                  <div key={l} className="p-3 bg-gray-50 rounded"><div className="text-xs text-gray-400 mb-1">{l}</div><div>{v}</div></div>
                ))}
              </div>
              {viewUser.bio && <div className="mt-3 p-3 bg-gray-50 text-sm text-gray-600 rounded">{viewUser.bio}</div>}
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => { setViewUser(null); setEditUser(viewUser); }} className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800">Edit</button>
              <button onClick={() => { setViewUser(null); setEmailUser(viewUser); }} className="flex-1 px-4 py-2.5 border border-gray-200 text-sm font-medium hover:bg-gray-50">Email</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-black text-xl" style={{ fontFamily: 'Merriweather, serif' }}>Edit User</h2>
              <button onClick={() => setEditUser(null)} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[{ l: 'Full Name', k: 'name', t: 'text' }, { l: 'Email', k: 'email', t: 'email' }].map(({ l, k, t }) => (
                <div key={k}>
                  <label className="block text-sm font-medium mb-1">{l}</label>
                  <input type={t} value={(editUser as any)[k] || ''} onChange={e => setEditUser({ ...editUser, [k]: e.target.value })} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea value={editUser.bio || ''} onChange={e => setEditUser({ ...editUser, bio: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select value={editUser.role} onChange={e => setEditUser({ ...editUser, role: e.target.value })} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm">
                  {['Admin', 'Editor', 'Author', 'Subscriber'].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => setEditUser(null)} className="flex-1 px-4 py-2.5 border border-gray-200 text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={() => { setUsers(users.map(u => u.id === editUser.id ? editUser : u)); setEditUser(null); onToast('User updated'); }} className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-800">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Email User */}
      {emailUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-black text-xl" style={{ fontFamily: 'Merriweather, serif' }}>Email {emailUser.name}</h2>
              <button onClick={() => setEmailUser(null)} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">To</label><input type="text" value={emailUser.email} readOnly className="w-full px-3 py-2 border border-gray-100 bg-gray-50 text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Subject</label><input type="text" placeholder="Subject..." className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Message</label><textarea rows={5} placeholder="Your message..." className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm resize-none" /></div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => setEmailUser(null)} className="flex-1 px-4 py-2.5 border border-gray-200 text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={() => { setEmailUser(null); onToast(`Email sent to ${emailUser.name}`); }} className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-800">Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-black text-xl" style={{ fontFamily: 'Merriweather, serif' }}>Add New User</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[{ l: 'Full Name *', k: 'name', t: 'text', p: 'Priya Sharma' }, { l: 'Email *', k: 'email', t: 'email', p: 'priya@example.com' }, { l: 'Password', k: 'password', t: 'password', p: 'Temporary password' }].map(({ l, k, t, p }) => (
                <div key={k}>
                  <label className="block text-sm font-medium mb-1">{l}</label>
                  <input type={t} value={(newUser as any)[k]} onChange={e => setNewUser({ ...newUser, [k]: e.target.value })} placeholder={p} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm">
                  {['Admin', 'Editor', 'Author', 'Subscriber'].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button disabled={!newUser.name || !newUser.email} onClick={() => {
                const u: User = { id: Date.now(), name: newUser.name, email: newUser.email, role: newUser.role, status: 'Active', posts: 0, joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), avatar: newUser.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() };
                setUsers([u, ...users]); setShowAdd(false); setNewUser({ name: '', email: '', role: 'Author', password: '' }); onToast(`${newUser.name} added!`);
              }} className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-40">Add User</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>Users</h1><p className="text-gray-600">Manage users and permissions</p></div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 font-semibold"><UserPlus className="w-5 h-5" />Add User</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:outline-none focus:border-black" /></div>
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="px-4 py-3 border border-gray-200 focus:outline-none focus:border-black">
            <option>All Roles</option>{['Admin', 'Editor', 'Author', 'Subscriber'].map(r => <option key={r}>{r}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-3 border border-gray-200 focus:outline-none focus:border-black">
            <option>All Status</option><option>Active</option><option>Suspended</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[{ l: 'Total Users', v: users.length }, { l: 'Active', v: users.filter(u => u.status === 'Active').length, c: 'text-green-600' }, { l: 'Authors', v: users.filter(u => u.role === 'Author').length }, { l: 'New This Month', v: 247 }].map(({ l, v, c }) => (
          <div key={l} className="bg-white border border-gray-200 p-6"><div className="text-sm text-gray-600 mb-2">{l}</div><div className={`text-3xl font-black ${c || ''}`} style={{ fontFamily: 'Merriweather, serif' }}>{v}</div></div>
        ))}
      </div>

      <div className="bg-white border border-gray-200">
        <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{['User', 'Email', 'Role', 'Posts', 'Status', 'Joined', 'Actions'].map(h => <th key={h} className="text-left px-6 py-4 font-semibold text-sm">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? <tr><td colSpan={7} className="px-6 py-16 text-center text-gray-400"><div className="text-4xl mb-3">👤</div><div className="font-medium">No users found</div></td></tr> : filtered.map(user => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">{user.avatar}</div><div className="font-semibold text-sm">{user.name}</div></div></td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded ${roleColor(user.role)}`}>{user.role}</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.posts}</td>
                <td className="px-6 py-4"><span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />}{user.status}</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setViewUser(user)} className="p-1.5 hover:bg-gray-100 rounded" title="View"><Eye className="w-4 h-4 text-gray-500" /></button>
                    <button onClick={() => setEmailUser(user)} className="p-1.5 hover:bg-gray-100 rounded" title="Email"><Mail className="w-4 h-4 text-gray-500" /></button>
                    <button onClick={() => setEditUser(user)} className="p-1.5 hover:bg-gray-100 rounded" title="Edit"><Edit className="w-4 h-4 text-gray-500" /></button>
                    <button onClick={() => { const ns = user.status === 'Active' ? 'Suspended' : 'Active'; setUsers(users.map(u => u.id === user.id ? { ...u, status: ns } : u)); onToast(`${user.name} ${ns === 'Active' ? 'reactivated' : 'suspended'}`); }} className="p-1.5 hover:bg-gray-100 rounded" title={user.status === 'Active' ? 'Suspend' : 'Reactivate'}><Ban className={`w-4 h-4 ${user.status === 'Suspended' ? 'text-green-500' : 'text-gray-400'}`} /></button>
                    <button onClick={() => setDeleteUser(user)} className="p-1.5 hover:bg-red-50 rounded" title="Delete"><Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing {filtered.length} of {users.length} users</div>
          <div className="flex gap-1">{['Previous', '1', '2', 'Next'].map(p => <button key={p} className={`px-3 py-2 text-sm font-medium border ${p === '1' ? 'bg-black text-white border-black' : 'border-gray-200 hover:bg-gray-50'}`}>{p}</button>)}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────

function DashboardPage({ onNavigate }: { onNavigate: (page: string, action?: string) => void }) {
  const recentPosts = [
    { id: 1, title: "Nepal's Tech Startup Ecosystem Reaches $2 Billion", status: 'Published', views: 15234, date: 'Apr 13, 2026' },
    { id: 2, title: "Gen Z Activists Reshape Political Landscape", status: 'Published', views: 12456, date: 'Apr 12, 2026' },
    { id: 3, title: "Underground Music Scene Goes Global", status: 'Draft', views: 0, date: 'Apr 12, 2026' },
    { id: 4, title: "The Rise of Women's Football", status: 'Published', views: 8934, date: 'Apr 11, 2026' },
    { id: 5, title: "Climate Action: Youth Leading the Charge", status: 'Published', views: 10567, date: 'Apr 11, 2026' },
  ];
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>Dashboard</h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Welcome back! Here's what's happening today.</p>
          </div>
          <button onClick={() => onNavigate('Posts', 'new')} className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Plus className="w-5 h-5" />New Post
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[{ label: 'Total Posts', value: '1,247', sub: '12% from last month' }, { label: 'Total Users', value: '45,892', sub: '8% from last month' }, { label: 'Daily Visitors', value: '8,456', sub: '24% from yesterday' }, { label: 'Trending Topic', value: '#Tech', sub: '15,234 mentions today' }].map(({ label, value, sub }) => (
          <div key={label} className="bg-white border border-gray-200 p-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="text-sm text-gray-600 mb-4">{label}</div>
            <div className="text-3xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>{value}</div>
            <div className="flex items-center gap-1 text-sm text-green-600"><TrendingUp className="w-4 h-4" /><span>{sub}</span></div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>Recent Posts</h2>
              <button onClick={() => onNavigate('Posts')} className="text-sm text-[--color-accent-red] hover:underline">View All</button>
            </div>
            <div className="divide-y divide-gray-50">
              {recentPosts.map(post => (
                <div key={post.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{post.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{post.date}</span><span>•</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span><span>•</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{post.status}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => onNavigate('Posts', String(post.id))} className="p-2 hover:bg-gray-100 rounded"><Edit className="w-4 h-4 text-gray-500" /></button>
                      <button className="p-2 hover:bg-gray-100 rounded"><Trash2 className="w-4 h-4 text-gray-400" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>Quick Actions</h3>
            <div className="space-y-2">
              {[{ l: 'Create Post', p: 'Posts', a: 'new' }, { l: 'Manage Users', p: 'Users' }, { l: 'View Analytics', p: 'Analytics' }, { l: 'Upload Media', p: 'Media' }, { l: 'Manage Ads', p: 'Ads' }].map(({ l, p, a }) => (
                <button key={l} onClick={() => onNavigate(p, a)} className="w-full flex items-center gap-3 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 hover:border-black transition-all text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Plus className="w-4 h-4" />{l}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>System Status</h3>
            <div className="space-y-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {[['Website', 'Online'], ['Database', 'Healthy'], ['CDN', 'Active'], ['API', 'Running']].map(([l, s]) => (
                <div key={l} className="flex items-center justify-between">
                  <span className="text-gray-600">{l}</span>
                  <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full" /><span className="text-green-600 font-medium">{s}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Remaining Pages (wired stubs with full interactivity) ─────────────

function TopicsPage({ onToast }: { onToast: (m: string) => void }) {
  const [topics, setTopics] = useState([
    { id: 1, name: 'Startups', slug: 'startups', posts: 142, mentions: 3421, trending: true, color: '#e63946' },
    { id: 2, name: 'Politics', slug: 'politics', posts: 289, mentions: 5234, trending: true, color: '#457b9d' },
    { id: 3, name: 'Climate', slug: 'climate', posts: 167, mentions: 2876, trending: false, color: '#06a77d' },
    { id: 4, name: 'Music', slug: 'music', posts: 203, mentions: 4123, trending: true, color: '#f72585' },
    { id: 5, name: 'Sports', slug: 'sports', posts: 312, mentions: 6234, trending: false, color: '#f77f00' },
    { id: 6, name: 'Tech', slug: 'tech', posts: 456, mentions: 8765, trending: true, color: '#4361ee' },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [editTopic, setEditTopic] = useState<any>(null);
  const [deleteTopic, setDeleteTopic] = useState<any>(null);
  const [newTopic, setNewTopic] = useState({ name: '', slug: '', color: '#e63946', trending: false });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {deleteTopic && <ConfirmDialog title="Delete Topic" message={`Delete #${deleteTopic.name}? This topic will be removed from all posts.`} confirmLabel="Delete" danger onConfirm={() => { setTopics(topics.filter(t => t.id !== deleteTopic.id)); setDeleteTopic(null); onToast(`#${deleteTopic.name} deleted`); }} onCancel={() => setDeleteTopic(null)} />}

      {(showCreate || editTopic) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-black text-xl" style={{ fontFamily: 'Merriweather, serif' }}>{editTopic ? 'Edit Topic' : 'Create Topic'}</h2>
              <button onClick={() => { setShowCreate(false); setEditTopic(null); }} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[{ l: 'Topic Name', k: 'name', p: 'Technology' }, { l: 'Slug', k: 'slug', p: 'technology' }].map(({ l, k, p }) => (
                <div key={k}>
                  <label className="block text-sm font-medium mb-1">{l}</label>
                  <input type="text" value={editTopic ? editTopic[k] : (newTopic as any)[k]} onChange={e => editTopic ? setEditTopic({ ...editTopic, [k]: e.target.value }) : setNewTopic({ ...newTopic, [k]: e.target.value })} placeholder={p} className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <div className="flex gap-2">
                  <input type="color" value={editTopic ? editTopic.color : newTopic.color} onChange={e => editTopic ? setEditTopic({ ...editTopic, color: e.target.value }) : setNewTopic({ ...newTopic, color: e.target.value })} className="w-12 h-10 border border-gray-200 cursor-pointer" />
                  <input type="text" value={editTopic ? editTopic.color : newTopic.color} onChange={e => editTopic ? setEditTopic({ ...editTopic, color: e.target.value }) : setNewTopic({ ...newTopic, color: e.target.value })} className="flex-1 px-3 py-2 border border-gray-200 focus:outline-none focus:border-black text-sm font-mono" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="trending-cb" checked={editTopic ? editTopic.trending : newTopic.trending} onChange={e => editTopic ? setEditTopic({ ...editTopic, trending: e.target.checked }) : setNewTopic({ ...newTopic, trending: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="trending-cb" className="text-sm font-medium">Mark as trending</label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button onClick={() => { setShowCreate(false); setEditTopic(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={() => {
                if (editTopic) { setTopics(topics.map(t => t.id === editTopic.id ? editTopic : t)); onToast(`#${editTopic.name} updated`); setEditTopic(null); }
                else if (newTopic.name) { setTopics([...topics, { ...newTopic, id: Date.now(), posts: 0, mentions: 0 }]); onToast(`#${newTopic.name} created`); setShowCreate(false); setNewTopic({ name: '', slug: '', color: '#e63946', trending: false }); }
              }} className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-800">{editTopic ? 'Save Changes' : 'Create Topic'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>Topics</h1><p className="text-gray-600">Manage content topics and hashtags</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 font-semibold"><Plus className="w-5 h-5" />Create Topic</button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[{ l: 'Total Topics', v: topics.length }, { l: 'Trending', v: topics.filter(t => t.trending).length }, { l: 'Total Posts', v: topics.reduce((s, t) => s + t.posts, 0) }, { l: 'Total Mentions', v: topics.reduce((s, t) => s + t.mentions, 0).toLocaleString() }].map(({ l, v }) => (
          <div key={l} className="bg-white border border-gray-200 p-6"><div className="text-sm text-gray-600 mb-2">{l}</div><div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>{v}</div></div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(topic => (
          <div key={topic.id} className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ backgroundColor: topic.color + '20' }}>
                  <Hash className="w-5 h-5" style={{ color: topic.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-black" style={{ fontFamily: 'Merriweather, serif' }}>{topic.name}</h3>
                  <p className="text-xs text-gray-400">/{topic.slug}</p>
                </div>
              </div>
              {topic.trending && <span className="flex items-center gap-1 px-2 py-1 bg-[--color-accent-red] text-white text-xs font-semibold"><TrendingUp className="w-3 h-3" />HOT</span>}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div><div className="text-xl font-black">{topic.posts}</div><div className="text-xs text-gray-400">Posts</div></div>
              <div><div className="text-xl font-black">{topic.mentions.toLocaleString()}</div><div className="text-xs text-gray-400">Mentions</div></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditTopic(topic)} className="flex-1 px-4 py-2 border border-gray-200 hover:bg-gray-50 text-sm font-medium flex items-center justify-center gap-1"><Edit className="w-3.5 h-3.5" />Edit</button>
              <button onClick={() => setDeleteTopic(topic)} className="px-4 py-2 border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors"><Trash2 className="w-4 h-4 text-gray-400" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MediaPage({ onToast }: { onToast: (m: string) => void }) {
  const [items, setItems] = useState([
    { id: 1, name: 'startup-office.jpg', type: 'image', size: '2.4 MB', date: 'Apr 13, 2026', usedIn: 5, url: 'https://images.unsplash.com/photo-1759752393882-1b6587a7c887?w=400' },
    { id: 2, name: 'protest-crowd.jpg', type: 'image', size: '3.1 MB', date: 'Apr 12, 2026', usedIn: 3, url: 'https://images.unsplash.com/photo-1593656088480-8055f13aed00?w=400' },
    { id: 3, name: 'concert-crowd.jpg', type: 'image', size: '2.8 MB', date: 'Apr 12, 2026', usedIn: 2, url: 'https://images.unsplash.com/photo-1672841852639-9e758334c690?w=400' },
    { id: 4, name: 'football-action.jpg', type: 'image', size: '1.9 MB', date: 'Apr 11, 2026', usedIn: 4, url: 'https://images.unsplash.com/photo-1745104172230-42630f9b75d4?w=400' },
    { id: 5, name: 'interview-video.mp4', type: 'video', size: '45.3 MB', date: 'Apr 10, 2026', usedIn: 1, url: '' },
    { id: 6, name: 'annual-report.pdf', type: 'document', size: '8.7 MB', date: 'Apr 9, 2026', usedIn: 2, url: '' },
  ]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All Types');
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [previewItem, setPreviewItem] = useState<any>(null);

  const filtered = items.filter(i => {
    const s = i.name.toLowerCase().includes(search.toLowerCase());
    const f = filter === 'All Types' || (filter === 'Images' && i.type === 'image') || (filter === 'Videos' && i.type === 'video') || (filter === 'Documents' && i.type === 'document');
    return s && f;
  });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {deleteItem && <ConfirmDialog title="Delete File" message={`Delete "${deleteItem.name}"? This cannot be undone.`} confirmLabel="Delete" danger onConfirm={() => { setItems(items.filter(i => i.id !== deleteItem.id)); setDeleteItem(null); onToast(`${deleteItem.name} deleted`); }} onCancel={() => setDeleteItem(null)} />}

      {previewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={() => setPreviewItem(null)}>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <div className="bg-white p-2">
              {previewItem.url ? <img src={previewItem.url} alt={previewItem.name} className="w-full max-h-[70vh] object-contain" /> : <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">Preview not available</div>}
            </div>
            <div className="bg-white mt-1 p-4 flex items-center justify-between">
              <div><div className="font-semibold">{previewItem.name}</div><div className="text-sm text-gray-500">{previewItem.size} · {previewItem.date}</div></div>
              <button onClick={() => setPreviewItem(null)} className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>Media Library</h1><p className="text-gray-600">Manage images, videos, and documents</p></div>
          <label className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 cursor-pointer font-semibold">
            <Upload className="w-5 h-5" />Upload Files
            <input type="file" className="hidden" multiple onChange={e => { if (!e.target.files?.length) return; Array.from(e.target.files).forEach(f => { setItems(prev => [{ id: Date.now() + Math.random(), name: f.name, type: f.type.startsWith('image') ? 'image' : f.type.startsWith('video') ? 'video' : 'document', size: `${(f.size / 1024 / 1024).toFixed(1)} MB`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), usedIn: 0, url: f.type.startsWith('image') ? URL.createObjectURL(f) : '' }, ...prev]); }); onToast(`${e.target.files.length} file(s) uploaded`); }} />
          </label>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search media..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:outline-none focus:border-black" /></div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-3 border border-gray-200 focus:outline-none focus:border-black">
            {['All Types', 'Images', 'Videos', 'Documents'].map(f => <option key={f}>{f}</option>)}
          </select>
          <div className="flex border border-gray-200">
            <button onClick={() => setViewMode('grid')} className={`px-4 py-3 text-sm ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}>Grid</button>
            <button onClick={() => setViewMode('list')} className={`px-4 py-3 text-sm ${viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}>List</button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[{ l: 'Total Files', v: items.length }, { l: 'Images', v: items.filter(i => i.type === 'image').length }, { l: 'Videos', v: items.filter(i => i.type === 'video').length }, { l: 'Storage Used', v: '73 MB' }].map(({ l, v }) => (
          <div key={l} className="bg-white border border-gray-200 p-6"><div className="text-sm text-gray-600 mb-2">{l}</div><div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>{v}</div></div>
        ))}
      </div>

      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow group">
              <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => setPreviewItem(item)}>
                {item.type === 'image' && item.url ? <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : item.type === 'video' ? <Video className="w-12 h-12 text-gray-300" /> : <FileIcon className="w-12 h-12 text-gray-300" />}
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm mb-1 truncate">{item.name}</div>
                <div className="text-xs text-gray-400 mb-2">{item.size} · {item.usedIn} posts</div>
                <div className="flex gap-1">
                  <button onClick={() => setPreviewItem(item)} className="flex-1 px-2 py-1.5 border border-gray-200 hover:bg-gray-50 text-xs font-medium flex items-center justify-center gap-1"><Eye className="w-3 h-3" />View</button>
                  <button onClick={() => { onToast(`Downloading ${item.name}...`); }} className="px-2 py-1.5 border border-gray-200 hover:bg-gray-50"><Download className="w-3 h-3 text-gray-500" /></button>
                  <button onClick={() => setDeleteItem(item)} className="px-2 py-1.5 border border-gray-200 hover:bg-red-50 hover:border-red-200"><Trash2 className="w-3 h-3 text-gray-400" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Preview', 'Name', 'Type', 'Size', 'Date', 'Used In', 'Actions'].map(h => <th key={h} className="text-left px-6 py-4 font-semibold text-sm">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4"><div className="w-14 h-14 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => setPreviewItem(item)}>{item.type === 'image' && item.url ? <img src={item.url} alt="" className="w-full h-full object-cover" /> : item.type === 'video' ? <Video className="w-6 h-6 text-gray-400" /> : <FileIcon className="w-6 h-6 text-gray-400" />}</div></td>
                  <td className="px-6 py-4 font-medium text-sm">{item.name}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium capitalize">{item.type}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.usedIn} posts</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => setPreviewItem(item)} className="p-1.5 hover:bg-gray-100 rounded"><Eye className="w-4 h-4 text-gray-500" /></button>
                      <button onClick={() => onToast(`Downloading ${item.name}...`)} className="p-1.5 hover:bg-gray-100 rounded"><Download className="w-4 h-4 text-gray-500" /></button>
                      <button onClick={() => setDeleteItem(item)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" /></button>
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

// ─── Remaining pages pass-through (Games, Sources, Ads, Analytics, Settings) ──

// ─── Main AdminDashboard ───────────────────────────────────────────────

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
  const [pendingAction, setPendingAction] = useState<string | undefined>(undefined);
  const [toast, setToast] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const navigate = (page: string, action?: string) => {
    setActiveMenu(page);
    setPendingAction(action);
    setMobileSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activeMenu) {
      case 'Dashboard': return <DashboardPage onNavigate={navigate} />;
      case 'Posts': return <PostsPage initialAction={pendingAction} onToast={showToast} />;
      case 'Topics': return <TopicsPage onToast={showToast} />;
      case 'Sources': return <SourcesPage />;
      case 'Media': return <MediaPage onToast={showToast} />;
      case 'Games': return <GamesAdmin />;
      case 'Users': return <UsersPage onToast={showToast} />;
      case 'Ads': return <AdsPage />;
      case 'Analytics': return <AnalyticsPage />;
      case 'Settings': return <SettingsPage />;
      default: return <DashboardPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {toast && <Toast message={toast} />}

      {/* Mobile overlay */}
      {mobileSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:sticky top-0 z-50 md:z-auto w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col h-screen transition-transform duration-200`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[--color-accent-red] flex items-center justify-center">
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'Merriweather, serif' }}>N</span>
              </div>
              <span className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>NepalNow</span>
            </div>
            <button onClick={() => setMobileSidebarOpen(false)} className="md:hidden p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
          </div>
          <div className="text-xs text-gray-400 mt-1.5">Admin Dashboard</div>
        </div>

        <nav className="p-3 flex-1 overflow-y-auto">
          <ul className="space-y-0.5">
            {menuItems.map(item => (
              <li key={item.label}>
                <button
                  onClick={() => { setActiveMenu(item.label); setPendingAction(undefined); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${activeMenu === item.label ? 'bg-[--color-accent-red] text-white font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm">AD</div>
            <div>
              <div className="font-semibold text-sm">Admin User</div>
              <div className="text-xs text-gray-400">admin@nepalnow.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Mobile header */}
        <div className="md:hidden sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-30">
          <button onClick={() => setMobileSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded"><Menu className="w-5 h-5" /></button>
          <span className="font-black text-lg" style={{ fontFamily: 'Merriweather, serif' }}>NepalNow Admin</span>
          <div className="w-9" />
        </div>
        <div className="p-6 md:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
