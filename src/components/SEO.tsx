import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Active For You Charitable Trust - Empowering Communities',
  description = 'Active For You Charitable Trust is dedicated to empowering communities through healthcare, education, women\'s empowerment, and environmental sustainability programs.',
  keywords = 'charity, NGO, women empowerment, healthcare, education, environment, Gujarat, India',
  image = 'https://images.pexels.com/photos/6995213/pexels-photo-6995213.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
  url = window.location.href
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Active For You Charitable Trust" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;