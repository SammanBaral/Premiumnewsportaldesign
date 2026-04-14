import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white mt-24" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[--color-accent-red] flex items-center justify-center">
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'Merriweather, serif' }}>N</span>
              </div>
              <span className="text-2xl font-black" style={{ fontFamily: 'Merriweather, serif' }}>
                NepalNow
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Next-generation digital media for Gen Z and young professionals in Nepal.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/?category=politics" className="text-gray-400 hover:text-white transition-colors">Politics</Link></li>
              <li><Link to="/?category=entertainment" className="text-gray-400 hover:text-white transition-colors">Entertainment</Link></li>
              <li><Link to="/?category=tech" className="text-gray-400 hover:text-white transition-colors">Tech</Link></li>
              <li><Link to="/?category=sports" className="text-gray-400 hover:text-white transition-colors">Sports</Link></li>
              <li><Link to="/?category=nepal" className="text-gray-400 hover:text-white transition-colors">Nepal</Link></li>
              <li><Link to="/?category=world" className="text-gray-400 hover:text-white transition-colors">World</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter & Apps */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-[--color-accent-red]"
                />
                <button className="w-full mt-2 px-4 py-2 bg-[--color-accent-red] text-white text-sm font-semibold hover:bg-[--color-accent-red-hover] transition-colors">
                  Subscribe
                </button>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Download Our App</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-gray-800 text-xs font-medium hover:bg-gray-700 transition-colors">
                    iOS
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-800 text-xs font-medium hover:bg-gray-700 transition-colors">
                    Android
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2026 NepalNow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Ad Strip */}
      <div className="border-t border-gray-800 bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-500">Advertisement</p>
          <div className="mt-2 h-20 bg-gray-800 flex items-center justify-center">
            <span className="text-sm text-gray-600">Footer Ad Placement (728x90)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
