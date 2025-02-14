'use client';

import { HowItWorksSection } from '../sections/how-it-works';
import { AITechnologySection } from '../sections/ai-technology';
import { PrivacySection } from '../sections/privacy';
import { FeaturesSection } from '../sections/features';
import { SecurityProtectionSection } from '../sections/securityProtection';
import { GlowyDivider } from '../ui/GlowyDivider';
import { CallToAction } from './CallToAction';
import React from 'react';

// Define section colors
const sectionColors = {
  'section-how-it-works': 'from-violet-500 to-blue-500',
  'section-ai': 'from-blue-500 to-cyan-500',
  'section-privacy': 'from-cyan-500 to-teal-500',
  'section-security-protection': 'from-emerald-500 to-amber-500',
  'section-features': 'from-amber-500 to-orange-500',
} as const;

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
    id: 'section-security-protection',
    component: SecurityProtectionSection,
  },
  {
    id: 'section-features',
    component: FeaturesSection,
  }
];

export const InfoSections = () => {
  return (
    <div className="relative bg-black text-gray-300">
      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          <section
            id={section.id}
            className="min-h-screen flex items-center py-8"
            style={{
              '--section-gradient': `bg-gradient-to-br ${sectionColors[section.id as keyof typeof sectionColors]}`
            } as any}
          >
            <div className="container mx-auto px-4">
              <section.component />
            </div>
          </section>
          {index < sections.length - 1 && (
            <div className="py-4">
              <GlowyDivider />
            </div>
          )}
        </React.Fragment>
      ))}
      <CallToAction />
    </div>
  );
};
