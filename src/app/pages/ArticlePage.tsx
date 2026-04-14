import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Clock, Share2, Bookmark, MessageCircle, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const article = {
  id: 1,
  title: "Nepal's Tech Startup Ecosystem Reaches $2 Billion Valuation",
  subtitle: "A deep dive into how Nepal's entrepreneurial revolution is reshaping the economy and creating opportunities for the next generation",
  category: "Tech",
  author: "Priya Sharma",
  date: "April 13, 2026",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1759752393882-1b6587a7c887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  tags: ["Startups", "Investment", "Technology", "Nepal", "Economy"],
  highlights: [
    "Nepal's startup ecosystem has grown 340% in valuation over the past 18 months",
    "Over 50 startups have secured Series A funding or higher in 2025-2026",
    "Tech jobs have increased by 28,000, with average salaries rising 65%",
    "Three Nepali unicorns are expected to emerge by 2027"
  ],
  sources: [
    {
      title: "Nepal Startup Report 2026",
      url: "https://example.com",
      logo: "📊"
    },
    {
      title: "Asian Venture Capital Association",
      url: "https://example.com",
      logo: "💼"
    },
    {
      title: "Government of Nepal - Digital Economy Initiative",
      url: "https://example.com",
      logo: "🏛️"
    }
  ]
};

const relatedArticles = [
  {
    id: 2,
    title: "Inside the Movement: Gen Z Activists Reshape Nepal's Political Landscape",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1593656088480-8055f13aed00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 3,
    title: "Kathmandu's Underground Music Scene Goes Global",
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1672841852639-9e758334c690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 4,
    title: "The Rise of Women's Football in Nepal",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1745104172230-42630f9b75d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export function ArticlePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Category Badge */}
        <div className="text-xs font-bold text-[--color-accent-red] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
          {article.category.toUpperCase()}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
          {article.title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-700 mb-8 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          {article.subtitle}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold">
              PS
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif' }}>
              <div className="font-semibold">{article.author}</div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <span>{article.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 transition-colors rounded-full">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 transition-colors rounded-full">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="aspect-[16/9] overflow-hidden mb-4">
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-600 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
            Tech workers collaborate at a modern startup office in Kathmandu.
          </p>
        </div>

        {/* Key Highlights */}
        <div className="bg-gray-50 border-l-4 border-[--color-accent-red] p-6 mb-12">
          <h3 className="text-xl font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
            Key Highlights
          </h3>
          <ul className="space-y-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            {article.highlights.map((highlight, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-[--color-accent-red] font-bold">•</span>
                <span className="text-gray-800">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
          <p className="text-lg leading-relaxed mb-6">
            Over the past 18 months, Nepal's technology sector has experienced unprecedented growth, transforming from a nascent ecosystem into a formidable force in South Asian entrepreneurship. The total valuation of Nepal's tech startups has surged to $2 billion, marking a 340% increase and signaling a fundamental shift in the country's economic landscape.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            This remarkable expansion has been fueled by a combination of factors: increased access to venture capital, a growing pool of skilled technical talent returning from abroad, and government initiatives aimed at fostering digital innovation. The result is a vibrant startup culture that is creating thousands of jobs and attracting international attention.
          </p>

          <div className="bg-white border-l-4 border-black p-6 my-8 italic">
            <p className="text-2xl leading-relaxed" style={{ fontFamily: 'Merriweather, serif' }}>
              "We're witnessing a generational shift. Young Nepalis are choosing to build companies at home rather than seeking opportunities abroad. That's the real story here."
            </p>
            <p className="text-sm mt-4 not-italic text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              — Suman Karki, Managing Partner at Kathmandu Ventures
            </p>
          </div>

          <h2 className="text-3xl font-black mt-12 mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            The Numbers Tell a Story
          </h2>

          <p className="text-lg leading-relaxed mb-6">
            According to the latest Nepal Startup Report, over 50 companies secured Series A funding or higher between 2025 and 2026. These investments span diverse sectors including fintech, edtech, agritech, and healthtech, demonstrating the breadth of innovation taking place across the country.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            The impact extends beyond mere valuations. The tech sector has created approximately 28,000 new jobs over the past two years, with average salaries increasing by 65%. This wage growth is particularly significant for young professionals, many of whom are now earning competitive salaries that rival opportunities in traditional emigration destinations.
          </p>

          {/* Inline Ad */}
          <div className="border border-border bg-gray-50 p-6 text-center my-12">
            <p className="text-xs text-gray-500 mb-3">Advertisement</p>
            <div className="h-32 bg-gray-200 flex items-center justify-center">
              <span className="text-sm text-gray-600">Inline Ad (468x60)</span>
            </div>
          </div>

          <h2 className="text-3xl font-black mt-12 mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Three Potential Unicorns on the Horizon
          </h2>

          <p className="text-lg leading-relaxed mb-6">
            Industry analysts predict that Nepal could see three unicorns—startups valued at over $1 billion—emerge by 2027. These potential unicorns are currently operating in the fintech and logistics sectors, leveraging Nepal's unique geographic and demographic characteristics to build scalable solutions.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            The path to unicorn status is challenging, but these companies have demonstrated strong unit economics, rapid user growth, and the ability to attract follow-on funding from international investors. Their success would mark a historic milestone for Nepal's entrepreneurial ecosystem.
          </p>

          <h2 className="text-3xl font-black mt-12 mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Challenges Remain
          </h2>

          <p className="text-lg leading-relaxed mb-6">
            Despite the optimism, significant challenges persist. Infrastructure limitations, particularly in internet connectivity and power supply, continue to hamper growth. Regulatory frameworks are still catching up with the pace of innovation, creating uncertainty for founders and investors alike.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Additionally, access to late-stage capital remains a bottleneck. While seed and Series A funding have become more accessible, companies looking to scale to Series B and beyond often struggle to find local investors with the necessary capital and risk appetite.
          </p>
        </div>

        {/* Sources */}
        <div className="mb-12">
          <h3 className="text-2xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Sources
          </h3>
          <div className="space-y-4">
            {article.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-border hover:border-[--color-accent-red] hover:bg-gray-50 transition-all group"
              >
                <div className="text-3xl">{source.logo}</div>
                <div className="flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <div className="font-semibold group-hover:text-[--color-accent-red] transition-colors">
                    {source.title}
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-12 pb-12 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <button
                key={tag}
                className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="mb-12 pb-12 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
              Share this story
            </h3>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                Twitter
              </button>
              <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                Facebook
              </button>
              <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                LinkedIn
              </button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6" />
            <h3 className="text-2xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
              Comments (24)
            </h3>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <div className="font-semibold mb-1">Rajesh Kumar</div>
                  <p className="text-gray-700 mb-2">
                    Great article! It's inspiring to see how far Nepal's tech ecosystem has come. I'm a developer who returned from the US last year to join a local startup, and the opportunities here are incredible.
                  </p>
                  <div className="text-xs text-gray-600">2 hours ago</div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <div className="font-semibold mb-1">Maya Tamang</div>
                  <p className="text-gray-700 mb-2">
                    Would love to see more coverage on women-led startups in Nepal. There's a lot happening in that space too!
                  </p>
                  <div className="text-xs text-gray-600">5 hours ago</div>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-6 px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            Load More Comments
          </button>
        </div>
      </article>

      {/* Related Articles */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-8" style={{ fontFamily: 'Merriweather, serif' }}>
            Read Next
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map(related => (
              <Link key={related.id} to={`/article/${related.id}`} className="group">
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <ImageWithFallback
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-xs font-bold text-[--color-accent-red] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {related.category.toUpperCase()}
                </div>
                <h3 className="text-xl font-bold group-hover:text-[--color-accent-red] transition-colors" style={{ fontFamily: 'Merriweather, serif' }}>
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Ad (Sticky) - Desktop Only */}
      <div className="hidden lg:block fixed right-8 top-24">
        <div className="border border-border bg-white p-4 text-center shadow-lg">
          <p className="text-xs text-gray-500 mb-3">Advertisement</p>
          <div className="w-40 h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-600">Sticky Ad</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
