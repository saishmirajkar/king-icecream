import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomeStack } from '@/components/home/HomeStack';
import KingStoreHero from '@/components/home/KingStoreHero';

export const metadata: Metadata = {
  title: 'King Ice Cream | Premium Ice Cream from Belagavi — Taste of Royalty',
  description: 'King Ice Cream — India\'s premium ice cream brand by Vijaykant Dairy, Belagavi. Made from 100% pure milk with zero palm oil. Cones, Cups, Kulfi, Sticks, Sundaes & Family Packs across 15,000+ outlets in Karnataka, Goa, Maharashtra & Kerala.',
  alternates: {
    canonical: 'https://www.kingicecream.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.kingicecream.com/#organization',
      name: 'King Ice Cream',
      legalName: 'Vijaykant Dairy & Food Products Ltd.',
      url: 'https://www.kingicecream.com',
      logo: 'https://www.kingicecream.com/images/logos/king logo.png',
      description: 'Premium ice cream brand from Belagavi, Karnataka. Made from 100% pure milk with no palm oil.',
      foundingDate: '2024-08',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Neginhal Village, Bailhongal Taluka',
        addressLocality: 'Belagavi',
        addressRegion: 'Karnataka',
        postalCode: '591102',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9900255556',
        contactType: 'customer service',
        email: 'info@kingicecream.com',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Kannada'],
      },
      sameAs: [
        'https://www.instagram.com/kingicecream.india/',
      ],
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '500+',
      },
      areaServed: [
        { '@type': 'State', name: 'Karnataka' },
        { '@type': 'State', name: 'Goa' },
        { '@type': 'State', name: 'Maharashtra' },
        { '@type': 'State', name: 'Kerala' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.kingicecream.com/#website',
      url: 'https://www.kingicecream.com',
      name: 'King Ice Cream',
      publisher: { '@id': 'https://www.kingicecream.com/#organization' },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.kingicecream.com/#webpage',
      url: 'https://www.kingicecream.com',
      name: 'King Ice Cream | Taste of Royalty',
      isPartOf: { '@id': 'https://www.kingicecream.com/#website' },
      about: { '@id': 'https://www.kingicecream.com/#organization' },
      description: 'Premium ice cream made from 100% pure milk by Vijaykant Dairy, Belagavi. Available across 15,000+ outlets.',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.kingicecream.com/#localbusiness',
      name: 'King Ice Cream',
      image: 'https://www.kingicecream.com/images/logos/king logo.png',
      priceRange: '$$',
      servesCuisine: 'Ice Cream',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Neginhal Village, Bailhongal Taluka',
        addressLocality: 'Belagavi',
        addressRegion: 'Karnataka',
        postalCode: '591102',
        addressCountry: 'IN',
      },
      telephone: '+91-9900255556',
      url: 'https://www.kingicecream.com',
      openingHours: 'Mo-Sa 09:00-19:00',
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-background">
        <Header />
        <main>
          <div className="king-store-intro-shell">
            <KingStoreHero
              primaryCta={{ label: 'Explore Flavours', href: '#discover' }}
              secondaryCta={{ label: 'Find a Store', href: '/locate' }}
              className="king-store-intro"
              style={{ height: 'calc(100dvh - var(--king-intro-nav-height))' }}
            />
          </div>
          <HomeStack />
        </main>
        <Footer transitionFrom="#ffcf4f" />
      </div>
    </>
  );
}
