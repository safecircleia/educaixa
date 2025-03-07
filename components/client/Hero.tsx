"use client";

import { motion, LayoutGroup, useReducedMotion } from "framer-motion";
import { AnimatedCounter } from "./Counter";
import { WaitlistButton } from "../waitlist/WaitlistButton";
import { useRef, useState, useMemo, useEffect } from "react";
import { Circle, ChevronDown, Beaker } from "lucide-react";
import RotatingText from "../ui/RotatingText";
import ShinyText from "../ui/shiny-text";
import { cn } from "@/lib/utils";
import StarBorder from "@/components/ui/starborder";
import DemoWarningDialog from "./DemoWarningDialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import styles from "@/styles/textGradient.module.css";
import { useLanguage } from "@/context/LanguageContext";

const ElegantShape = ({
	className,
	delay = 0,
	width = 400,
	height = 100,
	rotate = 0,
	gradient = "from-white/[0.12]",
}: {
	className?: string;
	delay?: number;
	width?: number;
	height?: number;
	rotate?: number;
	gradient?: string;
}) => {
	// Use reduced motion hook for accessibility
	const prefersReducedMotion = useReducedMotion();
	
	// Memoize the animation variants to prevent recalculations
	const initialProps = useMemo(() => ({
		opacity: 0,
		y: prefersReducedMotion ? 0 : -150,
		rotate: prefersReducedMotion ? rotate : rotate - 15,
	}), [prefersReducedMotion, rotate]);
	
	const animateProps = useMemo(() => ({
		opacity: 1,
		y: 0,
		rotate,
	}), [rotate]);

	return (
		<motion.div
			initial={initialProps}
			animate={animateProps}
			transition={{
				duration: prefersReducedMotion ? 0.5 : 2.4,
				delay,
				ease: [0.23, 0.86, 0.39, 0.96],
				opacity: { duration: prefersReducedMotion ? 0.5 : 1.2 },
			}}
			className={cn("absolute", className)}
		>
			<motion.div
				animate={prefersReducedMotion ? {} : {
					y: [0, 15, 0],
				}}
				transition={{
					duration: 12,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
				style={{
					width,
					height,
				}}
				className="relative will-change-transform"
			>
				<div
					className={cn(
						"absolute inset-0 rounded-full",
						"bg-gradient-to-r to-transparent",
						gradient,
						"backdrop-blur-[2px] border-[1px] border-white/[0.3]",
						"shadow-[0_8px_32px_0_rgba(255,255,255,0.2)]",
						"after:absolute after:inset-0 after:rounded-full",
						"after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_70%)]"
					)}
				/>
			</motion.div>
		</motion.div>
	);
};

// Memoized HeroGeometric component to prevent unnecessary re-renders
const HeroGeometric = ({
	badge,
	title1,
	title2,
	rotatingWords,
	description
}: {
	badge?: string;
	title1?: string;
	title2?: string;
	rotatingWords: string[]; // Changed from optional to required
	description?: string;
}) => {
	const prefersReducedMotion = useReducedMotion();
	
	// Memoize the fade up variants
	const fadeUpVariants = useMemo(() => ({
		hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: prefersReducedMotion ? 0.5 : 1,
				delay: prefersReducedMotion ? 0.1 : (0.5 + i * 0.2),
				ease: [0.25, 0.4, 0.25, 1],
			},
		}),
	}), [prefersReducedMotion]);

	// Optimize component structure with lazy loading
	return (
		<div className="relative min-h-screen w-full flex items-start justify-center overflow-hidden bg-gradient-to-b from-blue-50/80 via-blue-50/20 to-white pt-24 md:pt-32">
			{/* Use a CSS background gradient instead of a DOM element for better performance */}
			<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.08] via-transparent to-blue-500/[0.08] blur-3xl" />

			<div className="absolute inset-0 overflow-hidden">
			<ElegantShape
					delay={0.3}
					width={600}
					height={140}
					rotate={12}
					gradient="from-cyan-500/[0.15]"
					className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
				/>

				<ElegantShape
					delay={0.5}
					width={500}
					height={120}
					rotate={-15}
					gradient="from-blue-500/[0.15]"
					className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
				/>

				<ElegantShape
					delay={0.4}
					width={300}
					height={80}
					rotate={-8}
					gradient="from-sky-500/[0.15]"
					className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
				/>

				<ElegantShape
					delay={0.6}
					width={200}
					height={60}
					rotate={20}
					gradient="from-teal-500/[0.15]"
					className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
				/>

				<ElegantShape
					delay={0.7}
					width={150}
					height={40}
					rotate={-25}
					gradient="from-cyan-500/[0.15]"
					className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
				/>
			</div>

			<div className="relative z-10 container mx-auto px-4 md:px-6">
				<div className="max-w-5xl mx-auto text-center">

					<motion.div
						custom={1}
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						className="flex flex-col items-center space-y-6"
					>
						<h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-1">
							<span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-800 to-blue-600">
								{title1}
							</span>
						</h1>
						
						{/* FIX: Change motion.p to motion.div to avoid invalid HTML nesting */}
						<LayoutGroup id="titleGroup">
							<motion.div 
								layout 
								className="flex flex-col sm:flex-row items-center sm:items-baseline flex-nowrap whitespace-nowrap gap-y-4 sm:gap-x-3"
							>
								<motion.span 
									layout
									transition={{ type: "spring", damping: 30, stiffness: 400 }}
									className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gray-800 text-center sm:text-left"
								>
									{title2}
								</motion.span>
								<RotatingText
									texts={rotatingWords}
									mainClassName="text-2xl sm:text-4xl md:text-6xl bg-blue-600 text-white font-bold px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg shadow-lg"
									elementLevelClassName=""
									staggerFrom="last"
									initial={{ y: "100%" }}
									animate={{ y: 0 }}
									exit={{ y: "-120%" }}
									staggerDuration={0.025}
									splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
									transition={{ type: "spring", damping: 30, stiffness: 400 }}
									rotationInterval={2000}
								/>
							</motion.div>
						</LayoutGroup>
					</motion.div>

					<motion.div
						custom={2}
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
					>
						<div className="text-base sm:text-lg md:text-xl text-gray-700 mt-8 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
							<ShinyText 
								text={description || ''} 
								disabled={false} 
								speed={3} 
								className='custom-class'
							/>
						</div>
					</motion.div>
				</div>
			</div>

			<div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-blue-50/50 pointer-events-none" />
		</div>
	);
};

export const Hero = () => {
	const counterRef = useRef(null);
	const { t } = useLanguage();
	
	// Updated rotating words logic with improved type safety
	const rotatingWords = useMemo<string[]>(() => {
		const words = t('hero.rotatingWords');
		
	    // More robust type checking and error handling
		if (Array.isArray(words) && words.length > 0 && words.every(word => typeof word === 'string')) {
			return words;
		}
		
		console.warn('Invalid or missing rotating words translation, using fallback');
		return ["Privacy", "Security", "Protection"];
	}, [t]);

	const [showDemoWarning, setShowDemoWarning] = useState(false);
	const prefersReducedMotion = useReducedMotion();

	// Handle cases when JS is loading or disabled
	useEffect(() => {
		// Add a class to indicate JS is loaded
		document.documentElement.classList.add('js-loaded');
		
		// Pre-load images to avoid layout shifts
		const preloadImages = ['/logo.svg', '/logo-nbg.webp'];
		preloadImages.forEach(src => {
			const img = new Image();
			img.src = src;
		});
		
		return () => {
			document.documentElement.classList.remove('js-loaded');
		};
	}, []);

	const handleDemoClick = () => {
		setShowDemoWarning(true);
	};

	const handleAcceptDemo = () => {
		setShowDemoWarning(false);
		window.location.href = 'https://demo.safecircle.tech/demo';
	};

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({
				behavior: prefersReducedMotion ? "auto" : "smooth",
				block: "start",
			});
		}
	};

	return (
		<div className="relative min-h-screen">
			<HeroGeometric 
				badge={t('hero.badge') || "Coming Soon"}
				title1={t('hero.title') || "Protect Your Children"}
				title2={t('hero.subtitle') || "Without Compromising"}
				rotatingWords={rotatingWords}
				description={t('hero.description')}
			/>
			<div className="absolute bottom-0 left-0 right-0 z-20 pb-4 sm:pb-8 md:pb-16">
				<div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
					<div className="space-y-4 sm:space-y-6">
						<div ref={counterRef} className="max-w-xs sm:max-w-sm md:max-w-lg mx-auto mt-4 sm:mt-0">
							<AnimatedCounter containerRef={counterRef} />
						</div>
						<motion.div
							initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: prefersReducedMotion ? 0.1 : 0.4 }}
							className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-6"
						>
							<WaitlistButton />
							<HoverCard openDelay={200}>
								<HoverCardTrigger asChild>
									<StarBorder
										onClick={handleDemoClick}
										className="group cursor-pointer hover:opacity-90 scale-90 sm:scale-100"
										color="blue"
										speed="4s"
									>
										<span className="flex items-center gap-2 sm:px-4">
											<div className="flex items-center gap-2 sm:gap-3">
												<span className="text-sm sm:text-base">{t('hero.tryDemo') || "Try Demo"}</span>
												<span className="group-hover:translate-x-1 transition-transform">→</span>
											</div>
										</span>
									</StarBorder>
								</HoverCardTrigger>
								<HoverCardContent className="w-80 bg-white border border-gray-200 shadow-lg">
									<div className="flex justify-between space-x-4">
										<div className="space-y-1">
											<h4 className="text-sm font-semibold flex items-center gap-2">
												<Beaker className="h-4 w-4 text-blue-600" />
												{t('hero.demoVersion') || "Demo Version"}
											</h4>
											<p className="text-sm text-gray-600">
												{t('hero.demoDescription') || "Try SafeCircle's main features in a demonstration environment."}
											</p>
											<div className="flex items-center pt-2 text-xs text-gray-500">
												<span>{t('hero.limitedAccess') || "Limited access to basic features"}</span>
											</div>
										</div>
									</div>
								</HoverCardContent>
							</HoverCard>
						</motion.div>
					</div>
				</div>
			</div>
			<DemoWarningDialog 
				isOpen={showDemoWarning}
				onClose={() => setShowDemoWarning(false)}
				onAccept={handleAcceptDemo}
			/>
		</div>
	);
};