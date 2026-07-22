import ReactGA from 'react-ga4';

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const isProduction = import.meta.env.PROD;
let isInitialized = false;

export const initializeAnalytics = () => {
  if (!isProduction || !measurementId || isInitialized) {
    return;
  }

  ReactGA.initialize(measurementId, {
    gtagOptions: { send_page_view: false },
  });
  isInitialized = true;

  trackPageView();
};

export const trackPageView = () => {
  if (!isInitialized) {
    return;
  }

  ReactGA.send({
    hitType: 'pageview',
    page: `${window.location.pathname}${window.location.search}`,
    title: document.title,
  });
};

export const trackEvent = (eventName, parameters = {}) => {
  if (!isInitialized) {
    return;
  }

  ReactGA.event(eventName, parameters);
};