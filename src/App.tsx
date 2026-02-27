import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Youtube, 
  Search, 
  PlusCircle, 
  Star, 
  ShieldCheck, 
  Zap, 
  Users, 
  MessageCircle, 
  Mail, 
  Phone,
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight,
  ArrowLeft,
  Globe,
  Filter,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  Home as HomeIcon,
  ChevronLeft,
  Instagram,
  Send,
  BookOpen,
  GraduationCap,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChannelListing, Niche } from './types';
import { MOCK_CHANNELS, MOCK_IMAGE_REVIEWS } from './constants';
import { siteConfig } from './config/siteConfig';

// --- Components ---

const Counter = ({ value, duration = 2, suffix = "" }: { value: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
};

const Navbar = ({ onNavigate, activeTab }: { onNavigate: (tab: string) => void, activeTab: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navLinks = siteConfig.navLinks;

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="bg-yt-red p-1.5 rounded-lg mr-2">
            <Youtube className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            {siteConfig.siteName.split(' ').slice(0, 2).join(' ')} <span className="text-yt-red">{siteConfig.siteName.split(' ').slice(2).join(' ')}</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-medium transition-colors hover:text-yt-red ${activeTab === link.id ? 'text-yt-red' : 'text-slate-600'}`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.filter(link => link.id !== 'reviews').map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full text-left text-lg font-medium transition-colors ${activeTab === link.id ? 'text-yt-red' : 'text-slate-700'}`}
                >
                  <span className="mr-3 text-yt-red">
                    {link.id === 'home' ? <HomeIcon className="w-5 h-5" /> : 
                     link.id === 'browse' ? <Search className="w-5 h-5" /> :
                     link.id === 'sell' ? <PlusCircle className="w-5 h-5" /> :
                     link.id === 'learn-course' ? <GraduationCap className="w-5 h-5" /> :
                     link.id === 'how-to-use' ? <Zap className="w-5 h-5" /> :
                     <Users className="w-5 h-5" />}
                  </span>
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBrowse, onSell }: { onBrowse: () => void, onSell: () => void }) => (
  <section className="pt-32 pb-20 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-yt-red/10 text-yt-red text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4 mr-1.5" />
            Verified Marketplace
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
            {siteConfig.hero.title.split('Safely')[0]} <span className="text-yt-red">Safely</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
            {siteConfig.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button onClick={onBrowse} className="yt-button-primary flex items-center justify-center py-4 px-8 text-lg">
              {siteConfig.hero.primaryCTA} <ChevronRight className="ml-2 w-5 h-5" />
            </button>
            <button onClick={onSell} className="yt-button-secondary flex items-center justify-center py-4 px-8 text-lg">
              {siteConfig.hero.secondaryCTA}
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-yt-red/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-slate-100 rounded-full blur-3xl" />
          
          <div className="relative space-y-4">
            {siteConfig.stats.map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 10 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-lg flex items-center justify-between group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl group-hover:text-white transition-colors ${
                    index === 0 ? 'bg-yt-red/10 group-hover:bg-yt-red' :
                    index === 1 ? 'bg-emerald-50 group-hover:bg-emerald-500' :
                    'bg-blue-50 group-hover:bg-blue-500'
                  }`}>
                    {index === 0 ? <TrendingUp className="w-6 h-6" /> :
                     index === 1 ? <CheckCircle2 className="w-6 h-6" /> :
                     <Youtube className="w-6 h-6" />}
                  </div>
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{stat.label}</p>
                </div>
                <h3 className="text-3xl font-display font-black text-slate-900">
                  <Counter value={stat.value} suffix={stat.suffix} duration={stat.duration} />
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ChannelCard = ({ channel, onViewDetails }: { channel: ChannelListing, onViewDetails: (c: any) => void, key?: any }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full"
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={channel.imageUrl} 
        alt={channel.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-yt-red text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg border border-white/20">
          {channel.niche}
        </span>
      </div>
      <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
        {channel.monetized && (
          <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            Monetized
          </span>
        )}
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${channel.status === 'Available' ? 'bg-blue-500 text-white' : 'bg-slate-500 text-white'}`}>
          {channel.status}
        </span>
      </div>
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:text-yt-red transition-colors">
        {channel.name}
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide flex items-center mb-1">
            <Users className="w-3 h-3 mr-1 text-yt-red" /> Subscribers
          </p>
          <p className="text-lg font-bold text-slate-900">{(channel.subscribers / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide flex items-center mb-1">
            <Youtube className="w-3 h-3 mr-1 text-yt-red" /> Category
          </p>
          <p className="text-lg font-bold text-yt-red">{channel.niche}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide flex items-center mb-1">
            <CheckCircle2 className="w-3 h-3 mr-1 text-yt-red" /> Monetized
          </p>
          <p className="text-sm font-bold text-slate-900">{channel.monetized ? 'Yes' : 'No'}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide flex items-center mb-1">
            <TrendingUp className="w-3 h-3 mr-1 text-yt-red" /> Revenue
          </p>
          <p className="text-sm font-bold text-slate-900">₹{channel.revenueLast28Days.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
        <div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Price</p>
          <p className="text-2xl font-bold text-yt-red">₹{channel.askingPrice.toLocaleString('en-IN')}</p>
        </div>
        <button 
          onClick={() => onViewDetails(channel)}
          className="bg-yt-red text-white px-4 py-2 rounded-lg font-bold hover:bg-yt-red-light transition-colors flex items-center"
        >
          More Info <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const OfferBanner = () => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const banners = siteConfig.banners;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="h-32 md:h-48 rounded-3xl overflow-hidden relative mb-12 shadow-2xl group border border-slate-200">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentOfferIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img 
            src={banners[currentOfferIndex].image} 
            alt="Offer Banner" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {banners[currentOfferIndex].text && (
            <div className={`absolute inset-0 bg-gradient-to-r ${banners[currentOfferIndex].color} to-transparent flex items-center px-8 md:px-16`}>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-4 text-white"
              >
                <Zap className="w-8 h-8 md:w-12 md:h-12 text-white animate-pulse shrink-0" />
                <p className="text-lg md:text-3xl font-display font-bold tracking-wide drop-shadow-2xl">
                  {banners[currentOfferIndex].text}
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-white/30 w-full overflow-hidden">
        <motion.div 
          key={currentOfferIndex}
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-white"
        />
      </div>
    </div>
  );
};

const FilterBar = ({ 
  onFilterChange, 
  filters 
}: { 
  onFilterChange: (key: string, value: any) => void,
  filters: any
}) => {
  const niches: Niche[] = ['Gaming', 'Finance', 'Vlog', 'Tech', 'Entertainment', 'Education', 'Other'];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center text-slate-900 font-bold text-sm whitespace-nowrap border-b lg:border-b-0 lg:border-r border-slate-100 pb-2 lg:pb-0 lg:pr-4 mr-2">
          <Filter className="w-4 h-4 mr-2 text-yt-red" />
          Filters
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-grow">
          <div>
            <select 
              className="yt-input text-xs py-1.5 h-9"
              value={filters.niche}
              onChange={(e) => onFilterChange('niche', e.target.value)}
            >
              <option value="All">All Niches</option>
              {niches.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <select 
              className="yt-input text-xs py-1.5 h-9"
              value={filters.minSubs}
              onChange={(e) => onFilterChange('minSubs', Number(e.target.value))}
            >
              <option value={0}>Subscribers</option>
              <option value={1000}>1,000+</option>
              <option value={10000}>10,000+</option>
              <option value={50000}>50,000+</option>
              <option value={100000}>100,000+</option>
            </select>
          </div>
          <div>
            <select 
              className="yt-input text-xs py-1.5 h-9"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
            >
              <option value={10000000}>Max Price</option>
              <option value={50000}>Under ₹50,000</option>
              <option value={100000}>Under ₹1,00,000</option>
              <option value={500000}>Under ₹5,00,000</option>
              <option value={1000000}>Under ₹10,00,000</option>
            </select>
          </div>
          <div>
            <select 
              className="yt-input text-xs py-1.5 h-9"
              value={filters.monetized}
              onChange={(e) => onFilterChange('monetized', e.target.value)}
            >
              <option value="All">Monetization</option>
              <option value="Yes">Monetized</option>
              <option value="No">Not Monetized</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChannelDetails = ({ channel, onClose }: { channel: ChannelListing, onClose: () => void, key?: string }) => {
  const [inquiry, setInquiry] = useState("");

  useEffect(() => {
    // Lock body scroll when details are open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBuyNow = () => {
    const message = `Hi, I'm interested in buying ${channel.name} (ID: ${channel.listingId}). ${inquiry}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto pt-2 pb-20"
    >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header / Navigation */}
      <div className="mb-10 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="flex items-center text-slate-600 hover:text-yt-red transition-colors font-bold text-lg"
        >
          <ArrowLeft className="w-6 h-6 mr-2" /> Back to Listings
        </button>
        <div className="flex items-center space-x-4">
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${channel.status === 'Available' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
            {channel.status}
          </span>
          <span className="text-slate-400 text-sm font-bold">Listing ID: {channel.listingId}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h1 className="text-5xl font-display font-bold text-slate-900 mb-6">{channel.name}</h1>
            <div className="flex flex-wrap gap-4">
              <span className="bg-yt-red text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center shadow-lg shadow-yt-red/20">
                <Youtube className="w-4 h-4 mr-2" /> {channel.niche}
              </span>
              {channel.monetized && (
                <span className="bg-emerald-100 text-emerald-600 text-sm font-bold px-4 py-2 rounded-xl flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Monetized
                </span>
              )}
              <span className="bg-slate-100 text-slate-600 text-sm font-bold px-4 py-2 rounded-xl flex items-center">
                <Globe className="w-4 h-4 mr-2" /> {channel.language}
              </span>
            </div>
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden mb-12 aspect-video shadow-2xl border-8 border-white">
            <img 
              src={channel.imageUrl} 
              alt={channel.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-yt-red" /> Channel Performance
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Subscribers</span>
                  <span className="text-slate-900 font-bold">{channel.subscribers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Watch Hours</span>
                  <span className="text-slate-900 font-bold">{channel.watchHours.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Lifetime Views</span>
                  <span className="text-slate-900 font-bold">{channel.lifetimeViews.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-slate-500 font-medium">Views (Last 28 Days)</span>
                  <span className="text-slate-900 font-bold">{channel.viewsLast28Days.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-yt-red" /> Safety & Health
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Copyright Strikes</span>
                  <span className={`font-bold ${channel.copyrightStrikes > 0 ? 'text-yt-red' : 'text-emerald-600'}`}>{channel.copyrightStrikes}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Community Strikes</span>
                  <span className={`font-bold ${channel.communityStrikes > 0 ? 'text-yt-red' : 'text-emerald-600'}`}>{channel.communityStrikes}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Monetized Status</span>
                  <span className={`font-bold ${channel.monetized ? 'text-emerald-600' : 'text-slate-400'}`}>{channel.monetized ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-slate-500 font-medium">Revenue (Last 28 Days)</span>
                  <span className="text-slate-900 font-bold">₹{channel.revenueLast28Days.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Channel Description</h3>
            <p className="text-slate-600 text-lg leading-relaxed">{channel.description}</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-lg">
            <h4 className="font-bold text-slate-900 mb-4 text-xl">Quick Details</h4>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-slate-500 text-sm">Listed On</span>
                <span className="text-slate-900 font-bold">{channel.creationDate}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-sm">Channel Type</span>
                <span className="text-slate-900 font-bold">{channel.channelType}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-sm">Content Type</span>
                <span className="text-slate-900 font-bold">{channel.contentType}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:relative">
          <div className="sticky top-32 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Asking Price</p>
                <p className="text-5xl font-display font-bold text-yt-red mb-8">₹{channel.askingPrice.toLocaleString('en-IN')}</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Message (Optional)</label>
                    <textarea 
                      className="w-full yt-input resize-none bg-slate-50" 
                      rows={3}
                      placeholder="Ask a question or make an offer..."
                      value={inquiry}
                      onChange={(e) => setInquiry(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleBuyNow}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center text-lg shadow-xl shadow-emerald-500/20"
                  >
                    <MessageCircle className="w-6 h-6 mr-3" /> Buy Now
                  </button>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500/10 p-3 rounded-xl">
                      <ShieldCheck className="text-emerald-500 w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Secure Transaction</p>
                      <p className="text-xs text-slate-500">Escrow protection included</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

const SellForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    niche: 'Gaming',
    subscribers: '',
    watchHours: '',
    monetized: 'No',
    monthlyRevenue: '',
    askingPrice: '',
    description: '',
    phone: '',
    channelLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const message = `*New Channel Listing Request*
-----------------------------
*Channel Name:* ${formData.name}
*Channel Link:* ${formData.channelLink}
*Niche:* ${formData.niche}
*Subscribers:* ${formData.subscribers}
*Watch Hours:* ${formData.watchHours}
*Monetized:* ${formData.monetized}
*Monthly Revenue:* ₹${formData.monthlyRevenue}
*Asking Price:* ₹${formData.askingPrice}
*Contact Number:* ${formData.phone}
*Description:* ${formData.description}`;

    // Simulate API call and then redirect to WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
      setFormData({
        name: '', niche: 'Gaming', subscribers: '', watchHours: '',
        monetized: 'No', monthlyRevenue: '', askingPrice: '',
        description: '', phone: '', channelLink: ''
      });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-20"
      >
        <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-emerald-600 w-10 h-10" />
        </div>
        <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Request Sent!</h2>
        <p className="text-slate-600 mb-8">Your channel details have been sent to our team via WhatsApp. We will review it and get back to you shortly.</p>
        <button onClick={() => setIsSuccess(false)} className="yt-button-primary">Submit Another Channel</button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Sell Your Channel</h2>
        <p className="text-slate-500">Fill in the details below to list your YouTube channel for sale. Data will be sent directly to the owner.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Channel Name</label>
            <input 
              required
              type="text" 
              className="yt-input" 
              placeholder="e.g. Tech Reviews Pro"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Channel Link</label>
            <input 
              required
              type="url" 
              className="yt-input" 
              placeholder="https://youtube.com/@channel"
              value={formData.channelLink}
              onChange={e => setFormData({...formData, channelLink: e.target.value})}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Niche</label>
            <select 
              className="yt-input"
              value={formData.niche}
              onChange={e => setFormData({...formData, niche: e.target.value})}
            >
              <option>Gaming</option>
              <option>Finance</option>
              <option>Vlog</option>
              <option>Tech</option>
              <option>Entertainment</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number (WhatsApp)</label>
            <input 
              required
              type="tel" 
              className="yt-input" 
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Subscribers</label>
            <input 
              required
              type="number" 
              className="yt-input" 
              placeholder="e.g. 10000"
              value={formData.subscribers}
              onChange={e => setFormData({...formData, subscribers: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Watch Hours</label>
            <input 
              required
              type="number" 
              className="yt-input" 
              placeholder="e.g. 4000"
              value={formData.watchHours}
              onChange={e => setFormData({...formData, watchHours: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Monetized?</label>
            <select 
              className="yt-input"
              value={formData.monetized}
              onChange={e => setFormData({...formData, monetized: e.target.value})}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Revenue (₹)</label>
            <input 
              type="number" 
              className="yt-input" 
              placeholder="e.g. 50000"
              value={formData.monthlyRevenue}
              onChange={e => setFormData({...formData, monthlyRevenue: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Asking Price (₹)</label>
            <input 
              required
              type="number" 
              className="yt-input" 
              placeholder="e.g. 250000"
              value={formData.askingPrice}
              onChange={e => setFormData({...formData, askingPrice: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
          <textarea 
            required
            rows={4} 
            className="yt-input resize-none" 
            placeholder="Describe your channel, audience demographics, and why you are selling..."
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 font-medium">Click to upload channel screenshots or earnings proof</p>
          <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
          <input type="file" className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="mt-4 inline-block text-yt-red text-sm font-bold cursor-pointer hover:underline">Browse Files</label>
        </div>

        <button 
          disabled={isSubmitting}
          type="submit" 
          className="w-full yt-button-primary py-4 text-lg flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>List Channel for Sale <PlusCircle className="ml-2 w-5 h-5" /></>
          )}
        </button>
      </form>
    </div>
  );
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_IMAGE_REVIEWS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_IMAGE_REVIEWS.length) % MOCK_IMAGE_REVIEWS.length);
  };

  return (
    <section id="reviews" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Success Stories</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Visual proof of successful channel transfers and happy customers on our platform.</p>
        </div>

        <div className="relative max-w-4xl mx-auto group">
          <div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-white aspect-[16/10] touch-pan-y">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={MOCK_IMAGE_REVIEWS[currentIndex]}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) nextSlide();
                  if (info.offset.x > 50) prevSlide();
                }}
                className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                alt={`Review ${currentIndex + 1}`}
              />
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-slate-900 hover:bg-yt-red hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-slate-900 hover:bg-yt-red hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {MOCK_IMAGE_REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === i ? 'bg-yt-red w-8' : 'bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Secure Transactions",
      desc: "Our escrow-style payment system ensures both buyer and seller are protected throughout the deal.",
      color: "bg-blue-500",
      logo: <div className="flex space-x-2 mt-4 opacity-50"><ShieldCheck className="w-4 h-4" /><Zap className="w-4 h-4" /></div>
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Verified Listings",
      desc: "Every channel is manually reviewed by our experts to verify subscribers, watch hours, and monetization.",
      color: "bg-emerald-500",
      logo: <div className="flex space-x-2 mt-4 opacity-50"><Youtube className="w-4 h-4" /><CheckCircle2 className="w-4 h-4" /></div>
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Approval",
      desc: "List your channel and get it approved within 24 hours. Start receiving offers immediately.",
      color: "bg-yt-red",
      logo: <div className="flex space-x-2 mt-4 opacity-50"><Zap className="w-4 h-4" /><TrendingUp className="w-4 h-4" /></div>
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Trusted Marketplace",
      desc: "The #1 destination for YouTube channel trading with a community of over 50,000 creators.",
      color: "bg-purple-500",
      logo: <div className="flex space-x-2 mt-4 opacity-50"><Users className="w-4 h-4" /><Star className="w-4 h-4" /></div>
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">YT Seller Hub</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We provide the safest and most efficient way to transfer YouTube channel ownership with human-verified processes.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className={`cursor-pointer text-center p-8 rounded-[2rem] transition-all duration-500 border-2 flex flex-col items-center ${
                activeIndex === i 
                ? `${f.color} border-transparent text-white shadow-2xl scale-105` 
                : 'bg-slate-50 border-slate-100 text-slate-900 hover:border-yt-red/20'
              }`}
              layout
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                activeIndex === i ? 'bg-white/20 text-white' : 'bg-white text-yt-red shadow-sm'
              }`}>
                {f.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 ${activeIndex === i ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
              <p className={`text-sm leading-relaxed mb-auto ${activeIndex === i ? 'text-white/80' : 'text-slate-500'}`}>{f.desc}</p>
              
              <div className="mt-4">
                {f.logo}
              </div>

              {activeIndex === i && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-4 border-t border-white/20 w-full"
                >
                  <p className="text-xs font-bold uppercase tracking-widest">Verified & Trusted</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => (
  <section className="section-padding bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">About YT Seller Adda</h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            YT Seller Adda is the premier destination for YouTube creators and digital entrepreneurs. We specialize in facilitating secure, transparent, and efficient transfers of YouTube channel ownership.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Our mission is to empower creators by providing a trusted marketplace where their hard work and digital assets are valued correctly. With human-verified listings and a secure escrow-style process, we ensure peace of mind for both buyers and sellers.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="text-2xl font-bold text-yt-red mb-1">50K+</h4>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Community Members</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="text-2xl font-bold text-yt-red mb-1">700+</h4>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Successful Trades</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-yt-red/5 rounded-[3rem] blur-2xl" />
          <img 
            src="https://picsum.photos/seed/about/800/600" 
            alt="Team working" 
            className="relative rounded-[2.5rem] shadow-2xl border-8 border-white"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </section>
);

const HowToUse = () => (
  <section className="section-padding bg-slate-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">How to Use YT Seller Adda</h2>
        <p className="text-slate-600">Master the art of buying and selling YouTube channels with our comprehensive guide.</p>
      </div>

      {/* Buy Channel Section */}
      <div className="mb-20">
        <h3 className="text-3xl font-display font-bold text-white mb-6 flex items-center bg-slate-900 p-6 rounded-3xl shadow-xl">
          <span className="bg-yt-red text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-xl">1</span>
          How to Buy Channel
        </h3>
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
          <p className="text-lg text-slate-600 mb-8">
            Finding and acquiring the right YouTube channel is a strategic investment. Follow these steps to ensure a smooth purchase.
          </p>
          
          {/* Video Placeholder */}
          <div className="aspect-video bg-slate-900 rounded-3xl mb-10 flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-yt-red w-20 h-20 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform relative z-10">
              <Youtube className="text-white w-10 h-10 fill-white" />
            </div>
            <p className="absolute bottom-6 left-6 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">Watch: How to Buy a Channel</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-yt-red/10 p-2 rounded-lg mr-4 mt-1">
                <Search className="text-yt-red w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Browse Listings</h4>
                <p className="text-slate-600">Explore our verified marketplace using filters for niche, subscribers, and revenue to find your perfect match.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-yt-red/10 p-2 rounded-lg mr-4 mt-1">
                <ShieldCheck className="text-yt-red w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Verify Details</h4>
                <p className="text-slate-600">Review the growth data, monetization status, and channel analytics provided in the detailed listing view.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-yt-red/10 p-2 rounded-lg mr-4 mt-1">
                <MessageCircle className="text-yt-red w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Contact & Negotiate</h4>
                <p className="text-slate-600">Reach out to our support team or use the direct contact options to start negotiations with the seller.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sell Channel Section */}
      <div>
        <h3 className="text-3xl font-display font-bold text-white mb-6 flex items-center bg-slate-900 p-6 rounded-3xl shadow-xl">
          <span className="bg-yt-red text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-xl">2</span>
          How to Sell
        </h3>
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
          <p className="text-lg text-slate-600 mb-8">
            Ready to exit your channel? We make the selling process fast, secure, and profitable.
          </p>
          
          {/* Video Placeholder */}
          <div className="aspect-video bg-slate-900 rounded-3xl mb-10 flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-yt-red w-20 h-20 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform relative z-10">
              <Youtube className="text-white w-10 h-10 fill-white" />
            </div>
            <p className="absolute bottom-6 left-6 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">Watch: How to Sell Your Channel</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-emerald-500/10 p-2 rounded-lg mr-4 mt-1">
                <PlusCircle className="text-emerald-600 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">List Your Channel</h4>
                <p className="text-slate-600">Fill out our comprehensive sell form with your channel details, screenshots, and asking price.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-emerald-500/10 p-2 rounded-lg mr-4 mt-1">
                <Zap className="text-emerald-600 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Fast Approval</h4>
                <p className="text-slate-600">Our team reviews your listing within 24 hours. Once verified, it goes live to thousands of potential buyers.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-emerald-500/10 p-2 rounded-lg mr-4 mt-1">
                <CheckCircle2 className="text-emerald-600 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Secure Transfer</h4>
                <p className="text-slate-600">We guide you through the ownership transfer process using our secure escrow-style system to ensure you get paid.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LearnCourse = () => {
  const courses = [
    {
      title: "Basic YouTube Course",
      tier: "Basic",
      price: "₹1,999",
      oldPrice: "₹3,999",
      desc: "Perfect for beginners starting their YouTube journey.",
      features: ["Channel Setup", "Basic SEO", "Content Ideas", "Monetization Basics"],
      color: "bg-blue-500",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Life Skill Growing Course",
      tier: "High",
      price: "₹4,999",
      oldPrice: "₹9,999",
      desc: "Master the skills needed to grow any channel rapidly.",
      features: ["Advanced SEO", "Viral Framework", "Audience Psychology", "Brand Building"],
      color: "bg-yt-red",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Unlimited Due to Mastery Course",
      tier: "Premium Type",
      price: "₹9,999",
      oldPrice: "₹19,999",
      desc: "The ultimate blueprint for YouTube business mastery.",
      features: ["Full Business Automation", "High-Ticket Sales", "Exit Strategies", "1-on-1 Mentorship"],
      color: "bg-slate-900",
      icon: <Star className="w-6 h-6" />
    }
  ];

  return (
    <section className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-yt-red/10 text-yt-red px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Master Your Future</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6">
            Our <span className="text-yt-red">Learning</span> Programs
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Choose the right path for your YouTube career. From basic growth to unlimited business mastery.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col h-full group hover:shadow-2xl transition-all duration-500"
            >
              <div className={`${course.color} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
                <div className="relative z-10">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                    {course.tier}
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold">{course.price}</span>
                    <span className="text-white/60 line-through text-sm">{course.oldPrice}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {course.desc}
                </p>
                
                <div className="space-y-4 mb-10 flex-grow">
                  {course.features.map((feature, j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <div className="bg-emerald-500/10 p-1 rounded-full">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <a 
                  href={`https://wa.me/919876543210?text=Hi, I'm interested in the ${course.title} (${course.tier}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full ${course.tier === 'Premium Type' ? 'bg-slate-900' : 'bg-emerald-500 hover:bg-emerald-600'} text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center shadow-lg group-hover:scale-[1.02]`}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact to Buy
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stats */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yt-red/10 blur-[100px] rounded-full -mr-48 -mt-48" />
          <div className="grid md:grid-cols-3 gap-12 text-center relative z-10">
            <div>
              <p className="text-4xl font-display font-bold text-yt-red mb-2">1,000+</p>
              <p className="text-slate-400 font-medium">Students Enrolled</p>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-yt-red mb-2">95%</p>
              <p className="text-slate-400 font-medium">Success Rate</p>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-yt-red mb-2">₹10Cr+</p>
              <p className="text-slate-400 font-medium">Student Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="section-padding bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Contact Us</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">We're here to help you with your YouTube channel trading journey. Reach out to us directly.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-slate-900 p-12 rounded-[3rem] shadow-2xl flex flex-col items-center text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yt-red/5 blur-3xl rounded-full -ml-20 -mb-20" />
          
          <div className="bg-emerald-500 p-6 rounded-3xl mb-8 shadow-lg shadow-emerald-500/20 relative z-10">
            <MessageCircle className="text-white w-10 h-10" />
          </div>
          
          <h3 className="text-3xl font-display font-bold text-white mb-4 relative z-10">Chat on WhatsApp</h3>
          <p className="text-slate-400 mb-10 text-lg max-w-md relative z-10">Get instant, premium support from our expert team for all your channel trading needs.</p>
          
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-5 px-12 rounded-2xl transition-all flex items-center text-lg shadow-xl shadow-emerald-500/20 relative z-10 group-hover:scale-105"
          >
            <MessageCircle className="w-6 h-6 mr-3" /> Chat on WhatsApp
          </a>
          
          {/* Hidden number for SEO/Accessibility */}
          <span className="sr-only">+91 98765 43210</span>
        </motion.div>
      </div>
    </div>
  </section>
);

const Footer = ({ onNavigate }: { onNavigate: (tab: string) => void }) => (
  <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center mb-6">
            <div className="bg-yt-red p-1.5 rounded-lg mr-2">
              <Youtube className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">YT Seller <span className="text-yt-red">Adda</span></span>
          </div>
          <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
            The world's leading marketplace for buying and selling YouTube channels. We provide a secure environment for creators to trade their digital assets with human-verified processes.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-yt-red hover:border-yt-red transition-all">
              <span className="sr-only">Instagram</span>
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all">
              <span className="sr-only">Telegram</span>
              <Send className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-yt-red hover:border-yt-red transition-all">
              <span className="sr-only">YouTube</span>
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><button onClick={() => onNavigate('browse')} className="hover:text-yt-red transition-colors">Browse Channels</button></li>
            <li><button onClick={() => onNavigate('sell')} className="hover:text-yt-red transition-colors">Sell Your Channel</button></li>
            <li><button onClick={() => onNavigate('learn-course')} className="hover:text-yt-red transition-colors">Learn Course</button></li>
            <li><button onClick={() => onNavigate('reviews')} className="hover:text-yt-red transition-colors">Success Stories</button></li>
            <li><button className="hover:text-yt-red transition-colors">Pricing Plans</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Contact Us</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2 text-emerald-500" /> Chat on WhatsApp
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Legal</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><button className="hover:text-yt-red transition-colors">Terms & Conditions</button></li>
            <li><button className="hover:text-yt-red transition-colors">Privacy Policy</button></li>
            <li><button className="hover:text-yt-red transition-colors">Cookie Policy</button></li>
          </ul>
        </div>
      </div>
      <div className="pt-10 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-400 mb-4">
          Disclaimer: YT Seller Adda is an independent marketplace and is not affiliated with, endorsed by, or sponsored by YouTube or Google LLC. All trades are subject to YouTube's Terms of Service.
        </p>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} YT Seller Adda. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedChannel, setSelectedChannel] = useState<ChannelListing | null>(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  
  const [filters, setFilters] = useState({
    niche: 'All',
    minSubs: 0,
    maxPrice: 1000000,
    monetized: 'All'
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show WhatsApp button after scrolling slightly
      if (scrollY > windowHeight * 0.5) {
        setShowWhatsApp(true);
      } else {
        setShowWhatsApp(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredChannels = useMemo(() => {
    return MOCK_CHANNELS.filter(c => {
      const nicheMatch = filters.niche === 'All' || c.niche === filters.niche;
      const subsMatch = c.subscribers >= filters.minSubs;
      const priceMatch = c.askingPrice <= filters.maxPrice;
      const monMatch = filters.monetized === 'All' || 
                      (filters.monetized === 'Yes' ? c.monetized : !c.monetized);
      return nicheMatch && subsMatch && priceMatch && monMatch;
    });
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const navigateTo = (tab: string) => {
    setSelectedChannel(null);
    setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={navigateTo} activeTab={activeTab} />
      
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {activeTab === 'home' && (
            <>
              <Hero 
                onBrowse={() => navigateTo('browse')} 
                onSell={() => navigateTo('sell')} 
              />
              
              {/* Featured Listings Preview */}
              <section className="section-padding bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <OfferBanner />
                  
                  <div className="flex items-end justify-between mb-12">
                    <div>
                      <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Featured Listings</h2>
                      <p className="text-slate-600">Hand-picked high-quality channels for serious investors.</p>
                    </div>
                    <button 
                      onClick={() => navigateTo('browse')}
                      className="hidden sm:flex items-center text-yt-red font-bold hover:underline"
                    >
                      View All <ChevronRight className="ml-1 w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_CHANNELS.slice(0, 3).map(channel => (
                      <ChannelCard 
                        key={channel.id} 
                        channel={channel} 
                        onViewDetails={setSelectedChannel} 
                      />
                    ))}
                  </div>
                  
                  <div className="mt-16 text-center">
                    <button 
                      onClick={() => navigateTo('browse')}
                      className="yt-button-primary py-4 px-12 text-lg inline-flex items-center group"
                    >
                      View All Channels 
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </section>

              <WhyChooseUs />
              
              <Reviews />
              <Contact />
            </>
          )}

          {activeTab === 'browse' && (
            <section className="pt-32 pb-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                  <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Browse Channels</h1>
                  <p className="text-slate-600">Find the perfect YouTube channel for your next venture.</p>
                </div>
                
                <FilterBar filters={filters} onFilterChange={handleFilterChange} />
                
                {filteredChannels.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredChannels.map(channel => (
                      <ChannelCard 
                        key={channel.id} 
                        channel={channel} 
                        onViewDetails={setSelectedChannel} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
                    <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Channels Found</h3>
                    <p className="text-slate-500 mb-6">Try adjusting your filters to find more listings.</p>
                    <button 
                      onClick={() => setFilters({ niche: 'All', minSubs: 0, maxPrice: 1000000, monetized: 'All' })}
                      className="yt-button-secondary"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'sell' && (
            <section className="pt-32 pb-20 bg-slate-50 min-h-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SellForm />
              </div>
            </section>
          )}

          {activeTab === 'reviews' && (
            <div className="pt-20">
              <Reviews />
              <WhyChooseUs />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="pt-20">
              <AboutUs />
              <WhyChooseUs />
            </div>
          )}

          {activeTab === 'how-to-use' && (
            <div className="pt-20">
              <HowToUse />
            </div>
          )}

          {activeTab === 'learn-course' && (
            <div className="pt-20">
              <LearnCourse />
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="pt-20">
              <Contact />
            </div>
          )}
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedChannel && (
          <ChannelDetails 
            key="details"
            channel={selectedChannel} 
            onClose={() => setSelectedChannel(null)} 
          />
        )}
      </AnimatePresence>

      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp Button */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 45 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="fixed bottom-8 right-8 z-50 bg-emerald-500 text-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.4)] flex items-center justify-center hover:bg-emerald-600 transition-all group border-2 border-white/20 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-emerald-400 rounded-2xl animate-ping opacity-20 group-hover:hidden" />
            <MessageCircle className="w-8 h-8 relative z-10" />
            <span className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden md:block border border-white/10">
              Premium Support
            </span>
          </motion.a>
        )}
      </AnimatePresence>

    </div>
  );
}
