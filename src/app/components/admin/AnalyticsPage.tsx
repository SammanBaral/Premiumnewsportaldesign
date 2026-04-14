import { TrendingUp, Eye, Users, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const pageViewsData = [
  { date: 'Apr 7', views: 6234, visitors: 4123 },
  { date: 'Apr 8', views: 7123, visitors: 4567 },
  { date: 'Apr 9', views: 6897, visitors: 4234 },
  { date: 'Apr 10', views: 8234, visitors: 5123 },
  { date: 'Apr 11', views: 9123, visitors: 5678 },
  { date: 'Apr 12', views: 8567, visitors: 5234 },
  { date: 'Apr 13', views: 10234, visitors: 6123 },
];

const categoryData = [
  { name: 'Tech', value: 35 },
  { name: 'Politics', value: 25 },
  { name: 'Entertainment', value: 20 },
  { name: 'Sports', value: 12 },
  { name: 'Nepal', value: 8 },
];

const topArticles = [
  { title: "Nepal's Tech Startup Ecosystem Reaches $2 Billion", views: 15234, change: 12.5 },
  { title: "Gen Z Activists Reshape Political Landscape", views: 12456, change: 8.3 },
  { title: "Climate Action: Youth Leading the Charge", views: 10567, change: -3.2 },
  { title: "Underground Music Scene Goes Global", views: 9234, change: 15.7 },
  { title: "The Rise of Women's Football", views: 8934, change: 5.4 },
];

const COLORS = ['#4361ee', '#e63946', '#f72585', '#f77f00', '#06d6a0'];

export function AnalyticsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
          Analytics
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          Track performance and insights
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Total Page Views
            </div>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
            284,567
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <ArrowUp className="w-4 h-4" />
            <span>24% from last week</span>
          </div>
        </div>

        <div className="bg-white border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Unique Visitors
            </div>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
            156,234
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <ArrowUp className="w-4 h-4" />
            <span>18% from last week</span>
          </div>
        </div>

        <div className="bg-white border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Avg Time on Site
            </div>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
            4:32
          </div>
          <div className="flex items-center gap-1 text-sm text-red-600">
            <ArrowDown className="w-4 h-4" />
            <span>3% from last week</span>
          </div>
        </div>

        <div className="bg-white border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Bounce Rate
            </div>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
            42%
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <ArrowDown className="w-4 h-4" />
            <span>5% from last week</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Page Views Chart */}
        <div className="bg-white border border-border p-6">
          <h2 className="text-xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Page Views & Visitors
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pageViewsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12 }} />
              <YAxis style={{ fontFamily: 'Inter, sans-serif', fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#4361ee" strokeWidth={2} name="Page Views" />
              <Line type="monotone" dataKey="visitors" stroke="#e63946" strokeWidth={2} name="Visitors" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-border p-6">
          <h2 className="text-xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
            Content by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Articles */}
      <div className="bg-white border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            Top Performing Articles
          </h2>
        </div>
        <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-sm">Rank</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Article</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Views</th>
              <th className="text-left px-6 py-4 font-semibold text-sm">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {topArticles.map((article, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 font-black">
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold">{article.title}</td>
                <td className="px-6 py-4 font-semibold">{article.views.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div
                    className={`flex items-center gap-1 font-semibold ${
                      article.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {article.change > 0 ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    {Math.abs(article.change)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Traffic Sources */}
      <div className="mt-8 bg-white border border-border p-6">
        <h2 className="text-xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
          Traffic Sources
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { source: 'Direct', percentage: 45, visits: 71234, color: 'bg-blue-500' },
            { source: 'Social Media', percentage: 30, visits: 47456, color: 'bg-purple-500' },
            { source: 'Search Engines', percentage: 18, visits: 28467, color: 'bg-green-500' },
            { source: 'Referral', percentage: 7, visits: 11087, color: 'bg-orange-500' },
          ].map((source) => (
            <div key={source.source}>
              <div className="flex items-center justify-between mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="font-semibold">{source.source}</span>
                <span className="text-2xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                  {source.percentage}%
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className={`h-full ${source.color}`} style={{ width: `${source.percentage}%` }} />
              </div>
              <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                {source.visits.toLocaleString()} visits
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
