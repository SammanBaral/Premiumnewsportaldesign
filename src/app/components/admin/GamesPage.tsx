import { useState } from 'react';
import { Plus, Calendar, Edit, Trash2, Trophy, TrendingUp } from 'lucide-react';

const wordlePuzzles = [
  { id: 1, word: 'START', date: 'Apr 14, 2026', status: 'Active', plays: 1234, winRate: 82, avgAttempts: 3.8 },
  { id: 2, word: 'NEPAL', date: 'Apr 13, 2026', status: 'Completed', plays: 2456, winRate: 78, avgAttempts: 4.1 },
  { id: 3, word: 'SMART', date: 'Apr 12, 2026', status: 'Completed', plays: 2198, winRate: 85, avgAttempts: 3.6 },
  { id: 4, word: 'YOUTH', date: 'Apr 11, 2026', status: 'Completed', plays: 2034, winRate: 76, avgAttempts: 4.2 },
];

const crosswordPuzzles = [
  { id: 1, title: 'Technology & Innovation', date: 'Apr 14, 2026', status: 'Active', plays: 876, completionRate: 64, avgTime: '15:24' },
  { id: 2, title: 'Nepal Geography', date: 'Apr 13, 2026', status: 'Completed', plays: 1523, completionRate: 72, avgTime: '12:45' },
  { id: 3, title: 'World Politics', date: 'Apr 12, 2026', status: 'Completed', plays: 1342, completionRate: 68, avgTime: '18:32' },
];

export function GamesPage() {
  const [activeTab, setActiveTab] = useState<'wordle' | 'crossword'>('wordle');
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
              Games Management
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Create and manage daily puzzles
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Plus className="w-5 h-5" />
            Create Puzzle
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border">
          <button
            onClick={() => setActiveTab('wordle')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'wordle'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-600 hover:text-black'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Wordle Puzzles
          </button>
          <button
            onClick={() => setActiveTab('crossword')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'crossword'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-600 hover:text-black'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Crossword Puzzles
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Total Players
          </div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            45,892
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
            <TrendingUp className="w-4 h-4" />
            <span>12% from last week</span>
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Daily Active
          </div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            8,456
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
            <TrendingUp className="w-4 h-4" />
            <span>8% from yesterday</span>
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Avg Completion
          </div>
          <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
            74%
          </div>
        </div>
        <div className="bg-white border border-border p-6">
          <div className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Top Scorer
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Trophy className="w-6 h-6 text-[--color-accent-red]" />
            <div>
              <div className="font-black" style={{ fontFamily: 'Inter, sans-serif' }}>Priya S.</div>
              <div className="text-xs text-gray-600">2,847 pts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wordle Puzzles */}
      {activeTab === 'wordle' && (
        <div className="bg-white border border-border">
          <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-sm">Word</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Plays</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Win Rate</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Avg Attempts</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {wordlePuzzles.map((puzzle) => (
                <tr key={puzzle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {puzzle.word.split('').map((letter, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 border-2 border-gray-300 flex items-center justify-center font-bold"
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {puzzle.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        puzzle.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {puzzle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{puzzle.plays.toLocaleString()}</td>
                  <td className="px-6 py-4 font-semibold">{puzzle.winRate}%</td>
                  <td className="px-6 py-4 text-gray-600">{puzzle.avgAttempts}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
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

      {/* Crossword Puzzles */}
      {activeTab === 'crossword' && (
        <div className="bg-white border border-border">
          <table className="w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-sm">Title</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Plays</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Completion Rate</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Avg Time</th>
                <th className="text-left px-6 py-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {crosswordPuzzles.map((puzzle) => (
                <tr key={puzzle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold">{puzzle.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {puzzle.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        puzzle.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {puzzle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{puzzle.plays.toLocaleString()}</td>
                  <td className="px-6 py-4 font-semibold">{puzzle.completionRate}%</td>
                  <td className="px-6 py-4 text-gray-600">{puzzle.avgTime}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
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

      {/* Create Puzzle Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-lg w-full mx-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
              Create New Puzzle
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Puzzle Type</label>
                <select className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black">
                  <option>Wordle</option>
                  <option>Crossword</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Scheduled Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                />
              </div>
              {activeTab === 'wordle' ? (
                <div>
                  <label className="block text-sm font-medium mb-2">Word (5 letters)</label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="SMART"
                    className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black uppercase"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Puzzle Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Technology & Innovation"
                      className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Grid Size</label>
                    <select className="w-full px-4 py-3 border border-border focus:outline-none focus:border-black">
                      <option>5x5</option>
                      <option>7x7</option>
                      <option>10x10</option>
                      <option>15x15</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border border-border hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-medium">
                Create Puzzle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
