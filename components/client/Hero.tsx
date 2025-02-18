"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./Counter";
import { WaitlistButton } from "../whitelist/WaitlistButton";
import { useRef } from "react";
import { HeroGeometric } from "../ui/hero";


export const Hero = () => {
	const counterRef = useRef(null);
	const rotatingWords = ["Privacy", "Security", "Speed"];

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<div className="relative min-h-screen">
			<HeroGeometric 
				badge="Coming Soon"
				title1="Protect Your Children"
				title2="Without Compromising"
				rotatingWords={rotatingWords}
			/>
			<div className="absolute bottom-32 left-0 right-0 z-20">
				<div className="w-full max-w-6xl mx-auto px-6 md:px-8">
					<div className="space-y-12">
						<div ref={counterRef} className="max-w-lg mx-auto">
							<AnimatedCounter containerRef={counterRef} />
						</div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="flex flex-col sm:flex-row items-center justify-center gap-6"
						>
							<WaitlistButton />
							<motion.button
								onClick={() => scrollToSection("section-how-it-works")}
								className="group flex items-center gap-2 px-8 py-4 rounded-full 
								text-white/80 hover:text-white transition-colors"
								whileHover={{ y: -2 }}
							>
								Learn More
								<motion.span
									initial={{ x: 0 }}
									whileHover={{ x: 4 }}
									className="inline-block transition-transform"
								>
									→
								</motion.span>
							</motion.button>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};
