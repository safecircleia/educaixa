"use client";

import { motion, LayoutGroup } from "framer-motion";
import { AnimatedCounter } from "./Counter";
import { WaitlistButton } from "../whitelist/WaitlistButton";
import { useRef, useState } from "react";
import { Circle, ChevronDown, Beaker } from "lucide-react";
import RotatingText from "../ui/RotatingText";
import ShinyText from "../ui/shiny-text";
import { cn } from "@/lib/utils";
import StarBorder from "@/components/ui/starborder";
import DemoWarningDialog from "./DemoWarningDialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
function ElegantShape({
	className,
	delay = 0,
	width = 400,
	height = 100,
	rotate = 0,
	gradient = "from-white/[0.08]",
}: {
	className?: string;
	delay?: number;
	width?: number;
	height?: number;
	rotate?: number;
	gradient?: string;
}) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: -150,
				rotate: rotate - 15,
			}}
			animate={{
				opacity: 1,
				y: 0,
				rotate: rotate,
			}}
			transition={{
				duration: 2.4,
				delay,
				ease: [0.23, 0.86, 0.39, 0.96],
				opacity: { duration: 1.2 },
			}}
			className={cn("absolute", className)}
		>
			<motion.div
				animate={{
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
				className="relative"
			>
				<div
					className={cn(
						"absolute inset-0 rounded-full",
						"bg-gradient-to-r to-transparent",
						gradient,
						"backdrop-blur-[2px] border-2 border-white/[0.15]",
						"shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
						"after:absolute after:inset-0 after:rounded-full",
						"after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
					)}
				/>
			</motion.div>
		</motion.div>
	);
}

function HeroGeometric({
	badge = "Seguridad Impulsada por IA",
	title1 = "Protege a tus Hijos",
	title2 = "Sin Comprometer la",
	rotatingWords = ["Privacidad", "Seguridad", "Velocidad"],
}: {
	badge?: string;
	title1?: string;
	title2?: string;
	rotatingWords?: string[];
}) {
	const fadeUpVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
				delay: 0.5 + i * 0.2,
				ease: [0.25, 0.4, 0.25, 1],
			},
		}),
	};

	return (
		<div className="relative min-h-screen w-full flex items-start justify-center overflow-hidden bg-[#030303] pt-24 md:pt-32">
			<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-transparent to-blue-500/[0.05] blur-3xl" />

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
						custom={0}
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
					>
						<Circle className="h-2 w-2 fill-cyan-500/80" />
						<span className="text-sm text-white/60 tracking-wide">
							{badge}
						</span>
					</motion.div>

					<motion.div
						custom={1}
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						className="flex flex-col items-center space-y-6"
					>
						<h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-1">
							<span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
								{title1}
							</span>
						</h1>
						<LayoutGroup>
							<motion.p layout className="flex items-baseline flex-nowrap whitespace-nowrap gap-x-3">
								<motion.span 
									layout
									transition={{ type: "spring", damping: 30, stiffness: 400 }}
									className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
								>
									{title2}
								</motion.span>
								<RotatingText
									texts={rotatingWords}
									mainClassName="text-3xl sm:text-4xl md:text-6xl font-bold px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white/90 to-blue-300"
									staggerFrom="last"
									initial={{ y: "100%" }}
									animate={{ y: 0 }}
									exit={{ y: "-120%" }}
									staggerDuration={0.025}
									splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
									transition={{ type: "spring", damping: 30, stiffness: 400 }}
									rotationInterval={2000}
								/>
							</motion.p>
						</LayoutGroup>
					</motion.div>

					<motion.div
						custom={2}
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
					>
						<p className="text-base sm:text-lg md:text-xl text-white/40 mt-8 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
							<ShinyText 
								text="Tecnología de Inteligencia Artificial que mantiene a tus hijos seguros en línea mientras garantiza que sus datos personales permanezcan privados y protegidos." 
								disabled={false} 
								speed={3} 
								className='custom-class'
							/>
						</p>
					</motion.div>
				</div>
			</div>

			<div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
		</div>
	);
}

export const Hero = () => {
	const counterRef = useRef(null);
	const rotatingWords = ["Privacidad", "Seguridad", "Velocidad"];
	const [showDemoWarning, setShowDemoWarning] = useState(false);

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
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<div className="relative min-h-screen">
			<HeroGeometric 
				badge="Próximamente"
				title1="Protege a tus Hijos"
				title2="Sin Comprometer la"
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
								<HoverCard openDelay={200}>
									<HoverCardTrigger asChild>
										<StarBorder
											onClick={handleDemoClick}
											className="group cursor-pointer hover:opacity-90"
											color="violet"
											speed="4s"
										>
											<span className="flex items-center gap-2 px-4">
												<div className="flex items-center gap-3">
													<span>Probar Demo</span>
													<span className="group-hover:translate-x-1 transition-transform">→</span>
												</div>
											</span>
										</StarBorder>
									</HoverCardTrigger>
									<HoverCardContent className="w-80 bg-black/95 border border-white/10">
										<div className="flex justify-between space-x-4">
											<div className="space-y-1">
												<h4 className="text-sm font-semibold flex items-center gap-2">
													<Beaker className="h-4 w-4 text-red-400" />
													Versión Demo
												</h4>
												<p className="text-sm text-white/70">
													Prueba las funcionalidades principales de SafeCircle en un entorno de demostración.
												</p>
												<div className="flex items-center pt-2 text-xs text-white/50">
													<span>Acceso limitado a funciones básicas</span>
												</div>
											</div>
										</div>
									</HoverCardContent>
								</HoverCard>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Scroll Down Indicator */}
			<motion.div 
				initial={{ opacity: 0, y: -20 }}
				animate={{ 
					opacity: [0.4, 1, 0.4],
					y: [0, 10, 0] 
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut"
				}}
				className="absolute bottom-8 inset-x-0 mx-auto z-20 flex flex-col items-center gap-2 cursor-pointer"
				onClick={() => scrollToSection("about-us")}
			>
				<span className="text-white/60 text-sm">Desplázate hacia abajo</span>
				<ChevronDown className="w-6 h-6 text-white/60" />
			</motion.div>

			<DemoWarningDialog 
				isOpen={showDemoWarning}
				onClose={() => setShowDemoWarning(false)}
				onAccept={handleAcceptDemo}
			/>
		</div>
	);
};
