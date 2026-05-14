"use client";

import Script from "next/script";
import { useEffect } from "react";
import { devLog } from "@/lib/logger";

const GoogleAnalytics = () => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (measurementId) {
      devLog("🎯 Google Analytics initialized with ID:", measurementId);
      devLog(
        "📊 Check if GA is working: window.dataLayer",
        (window as Window & { dataLayer?: unknown[] }).dataLayer,
      );
    }
  }, [measurementId]);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        onLoad={() => {
          devLog("✅ Google Analytics script loaded successfully!");
        }}
        onError={() => {
          // Silent fail - don't log errors even in development
          // This prevents Next.js error overlay from showing
          // Ad blockers will block GA, and that's expected behavior
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
