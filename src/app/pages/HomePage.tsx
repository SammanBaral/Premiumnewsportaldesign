import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TrendingUp, Play, Clock, Hash } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const articles = [
  {
    id: 1,
    title: "Nepal's Tech Startup Ecosystem Reaches $2 Billion Valuation",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1596784326488-23581279e33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    summary: "A comprehensive look at how Nepal's startup scene is attracting global investors and creating thousands of jobs.",
    author: "Priya Sharma",
    date: "April 13, 2026",
    readTime: "8 min read",
    tags: ["Startups", "Investment", "Technology"]
  },
  {
    id: 2,
    title: "Inside the Movement: Gen Z Activists Reshape Nepal's Political Landscape",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1593656088480-8055f13aed00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    summary: "Young voices are demanding change and accountability from traditional power structures.",
    author: "Rajesh Thapa",
    date: "April 12, 2026",
    readTime: "12 min read",
    tags: ["Politics", "Youth", "Democracy"]
  },
  {
    id: 3,
    title: "Kathmandu's Underground Music Scene Goes Global",
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1672841852639-9e758334c690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    summary: "Local artists are collaborating with international producers, bringing Nepali sounds to worldwide audiences.",
    author: "Maya Gurung",
    date: "April 12, 2026",
    readTime: "6 min read",
    tags: ["Music", "Culture", "Entertainment"]
  },
  {
    id: 4,
    title: "The Rise of Women's Football in Nepal",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1745104172230-42630f9b75d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    summary: "From grassroots programs to professional leagues, women's sports are breaking barriers.",
    author: "Anjali Rai",
    date: "April 11, 2026",
    readTime: "10 min read",
    tags: ["Sports", "Women", "Football"]
  },
  {
    id: 5,
    title: "Climate Action: How Nepal's Youth Are Leading the Charge",
    category: "Nepal",
    image: "https://images.unsplash.com/photo-1597228887398-6aa9bcadf134?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    summary: "Innovative solutions from young environmentalists tackling climate change in the Himalayas.",
    author: "Suman Karki",
    date: "April 11, 2026",
    readTime: "9 min read",
    tags: ["Environment", "Climate", "Nepal"]
  }
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Top Banner Ad */}
      <div className="border-b border-border bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-500 mb-2">Advertisement</p>
          <div className="h-24 bg-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-600">Leaderboard Ad (728x90)</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-20">
          <Link to="/article/1" className="group block">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-3 py-1 bg-[--color-accent-red] text-white text-xs font-semibold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  FEATURED
                </div>
                <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6 group-hover:text-[--color-accent-red] transition-colors" style={{ fontFamily: 'Merriweather, serif' }}>
                  {articles[0].title}
                </h1>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {articles[0].summary}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="font-medium">{articles[0].author}</span>
                  <span>•</span>
                  <span>{articles[0].date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {articles[0].readTime}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  {articles[0].tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-16">
            {/* Trending Now */}
            <section>
              <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-black">
                <TrendingUp className="w-6 h-6" />
                <h2 className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                  Trending Now
                </h2>
              </div>
              <div className="grid gap-8">
                {articles.slice(1, 4).map((article, index) => (
                  <Link key={article.id} to={`/article/${article.id}`} className="group">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="aspect-[4/3] overflow-hidden">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <div className="text-xs font-bold text-[--color-accent-red] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {article.category.toUpperCase()}
                        </div>
                        <h3 className="text-2xl font-black mb-3 group-hover:text-[--color-accent-red] transition-colors leading-tight" style={{ fontFamily: 'Merriweather, serif' }}>
                          {article.title}
                        </h3>
                        <p className="text-gray-700 mb-3 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {article.summary}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <span className="font-medium">{article.author}</span>
                          <span>•</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Inline Ad */}
            <div className="border border-border bg-gray-50 p-6 text-center">
              <p className="text-xs text-gray-500 mb-3">Advertisement</p>
              <div className="h-32 bg-gray-200 flex items-center justify-center">
                <span className="text-sm text-gray-600">Rectangle Ad (300x250)</span>
              </div>
            </div>

            {/* Latest News */}
            <section>
              <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-black">
                <h2 className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                  Latest News
                </h2>
              </div>
              <div className="space-y-6">
                {articles.map((article) => (
                  <Link key={article.id} to={`/article/${article.id}`} className="group block border-b border-border pb-6 last:border-0">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-[--color-accent-red] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {article.category.toUpperCase()}
                        </div>
                        <h3 className="font-bold mb-2 group-hover:text-[--color-accent-red] transition-colors leading-tight" style={{ fontFamily: 'Merriweather, serif' }}>
                          {article.title}
                        </h3>
                        <div className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {article.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Video Section */}
            <section>
              <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-black">
                <Play className="w-6 h-6" />
                <h2 className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                  Watch
                </h2>
              </div>
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <Play className="w-16 h-16 text-white" />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                  The Week in Review: Top Stories Explained
                </h3>
                <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Our editors break down the most important news from the past week.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Most Popular */}
            <div className="sticky top-20">
              <h3 className="text-2xl font-black mb-6 pb-3 border-b-2 border-black" style={{ fontFamily: 'Merriweather, serif' }}>
                Most Popular
              </h3>
              <div className="space-y-6">
                {articles.slice(0, 5).map((article, index) => (
                  <Link key={article.id} to={`/article/${article.id}`} className="group block">
                    <div className="flex gap-4">
                      <div className="text-3xl font-black text-gray-200 w-8 flex-shrink-0" style={{ fontFamily: 'Merriweather, serif' }}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold leading-tight group-hover:text-[--color-accent-red] transition-colors" style={{ fontFamily: 'Merriweather, serif' }}>
                          {article.title}
                        </h4>
                        <div className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Sidebar Ad */}
              <div className="border border-border bg-gray-50 p-4 text-center mt-8">
                <p className="text-xs text-gray-500 mb-3">Advertisement</p>
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-sm text-gray-600">Sidebar Ad (300x600)</span>
                </div>
              </div>

              {/* Trending Tags */}
              <div className="mt-8">
                <h3 className="text-xl font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
                  Trending Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Startups", "Politics", "Climate", "Music", "Sports", "Tech", "Culture", "Youth"].map(tag => (
                    <button
                      key={tag}
                      className="px-3 py-1.5 text-sm border border-black hover:bg-black hover:text-white transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
