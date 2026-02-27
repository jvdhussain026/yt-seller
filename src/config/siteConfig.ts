/**
 * Centralized Site Configuration
 * Move all static values, URLs, and text here for easy maintenance.
 */

export const siteConfig = {
  siteName: "YT Seller Adda",
  tagline: "Buy & Sell YouTube Channels Safely",
  description: "The most trusted platform for YouTube creators. Verified listings, secure escrow-style deals, and smooth ownership transitions.",
  
  // Contact Information
  contact: {
    phone: "+91 8958890396",
    whatsapp: "918958890396",
    email: "kbdigitalofficial@gmail.com",
    supportEmail: "kbdigitalofficial@gmail.com",
    address: "New Delhi, India",
  },

  // Social Media Links
  socialLinks: {
    instagram: "https://instagram.com/ytselleradda",
    telegram: "https://t.me/ytselleradda",
    youtube: "https://youtube.com/@ytselleradda",
    linkedin: "https://linkedin.com/company/ytselleradda",
  },

  // Hero Section
  hero: {
    title: "Buy & Sell YouTube Channels Safely",
    subtitle: "The most trusted platform for YouTube creators. Verified listings, secure escrow-style deals, and smooth ownership transitions.",
    primaryCTA: "Browse Channels",
    secondaryCTA: "Sell Your Channel",
  },

  // Navigation Links
  navLinks: [
    { name: 'Home', id: 'home' },
    { name: 'Browse Channels', id: 'browse' },
    { name: 'Sell Channel', id: 'sell' },
    { name: 'Learn Course', id: 'learn-course' },
    { name: 'How to Use', id: 'how-to-use' },
    { name: 'About Us', id: 'about' },
  ],

  // Stats Section
  stats: [
    { label: "Years in Market", value: 2, suffix: "+" },
    { label: "Deals Done", value: 700, suffix: "+", duration: 1.5 },
    { label: "Available Now", value: 15, suffix: "+" },
  ],

  // Banners
  banners: [
    {
      image: "https://picsum.photos/seed/offer1/1200/600",
      text: "🔥 New Offer: Gaming Channel 'ProGamer' just received a bid of ₹4,50,000! Offers",
      color: "from-yt-red/80"
    },
    {
      image: "https://picsum.photos/seed/offer2/1200/600",
      text: "Offers",
      color: "from-blue-600/40"
    },
    {
      image: "https://picsum.photos/seed/offer3/1200/600",
      text: "💰 Deal Alert: Finance channel 'MoneyWise' price dropped by ₹50,000! Offers",
      color: "from-emerald-600/80"
    },
    {
      image: "https://picsum.photos/seed/offer4/1200/600",
      text: "Offers",
      color: "from-purple-600/40"
    },
  ],

  // External URLs & API Endpoints
  externalLinks: {
    whatsappChat: (message: string) => `https://wa.me/918958890396?text=${encodeURIComponent(message)}`,
    mailto: (subject: string) => `mailto:kbdigitalofficial@gmail.com?subject=${encodeURIComponent(subject)}`,
  },

  // Assets & Placeholders
  assets: {
    logo: "Youtube", // This refers to the Lucide icon name
    placeholderImage: "https://picsum.photos/seed/vibrant/1920/1080",
    aboutImage: "https://picsum.photos/seed/about/800/600",
  },

  // Legal
  legal: {
    disclaimer: "Disclaimer: YT Seller Adda is an independent marketplace and is not affiliated with, endorsed by, or sponsored by YouTube or Google LLC. All trades are subject to YouTube's Terms of Service.",
    copyright: (year: number) => `© ${year} YT Seller Adda. All rights reserved.`,
  }
};

export type SiteConfig = typeof siteConfig;
