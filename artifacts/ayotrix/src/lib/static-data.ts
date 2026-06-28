export interface ServiceItem {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  gradient: string;
  bgLight: string;
  icon: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: { title: string; desc: string }[];
  stats: { value: string; label: string }[];
  process: { step: string; title: string; desc: string }[];
  formType: string;
}

export interface ProductItem {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  gradient: string;
  bgLight: string;
  icon: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: { title: string; desc: string }[];
  stats: { value: string; label: string }[];
  useCases: string[];
  formType: string;
}

export interface DMItem {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  gradient: string;
  bgLight: string;
  icon: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: { title: string; desc: string }[];
  stats: { value: string; label: string }[];
  deliverables: string[];
  formType: string;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "ecommerce-development",
    name: "E-Commerce Development",
    shortName: "E-Commerce",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #1E1045 0%, #3B0764 40%, #5B21B6 100%)",
    bgLight: "rgba(124,58,237,0.06)",
    icon: "🛒",
    tagline: "Build a store that sells while you sleep",
    description: "End-to-end e-commerce development — from storefront design to payment gateway, inventory management, and post-launch growth.",
    longDescription: "We build high-converting, mobile-first e-commerce platforms tailored to your products and customers. Whether you're launching your first online store or migrating an existing one, our team delivers scalable, secure, and blazing-fast shopping experiences that drive real revenue.",
    features: [
      { title: "Custom Storefront Design", desc: "Pixel-perfect, conversion-optimized UI tailored to your brand identity and target audience." },
      { title: "Multi-Payment Gateway", desc: "Razorpay, PayU, Stripe, UPI, COD, and EMI options integrated seamlessly." },
      { title: "Smart Inventory Management", desc: "Real-time stock tracking, low-stock alerts, bulk import/export, and multi-warehouse support." },
      { title: "Mobile-First Architecture", desc: "Lightning-fast on all devices with progressive web app capabilities for native app feel." },
      { title: "SEO-Ready Structure", desc: "Schema markup, canonical URLs, sitemap generation, and Core Web Vitals optimized." },
      { title: "Advanced Analytics Dashboard", desc: "Sales reports, customer insights, abandoned cart analytics, and revenue forecasting." },
      { title: "Order & Shipping Management", desc: "Automated order processing, real-time shipping tracking, and return management." },
      { title: "Customer Account Portal", desc: "Wishlist, order history, loyalty points, and personalized product recommendations." },
    ],
    stats: [
      { value: "150+", label: "Stores Launched" },
      { value: "3.2×", label: "Avg. Conversion Lift" },
      { value: "99.9%", label: "Uptime Guaranteed" },
      { value: "45 Days", label: "Average Delivery" },
    ],
    process: [
      { step: "01", title: "Discovery & Planning", desc: "We audit your products, competitors, and target customers to define the perfect store architecture." },
      { step: "02", title: "Design & Prototype", desc: "Interactive wireframes and high-fidelity mockups reviewed and approved before any code is written." },
      { step: "03", title: "Development & Integration", desc: "Frontend, backend, payment, and third-party integrations built with clean, maintainable code." },
      { step: "04", title: "Testing & QA", desc: "Cross-device testing, load testing, security audit, and payment flow validation." },
      { step: "05", title: "Launch & Growth", desc: "Go-live support, SEO setup, Google Analytics, and ongoing optimization recommendations." },
    ],
    formType: "ecommerce-development",
  },
  {
    slug: "taxi-booking-app",
    name: "Taxi Booking App Development",
    shortName: "Taxi App",
    color: "#D97706",
    gradient: "linear-gradient(135deg, #1C0A00 0%, #431407 40%, #92400E 100%)",
    bgLight: "rgba(217,119,6,0.06)",
    icon: "🚕",
    tagline: "Launch your own Uber-like platform — faster",
    description: "Full-stack taxi booking app development with real-time GPS, driver app, customer app, and powerful admin panel.",
    longDescription: "We develop white-label taxi and ride-hailing platforms from scratch — complete with rider app, driver app, and admin panel. Real-time GPS tracking, fare calculation, automated dispatch, and cashless payments are built in from day one.",
    features: [
      { title: "Real-Time GPS Tracking", desc: "Live location sharing between driver and passenger with accurate ETA and route visualization." },
      { title: "Rider App (iOS & Android)", desc: "Seamless booking, ride history, fare estimate, SOS button, and driver ratings." },
      { title: "Driver App", desc: "Trip management, earnings dashboard, navigation integration, and online/offline toggle." },
      { title: "Smart Dispatch System", desc: "Automated driver allocation based on proximity, rating, and availability." },
      { title: "Dynamic Fare Engine", desc: "Surge pricing, zone-based fares, promo codes, and corporate billing support." },
      { title: "Admin Panel", desc: "Fleet management, driver verification, trip oversight, revenue reports, and heat maps." },
      { title: "Multiple Payment Options", desc: "Cash, card, UPI, wallet, and corporate account billing all supported." },
      { title: "Safety Features", desc: "Share trip, SOS alert, driver verification, and emergency contact notification." },
    ],
    stats: [
      { value: "50+", label: "Platforms Deployed" },
      { value: "2M+", label: "Trips Completed" },
      { value: "60 Days", label: "MVP Delivery" },
      { value: "4.8★", label: "Avg. App Rating" },
    ],
    process: [
      { step: "01", title: "Requirement Scoping", desc: "Define coverage area, vehicle types, pricing model, and platform features with our team." },
      { step: "02", title: "UI/UX Design", desc: "Clean, intuitive designs for all three apps — rider, driver, and admin — reviewed with you." },
      { step: "03", title: "Core Development", desc: "Backend APIs, real-time socket connections, map integrations, and all three app frontends." },
      { step: "04", title: "Testing & Simulation", desc: "Live GPS simulation, load testing, payment validation, and beta driver onboarding." },
      { step: "05", title: "Launch & Scale", desc: "App store submission, server setup, driver onboarding tools, and 90-day post-launch support." },
    ],
    formType: "taxi-booking-app",
  },
  {
    slug: "service-provider-platform",
    name: "Service Provider Platform Development",
    shortName: "Marketplace",
    color: "#059669",
    gradient: "linear-gradient(135deg, #022C22 0%, #064E3B 40%, #065F46 100%)",
    bgLight: "rgba(5,150,105,0.06)",
    icon: "🔧",
    tagline: "Build the go-to marketplace for any service",
    description: "Custom service marketplace platforms connecting customers with verified professionals — home services, tutoring, beauty, healthcare, and more.",
    longDescription: "Build an Urban Company or TaskRabbit-style platform for your niche. We develop end-to-end service marketplaces with customer apps, provider apps, dynamic booking management, geo-based matching, and a complete business dashboard.",
    features: [
      { title: "Provider Onboarding System", desc: "Document verification, skill-based profiling, and background check integrations." },
      { title: "Geo-Based Matching", desc: "Smart algorithm matches customers to the nearest available verified provider." },
      { title: "Dynamic Booking Management", desc: "Calendar integration, slot booking, reschedule, and cancellation with policy enforcement." },
      { title: "Reviews & Ratings Engine", desc: "Two-way rating system, photo reviews, and provider reputation scoring." },
      { title: "Split Payment & Commission", desc: "Automated commission deduction, provider payout management, and invoice generation." },
      { title: "Multi-Category Support", desc: "Serve multiple service verticals from one admin panel with category-specific workflows." },
      { title: "Customer & Provider Apps", desc: "Native iOS and Android apps or cross-platform React Native for both sides of the marketplace." },
      { title: "Analytics & Insights", desc: "Booking trends, top providers, revenue reports, and customer retention metrics." },
    ],
    stats: [
      { value: "30+", label: "Marketplaces Built" },
      { value: "5K+", label: "Providers Onboarded" },
      { value: "75 Days", label: "Full Platform Delivery" },
      { value: "98%", label: "Client Satisfaction" },
    ],
    process: [
      { step: "01", title: "Platform Blueprint", desc: "Define service categories, provider model, commission structure, and user flows." },
      { step: "02", title: "Design Sprint", desc: "Wireframes and UI for customer app, provider app, and admin dashboard." },
      { step: "03", title: "Platform Build", desc: "Scalable backend, real-time matching engine, and both mobile apps developed." },
      { step: "04", title: "Provider Onboarding Tools", desc: "Bulk invite, verification workflow, and training material integration." },
      { step: "05", title: "Launch & Growth", desc: "Marketing landing page, app store launch, and growth analytics setup." },
    ],
    formType: "service-provider-platform",
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    slug: "ads-management",
    name: "Ads Management",
    shortName: "Ads Management",
    color: "#F97316",
    gradient: "linear-gradient(135deg, #1A0600 0%, #431207 45%, #7C2D12 100%)",
    bgLight: "rgba(249,115,22,0.06)",
    icon: "📊",
    tagline: "Ad spend that actually converts",
    description: "Performance-driven ad campaign management across Google, Meta, and programmatic networks — ROI-focused, data-backed.",
    longDescription: "We take full ownership of your advertising budget across Google Ads, Facebook, Instagram, and beyond. From creative ideation to bid optimization and detailed reporting, our ads team delivers measurable growth at the lowest possible cost per acquisition.",
    features: [
      { title: "Multi-Platform Management", desc: "Google Search, Display, Shopping, Meta, Instagram, and YouTube all managed from one team." },
      { title: "Creative Strategy & Copy", desc: "Ad creatives, headlines, and landing page copy optimized for each platform and audience." },
      { title: "Audience Segmentation", desc: "Custom audiences, lookalikes, retargeting lists, and interest-based targeting." },
      { title: "Bid & Budget Optimization", desc: "Smart bidding strategies, dayparting, and continuous A/B testing to maximize ROAS." },
      { title: "Conversion Tracking Setup", desc: "Pixel installation, goal configuration, and attribution modeling across all channels." },
      { title: "Monthly Performance Reports", desc: "Clear dashboards showing spend, impressions, clicks, conversions, and ROAS every month." },
    ],
    stats: [
      { value: "₹12Cr+", label: "Ad Spend Managed" },
      { value: "320%", label: "Average ROAS" },
      { value: "200+", label: "Brands Served" },
      { value: "45%", label: "Avg. CPA Reduction" },
    ],
    useCases: ["E-commerce product sales", "Lead generation for services", "App installs", "Brand awareness campaigns", "Real estate inquiries", "Education enrollment"],
    formType: "ads-management",
  },
  {
    slug: "whatsapp-marketing",
    name: "WhatsApp Marketing",
    shortName: "WhatsApp Marketing",
    color: "#25D366",
    gradient: "linear-gradient(135deg, #001A0D 0%, #003D20 45%, #065F46 100%)",
    bgLight: "rgba(37,211,102,0.06)",
    icon: "💬",
    tagline: "98% open rate. No other channel comes close.",
    description: "Official WhatsApp Business API — bulk messaging, rich media campaigns, and automated drip sequences at scale.",
    longDescription: "Reach your customers on the most-used messaging platform in India. We provide WhatsApp Business API access, campaign creation, template approval, and automated follow-up sequences — all fully compliant with Meta's policies.",
    features: [
      { title: "Official WhatsApp Business API", desc: "Verified green tick sender, no spam risk, and full compliance with Meta's commerce policies." },
      { title: "Rich Media Messages", desc: "Send images, videos, PDFs, product catalogs, and interactive buttons in every campaign." },
      { title: "Bulk Campaign Broadcasts", desc: "Segment your audience and send targeted campaigns to thousands in minutes." },
      { title: "Automated Drip Sequences", desc: "Welcome flows, abandoned cart nudges, re-engagement sequences, and appointment reminders." },
      { title: "Two-Way Conversations", desc: "Let customers reply, ask questions, and place orders directly in WhatsApp." },
      { title: "Analytics Dashboard", desc: "Delivered, read, and reply rates with click-through tracking on every campaign." },
    ],
    stats: [
      { value: "98%", label: "Open Rate" },
      { value: "45%", label: "Avg. Click Rate" },
      { value: "5Cr+", label: "Messages Sent" },
      { value: "3×", label: "Higher Conversion vs Email" },
    ],
    useCases: ["Flash sale announcements", "Order & shipping updates", "Appointment reminders", "Payment collection links", "Customer support", "Loyalty program updates"],
    formType: "whatsapp-marketing",
  },
  {
    slug: "rcs-marketing",
    name: "RCS Marketing",
    shortName: "RCS Marketing",
    color: "#2563EB",
    gradient: "linear-gradient(135deg, #000B28 0%, #0F2460 45%, #1E3A8A 100%)",
    bgLight: "rgba(37,99,235,0.06)",
    icon: "📡",
    tagline: "SMS evolved — rich, interactive, verified",
    description: "Rich Communication Services (RCS) — the next-gen SMS with brand verification, interactive cards, and real analytics.",
    longDescription: "RCS (Rich Communication Services) is the future of mobile messaging — it delivers branded, verified messages directly in the native SMS app with no app download required. Carousels, quick-reply buttons, rich media, and read receipts make RCS the most powerful carrier-grade channel available today.",
    features: [
      { title: "Verified Brand Sender", desc: "Your business name, logo, and verified checkmark appear in every delivered message." },
      { title: "Interactive Message Cards", desc: "Carousels, image banners, suggested replies, and action buttons inside the SMS app." },
      { title: "Fallback to SMS", desc: "Automatic fallback to plain SMS for devices that don't support RCS — zero reach lost." },
      { title: "Read Receipts & Analytics", desc: "Real-time delivery confirmation, read status, and button click tracking." },
      { title: "Rich Media Support", desc: "Send images, videos, GIFs, and PDFs without any app installation." },
      { title: "Two-Way Conversations", desc: "Customers can reply, confirm bookings, or request callbacks directly in the message thread." },
    ],
    stats: [
      { value: "70%", label: "Higher Engagement vs SMS" },
      { value: "4×", label: "Click Rate vs Email" },
      { value: "100%", label: "Delivery Verified" },
      { value: "1Cr+", label: "RCS Messages Sent" },
    ],
    useCases: ["Bank transaction alerts", "Promotional campaigns", "Appointment confirmations", "Product launches", "Survey & feedback", "Government notifications"],
    formType: "rcs-marketing",
  },
  {
    slug: "otp-services",
    name: "OTP Services",
    shortName: "OTP Services",
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #1A0005 0%, #450A0A 45%, #7F1D1D 100%)",
    bgLight: "rgba(239,68,68,0.06)",
    icon: "🔐",
    tagline: "Secure. Instant. Reliable. Every time.",
    description: "Enterprise-grade OTP delivery via SMS, voice, and WhatsApp — 99.9% delivery rate with sub-5-second latency.",
    longDescription: "Protect your users and authenticate transactions with bulletproof OTP delivery. Our multi-channel OTP service delivers one-time passwords via SMS, voice call, and WhatsApp with global reach, intelligent retry logic, and a developer-friendly REST API.",
    features: [
      { title: "Multi-Channel Delivery", desc: "SMS as primary, voice call as fallback, and WhatsApp as alternative — all configurable." },
      { title: "Sub-5 Second Delivery", desc: "Direct carrier connections across 200+ countries ensure fastest possible OTP delivery." },
      { title: "Intelligent Retry Logic", desc: "Automatic retry on alternative channels if primary delivery fails." },
      { title: "REST API & SDK", desc: "Clean REST API with SDKs for Node.js, Python, PHP, Java, and more. Go live in 30 minutes." },
      { title: "Global Coverage", desc: "Reach users in 200+ countries with local number masking for highest trust." },
      { title: "99.9% SLA Guarantee", desc: "Redundant infrastructure with real-time monitoring and proactive incident response." },
    ],
    stats: [
      { value: "99.9%", label: "Delivery Rate" },
      { value: "<5s", label: "Avg. Delivery Time" },
      { value: "200+", label: "Countries Covered" },
      { value: "10Cr+", label: "OTPs Delivered" },
    ],
    useCases: ["User registration & login", "Payment authentication", "Password reset", "KYC verification", "Transaction approval", "Account recovery"],
    formType: "otp-services",
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    shortName: "AI Agents",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #0D0520 0%, #2E1065 45%, #4C1D95 100%)",
    bgLight: "rgba(139,92,246,0.06)",
    icon: "🤖",
    tagline: "Your 24/7 AI workforce — never sleeps, never tires",
    description: "Conversational AI agents for sales, customer support, and lead qualification — trained on your data, deployed in hours.",
    longDescription: "Deploy intelligent AI agents that understand your business, handle customer queries, qualify leads, and escalate complex issues to humans. Built on the latest large language models and trained on your products, FAQs, and policies — available 24/7 across WhatsApp, web chat, email, and phone.",
    features: [
      { title: "Sales Qualification Agent", desc: "Engage inbound leads, ask qualifying questions, and hand off only ready-to-buy prospects to your team." },
      { title: "Customer Support Agent", desc: "Handle FAQs, order status, returns, and complaints autonomously with your knowledge base." },
      { title: "Voice AI Agent", desc: "Outbound calling, appointment setting, and follow-up calls handled entirely by AI." },
      { title: "CRM Integration", desc: "Auto-sync conversation data to Salesforce, HubSpot, Zoho, or your existing CRM." },
      { title: "Multi-Channel Deployment", desc: "Deploy the same agent on WhatsApp, your website, email, and phone simultaneously." },
      { title: "Continuous Learning", desc: "Agent improves over time based on conversation data and feedback." },
    ],
    stats: [
      { value: "80%", label: "Queries Resolved by AI" },
      { value: "24/7", label: "Availability" },
      { value: "60%", label: "Support Cost Reduction" },
      { value: "3×", label: "Lead Response Speed" },
    ],
    useCases: ["Inbound lead qualification", "Customer support automation", "Appointment booking", "Product recommendations", "Order tracking", "HR onboarding"],
    formType: "ai-agents",
  },
  {
    slug: "whatsapp-chatbot",
    name: "WhatsApp Automation Chatbot",
    shortName: "WhatsApp Chatbot",
    color: "#059669",
    gradient: "linear-gradient(135deg, #001810 0%, #022C22 45%, #064E3B 100%)",
    bgLight: "rgba(5,150,105,0.06)",
    icon: "🤖",
    tagline: "Automate 80% of customer conversations on WhatsApp",
    description: "Intelligent WhatsApp chatbots with flow-based automation, AI NLP, CRM integration, and live agent handoff.",
    longDescription: "Transform WhatsApp into your most powerful business channel. Our chatbot platform combines visual flow builders for predictable journeys with AI-powered NLP for natural conversation — handling order tracking, FAQs, appointment booking, and lead capture automatically.",
    features: [
      { title: "Visual Flow Builder", desc: "No-code drag-and-drop bot builder for creating complex conversation flows without engineering." },
      { title: "AI Natural Language Processing", desc: "Understands customer intent and context for natural, human-like conversations." },
      { title: "Live Agent Handoff", desc: "Smooth escalation to human agents with full conversation context when needed." },
      { title: "CRM & E-Commerce Integration", desc: "Connect to your CRM, order management, and inventory systems for real-time data access." },
      { title: "Multi-Language Support", desc: "Serve customers in Hindi, English, and 10+ regional Indian languages." },
      { title: "Analytics & Optimization", desc: "Conversation flow analytics, drop-off tracking, and automated optimization suggestions." },
    ],
    stats: [
      { value: "80%", label: "Automation Rate" },
      { value: "3 Min", label: "Avg. Query Resolution" },
      { value: "5×", label: "Agent Productivity" },
      { value: "40%", label: "Cost Per Interaction Saved" },
    ],
    useCases: ["Order status & tracking", "Product catalog browsing", "Lead capture forms", "Appointment scheduling", "Payment collection", "Customer support & FAQ"],
    formType: "whatsapp-chatbot",
  },
  {
    slug: "google-my-business",
    name: "Google My Business Optimization",
    shortName: "GMB Optimization",
    color: "#4285F4",
    gradient: "linear-gradient(135deg, #000D24 0%, #0C2461 45%, #1A3C7A 100%)",
    bgLight: "rgba(66,133,244,0.06)",
    icon: "📍",
    tagline: "Dominate local search. Own your area.",
    description: "Complete Google My Business setup, optimization, and ongoing management to rank #1 for local searches and drive foot traffic.",
    longDescription: "When potential customers search for your type of business near them, your Google Business Profile is your most valuable asset. We set it up perfectly, optimize every section, build local citations, manage reviews, and keep it active — so you show up first and convert more visitors.",
    features: [
      { title: "Profile Setup & Verification", desc: "Complete profile creation with all business details, photos, categories, and service areas." },
      { title: "Keyword-Optimized Description", desc: "Business description and posts crafted to rank for high-intent local search queries." },
      { title: "Photo & Video Management", desc: "Regular upload of high-quality photos, team images, and product/service visuals." },
      { title: "Review Generation Strategy", desc: "Systematic approach to getting more 5-star reviews from happy customers." },
      { title: "Review Response Management", desc: "Professional responses to all reviews — positive and negative — within 24 hours." },
      { title: "Monthly Posts & Updates", desc: "Regular GMB posts for offers, events, and news to maintain profile freshness." },
    ],
    stats: [
      { value: "3×", label: "More Profile Views" },
      { value: "60%", label: "Increase in Calls" },
      { value: "Top 3", label: "Local Pack Ranking" },
      { value: "500+", label: "Profiles Optimized" },
    ],
    useCases: ["Local retail shops", "Restaurants & cafes", "Medical clinics", "Real estate agents", "Service professionals", "Educational institutes"],
    formType: "google-my-business",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    shortName: "Google Ads",
    color: "#EA4335",
    gradient: "linear-gradient(135deg, #1A0200 0%, #4A0A06 45%, #7B1C1C 100%)",
    bgLight: "rgba(234,67,53,0.06)",
    icon: "🎯",
    tagline: "Show up exactly when customers are searching",
    description: "Certified Google Ads management — Search, Display, Shopping, YouTube, and Performance Max campaigns that deliver measurable ROI.",
    longDescription: "Our Google Ads certified team builds, manages, and optimizes campaigns that put your business in front of high-intent buyers at the exact moment they're searching. Every rupee of your budget is tracked, optimized, and reported with full transparency.",
    features: [
      { title: "Search Campaign Management", desc: "Keyword research, ad group structure, RSAs, and negative keyword management for maximum relevance." },
      { title: "Display & Remarketing", desc: "Banner ads and remarketing campaigns to stay top-of-mind across millions of websites." },
      { title: "Shopping Campaigns", desc: "Product feed optimization, smart shopping, and merchant center management." },
      { title: "YouTube Video Ads", desc: "In-stream, bumper, and discovery video ads to build brand awareness at scale." },
      { title: "Performance Max Campaigns", desc: "AI-powered campaigns across all Google channels for maximum reach and conversions." },
      { title: "Conversion Tracking & Reporting", desc: "Full attribution setup, conversion value tracking, and monthly performance dashboards." },
    ],
    stats: [
      { value: "400%", label: "Average ROAS" },
      { value: "50%", label: "Lower CPC vs Self-Managed" },
      { value: "₹5Cr+", label: "Annual Spend Managed" },
      { value: "350+", label: "Campaigns Managed" },
    ],
    useCases: ["E-commerce product sales", "Service lead generation", "App promotion", "Local business traffic", "B2B lead generation", "Education enrollment"],
    formType: "google-ads",
  },
];

export const DM_SERVICES: DMItem[] = [
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    shortName: "Social Media",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #1A0020 0%, #500730 45%, #831843 100%)",
    bgLight: "rgba(236,72,153,0.06)",
    icon: "📱",
    tagline: "Grow your audience. Build your brand. Drive sales.",
    description: "Full-service social media management — content strategy, creative production, community management, and paid growth.",
    longDescription: "We manage your brand's entire social presence across Instagram, Facebook, LinkedIn, and Twitter/X. From content calendars and design to community engagement and paid campaigns, we grow your followers into loyal customers.",
    features: [
      { title: "Content Strategy & Calendar", desc: "30-day content plans aligned to your brand voice, trends, and business goals." },
      { title: "Graphic Design & Video", desc: "Branded post designs, Reels, Stories, and carousel content produced in-house." },
      { title: "Community Management", desc: "Daily monitoring, comment replies, DM management, and audience engagement." },
      { title: "Hashtag & SEO Research", desc: "Platform-specific hashtag strategy and profile SEO for organic discoverability." },
      { title: "Paid Social Campaigns", desc: "Boosted posts and dedicated paid campaigns for follower growth and conversions." },
      { title: "Monthly Analytics Report", desc: "Reach, engagement, follower growth, and top-performing content report every month." },
    ],
    stats: [
      { value: "5×", label: "Average Engagement Growth" },
      { value: "10K+", label: "Accounts Managed" },
      { value: "30+", label: "Posts/Month Per Account" },
      { value: "24h", label: "Content Turnaround" },
    ],
    deliverables: ["Monthly content calendar", "30+ designed posts/month", "Reels & Stories", "Comment & DM management", "Competitor analysis", "Monthly performance report"],
    formType: "social-media-marketing",
  },
  {
    slug: "graphic-designing",
    name: "Graphic Designing",
    shortName: "Graphic Design",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #1A0F00 0%, #451A03 45%, #78350F 100%)",
    bgLight: "rgba(245,158,11,0.06)",
    icon: "🎨",
    tagline: "Visuals that stop the scroll and start the conversation",
    description: "Professional graphic design for logos, brand identity, social media, print, packaging, and digital advertising.",
    longDescription: "From a first logo to a complete brand identity system, our designers craft visuals that communicate your values, attract your audience, and stand out in a crowded market. Every design is crafted with strategy, not just aesthetics.",
    features: [
      { title: "Logo & Brand Identity", desc: "Logos, color palettes, typography systems, and brand guidelines for consistent communication." },
      { title: "Social Media Creatives", desc: "Feed posts, Stories, Reels thumbnails, banners, and profile optimization." },
      { title: "Marketing Collateral", desc: "Brochures, flyers, business cards, letterheads, and presentation decks." },
      { title: "Digital Ad Creatives", desc: "Banner sets, Google Display ads, Facebook/Instagram ad creatives in all sizes." },
      { title: "Packaging Design", desc: "Product packaging, labels, and box design for physical products." },
      { title: "Unlimited Revisions", desc: "We iterate until you're completely happy — no revision caps on branding projects." },
    ],
    stats: [
      { value: "2000+", label: "Designs Delivered" },
      { value: "48h", label: "Standard Turnaround" },
      { value: "500+", label: "Brands Designed" },
      { value: "100%", label: "Satisfaction Rate" },
    ],
    deliverables: ["Source files (AI/PSD/Figma)", "Print-ready PDF exports", "Web-optimized PNG/SVG", "Brand guidelines PDF", "Social media size variants", "Unlimited revisions"],
    formType: "graphic-designing",
  },
  {
    slug: "ugc-reels",
    name: "UGC Reels",
    shortName: "UGC Reels",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, #000F18 0%, #0C2937 45%, #164E63 100%)",
    bgLight: "rgba(6,182,212,0.06)",
    icon: "🎬",
    tagline: "Authentic content that converts cold audiences into buyers",
    description: "User-Generated Content reels — authentic, scroll-stopping short videos for Instagram, YouTube Shorts, and product pages.",
    longDescription: "UGC (User-Generated Content) style videos are the highest-converting ad format today. We produce authentic-looking, story-driven product videos shot and edited to feel organic — driving trust, engagement, and sales across Instagram Reels, YouTube Shorts, and Meta ads.",
    features: [
      { title: "UGC-Style Video Production", desc: "Authentic, phone-shot aesthetic that blends naturally into user feeds and drives trust." },
      { title: "Script & Storyboarding", desc: "Conversion-focused scripts built around your product benefits and target audience pain points." },
      { title: "Creator Matching", desc: "We match your product with relatable creators whose audience mirrors your customer profile." },
      { title: "Professional Editing", desc: "Captions, trending audio, color grading, and platform-specific format optimization." },
      { title: "Ad-Ready Deliverables", desc: "Every reel delivered ready for Meta Ads, Google Ads, and organic posting." },
      { title: "A/B Variant Testing", desc: "Multiple hooks and CTAs tested to identify the highest-converting creative angle." },
    ],
    stats: [
      { value: "4×", label: "Higher CTR vs Static Ads" },
      { value: "200+", label: "Reels Produced" },
      { value: "7 Days", label: "Delivery per Reel" },
      { value: "60%", label: "Lower CAC for Clients" },
    ],
    deliverables: ["Script & storyboard", "Filmed & edited reel", "Vertical (9:16) format", "Square (1:1) variant", "Captions & subtitles", "Raw footage files"],
    formType: "ugc-reels",
  },
  {
    slug: "seo",
    name: "SEO",
    shortName: "SEO",
    color: "#16A34A",
    gradient: "linear-gradient(135deg, #001207 0%, #052E16 45%, #064E3B 100%)",
    bgLight: "rgba(22,163,74,0.06)",
    icon: "🚀",
    tagline: "Rank higher. Get found. Grow organically.",
    description: "End-to-end SEO services — technical audits, on-page optimization, link building, and content strategy that compounds over time.",
    longDescription: "We build sustainable organic search visibility through comprehensive technical SEO, strategic content marketing, and authoritative link building. Our approach targets high-intent keywords that bring buyers, not just traffic — with results that compound month over month.",
    features: [
      { title: "Technical SEO Audit & Fixes", desc: "Site speed, crawlability, indexing, schema markup, Core Web Vitals, and mobile optimization." },
      { title: "Keyword Research & Strategy", desc: "Intent-based keyword mapping targeting commercial and transactional queries in your niche." },
      { title: "On-Page Optimization", desc: "Title tags, meta descriptions, header structure, content depth, and internal linking." },
      { title: "Content Marketing", desc: "SEO-optimized blog posts, guides, and landing pages that rank and convert." },
      { title: "Link Building", desc: "High-DA backlinks from relevant industry sites through outreach and digital PR." },
      { title: "Monthly Rank Tracking & Reports", desc: "Keyword ranking reports, organic traffic growth, and competitive benchmarking." },
    ],
    stats: [
      { value: "180%", label: "Avg. Traffic Growth (6mo)" },
      { value: "Top 5", label: "Average Keyword Ranking" },
      { value: "300+", label: "Sites Optimized" },
      { value: "12mo", label: "Avg. Client Retention" },
    ],
    deliverables: ["Technical audit report", "Keyword strategy document", "Monthly on-page optimizations", "Link building report", "Content production", "Monthly ranking report"],
    formType: "seo",
  },
];
