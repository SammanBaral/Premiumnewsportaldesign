import { useState } from 'react';
import { ArrowLeft, Save, Eye, Upload, X, Plus, Bold, Italic, Link, List, Quote, Image as ImageIcon, Hash } from 'lucide-react';

interface PostEditorProps {
  post?: {
    id?: number;
    title?: string;
    subtitle?: string;
    category?: string;
    author?: string;
    status?: string;
    content?: string;
    tags?: string[];
    featured?: boolean;
    image?: string;
  };
  onBack: () => void;
  onSave?: (post: any) => void;
}

export function PostEditor({ post, onBack, onSave }: PostEditorProps) {
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
  const [scheduledDate, setScheduledDate] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [imageUrl, setImageUrl] = useState(post?.image || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  const handleSave = async (publishStatus?: string) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    if (onSave) {
      onSave({ title, subtitle, category, author, status: publishStatus || status, content, tags, featured, imageUrl });
    }
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Posts</span>
          </button>
          <div className="w-px h-6 bg-gray-300" />
          <h1 className="text-2xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => handleSave('Draft')}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            onClick={() => handleSave('Published')}
            disabled={saving || !title.trim()}
            className="flex items-center gap-2 px-5 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-semibold disabled:opacity-50"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : saved ? (
              '✓ Saved!'
            ) : (
              'Publish'
            )}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {showPreview ? (
            <div className="bg-white border border-border p-8">
              <div className="text-xs font-bold text-[--color-accent-red] mb-3">{category.toUpperCase()}</div>
              <h1 className="text-4xl font-black leading-tight mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                {title || <span className="text-gray-300">No title yet...</span>}
              </h1>
              {subtitle && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">{subtitle}</p>
              )}
              {imageUrl && (
                <div className="aspect-[16/9] overflow-hidden mb-6 bg-gray-100">
                  <img src={imageUrl} alt={title} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-8 pb-6 border-b border-border">
                <span className="font-medium">{author}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span>{readTime} min read</span>
              </div>
              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                {content || <span className="text-gray-300">No content yet...</span>}
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                  {tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border border-black text-sm">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Title */}
              <div className="bg-white border border-border">
                <div className="p-6">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Title *</label>
                  <textarea
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Write your headline here..."
                    rows={2}
                    className="w-full text-3xl font-black resize-none focus:outline-none placeholder:text-gray-200 leading-tight"
                    style={{ fontFamily: 'Merriweather, serif' }}
                  />
                  <div className="text-xs text-gray-400 mt-1">{title.length}/100 characters</div>
                </div>
              </div>

              {/* Subtitle */}
              <div className="bg-white border border-border p-6">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Subtitle / Deck</label>
                <textarea
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  placeholder="A brief description that appears below the headline..."
                  rows={2}
                  className="w-full text-lg resize-none focus:outline-none placeholder:text-gray-300 leading-relaxed"
                />
              </div>

              {/* Featured Image */}
              <div className="bg-white border border-border p-6">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Featured Image</label>
                {imageUrl ? (
                  <div className="relative">
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                      <img src={imageUrl} alt="Featured" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                    </div>
                    <button
                      onClick={() => setImageUrl('')}
                      className="absolute top-3 right-3 w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="mt-3">
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder="Image URL"
                        className="w-full px-3 py-2 border border-border text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded p-10 text-center hover:border-black transition-colors cursor-pointer"
                      onClick={() => document.getElementById('img-url-input')?.focus()}
                    >
                      <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500 mb-1">Drop an image or paste a URL</p>
                      <p className="text-xs text-gray-400">Recommended: 1200×675px (16:9)</p>
                    </div>
                    <input
                      id="img-url-input"
                      type="url"
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)}
                      placeholder="Or paste image URL here..."
                      className="w-full mt-3 px-3 py-2 border border-border text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                )}
              </div>

              {/* Content Editor */}
              <div className="bg-white border border-border">
                <div className="border-b border-border px-4 py-2 flex items-center gap-1 flex-wrap">
                  <span className="text-xs text-gray-400 mr-2">FORMAT:</span>
                  {[
                    { icon: Bold, label: 'Bold', cmd: '**' },
                    { icon: Italic, label: 'Italic', cmd: '_' },
                  ].map(({ icon: Icon, label, cmd }) => (
                    <button
                      key={label}
                      title={label}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      onClick={() => {
                        const ta = document.getElementById('content-area') as HTMLTextAreaElement;
                        if (!ta) return;
                        const s = ta.selectionStart, e = ta.selectionEnd;
                        const sel = content.slice(s, e);
                        const newContent = content.slice(0, s) + cmd + sel + cmd + content.slice(e);
                        setContent(newContent);
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                  <div className="w-px h-4 bg-gray-200 mx-1" />
                  <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Blockquote"
                    onClick={() => setContent(content + '\n\n> ')}>
                    <Quote className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="List"
                    onClick={() => setContent(content + '\n\n• ')}>
                    <List className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Link"
                    onClick={() => setContent(content + '[link text](https://)')}>
                    <Link className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-gray-200 mx-1" />
                  <button className="px-2 py-1 text-xs hover:bg-gray-100 rounded transition-colors font-bold" title="Heading 2"
                    onClick={() => setContent(content + '\n\n## ')}>H2</button>
                  <button className="px-2 py-1 text-xs hover:bg-gray-100 rounded transition-colors font-bold" title="Heading 3"
                    onClick={() => setContent(content + '\n\n### ')}>H3</button>
                  <div className="ml-auto text-xs text-gray-400">{wordCount} words · {readTime} min read</div>
                </div>
                <textarea
                  id="content-area"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder={`Start writing your article here...\n\nYou can use basic markdown:\n## Heading 2\n### Heading 3\n**bold text**\n_italic text_\n> blockquote\n• list item`}
                  className="w-full p-6 min-h-[500px] resize-none focus:outline-none text-base leading-relaxed placeholder:text-gray-200"
                  style={{ fontFamily: 'Georgia, serif' }}
                />
              </div>

              {/* SEO */}
              <div className="bg-white border border-border p-6">
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-xs">S</span>
                  SEO Settings
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={e => setSeoTitle(e.target.value)}
                      placeholder={title || 'SEO title (defaults to post title)'}
                      className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm"
                    />
                    <div className="text-xs text-gray-400 mt-1">{seoTitle.length}/60 chars recommended</div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Meta Description</label>
                    <textarea
                      value={seoDesc}
                      onChange={e => setSeoDesc(e.target.value)}
                      placeholder="Brief description for search engines..."
                      rows={2}
                      className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm resize-none"
                    />
                    <div className="text-xs text-gray-400 mt-1">{seoDesc.length}/160 chars recommended</div>
                  </div>
                  {/* Google Preview */}
                  {(title || seoTitle) && (
                    <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                      <div className="text-[#1a0dab] font-medium truncate">{seoTitle || title}</div>
                      <div className="text-[#006621] text-[11px]">nepalnow.com › {category.toLowerCase()} › {title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}</div>
                      <div className="text-gray-600 mt-0.5 line-clamp-2">{seoDesc || subtitle || 'No description provided.'}</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white border border-border p-6">
            <h3 className="font-black text-sm uppercase tracking-wide mb-4">Publish Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm"
                >
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Scheduled</option>
                </select>
              </div>
              {status === 'Scheduled' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Publish Date</label>
                  <input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={e => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm"
                  />
                </div>
              )}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium">Featured Post</div>
                  <div className="text-xs text-gray-500">Show in hero section</div>
                </div>
                <button
                  onClick={() => setFeatured(!featured)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${featured ? 'bg-black' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${featured ? 'left-5' : 'left-1'}`} />
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <button
                onClick={() => handleSave('Draft')}
                disabled={saving}
                className="flex-1 px-3 py-2 border border-border hover:bg-gray-50 text-sm font-medium transition-colors disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSave('Published')}
                disabled={saving || !title.trim()}
                className="flex-1 px-3 py-2 bg-black text-white hover:bg-gray-800 text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? '...' : 'Publish'}
              </button>
            </div>
          </div>

          {/* Category & Author */}
          <div className="bg-white border border-border p-6">
            <h3 className="font-black text-sm uppercase tracking-wide mb-4">Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm"
                >
                  <option>Tech</option>
                  <option>Politics</option>
                  <option>Entertainment</option>
                  <option>Sports</option>
                  <option>Nepal</option>
                  <option>World</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Author</label>
                <select
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-border focus:outline-none focus:border-black text-sm"
                >
                  <option>Priya Sharma</option>
                  <option>Rajesh Thapa</option>
                  <option>Maya Gurung</option>
                  <option>Suman Karki</option>
                  <option>Anjali Rai</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white border border-border p-6">
            <h3 className="font-black text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs font-medium">
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-border focus:outline-none focus:border-black text-sm"
              />
              <button
                onClick={addTag}
                className="px-3 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sources */}
          <div className="bg-white border border-border p-6">
            <h3 className="font-black text-sm uppercase tracking-wide mb-4">Sources</h3>
            <SourcesWidget />
          </div>

          {/* Article Stats */}
          <div className="bg-gray-50 border border-border p-6">
            <h3 className="font-black text-sm uppercase tracking-wide mb-4 text-gray-500">Article Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-black">{wordCount}</div>
                <div className="text-xs text-gray-500">Words</div>
              </div>
              <div>
                <div className="text-2xl font-black">{readTime}m</div>
                <div className="text-xs text-gray-500">Read Time</div>
              </div>
              <div>
                <div className="text-2xl font-black">{title.split(' ').length}</div>
                <div className="text-xs text-gray-500">Title Words</div>
              </div>
              <div>
                <div className="text-2xl font-black">{tags.length}</div>
                <div className="text-xs text-gray-500">Tags</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SourcesWidget() {
  const [sources, setSources] = useState<{ title: string; url: string }[]>([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [adding, setAdding] = useState(false);

  const add = () => {
    if (title.trim() && url.trim()) {
      setSources([...sources, { title: title.trim(), url: url.trim() }]);
      setTitle('');
      setUrl('');
      setAdding(false);
    }
  };

  return (
    <div>
      {sources.map((s, i) => (
        <div key={i} className="flex items-center gap-2 mb-2 p-2 bg-gray-50 border border-border text-xs">
          <div className="flex-1 truncate">
            <div className="font-medium">{s.title}</div>
            <div className="text-gray-400 truncate">{s.url}</div>
          </div>
          <button onClick={() => setSources(sources.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500">
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      {adding ? (
        <div className="space-y-2">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Source name" className="w-full px-2 py-1.5 border border-border text-xs focus:outline-none focus:border-black" />
          <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://" className="w-full px-2 py-1.5 border border-border text-xs focus:outline-none focus:border-black" />
          <div className="flex gap-2">
            <button onClick={add} className="flex-1 py-1.5 bg-black text-white text-xs font-medium">Add</button>
            <button onClick={() => setAdding(false)} className="flex-1 py-1.5 border border-border text-xs">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} className="w-full flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 hover:border-black text-sm text-gray-500 hover:text-black transition-colors">
          <Plus className="w-4 h-4" />
          Add Source
        </button>
      )}
    </div>
  );
}
