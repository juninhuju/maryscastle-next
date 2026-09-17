import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = 'https://livroocastelodasmarias.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'O Castelo das Marias | Romance Sobrenatural de Junior Cristovam',
    template: '%s | O Castelo das Marias',
  },
  description:
    'Mergulhe no drama sobrenatural de O Castelo das Marias, de Junior Cristovam. A traição de uma esposa, o ódio, a vingança e os quatro reinos do além.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'O Castelo das Marias',
    images: [
      {
        url: '/livro.webp',
        width: 1200,
        height: 630,
        alt: 'Capa de O Castelo das Marias',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'O Castelo das Marias',
    headline: 'O Castelo das Marias | Romance Sobrenatural de Junior Cristovam',
    description:
      'Mergulhe no drama sobrenatural de O Castelo das Marias, de Junior Cristovam. A traição de uma esposa, o ódio, a vingança e os quatro reinos do além.',
    url: siteUrl,
    image: `${siteUrl}/livro.webp`,
    author: {
      '@type': 'Person',
      name: 'Junior Cristovam',
    },
    inLanguage: 'pt-BR',
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>
        <div className="page-container">
          <Header />
          <main id="main-content" tabIndex={-1} className="content-wrap">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}// ... existing imports and code ...