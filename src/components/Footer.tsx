import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Heart,
  ArrowUp,
  Shield,
  Award,
} from 'lucide-react';
import { companyInfo } from '@/data/products';

// ✅ Certifications
const certifications = [
  {
    name: 'ISO Certified',
    description: 'International Quality Management System',
    logo: 'https://i.postimg.cc/Y9Gnzcd2/ISO-22000.png',
  },
  {
    name: 'GMP Certified',
    description: 'Good Manufacturing Practice Certification',
    logo: 'https://i.postimg.cc/0NFQBm0V/GMP.png',
  },
  {
    name: 'FSSAI Certified',
    description: 'Food Safety and Standards Authority of India',
    logo: 'https://i.postimg.cc/Dy428M56/FSSAI.png',
  },
  {
    name: 'ISO Approved',
    description: 'Approved by Food and Drug Administration',
    logo: 'https://i.postimg.cc/RFZ4TL8H/ISO-9001.png',
  },
  {
    name: 'HACCP Certified',
    description: 'Hazard Analysis and Critical Control Points',
    logo: 'https://i.postimg.cc/Pf6brVy4/HACCP.png',
  },
];

// ✅ Custom Hook for 3D Tilt
const useTiltEffect = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 3;
      const rotateX = ((centerY - y) / centerY) * 3;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      element.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};

// ✅ Floating Particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-green-400/20 rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${10 + Math.random() * 10}s`,
        }}
      />
    ))}
  </div>
);

// ✅ Scroll to Top
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-green-600 text-white rounded-full shadow-2xl border border-green-500/20 backdrop-blur-sm transform transition-all duration-500 hover:scale-110 hover:-translate-y-1 hover:bg-green-700 hover:border-green-600/30 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <ArrowUp className="w-5 h-5 mx-auto" />
    </button>
  );
};

// ✅ Certification Card
const CertificationCard3D = ({ cert }: { cert: any }) => {
  const tiltRef = useTiltEffect();
  const isTransparent = cert.name.includes('HACCP') || cert.name.includes('ISO');

  return (
    <div
      ref={tiltRef}
      className={`${isTransparent ? 'bg-transparent' : 'bg-green-50/40'} border ${isTransparent ? 'border-green-200/20' : 'border-green-200/30'} rounded-lg p-3 text-left group transform-gpu transition-all duration-500 hover:shadow-2xl relative overflow-hidden backdrop-blur-sm`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`absolute inset-0 ${isTransparent ? 'bg-green-100/10' : 'bg-gradient-to-br from-green-100/20 to-emerald-100/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`} />
      <div className="flex items-center space-x-3 relative z-10">
        <img
          src={cert.logo}
          alt={cert.name}
          className={`w-12 h-12 object-contain rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isTransparent ? 'bg-transparent' : ''}`}
        />
        <p className={`text-sm font-medium ${isTransparent ? 'text-green-700' : 'text-green-800'}`}>{cert.name}</p>
      </div>
    </div>
  );
};

// ✅ Contact Item
const ContactItem3D = ({
  icon: Icon,
  content,
  href,
  isLink = false,
}: {
  icon: any;
  content: string;
  href?: string;
  isLink?: boolean;
}) => {
  const tiltRef = useTiltEffect();
  const contentElement = isLink ? (
    <a
      href={href}
      className="text-base text-green-700 hover:text-green-800 transition-colors duration-300"
    >
      {content}
    </a>
  ) : (
    <p className="text-base text-green-700">{content}</p>
  );

  return (
    <div
      ref={tiltRef}
      className="flex items-center space-x-3 group transform-gpu transition-all duration-500"
    >
      <div className="w-12 h-12 bg-green-100/50 border border-green-200/50 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-green-200/50 group-hover:border-green-300/50 flex-shrink-0">
        <Icon className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
      </div>
      {contentElement}
    </div>
  );
};

// ✅ Social Media Links
const SocialMediaLinks = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/yourcompany',
      color: 'hover:text-pink-500 hover:bg-pink-50 hover:border-pink-200',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/yourcompany',
      color: 'hover:text-blue-500 hover:bg-blue-50 hover:border-blue-200',
    },
  ];

  return (
    <div className="flex space-x-4 pt-3">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-12 h-12 bg-green-100/50 border border-green-200/50 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-green-200/50 hover:border-green-300/50 flex-shrink-0 ${social.color}`}
          aria-label={`Follow us on ${social.name}`}
        >
          <social.icon className="w-5 h-5 text-green-600 hover:text-green-700" />
        </a>
      ))}
    </div>
  );
};

// ✅ MAIN FOOTER (Quick Links closer to Contact)
export const Footer = () => {
  const logoRef = useTiltEffect();
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <>
      <footer className="bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-green-50/80 border-t border-green-200/50 relative overflow-hidden text-left">
        <FloatingParticles />
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-emerald-100/20 opacity-50" />

        <div className="container-width px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 py-12">

            {/* Company Info - Takes 4 columns on large screens */}
            <div className="lg:col-span-4 space-y-6">
              <div
                ref={logoRef}
                className="flex items-center space-x-3 group transform-gpu transition-all duration-700"
              >
                <img
                  src="https://i.postimg.cc/gJHsdMfg/SML-LOGO-1.png"
                  alt="Shree Murlidhar Logo"
                  className="w-14 sm:w-16 h-14 sm:h-16 object-contain rounded-lg transition-all duration-500 group-hover:scale-110"
                />
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground">
                    {companyInfo.name}
                  </h3>
                 
                </div>
              </div>
               <p className="text-base text-muted-foreground font-medium">
                    {companyInfo.tagline}
                  </p>

              <p className="text-base text-muted-foreground max-w-md leading-relaxed">
                Your trusted partner for quality products and exceptional service.
              </p>

              <SocialMediaLinks />
            </div>

            {/* Quick Links - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-heading font-semibold text-lg text-foreground">Quick Links</h3>
              <nav className="flex flex-col space-y-3">
                {['about', 'products', 'white-labelling', 'blogs', 'contact'].map(
                  (path) => (
                    <Link
                      key={path}
                      to={`/${path}`}
                      className="text-base text-muted-foreground hover:text-primary transition-all duration-300 relative pb-1 group w-fit"
                    >
                      <span className="relative">
                        {path
                          .split('-')
                          .map((w) => w[0].toUpperCase() + w.slice(1))
                          .join(' ')}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  )
                )}
              </nav>
            </div>

            {/* Contact Info - Takes 3 columns on large screens */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-heading font-semibold text-lg text-foreground">Contact Info</h3>
              <div className="space-y-4">
                <ContactItem3D icon={MapPin} content={companyInfo.address} />
                <ContactItem3D
                  icon={Phone}
                  content={companyInfo.phone}
                  href={`tel:${companyInfo.phone}`}
                  isLink
                />
                <ContactItem3D
                  icon={Mail}
                  content={companyInfo.email}
                  href={`mailto:${companyInfo.email}`}
                  isLink
                />
              </div>
            </div>

            {/* Certifications - Takes 3 columns on large screens */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-heading font-semibold text-lg text-foreground">Certifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
                {certifications.map((cert) => (
                  <CertificationCard3D key={cert.name} cert={cert} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 mt-8 pt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>© {currentYear} {companyInfo.name}. All rights reserved.</span>
                <Heart className="w-4 h-4 text-accent animate-pulse flex-shrink-0" />
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center space-x-2"
                >
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center space-x-2"
                >
                  <Award className="w-4 h-4 flex-shrink-0" />
                  <span>Terms of Service</span>
                </Link>
                <span className="text-muted-foreground/50">|</span>
                <span className="text-muted-foreground/70">Made with ❤️ for Better Health</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop />

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
          }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};