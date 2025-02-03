"use client";

import { LayoutGroup, motion } from "framer-motion";
import { Counter } from "./Counter";
import { WaitlistButton } from "./WaitlistButton";
import { GodRays } from "./GodRays";
import { useRef } from "react";
import RotatingText from "@/components/ui/RotatingText";

export const Hero = () => {
	const counterRef = useRef(null);

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
		<div className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-8">
			<GodRays />
			<motion.div className="relative z-10 w-full max-w-6xl mx-auto text-center">
				<div className="space-y-10">
					{/* Stacked title layout */}
					<div className="flex flex-col items-center space-y-4">
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight
                bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/80"
						>
							AI-Powered Child Safety
						</motion.h1>
						<LayoutGroup>
							<motion.p
								className="flex whitespace-pre font-[900] text-4xl md:text-5xl lg:text-6xl"
								layout
							>
								<motion.span
									className="pt-1 sm:pt-2 md:pt-3"
									layout
									transition={{ type: "spring", damping: 30, stiffness: 400 }}
								>
									Without Compromising{" "}
								</motion.span>
								<RotatingText
									texts={["Privacy", "Security", "Protection"]}
									mainClassName="px-3 sm:px-4 md:px-6 bg-cyan-300 text-black overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-lg"
									staggerFrom={"last"}
									initial={{ y: "100%" }}
									animate={{ y: 0 }}
									exit={{ y: "-120%" }}
									staggerDuration={0.025}
									splitLevelClassName="overflow-hidden pb-1 sm:pb-2 md:pb-2 font-black"
									transition={{ type: "spring", damping: 30, stiffness: 400 }}
									rotationInterval={2000}
								/>
							</motion.p>
						</LayoutGroup>
					</div>

					{/* Counter and CTA sections */}
					<div className="space-y-12">
						<div ref={counterRef} className="max-w-lg mx-auto">
							<Counter containerRef={counterRef} />
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
			</motion.div>
		</div>
	);
};
