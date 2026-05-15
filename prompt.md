Use the caveman skill.

Fix and improve the existing Next.js portfolio. Do NOT recreate files from scratch — edit existing files only.

━━━ FIX 1: SMOOTH SCROLL ━━━
The issue is likely a CSS conflict. Do all three:
1. In globals.css: html { scroll-behavior: smooth !important; }
2. In globals.css: * { scroll-behavior: inherit; }
3. Find any component using Framer Motion scroll or CSS scroll-snap and remove scroll-snap entirely.
4. In DotNavigation.tsx replace scrollIntoView with:
window.scrollTo({ top: document.getElementById(id)?.offsetTop ?? 0, behavior: 'smooth' })

━━━ FIX 2: HERO IMAGE QUALITY ━━━
In Hero.tsx find the <Image> for card.png and change:
- Add quality={100}
- Add priority
- sizes="(max-width: 1024px) 100vw, 50vw"
- Make sure parent div has explicit width/height or is position:relative with aspect ratio

━━━ FIX 3: NAME TYPOGRAPHY ━━━
Find "SOSO" and "KARTOZIA" text elements:
- Remove any gradient class (text-gradient-cyan or bg-clip-text)
- Set className to include: font-black tracking-tighter text-white
- Size: text-7xl md:text-8xl lg:text-9xl

━━━ FIX 4: STATS BAR INTO HERO ━━━
Move StatsBar component to render inside Hero.tsx below the left column content (below the social icons row). Remove it from page.tsx. Center each stat number above its label using: flex flex-col items-center text-center

━━━ FIX 5: SOCIAL ICONS BRAND COLORS ━━━
In Hero.tsx replace social icon colors:
- LinkedIn: text-[#0077B5]
- Instagram: text-[#E1306C]
- Facebook: text-[#1877F2]
Remove hover:text-cyan-400 from all three. Keep transition-colors duration-200.

━━━ FIX 6: HERO IMAGE CONTAINER HOVER EFFECT ━━━
In Hero.tsx wrap the image container with motion.div. On whileHover:
- Cyan glow overlay: absolute inset-0 bg-cyan-400/10 rounded-2xl opacity 0→1
- whileHover={{ scale: 1.02 }}
- shadow-[0_0_60px_-10px_rgba(0,229,255,0.6)]
transition={{ duration: 0.4, ease: "easeOut" }}

━━━ FIX 7: EXPERTISE AI TOOLS BLOCK ━━━
In SkillsSection.tsx change grid to: grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6
Add 4th card title "AI & Modern Tools" with skills:
Claude Code, Claude, Gemini, Cursor, ChatGPT, Midjourney, Perplexity, Notion AI, GitHub Copilot, Make.com

━━━ FIX 8: YEAR POSITION IN TIMELINE ━━━
In TimelineItem.tsx find the year element. Add: relative z-10 pt-8 mb-4

━━━ FIX 9: CARD 3D HOVER ANIMATION ━━━
In TimelineItem.tsx replace glass card div with motion.div with 3D tilt on mouse move:
- useMotionValue for rotateX and rotateY
- onMouseMove calculates tilt: x = (clientX - rect.left)/rect.width - 0.5, multiply by 12
- onMouseLeave animates back to 0 with ease "easeOut" duration 0.5
- style={{ rotateX, rotateY, transformPerspective: 1000 }}
Import animate from "framer-motion"

━━━ FIX 10: REMOVE SEND EMAIL BUTTON ━━━
In ContactCTA.tsx remove the mailto button. Keep only social icon links row.

━━━ NEW FEATURE 1: CURRENTLY BUILDING BADGE ━━━
In Hero.tsx add above "SOSO" name:
<motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400">
    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
    Currently building · Youth-Ge Georgia
  </span>
</motion.div>

━━━ NEW FEATURE 2: TYPING ANIMATION TAGLINE ━━━
Create components/TypingTagline.tsx "use client":
const phrases = ["Strategic Leader.", "Data-Driven Builder.", "Co-Founder.", "BI Developer."]
useEffect cycles phrases: type char by char (60ms), pause 1500ms, delete char by char (30ms), next phrase.
Blinking cursor: <span className="animate-pulse text-cyan-400">|</span>
Replace static tagline in Hero.tsx with <TypingTagline />

━━━ NEW FEATURE 3: HORIZONTAL TIMELINE ON MOBILE ━━━
In TimelineSection.tsx and TimelineItem.tsx:
Mobile (below md): horizontal scrollable container:
<div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-6 px-6">
Each card: <div className="snap-center shrink-0 w-[85vw]"> with Year→Title→Text→Image stacked
Desktop (md+): existing vertical layout wrapped in <div className="hidden md:block">
Add horizontal scrollbar styling in globals.css: thin, cyan thumb

━━━ NEW FEATURE 4: INTERACTIVE EYE TRACKING ━━━
Create components/EyeTracking.tsx "use client"

Replace the card.png <Image> in Hero.tsx right column with <EyeTracking />

The component stacks 4 layers inside one relative container (same aspect ratio as face.png):

LAYER ORDER (bottom to top, use z-index):
- z-0: face.png — static base, position absolute inset-0 w-full h-full object-cover
- z-10: left.png — moves with mouse, position absolute
- z-10: right.png — moves with mouse, position absolute  
- z-20: faceMask.png — static TOP layer, position absolute inset-0 w-full h-full object-cover. This image has cutout holes where the eyes are, so the moving eyeballs show through from underneath

Eye movement logic:
const [eyePos, setEyePos] = useState({ x: 0, y: 0 })
useEffect: add window mousemove listener, cleanup on unmount
const handleMouseMove = (e) => {
  const maxMove = 8
  const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
  const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
  setEyePos({ x: dx * maxMove, y: dy * maxMove })
}
Use useSpring for smooth movement:
const springX = useSpring(0, { stiffness: 80, damping: 15 })
const springY = useSpring(0, { stiffness: 80, damping: 15 })
useEffect: springX.set(eyePos.x), springY.set(eyePos.y)

Apply springX/springY as motion.div style={{ x: springX, y: springY }} wrapping BOTH left.png and right.png.
The left and right eye images must be positioned absolutely to match where the real eyes are in face.png — use trial values: top: "32%" left: "28%" for left eye, top: "32%" left: "58%" for right eye, each with width: "18%" height: "auto"
Container must have overflow:hidden so eyes cannot move outside face bounds.
Use Next.js <Image> with fill for face.png and faceMask.png, use width/height props for left.png and right.png inside their motion.div wrappers.

━━━ AFTER ALL CHANGES ━━━
Run npm run build. Fix every TypeScript error until build passes with 0 errors.