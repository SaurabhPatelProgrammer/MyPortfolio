import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";


export default function SkillCard({ title, description }) {
return (
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
viewport={{ once: true }}
className="relative bg-gradient-to-br from-[#0f0f0f]/80 to-[#1a1a1a]/80 border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer backdrop-blur-xl group overflow-hidden"
>
{/* Glow Hover Layer */}
<div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500" />


{/* Icon Row */}
<div className="flex items-center gap-3 mb-4">
<div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner">
<Sparkles className="text-purple-400" size={22} />
</div>
<h3 className="text-2xl font-semibold text-white tracking-wide">{title}</h3>
</div>


{/* Description */}
<p className="text-white/70 text-sm leading-relaxed">{description}</p>
</motion.div>
);
}