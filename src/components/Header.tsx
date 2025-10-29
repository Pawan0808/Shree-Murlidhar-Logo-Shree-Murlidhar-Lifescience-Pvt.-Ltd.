import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'White Labelling', href: '/white-labelling' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact Us', href: '/contact' },
];

// Additional quick actions for the dots menu
const quickActions = [
  { name: 'Quick Order', href: '/quick-order', icon: '⚡' },
  { name: 'Price List', href: '/pricing', icon: '📋' },
  { name: 'Catalog', href: '/catalog', icon: '📚' },
  { name: 'Support', href: '/support', icon: '💬' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll to scale content
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50;

      if (currentScrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className="bg-white sticky top-0 z-40 w-full border-b border-gray-200 shadow-lg h-20 sm:h-24">
        <nav className="container-width section-padding relative h-full" aria-label="Global">
          {/* Solid background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-lg"></div>

          <div className={`flex items-center justify-between relative z-10 h-full transition-all duration-500 ${
            isScrolled ? 'py-1' : 'py-2'
          }`}>
            {/* Logo */}
            <div className="flex lg:flex-1">
              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="-m-1.5 p-1.5 group"
              >
                <span className="sr-only">Shree Murlidhar Lifescience</span>
                <div className="flex items-center space-x-3 transform transition-all duration-500 hover:scale-105 group">
                  <div className="relative">
                    <div className={`flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                      isScrolled ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-12 h-12 sm:w-14 sm:h-14'
                    }`}>
                      <img
                        src="https://i.postimg.cc/gJHsdMfg/SML-LOGO-1.png"
                        alt="Shree Murlidhar Lifescience Logo"
                        className={`object-contain transform transition-transform duration-500 group-hover:scale-110 ${
                          isScrolled ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-12 sm:h-12'
                        }`}
                      />
                    </div>
                  </div>
                  <div className={`transition-all duration-500 ${
                    isScrolled ? 'hidden sm:block transform scale-95' : 'hidden sm:block'
                  }`}>
                    <h2 className="font-bold text-gray-900 transform transition-all duration-300 group-hover:scale-105 group-hover:text-blue-600">
                      Shree Murlidhar Lifescience
                    </h2>
                  </div>
                </div>
              </Link>
            </div>

            {/* Mobile menu buttons */}
            <div className="flex lg:hidden">
              {/* Main mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                className="relative transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:bg-green-600 hover:text-white hover:shadow-md group min-h-12 min-w-12 touch-target"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" aria-hidden="true" />
              </Button>
            </div>

            {/* Desktop navigation */}
            <div className={`hidden lg:flex lg:gap-x-4 lg:items-center transition-all duration-500 ${
              isScrolled ? 'scale-95' : ''
            }`}>
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group px-4 py-2 rounded-lg overflow-hidden ${
                    isActive(item.href)
                   
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  {/* Enhanced underline effect */}
                  <span className={`absolute bottom-0 left-0 w-0 h-1 transition-all duration-500 ease-out group-hover:w-full rounded-full ${
                    isActive(item.href)
                      ? 'w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-600'
                      : 'bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 group-hover:w-full'
                  }`}></span>

                  {/* Additional glow effect for active state */}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-50"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop buttons */}
            <div className={`hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center transition-all duration-500 ${
              isScrolled ? 'scale-95' : ''
            }`}>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="relative transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 group border-2 border-green-200 hover:bg-[#c9a65e] hover:border-[#c9a65e] hover:text-white overflow-hidden"
              >
                <Link to="/contact" className="relative z-10">
                  <span className="relative z-10 font-semibold text-black group-hover:text-white">Get Quote</span>
                </Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 group relative overflow-hidden hover:from-green-700 hover:to-emerald-700"
                asChild
              >
                <Link to="/products" className="relative z-10">
                  <span className="relative z-10 font-semibold">Shop Now</span>
                </Link>
              </Button>
            </div>
          </div>
        </nav>

        {/* Main Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transform transition-all duration-500 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Solid white overlay */}
          <div
            className="fixed inset-0 bg-white transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu panel */}
          <div
            className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm sm:w-80 bg-white px-4 sm:px-6 py-6 transform transition-transform duration-500 ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between">
              <Link
                to="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className="-m-1.5 p-1.5"
              >
                <span className="sr-only">Shree Murlidhar Lifescience</span>
                <div className="flex items-center space-x-2 transform transition-all duration-300 hover:scale-105 hover:rotate-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-white shadow-md border border-gray-200">
                    <img
                      src="/src/assets/SML_LOGO.png"
                      alt="Logo"
                      className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-900">
                      Shree Murlidhar
                    </h2>
                    <p className="text-xs text-gray-600 -mt-1">
                      Lifescience
                    </p>
                  </div>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="transform transition-all duration-300 hover:scale-110 hover:rotate-3 min-h-12 min-w-12 hover:bg-green-100 hover:text-green-700 touch-target"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>

            {/* Navigation and Buttons */}
            <div className="mt-6 flow-root">
              <div className="border border-gray-200 rounded-xl bg-gray-50 p-4 divide-y divide-gray-200">
                {/* Navigation Links */}
                <div className="space-y-2 py-4">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`relative block rounded-md px-3 py-3 text-base font-medium transition-all duration-300 transform hover:scale-105 min-h-12 overflow-hidden touch-target ${
                        isActive(item.href)
                          ? 'text-green-700 bg-green-100 font-semibold'
                          : 'text-gray-900 hover:text-green-700 hover:bg-green-50'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.name}
                      {/* Enhanced underline effect for mobile */}
                      <span className={`absolute bottom-0 left-0 w-0 h-1 transition-all duration-500 ease-out rounded-full ${
                        isActive(item.href)
                          ? 'w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-600'
                          : 'bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 hover:w-full'
                      }`}></span>

                      {/* Glow effect for active state in mobile */}
                      {isActive(item.href) && (
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-50"></span>
                      )}
                    </Link>
                  ))}
                </div>

                {/* Buttons */}
                <div className="py-4 space-y-3">
                  <Button variant="outline" className="w-full min-h-12 text-base border-2 border-green-200 hover:border-[#c9a65e] hover:bg-[#c9a65e] hover:text-white font-semibold text-black transition-all duration-300 transform hover:scale-105 touch-target group" asChild>
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                      <span className="group-hover:text-white">Get Quote</span>
                    </Link>
                  </Button>
                  <Button className="w-full min-h-12 text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 touch-target" asChild>
                    <Link to="/products" onClick={() => setMobileMenuOpen(false)}>
                      Shop Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};