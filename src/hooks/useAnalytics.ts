import { useEffect } from 'react';

interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackEvent = ({ event, category, label, value }: AnalyticsEvent) => {
    // Google Analytics 4 tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
    
    // Console log for development
    console.log('Analytics Event:', { event, category, label, value });
  };

  const trackPageView = (path: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
      });
    }
  };

  const trackDonation = (amount: number, currency: string = 'INR') => {
    trackEvent({
      event: 'donation',
      category: 'ecommerce',
      label: 'donation_completed',
      value: amount,
    });

    // Enhanced ecommerce tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: Date.now().toString(),
        value: amount,
        currency: currency,
        items: [{
          item_id: 'donation',
          item_name: 'Charitable Donation',
          category: 'donation',
          quantity: 1,
          price: amount,
        }],
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackDonation,
  };
};