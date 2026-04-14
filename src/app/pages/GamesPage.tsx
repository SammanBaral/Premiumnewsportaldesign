import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Trophy, Flame, Share2, Calendar } from 'lucide-react';

export function GamesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
            Daily Games
          </h1>
          <p className="text-lg text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
            Challenge yourself with our daily word puzzles
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 bg-gray-50 border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-6 h-6 text-[--color-accent-red]" />
              <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                12
              </div>
            </div>
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Day Streak
            </div>
          </div>
          <div className="text-center p-6 bg-gray-50 border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-[--color-accent-red]" />
              <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                247
              </div>
            </div>
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Total Games
            </div>
          </div>
          <div className="text-center p-6 bg-gray-50 border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-6 h-6 text-[--color-accent-red]" />
              <div className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                78%
              </div>
            </div>
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Win Rate
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Wordle Card */}
          <div className="border-2 border-black p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                  Wordle
                </h2>
                <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Guess the 5-letter word in 6 tries
                </p>
              </div>
              <div className="px-3 py-1 bg-[--color-accent-red] text-white text-xs font-semibold">
                DAILY
              </div>
            </div>

            {/* Wordle Grid Preview */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square border-2 border-gray-300 flex items-center justify-center text-2xl font-bold">
                  {i === 0 ? 'S' : i === 1 ? 'T' : i === 2 ? 'A' : i === 3 ? 'R' : i === 4 ? 'T' : ''}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div>
                <div className="text-2xl font-black">156</div>
                <div className="text-xs text-gray-600">Played</div>
              </div>
              <div>
                <div className="text-2xl font-black">82</div>
                <div className="text-xs text-gray-600">Win %</div>
              </div>
              <div>
                <div className="text-2xl font-black">12</div>
                <div className="text-xs text-gray-600">Streak</div>
              </div>
            </div>

            <button className="w-full py-4 bg-black text-white font-semibold hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              Play Today's Wordle
            </button>
          </div>

          {/* Crossword Card */}
          <div className="border-2 border-black p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-black mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                  Crossword
                </h2>
                <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Solve today's crossword puzzle
                </p>
              </div>
              <div className="px-3 py-1 bg-[--color-accent-red] text-white text-xs font-semibold">
                DAILY
              </div>
            </div>

            {/* Crossword Grid Preview */}
            <div className="grid grid-cols-5 gap-1 mb-6">
              {[...Array(25)].map((_, i) => {
                const isBlack = [6, 7, 8, 11, 13, 16, 17, 18].includes(i);
                return (
                  <div
                    key={i}
                    className={`aspect-square border ${
                      isBlack ? 'bg-black' : 'border-gray-300 bg-white'
                    }`}
                  />
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div>
                <div className="text-2xl font-black">91</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-black">15:24</div>
                <div className="text-xs text-gray-600">Avg Time</div>
              </div>
              <div>
                <div className="text-2xl font-black">8</div>
                <div className="text-xs text-gray-600">Streak</div>
              </div>
            </div>

            <button className="w-full py-4 bg-black text-white font-semibold hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              Play Today's Crossword
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="border-2 border-black p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
              Weekly Leaderboard
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-[--color-accent-red] text-white hover:bg-[--color-accent-red-hover] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              <Share2 className="w-4 h-4" />
              Share Score
            </button>
          </div>

          <div className="space-y-4">
            {[
              { rank: 1, name: 'Priya S.', score: 2847, trend: 'up' },
              { rank: 2, name: 'Rajesh T.', score: 2654, trend: 'up' },
              { rank: 3, name: 'Maya G.', score: 2512, trend: 'down' },
              { rank: 4, name: 'Suman K.', score: 2398, trend: 'up' },
              { rank: 5, name: 'Anjali R.', score: 2245, trend: 'same' },
              { rank: 6, name: 'You', score: 2156, trend: 'up', highlight: true },
              { rank: 7, name: 'Deepak B.', score: 2087, trend: 'down' },
              { rank: 8, name: 'Kavita M.', score: 1998, trend: 'up' },
            ].map((player) => (
              <div
                key={player.rank}
                className={`flex items-center gap-6 p-4 ${
                  player.highlight
                    ? 'bg-[--color-accent-red] text-white'
                    : 'bg-gray-50 border border-border'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <div className="w-8 text-center">
                  {player.rank <= 3 ? (
                    <Trophy className={`w-6 h-6 ${player.highlight ? 'text-white' : 'text-[--color-accent-red]'}`} />
                  ) : (
                    <span className="font-bold">{player.rank}</span>
                  )}
                </div>
                <div className="flex-1 font-semibold">{player.name}</div>
                <div className="font-black">{player.score.toLocaleString()}</div>
                <div className="w-8 text-right">
                  {player.trend === 'up' && <span className="text-green-500">↑</span>}
                  {player.trend === 'down' && <span className="text-red-500">↓</span>}
                  {player.trend === 'same' && <span className="text-gray-400">—</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Play */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-gray-50 border border-border">
            <h3 className="text-2xl font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              How to Play Wordle
            </h3>
            <ul className="space-y-3 text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
              <li className="flex gap-3">
                <span className="text-[--color-accent-red] font-bold">•</span>
                <span>Guess the WORDLE in six tries</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[--color-accent-red] font-bold">•</span>
                <span>Each guess must be a valid 5-letter word</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[--color-accent-red] font-bold">•</span>
                <span>The color of the tiles will change to show how close your guess was</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[--color-accent-red] font-bold">•</span>
                <span>A new puzzle is available each day</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-gray-50 border border-border">
            <h3 className="text-2xl font-black mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              How to Play Crossword
            </h3>
            <ul className="space-y-3 text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
              <li className="flex gap-3">
                <span className="text-[--color-accent-red] font-bold">•</span>
                <span>Read the clues and fill in the answers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[--color-accent-red] font-bold">•</span>
                <span>Click on a clue or grid square to start typing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[--color-accent-red] font-bold">•</span>
                <span>Use the Check button to verify your answers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[--color-accent-red] font-bold">•</span>
                <span>Complete the puzzle to earn points and climb the leaderboard</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
