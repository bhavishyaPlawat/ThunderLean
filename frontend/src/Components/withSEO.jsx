import React from 'react';
import SEOHead from './SEOHead';
import { getSEOConfig } from '../utils/seoConfig';

// Higher-order component to add SEO to any component
const withSEO = (WrappedComponent, pageName) => {
  return function SEOEnhancedComponent(props) {
    const seoData = getSEOConfig(pageName);
    
    return (
      <>
        <SEOHead {...seoData} />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withSEO;
