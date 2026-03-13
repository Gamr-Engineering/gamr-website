// Simple mock analytics utility for browser tracking
export const initAnalytics = () => {
    if (typeof window !== "undefined") {
      (window as any).trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
        console.log(`[Analytics] Event: ${eventName}`, properties);
        // Here you would normally push to Google Analytics, PostHog, or Plausible
        // e.g., mixpanel.track(eventName, properties);
      };
    }
  };
  
  export const trackView = (path: string) => {
    if (typeof window !== "undefined" && (window as any).trackEvent) {
      (window as any).trackEvent("page_view", { path });
    }
  };
  
  export const trackArticleScroll = (slug: string, depth: number) => {
    if (typeof window !== "undefined" && (window as any).trackEvent) {
      (window as any).trackEvent("scroll_depth", { article: slug, depth });
    }
  };
