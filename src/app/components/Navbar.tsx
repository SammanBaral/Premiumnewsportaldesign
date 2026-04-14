import { Link } from 'react-router';
import { Search, User, LogIn } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[--color-accent-red] flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Merriweather, serif' }}>N</span>
            </div>
            <span className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Merriweather, serif' }}>
              NepalNow
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Link to="/?category=politics" className="text-sm font-medium hover:text-[--color-accent-red] transition-colors">
              Politics
            </Link>
            <Link to="/?category=entertainment" className="text-sm font-medium hover:text-[--color-accent-red] transition-colors">
              Entertainment
            </Link>
            <Link to="/?category=tech" className="text-sm font-medium hover:text-[--color-accent-red] transition-colors">
              Tech
            </Link>
            <Link to="/?category=sports" className="text-sm font-medium hover:text-[--color-accent-red] transition-colors">
              Sports
            </Link>
            <Link to="/?category=nepal" className="text-sm font-medium hover:text-[--color-accent-red] transition-colors">
              Nepal
            </Link>
            <Link to="/?category=world" className="text-sm font-medium hover:text-[--color-accent-red] transition-colors">
              World
            </Link>
            <Link to="/?category=trending" className="text-sm font-medium hover:text-[--color-accent-red] transition-colors">
              Trending
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/games"
              className="hidden md:block px-4 py-2 text-sm font-semibold bg-[--color-accent-red] text-white hover:bg-[--color-accent-red-hover] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Wordle
            </Link>
            <Link
              to="/games"
              className="hidden md:block px-4 py-2 text-sm font-semibold border border-current hover:bg-black hover:text-white transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Crossword
            </Link>
            <button className="p-2 hover:bg-gray-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
