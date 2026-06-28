import React from "react";
import { 
  Target, BarChart3, MessageCircle, MessageSquare, 
  Smartphone, MapPin, Bot, CheckCircle2, Shield, Zap, TrendingUp, 
  Award, Globe2, Layers, Search
} from "lucide-react";

export type DigitalMarketingService = {
  slug: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  metrics: { label: string; value: string; prefix?: string; suffix?: string }[];
  features: { title: string; desc: string; icon: React.ReactNode }[];
};

export const digitalMarketingServices: DigitalMarketingService[] = [
  {
    slug: "meta-ads-management",
    title: "Meta Ads Management",
    icon: <Target className="w-8 h-8 text-blue-500" />,
    color: "from-blue-600 to-blue-400",
    shortDesc: "Facebook & Instagram Ads, Lead Generation, Retargeting, E-commerce Ads.",
    longDesc: "Dominate social media with highly targeted Meta Ads campaigns. We utilize advanced audience segmentation, dynamic creative optimization, and precise retargeting to turn scrolls into sales. Whether you're driving high-quality B2B leads or scaling D2C e-commerce revenue, our data-driven approach ensures maximum ROI.",
    benefits: [
      "Lower Cost Per Acquisition (CPA)",
      "Hyper-Targeted Lookalike Audiences",
      "Dynamic Retargeting for abandoned carts",
      "A/B Tested ad creatives for maximum CTR"
    ],
    metrics: [
      { label: "Avg. ROAS", value: "4.5", suffix: "x" },
      { label: "Lead Growth", value: "340", prefix: "+", suffix: "%" },
      { label: "CPA Reduction", value: "45", prefix: "-", suffix: "%" }
    ],
    features: [
      { title: "E-commerce Scaling", desc: "Catalogs and dynamic product ads to scale online sales.", icon: <Zap /> },
      { title: "Lead Generation", desc: "Instant forms and highly optimized landing page campaigns.", icon: <Target /> },
      { title: "Pixel & Tracking", desc: "Flawless conversion tracking via Meta Pixel and CAPI.", icon: <Shield /> }
    ]
  },
  {
    slug: "google-ads-services",
    title: "Google Ads Services",
    icon: <BarChart3 className="w-8 h-8 text-green-500" />,
    color: "from-green-600 to-green-400",
    shortDesc: "Search Ads, Display Ads, YouTube Ads, Shopping & PMax Campaigns.",
    longDesc: "Capture high-intent traffic the moment they search for your products or services. Our Google Ads experts build sophisticated Search, Display, YouTube, and Performance Max campaigns that monopolize the top of search engine results pages.",
    benefits: [
      "Capture high-intent search traffic",
      "Dominate local and national search results",
      "AI-driven bidding strategies",
      "Continuous negative keyword optimization"
    ],
    metrics: [
      { label: "Click-Through Rate", value: "12", suffix: "%" },
      { label: "Search Impression Share", value: "85", suffix: "%" },
      { label: "Conversion Rate Lift", value: "210", prefix: "+", suffix: "%" }
    ],
    features: [
      { title: "Search Campaigns", desc: "Intent-based targeting for immediate lead capture.", icon: <Search /> },
      { title: "Performance Max", desc: "AI-driven omnichannel campaigns across Google's network.", icon: <Globe2 /> },
      { title: "YouTube Ads", desc: "Pre-roll and in-stream video ads for massive brand awareness.", icon: <Award /> }
    ]
  },
  {
    slug: "whatsapp-marketing",
    title: "WhatsApp Marketing",
    icon: <MessageCircle className="w-8 h-8 text-emerald-500" />,
    color: "from-emerald-600 to-emerald-400",
    shortDesc: "Bulk Messaging, Automated Campaigns, API Integration, Chat Automation.",
    longDesc: "Leverage the world's most popular messaging app to engage your customers directly. With WhatsApp Business API integrations, we build automated chat flows, send personalized broadcast campaigns, and provide instant customer support.",
    benefits: [
      "98% average open rates",
      "Instant, direct customer engagement",
      "Automated transactional updates",
      "Rich media support (Images, Videos, PDFs)"
    ],
    metrics: [
      { label: "Avg. Open Rate", value: "98", suffix: "%" },
      { label: "Click-Through", value: "45", suffix: "%" },
      { label: "Response Time", value: "Instant" }
    ],
    features: [
      { title: "API Integration", desc: "Seamless integration with your CRM and backend systems.", icon: <Layers /> },
      { title: "Chatbots", desc: "24/7 automated replies and issue resolution.", icon: <Bot /> },
      { title: "Broadcasts", desc: "Personalized bulk messaging with high deliverability.", icon: <MessageCircle /> }
    ]
  },
  {
    slug: "rcs-business-messaging",
    title: "RCS Business Messaging",
    icon: <MessageSquare className="w-8 h-8 text-purple-500" />,
    color: "from-purple-600 to-purple-400",
    shortDesc: "Rich Media Messages, Interactive Buttons, Verified Sender, High Open Rates.",
    longDesc: "Upgrade your traditional SMS campaigns to Rich Communication Services (RCS). Send dynamic carousels, high-resolution images, and interactive buttons from a verified brand sender, providing an app-like experience right within the native messaging inbox.",
    benefits: [
      "Verified brand sender ID for trust",
      "App-like interactive carousels and buttons",
      "Detailed read receipts and analytics",
      "Higher engagement than standard SMS"
    ],
    metrics: [
      { label: "Engagement Lift", value: "3x" },
      { label: "Delivery Rate", value: "99.9", suffix: "%" },
      { label: "Brand Trust", value: "High" }
    ],
    features: [
      { title: "Rich Media", desc: "Send images, videos, and carousels directly.", icon: <Target /> },
      { title: "Interactive Buttons", desc: "Suggested replies and actions to boost conversions.", icon: <Zap /> },
      { title: "Verified Sender", desc: "Show your actual brand name and logo instead of a number.", icon: <Shield /> }
    ]
  },
  {
    slug: "otp-sms-solutions",
    title: "OTP & SMS Solutions",
    icon: <Smartphone className="w-8 h-8 text-yellow-500" />,
    color: "from-yellow-600 to-yellow-400",
    shortDesc: "Secure OTP Delivery, Transactional SMS, Fast Enterprise Network.",
    longDesc: "Ensure ultra-fast and reliable delivery of critical transactional messages. Our enterprise-grade SMS API infrastructure guarantees lightning-fast OTP deliveries, order updates, and two-factor authentication (2FA) messages globally.",
    benefits: [
      "Sub-5 second delivery times",
      "Intelligent global routing algorithms",
      "High-throughput enterprise APIs",
      "DND compliance and secure delivery"
    ],
    metrics: [
      { label: "Delivery Time", value: "<5", suffix: "s" },
      { label: "Uptime", value: "99.99", suffix: "%" },
      { label: "Global Reach", value: "190", suffix: "+" }
    ],
    features: [
      { title: "Secure 2FA", desc: "Robust two-factor authentication integrations.", icon: <Shield /> },
      { title: "Transactional Routes", desc: "Dedicated high-priority pipelines for critical alerts.", icon: <Zap /> },
      { title: "API Integration", desc: "RESTful APIs that drop into any tech stack in minutes.", icon: <Layers /> }
    ]
  },
  {
    slug: "google-business-profile",
    title: "Google Business Profile",
    icon: <MapPin className="w-8 h-8 text-red-500" />,
    color: "from-red-600 to-red-400",
    shortDesc: "Profile Setup, Local SEO, Reviews Management, Maps Visibility.",
    longDesc: "Dominate local searches and Google Maps with a fully optimized Google Business Profile. We manage your presence, generate authentic reviews, optimize for local SEO keywords, and ensure your business appears in the coveted 'Google Local Pack'.",
    benefits: [
      "Top ranking in local Google Maps searches",
      "Automated review generation & management",
      "Increased local footfall and inbound calls",
      "Regular profile updates and SEO posts"
    ],
    metrics: [
      { label: "Local Visibility", value: "400", prefix: "+", suffix: "%" },
      { label: "Inbound Calls", value: "2.5", suffix: "x" },
      { label: "Direction Requests", value: "3x" }
    ],
    features: [
      { title: "Local SEO", desc: "Keyword optimization for local search dominance.", icon: <Search /> },
      { title: "Review Management", desc: "Strategies to gather and respond to customer feedback.", icon: <MessageSquare /> },
      { title: "Profile Updates", desc: "Consistent posting to keep your business relevant.", icon: <TrendingUp /> }
    ]
  },
  {
    slug: "ai-calling-agents",
    title: "AI Calling Agents",
    icon: <Bot className="w-8 h-8 text-indigo-500" />,
    color: "from-indigo-600 to-indigo-400",
    shortDesc: "AI Voice Assistants, Appointment Booking, Lead Qualification, 24/7 Calls.",
    longDesc: "Revolutionize your customer support and outbound sales with conversational AI Voice Agents. Our human-sounding AI can handle inbound customer queries, qualify outbound leads, and schedule appointments directly into your calendar, 24/7 without taking a break.",
    benefits: [
      "Zero wait times for inbound callers",
      "Ability to handle thousands of concurrent calls",
      "Automated CRM updates post-call",
      "Human-like conversational intelligence"
    ],
    metrics: [
      { label: "Call Capacity", value: "10k", suffix: "/hr" },
      { label: "Cost Savings", value: "70", prefix: "-", suffix: "%" },
      { label: "Availability", value: "24/7" }
    ],
    features: [
      { title: "Lead Qualification", desc: "AI asks screening questions before transferring to humans.", icon: <Target /> },
      { title: "Appointment Setting", desc: "Direct integration with Calendly/Google Calendar.", icon: <MapPin /> },
      { title: "24/7 Support", desc: "Never miss a customer call, regardless of the time.", icon: <Bot /> }
    ]
  }
];
