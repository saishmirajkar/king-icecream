export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[]; style?: "bullet" | "number" }
  | { type: "callout"; label: string; text: string }
  | { type: "image"; src: string; caption?: string; alt: string }
  | { type: "embed"; url: string; label: string };

export type BlogPost = {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  metaDescription: string;
  coverImage: string;
  coverAlt: string;
  category: "Story" | "News" | "Events" | "Company" | "Product";
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  content: ContentBlock[];
  sources?: { title: string; url: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "king-ice-cream-annotsav-2026",
    title: "Annotsav 2026: Serving King-Sized Moments",
    subtitle: "A festival crowd, a golden scoop, and a thank-you note for the love.",
    excerpt:
      "We showed up at Annotsav 2026 with trays of our freshest favourites and left with memories of a crowd that just couldn't get enough.",
    metaDescription:
      "King Ice Cream at Annotsav 2026 — recap of a sweet festival outing, the flavours we served, and the response from a crowd that made the day king-sized.",
    coverImage:
      "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=1600&q=80",
    coverAlt: "Festive crowd celebrating with ice cream",
    category: "Events",
    author: "The King Ice Cream Team",
    date: "2026-03-02",
    readTime: "3 min read",
    tags: ["events", "festivals", "community"],
    content: [
      {
        type: "paragraph",
        text: "There is a particular kind of joy that only shows up at a festival — unhurried, generous, easily pleased — and it is exactly the kind of joy King Ice Cream was built for. Annotsav 2026 handed us that joy in full measure.",
      },
      {
        type: "paragraph",
        text: "For two days we stood behind our stall with freezers full of matka kulfi, chocobars, and our creamiest cups, and watched something remarkable: the same guests came back, a second time, a third time, sometimes with a friend in tow who just had to try the one they had been raving about.",
      },
      {
        type: "heading",
        level: 2,
        text: "What the crowd told us",
      },
      {
        type: "paragraph",
        text: "Festival food stalls are the most honest focus group an ice cream company can ask for. You either have a queue or you do not. We had a queue.",
      },
      {
        type: "quote",
        text: "Annotsav 2026, you were nothing short of King-sized. Thank you for the love. Same energy. Same sweetness. See you next year.",
        attribution: "King Ice Cream",
      },
      {
        type: "heading",
        level: 2,
        text: "Why we show up at events like this",
      },
      {
        type: "paragraph",
        text: "Retail shelves and delivery apps tell us how we are doing in numbers. Festivals tell us something else — whether people actually enjoy the product when they have a choice of a hundred other things. Annotsav was full of those choices, and our guests kept choosing us.",
      },
      {
        type: "paragraph",
        text: "That is the feedback that matters most, and it is the reason our team will absolutely be back next year with even more flavours and a bigger stall.",
      },
      {
        type: "embed",
        url: "https://www.instagram.com/reel/DTvMp96EpBm/",
        label: "Watch the Annotsav 2026 recap on Instagram",
      },
    ],
  },
  {
    slug: "king-ice-cream-vijayavani-property-expo-2026-hubballi",
    title: "King Ice Cream at Vijayavani Property Expo 2026, Hubballi",
    subtitle: "A sweet cameo at one of north Karnataka's biggest real-estate events.",
    excerpt:
      "We took King Ice Cream to the Vijayavani Property Expo in Hubballi and turned a property fair into something a little more celebratory.",
    metaDescription:
      "King Ice Cream was part of Vijayavani Property Expo 2026 in Hubballi, serving visitors sweet moments across the three-day event. Recap, photos and reel.",
    coverImage:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1600&q=80",
    coverAlt: "Exhibition hall and event signage",
    category: "Events",
    author: "The King Ice Cream Team",
    date: "2026-02-28",
    readTime: "3 min read",
    tags: ["events", "hubballi", "expo"],
    content: [
      {
        type: "paragraph",
        text: "Property fairs are, by nature, serious places. People arrive with floor plans on their phones, payment calculators in their heads, and a list of questions longer than their arms. And then a scoop of ice cream walks in — and the whole mood shifts.",
      },
      {
        type: "paragraph",
        text: "That was the brief for the Vijayavani Property Expo 2026 in Hubballi. A scoop of something cold, creamy and unmistakably Belagavi, handed over with a smile. It turned conversations from square-footage to \"which flavour next?\" — and that alone made it worth every hour we were there.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why Hubballi matters to us",
      },
      {
        type: "paragraph",
        text: "Hubballi-Dharwad is one of King Ice Cream's strongest markets outside Belagavi. The twin cities account for over 150 of our retail outlets, and we have flagship presence across both. Every time we get a chance to meet our Hubballi guests face to face, we take it.",
      },
      {
        type: "callout",
        label: "In Partnership With",
        text: "Vijayavani Property Expo is organised by Vijayavani and VRL — long-standing collaborators within the Belagavi and Hubballi business ecosystem. Being part of their flagship expo meant a lot to us.",
      },
      {
        type: "heading",
        level: 2,
        text: "Thank you, Hubballi",
      },
      {
        type: "paragraph",
        text: "We came to the expo to serve, and we left with a lot of goodwill in return. Thank you to everyone who stopped by our counter — and to those who came back for a second scoop, our absolute favourites.",
      },
      {
        type: "embed",
        url: "https://www.instagram.com/reel/DXQyEwmkW_4/",
        label: "Watch the expo recap on Instagram",
      },
    ],
  },
  {
    slug: "from-kwality-walls-to-king-ice-cream",
    title: "From Kwality Walls to King: A Belagavi Dairy's Full-Circle Story",
    subtitle:
      "The only Indian dairy that built a brand, sold it to Unilever, and came back seven years later with a crown.",
    excerpt:
      "In 2018, Vijaykant Dairy sold its Adityaa Milk ice-cream business to Hindustan Unilever. In August 2024, it came back under a new name — King Ice Cream.",
    metaDescription:
      "The remarkable story of how Vijaykant Dairy manufactured for Kwality Walls, sold its ice cream brand to Hindustan Unilever in 2018, and relaunched as King Ice Cream in August 2024.",
    coverImage:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1600&q=80",
    coverAlt: "Artisanal ice cream being prepared",
    category: "Story",
    author: "The King Ice Cream Team",
    date: "2026-02-14",
    readTime: "7 min read",
    tags: ["history", "hul", "brand"],
    content: [
      {
        type: "paragraph",
        text: "Most brand stories follow a predictable arc: a founder, a product, a market, a success. King Ice Cream's story does not. It begins in a 12-acre dairy on the banks of the Malaprabha river in Belagavi, travels through a boardroom in Mumbai where Hindustan Unilever agreed to buy one of our brands, and comes back — seven years later — to the very product category we had once exited.",
      },
      {
        type: "heading",
        level: 2,
        text: "2004 – 2018: Building Adityaa, manufacturing for the giants",
      },
      {
        type: "paragraph",
        text: "Vijaykant Dairy & Food Products Ltd. was incorporated in September 2004 and began commercial operations around 2006 with 5,000 litres of milk per day. Over the next decade, the company grew its Adityaa Milk brand across Karnataka, Goa, Kerala and Maharashtra, and — crucially — established itself as a trusted contract manufacturer for some of India's biggest FMCG players. In early 2018, it was manufacturing the Walls sandwich for Hindustan Unilever.",
      },
      {
        type: "heading",
        level: 2,
        text: "August 2018: The Unilever deal",
      },
      {
        type: "paragraph",
        text: "On 6 August 2018, Hindustan Unilever announced it was acquiring the Adityaa Milk ice-cream and frozen-desserts business from Vijaykant Dairy. The deal included the brand and the front-end distribution network. Industry estimates placed the transaction at around Rs 160–180 crore. It was a rare Indian exit: a regional dairy company selling an ice-cream business to the country's largest FMCG player.",
      },
      {
        type: "callout",
        label: "The 2018 Deal",
        text: "HUL acquired Adityaa Milk's ice cream and frozen desserts business, including the brand and distribution. Vijaykant retained its dairy operations and continued contract-manufacturing for HUL, including the Walls sandwich.",
      },
      {
        type: "heading",
        level: 2,
        text: "2018 – 2024: The quiet years",
      },
      {
        type: "paragraph",
        text: "What happens when you sell your most successful brand? In our case, we did not go quiet — we went back to what we were best at. The Belagavi plant continued to produce ice cream for HUL under contract, while Adityaa Milk carried on as a household name for milk, curd, paneer and ghee across north Karnataka and Goa. Revenue held, farmer relationships deepened, and the ice-cream craft was kept alive inside the factory even as the brand on the packaging said something else.",
      },
      {
        type: "heading",
        level: 2,
        text: "August 2024: The return, as King",
      },
      {
        type: "paragraph",
        text: "In August 2024, Vijaykant Dairy re-entered the ice cream business under its own brand for the first time since the Unilever exit. The new name — King Ice Cream — carried the same dairy standards that had once satisfied HUL, now applied exclusively to our own product. By the end of FY25, revenue had climbed to Rs 304 crore, PBILDT margin had more than doubled year-on-year, and King Ice Cream was already on the shelves of 15,000+ outlets across four states.",
      },
      {
        type: "paragraph",
        text: "That is the short version of a long story. The longer version is still being written — one scoop, one store, one state at a time.",
      },
    ],
    sources: [
      {
        title: "Hindustan Unilever acquires Adityaa Milk — Just-Food, Aug 2018",
        url: "https://www.just-food.com/news/unilever-buys-indian-ice-cream-business-adityaa-milk/",
      },
      {
        title:
          "CARE Ratings — Vijaykant Dairy Press Release, Jul 2025 (includes King Ice Cream launch note)",
        url: "https://www.careratings.com/upload/CompanyFiles/PR/202507130721_Vijaykant_Dairy_and_Food_Products_Limited.pdf",
      },
      {
        title: "Outlook Business — Adding Another Scoop",
        url: "https://www.outlookbusiness.com/perspective/adding-another-scoop-4603",
      },
    ],
  },
  {
    slug: "rs-304-crore-fy25-vijaykant-dairy",
    title: "Rs 304 Crore and Climbing: Inside Vijaykant Dairy's FY25 Story",
    subtitle: "The financial turnaround behind the King Ice Cream relaunch.",
    excerpt:
      "Revenue of Rs 304 crore, PBILDT margin more than doubling, gearing at 0.26x — what the numbers say about where Vijaykant Dairy is heading.",
    metaDescription:
      "Vijaykant Dairy's FY25 revenue reached approximately Rs 304 crore, with PBILDT margin rising from 2.25% to 4.83%. An analysis of the numbers behind King Ice Cream.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
    coverAlt: "Financial charts and dairy industry growth",
    category: "Company",
    author: "The King Ice Cream Team",
    date: "2026-01-22",
    readTime: "6 min read",
    tags: ["finance", "growth", "company"],
    content: [
      {
        type: "paragraph",
        text: "Good ice cream is built on good dairy. Good dairy is built on good books. This is a quick look at the numbers behind Vijaykant Dairy's most ambitious year yet — the one that made King Ice Cream possible.",
      },
      {
        type: "heading",
        level: 2,
        text: "The headline: Rs 304 crore in FY25",
      },
      {
        type: "paragraph",
        text: "Vijaykant Dairy & Food Products Ltd. closed FY25 with revenue of approximately Rs 304 crore, according to the July 2025 credit rating action by CARE Ratings. That represents a meaningful step up from previous years, and — more importantly — it came alongside a sharp improvement in profitability.",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Revenue: ~Rs 304 crore (FY25)",
          "PBILDT margin: 4.83% (up from 2.25% in FY24)",
          "Overall gearing: 0.26x — comfortably low for a capital-intensive dairy",
          "Segment mix: Milk ~53%, Ice Cream ~14%, Curd ~11%, Paneer ~6%, others",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "What the mix tells us",
      },
      {
        type: "paragraph",
        text: "Milk still drives over half the business, which is exactly how a dairy should look. But ice cream at 14% — in the first full year of a brand that launched in August 2024 — is the number to watch. It shows the new category coming online without cannibalising the core.",
      },
      {
        type: "callout",
        label: "Why low gearing matters",
        text: "At 0.26x, the company has headroom to invest in the ice-cream line, cold-chain expansion and new territories without stretching the balance sheet. That is the financial foundation for the next phase of growth.",
      },
      {
        type: "heading",
        level: 2,
        text: "What the numbers do not tell you",
      },
      {
        type: "paragraph",
        text: "Financial statements capture revenue, margin and leverage — they do not capture 40,000 farming families, 1,500 villages, or a 12-acre plant in Bailhongal. But they do validate something important: the model is working. Belagavi's dairy belt, a HUL-grade manufacturing operation, and a premium own-brand can all live under the same roof profitably.",
      },
    ],
    sources: [
      {
        title: "CARE Ratings — Vijaykant Dairy Press Release, 13 Jul 2025",
        url: "https://www.careratings.com/upload/CompanyFiles/PR/202507130721_Vijaykant_Dairy_and_Food_Products_Limited.pdf",
      },
    ],
  },
  {
    slug: "farmer-network-behind-king-ice-cream",
    title: "40,000 Families, 1,500 Villages: The Farmer Network Behind Every Scoop",
    subtitle: "Why our supply chain starts in a cowshed at 5 a.m.",
    excerpt:
      "Every scoop of King Ice Cream traces back to a farmer network of 40,000+ families across 1,500+ villages, feeding into six chilling centres.",
    metaDescription:
      "Inside King Ice Cream's farmer-first supply chain — 40,000 families, 1,500 villages, six chilling centres and 2 lakh litres of milk procured daily in Karnataka, Goa and Maharashtra.",
    coverImage:
      "https://images.unsplash.com/photo-1595702419447-e9e62a1e3f4d?w=1600&q=80",
    coverAlt: "Dairy farmer in a village",
    category: "Story",
    author: "The King Ice Cream Team",
    date: "2026-01-10",
    readTime: "5 min read",
    tags: ["farmers", "dairy", "supply-chain"],
    content: [
      {
        type: "paragraph",
        text: "Ask most ice cream brands where their milk comes from and you will get a shrug and a supplier name. Ask us, and we can show you a map.",
      },
      {
        type: "heading",
        level: 2,
        text: "The numbers",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "40,000+ farming families in our procurement network",
          "1,500+ villages across Karnataka, Maharashtra, Goa and Kerala",
          "Six chilling centres bringing milk from field to factory",
          "~2 lakh litres of milk procured every single day",
          "427 lakh litres per year — our installed milk-handling capacity",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Why it is built this way",
      },
      {
        type: "paragraph",
        text: "A dairy is only as honest as its procurement. Every shortcut an ice cream manufacturer can take happens upstream — the dilution, the substitution of vegetable fat for milk fat, the palm oil masquerading as cream. We took a different route: own the collection, own the chilling, and pay the farmer fairly and on time.",
      },
      {
        type: "quote",
        text: "The same discipline that satisfied Hindustan Unilever now goes exclusively into King Ice Cream.",
        attribution: "Our promise",
      },
      {
        type: "heading",
        level: 2,
        text: "What this means for you",
      },
      {
        type: "paragraph",
        text: "When you bite into a matka kulfi or scoop out a spoonful of butterscotch, that is real milk you are tasting — tracked, tested, and cold-chained from a village cowshed to a 12-acre facility in Bailhongal. No palm oil. No vegetable fat. Just the kind of dairy that took us twenty years to build.",
      },
    ],
    sources: [
      {
        title: "Vijaykant Dairy — Company Profile (IndiaMART)",
        url: "https://www.indiamart.com/vijaykant-dairy-food/aboutus.html",
      },
      {
        title: "India's Small Giants — Shivkant Sidnal profile",
        url: "https://www.indiassmallgiants.org/Vijaykant.html",
      },
    ],
  },
  {
    slug: "why-belagavi-malaprabha-dairy-belt",
    title: "Why Belagavi? The Malaprabha Dairy Belt That Shaped an Industry",
    subtitle:
      "Geography, cooperatives, and the reason India's biggest FMCG brand came knocking.",
    excerpt:
      "Belagavi is not an accidental dairy town. The Malaprabha basin, the cooperative movement and the milk economy of north Karnataka are all part of the same story.",
    metaDescription:
      "Why Belagavi and the Malaprabha river basin is one of India's most important dairy geographies — and how it shaped both Adityaa Milk and King Ice Cream.",
    coverImage:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80",
    coverAlt: "North Karnataka countryside",
    category: "Story",
    author: "The King Ice Cream Team",
    date: "2025-12-18",
    readTime: "6 min read",
    tags: ["belagavi", "heritage", "geography"],
    content: [
      {
        type: "paragraph",
        text: "Belagavi does not get written about the way Anand or Palamaner do. But Karnataka's northern district quietly feeds some of the biggest ice-cream brands in the country, and the reasons for that are older than any one company.",
      },
      {
        type: "heading",
        level: 2,
        text: "The river first, then the cows",
      },
      {
        type: "paragraph",
        text: "The Malaprabha river runs through Bailhongal taluka, where our 12-acre plant sits. The basin is one of the most fertile agricultural stretches in the state — which means fodder, which means milk, which means dairies. Our plant did not choose its location by accident; it was built where the cows already were.",
      },
      {
        type: "heading",
        level: 2,
        text: "The cooperative heritage",
      },
      {
        type: "paragraph",
        text: "Karnataka's dairy story is inseparable from its cooperative movement — KMF, Nandini, and the village-level collection societies that made milk a household income source long before 'supply chain' was a phrase. That legacy laid the groundwork for private dairies like ours to come in and build deeper networks: 1,500 villages, six chilling centres, and daily collection that runs year-round.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why HUL came to Belagavi",
      },
      {
        type: "paragraph",
        text: "When Hindustan Unilever needed to manufacture its Walls sandwich at volume, it came to our Belagavi facility — and eventually bought our Adityaa Milk ice cream business in 2018. That was not a logistics accident. It was the payoff of two decades of being in a dairy belt that actually works.",
      },
      {
        type: "paragraph",
        text: "Today, when you pick up a King Ice Cream, you are tasting Belagavi. The grass, the rivers, the farming families, the cold chain — all of it, compressed into a scoop.",
      },
    ],
    sources: [
      {
        title: "Adityaa Milk — About Us",
        url: "https://www.adityaamilk.com/about-us.php",
      },
      {
        title: "AllAboutBelgaum — Scooping Out Success",
        url: "https://allaboutbelgaum.com/business/scooping-out-success-the-fascinating-story-of-aditya-ice-cream/",
      },
    ],
  },
  {
    slug: "sweden-italy-belagavi-world-class-dairy",
    title: "Sweden, Italy, Belagavi: Engineering a World-Class Dairy",
    subtitle: "The imported machinery, the Italian flavour partnership, and the certifications that back up every claim on the pack.",
    excerpt:
      "Our plant runs on Swedish and Italian dairy engineering, HACCP-audited processes, ISO 22000 certification and a flavour partnership with PreGel.",
    metaDescription:
      "The technology and certifications that power King Ice Cream — Swedish and Italian dairy machinery, ISO 22000, HACCP, FSSAI licensing, and a PreGel flavour partnership.",
    coverImage:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1600&q=80",
    coverAlt: "Modern dairy manufacturing line",
    category: "Company",
    author: "The King Ice Cream Team",
    date: "2025-11-28",
    readTime: "5 min read",
    tags: ["manufacturing", "quality", "certifications"],
    content: [
      {
        type: "paragraph",
        text: "A dairy's quality is the sum of its weakest link — the one under-maintained machine, the one missing test, the one corner cut. We have spent twenty years trying not to have a weakest link.",
      },
      {
        type: "heading",
        level: 2,
        text: "The machines",
      },
      {
        type: "paragraph",
        text: "Our primary processing lines — from pasteurisation to homogenisation to the ice-cream continuous freezers — are imported from Sweden and Italy. These are the same generations of machines that run the world's premium dairy plants, and they form the backbone of our 225-lakh-litres-per-year ice cream capacity.",
      },
      {
        type: "heading",
        level: 2,
        text: "The flavours",
      },
      {
        type: "paragraph",
        text: "Our technical partnership with PreGel, Italy — one of the world's leading ice-cream and gelato ingredient specialists — gives us access to flavour systems and R&D that most domestic dairies cannot match. That partnership pre-dates even the HUL era and continues today.",
      },
      {
        type: "heading",
        level: 2,
        text: "The certifications",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "FSSAI Licence No. 10013043000577",
          "ISO 22000:2005 — Food Safety Management System",
          "HACCP implementation across production",
          "21-stage milk adulteration testing at the intake point",
        ],
      },
      {
        type: "callout",
        label: "What this means on the shelf",
        text: "When we say King Ice Cream is made to HUL-grade standards, it is not marketing language. It is the same plant, the same audits, and in many cases the same SOPs that HUL relied on when we manufactured the Walls sandwich for them.",
      },
    ],
    sources: [
      {
        title: "Adityaa Milk — About Us (certifications and machinery)",
        url: "https://www.adityaamilk.com/about-us.php",
      },
      {
        title: "CARE Ratings — Vijaykant Dairy PR (capacity figures)",
        url: "https://www.careratings.com/upload/CompanyFiles/PR/202507130721_Vijaykant_Dairy_and_Food_Products_Limited.pdf",
      },
    ],
  },
  {
    slug: "great-indian-ice-cream-contest-medals",
    title: "Gold & Silver at the Great Indian Ice Cream Contest",
    subtitle: "How a Belagavi plant ended up on India's ice-cream medal podium.",
    excerpt:
      "DANISCO's Great Indian Ice Cream Contest judges on technical excellence — and we came away with both gold and silver in the categories we entered.",
    metaDescription:
      "Vijaykant Dairy's Adityaa Milk won Gold for Premium Ice Cream and Silver for Standard Vanilla at DANISCO's Great Indian Ice Cream Contest Season 4. The technical legacy behind King Ice Cream.",
    coverImage:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1600&q=80",
    coverAlt: "Ice cream scoops on display",
    category: "News",
    author: "The King Ice Cream Team",
    date: "2025-11-12",
    readTime: "4 min read",
    tags: ["awards", "quality"],
    content: [
      {
        type: "paragraph",
        text: "Ice cream contests are not about who sells the most; they are about who gets the craft right. The Great Indian Ice Cream Contest, organised by DANISCO (Denmark), is one of the most technically rigorous competitions in the Indian dairy calendar — judged on parameters most consumers never see, from overrun to texture to flavour stability.",
      },
      {
        type: "heading",
        level: 2,
        text: "The medals",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Gold — Premium Ice Cream category",
          "Silver — Standard Vanilla category",
          "Event: The Great Indian Ice Cream Contest, Season 4",
          "Awarded to: Adityaa Milk (the predecessor brand from the same Belagavi plant)",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Why it matters for King Ice Cream",
      },
      {
        type: "paragraph",
        text: "The medals were won by Adityaa Milk, the ice-cream brand we sold to HUL in 2018. But the plant that made them, the team that ran them, and the craft that earned them — all of it is still in Belagavi, still in our hands, and now goes exclusively into King Ice Cream.",
      },
      {
        type: "callout",
        label: "Quiet Confidence",
        text: "We do not put medal stickers on our packs. But every vanilla cup that leaves our plant is made on the same line that once took Silver at a DANISCO-judged national contest. We thought that was worth mentioning.",
      },
    ],
    sources: [
      {
        title: "Adityaa Milk — About Us (awards section)",
        url: "https://www.adityaamilk.com/about-us.php",
      },
      {
        title: "India's Small Giants — Shivkant Sidnal profile",
        url: "https://www.indiassmallgiants.org/Vijaykant.html",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
