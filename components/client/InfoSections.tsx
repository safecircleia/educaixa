'use client';

import { HowItWorksSection } from '../sections/how-it-works';
import { AITechnologySection } from '../sections/ai-technology';
import { PrivacySection } from '../sections/privacy';
import { ProtectionSection } from '../sections/protection';
import { FeaturesSection } from '../sections/features';
import { SecuritySection } from '../sections/security';
import { GlowyDivider } from '../ui/GlowyDivider';
import { CallToAction } from './CallToAction'; // Updated import path
import React from 'react';

const sections = [
  {
    id: 'section-how-it-works',
    component: HowItWorksSection,
  },
  {
    id: 'section-ai',
    component: AITechnologySection,
  },
  {
    id: 'section-privacy',
    component: PrivacySection,
  },
  {
    id: 'section-protection',
    component: ProtectionSection,
  },
  {
    id: 'section-features',
    component: FeaturesSection,
  },
  {
    id: 'section-security',
    component: SecuritySection,
  }
];

export const InfoSections = () => {
  return (
    <div className="relative bg-black text-gray-300">
      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          <section
            id={section.id}
            className="min-h-screen flex items-center py-8" // Reduced padding from py-16 to py-8
          >
            <div className="container mx-auto px-4">
              <section.component />
            </div>
          </section>
          {index < sections.length - 1 && (
            <div className="py-4"> {/* Reduced spacing from py-8 to py-4 */}
              <GlowyDivider />
            </div>
          )}
        </React.Fragment>
      ))}
      <CallToAction />
    </div>
  );
};
