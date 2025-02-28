"use client";

import { useState, useEffect, memo, useRef } from "react";
import MetallicPaint, { parseLogoImage } from "@/components/ui/metallicpaint";
import { useInView } from "framer-motion";

const AnimatedLogo = ({ className, size = 50 }: { className?: string; size?: number }) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const logoLoadedRef = useRef(false);

  useEffect(() => {
    // Only load the logo if it's in view or hasn't been loaded yet
    if ((isInView || logoLoadedRef.current) && !imageData) {
      loadDefaultImage();
    }
    
    async function loadDefaultImage() {
      try {
        // Use a cached version of the logo if possible
        const cachedLogo = sessionStorage.getItem("logo-cache");
        if (cachedLogo) {
          const parsedData = JSON.parse(cachedLogo);
          setImageData(new ImageData(
            new Uint8ClampedArray(parsedData.data), 
            parsedData.width, 
            parsedData.height
          ));
          logoLoadedRef.current = true;
          return;
        }
        
        const response = await fetch("/logo.svg");
        const blob = await response.blob();
        const file = new File([blob], "logo.svg", { type: "image/svg+xml" });
        const { imageData } = await parseLogoImage(file);
        setImageData(imageData);
        logoLoadedRef.current = true;
        
        // Cache the logo data in sessionStorage for faster reuse
        try {
          const serialized = JSON.stringify({
            data: Array.from(imageData.data),
            width: imageData.width,
            height: imageData.height
          });
          sessionStorage.setItem("logo-cache", serialized);
        } catch (err) {
          console.log("Could not cache logo:", err);
        }
      } catch (err) {
        console.error("Error loading logo:", err);
      }
    }
  }, [isInView, imageData]);

  if (!imageData) {
    // Return a lightweight placeholder with the same dimensions
    return <div ref={ref} className={className} style={{ width: `${size}px`, height: `${size}px` }} />;
  }

  return (
    <div ref={ref} className={className} style={{ width: `${size}px`, height: `${size}px` }}>
      <MetallicPaint
        imageData={imageData}
        params={{
          edge: 1,
          patternBlur: 0.005,
          patternScale: 2, 
          refraction: 0.015,
          speed: 0.3,
          liquid: 0.07
        }}
      />
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(AnimatedLogo);
