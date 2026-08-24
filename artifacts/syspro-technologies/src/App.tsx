import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, Cpu, HardDrive, Linkedin, Mail, MapPin, Menu, Network, Phone, Server, ShieldCheck, UsersRound, X, Wrench, Zap } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const services = [
  { number: '01', title: 'Network Solutions', icon: Network, description: 'Structured, resilient networks that keep public offices, teams, and communities connected with confidence.', tags: ['LAN / WAN design', 'Secure connectivity'] },
  { number: '02', title: 'Computer Sales & Servicing', icon: HardDrive, description: 'Right-sized systems, honest guidance, and responsive servicing for work that cannot wait.', tags: ['Procurement support', 'Repairs & upgrades'] },
  { number: '03', title: 'Network Accessories Maintenance', icon: Server, description: 'The switches, racks, cables, and accessories that turn a good network into a dependable one.', tags: ['Spare inventory', 'On-site support'] },
  { number: '04', title: 'Computer Hardware Maintenance', icon: Wrench, description: 'Practical lifecycle care that protects your hardware investment and reduces costly downtime.', tags: ['Preventive care', 'Asset lifecycle'] },
  { number: '05', title: 'Manpower Management', icon: UsersRound, description: 'Capable technology professionals placed where your operation needs extra hands and clear ownership.', tags: ['Technical staffing', 'Field coordination'] },
];

const pulseCards = [
  { label: 'DEVICES ONLINE', value: '1,284', icon: Cpu, meta: '99.2%' },
  { label: 'OPEN TICKETS', value: '07', icon: Wrench, meta: '−18%' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: .65, ease: [0.22, 1, 0.36, 1] } },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" data-testid="link-brand">
      <span className={`relative grid h-12 w-12 place-items-center rounded-[15px] ${light ? 'bg-[hsl(var(--primary))]' : 'bg-[hsl(var(--foreground))]'}`}>
        <span className={`absolute h-7 w-7 rounded-full border-[3px] ${light ? 'border-[hsl(var(--foreground))]' : 'border-[hsl(var(--primary))]'}`} />
        <span className={`absolute h-3 w-3 rounded-full ${light ? 'bg-[hsl(var(--foreground))]' : 'bg-[hsl(var(--primary))]'}`} />
      </span>
      <span className={`whitespace-nowrap font-display text-[1.36rem] font-bold tracking-[-.04em] ${light ? 'text-[hsl(var(--background))]' : 'text-[hsl(var(--foreground))]'}`}>SysPro<span className={light ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--accent))]'}>Technologies</span></span>
    </a>
  );
}


function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Services', 'services'], ['About', 'about'], ['Jobs & Careers', 'careers'], ['Contact', 'contact']];
  const go = (id: string) => { setOpen(false); scrollToId(id); };
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="nav-blur border-b border-[hsl(var(--foreground)/.09)]">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <Wordmark />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {links.map(([label, id]) => <button key={id} onClick={() => go(id)} className="group relative text-[.8rem] font-semibold text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]" data-testid={`button-nav-${id}`}>{label}<span className="absolute -bottom-2 left-0 h-px w-0 bg-[hsl(var(--primary))] transition-all group-hover:w-full" /></button>)}
          </nav>
          <button onClick={() => go('contact')} className="magnetic-btn hidden items-center gap-2 rounded-full bg-[hsl(var(--foreground))] px-4 py-2.5 text-[.76rem] font-bold text-[hsl(var(--background))] md:flex" data-testid="button-header-cta">Talk to SysPro <ArrowDownRight size={15} /></button>
          <button className="rounded-lg p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <div className="border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--background))] px-5 py-5 md:hidden">
        <nav className="mx-auto flex max-w-[1240px] flex-col gap-1" aria-label="Mobile navigation">
          {links.map(([label, id]) => <button key={id} onClick={() => go(id)} className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.08)] py-4 text-left font-display text-2xl" data-testid={`button-mobile-nav-${id}`}>{label}<ArrowRight size={18} className="text-[hsl(var(--primary))]" /></button>)}
        </nav>
      </div>}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[76px]">
      <div className="grid-paper absolute inset-0 opacity-60" />
      <div className="absolute -right-48 top-28 h-[34rem] w-[34rem] rounded-full bg-[hsl(var(--primary)/.16)] blur-3xl" />
      <div className="relative mx-auto grid min-h-[700px] max-w-[1240px] items-center gap-14 px-5 pb-20 pt-20 sm:px-8 lg:grid-cols-[1.06fr_.94fr] lg:gap-10 lg:pb-28 lg:pt-24">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <div className="mb-7 flex items-center gap-3 text-[hsl(var(--muted-foreground))]">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))] shadow-[0_0_0_5px_hsl(var(--accent)/.14)]" />
            <span className="eyebrow">Technology, made dependable</span>
          </div>
          <h1 className="hero-display max-w-[760px] font-display text-[clamp(4rem,8.3vw,7.6rem)] font-medium leading-[.88] tracking-[-.075em] text-[hsl(var(--foreground))]">Infrastructure<br /><span className="text-[hsl(var(--primary))]">with a pulse.</span></h1>
          <p className="mt-8 max-w-[510px] text-[1.03rem] leading-7 text-[hsl(var(--muted-foreground))]">Syspro Technologies is the steady hand behind the systems that keep public-sector teams, government offices, and individuals moving forward.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={() => scrollToId('contact')} className="magnetic-btn group flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--primary-foreground))]" data-testid="button-hero-contact">Talk to SysPro <span className="grid h-6 w-6 place-items-center rounded-full bg-[hsl(var(--foreground))] text-[hsl(var(--primary))] transition-transform group-hover:rotate-45"><ArrowDownRight size={14} /></span></button>
            <button onClick={() => scrollToId('services')} className="flex items-center gap-2 rounded-full px-3 py-3.5 text-sm font-bold text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]" data-testid="button-hero-services">Explore services <ArrowRight size={16} /></button>
          </div>
          <div className="mt-12 flex items-center gap-6 border-t border-[hsl(var(--foreground)/.12)] pt-5 text-xs text-[hsl(var(--muted-foreground))]">
            <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[hsl(var(--primary))]" /> Trusted technology partner</span>
            <span className="hidden h-4 w-px bg-[hsl(var(--foreground)/.15)] sm:block" />
            <span className="hidden sm:block">Public sector · Private teams · Individuals</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .94, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: .85, delay: .16, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[520px]">
          <div className="hero-orb absolute -right-4 -top-8 h-20 w-20 rounded-full border border-[hsl(var(--primary)/.35)] bg-[hsl(var(--primary)/.16)]" />
          <div className="hero-orb-delay absolute -bottom-7 -left-8 h-28 w-28 rounded-full border border-[hsl(var(--accent)/.3)] bg-[hsl(var(--accent)/.14)]" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[hsl(var(--foreground)/.16)] bg-[hsl(var(--foreground))] p-4 shadow-[0_24px_70px_hsl(var(--foreground)/.18)]">
            <div className="grid-paper absolute inset-0 opacity-[.07]" />
            <div className="relative flex items-center justify-between border-b border-[hsl(var(--background)/.14)] px-3 pb-4">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" /><span className="font-mono text-[.68rem] tracking-[.14em] text-[hsl(var(--background)/.65)]">SYSPRO / SYSTEM PULSE</span></div>
              <span className="rounded-full bg-[hsl(var(--primary)/.18)] px-2.5 py-1 text-[.62rem] font-bold text-[hsl(var(--primary))]">LIVE</span>
            </div>
            <div className="relative grid gap-3 p-3 sm:grid-cols-[1.1fr_.9fr]">
              <div className="rounded-2xl border border-[hsl(var(--background)/.13)] bg-[hsl(var(--background)/.06)] p-5">
                <div className="mb-10 flex items-start justify-between"><div><p className="text-[.68rem] text-[hsl(var(--background)/.55)]">NETWORK HEALTH</p><p className="mt-1 font-display text-4xl text-[hsl(var(--background))]">98.6<span className="text-xl text-[hsl(var(--primary))]">%</span></p></div><Zap size={19} className="text-[hsl(var(--secondary))]" /></div>
                <div className="relative h-24 overflow-hidden"><div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[hsl(var(--background)/.16)]" /><svg viewBox="0 0 300 90" className="h-full w-full" preserveAspectRatio="none"><path d="M0 65 C20 63 20 47 40 53 S65 65 78 43 S105 25 122 42 S142 59 156 37 S172 51 187 29 S207 40 225 25 S247 44 266 18 S286 37 300 12" fill="none" stroke="hsl(184 84% 44%)" strokeWidth="3" /></svg></div>
                <div className="mt-3 flex justify-between text-[.6rem] text-[hsl(var(--background)/.4)]"><span>08:00</span><span>12:00</span><span>16:00</span><span>NOW</span></div>
              </div>
              <div className="grid gap-3">
                {pulseCards.map(({ label, value, icon: Icon, meta }) => <div key={label} className="rounded-2xl border border-[hsl(var(--background)/.13)] bg-[hsl(var(--background)/.06)] p-4"><Icon size={17} className="text-[hsl(var(--primary))]" /><p className="mt-5 text-[.6rem] text-[hsl(var(--background)/.5)]">{label}</p><div className="mt-1 flex items-end justify-between"><span className="font-display text-2xl text-[hsl(var(--background))]">{value}</span><span className="text-[.62rem] text-[hsl(var(--primary))]">{meta}</span></div></div>)}
              </div>
            </div>
            <div className="scan-line relative h-1 bg-[hsl(var(--primary))] shadow-[0_0_18px_hsl(var(--primary)/.8)]" />
            <div className="relative flex items-center justify-between px-3 pt-4 text-[.62rem] text-[hsl(var(--background)/.5)]"><span>All systems considered.</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" /> monitored continuously</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return <div className="border-y border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--card)/.55)]"><div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-5 sm:px-8"><p className="eyebrow text-[hsl(var(--muted-foreground))]">The SysPro standard</p><div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-[hsl(var(--foreground)/.72)]"><span>Clear by default</span><span>Present when needed</span><span>Ready for what’s next</span></div></div></div>;
}

function Services() {
  return <section id="services" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 py-24 sm:px-8 lg:py-36">
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
      <div><p className="eyebrow text-[hsl(var(--primary))]">What we make possible</p><h2 className="mt-5 max-w-[390px] font-display text-5xl leading-[.96] tracking-[-.06em] sm:text-6xl">The right support, at the right layer.</h2></div>
      <div className="flex items-end"><p className="max-w-[500px] text-base leading-7 text-[hsl(var(--muted-foreground))]">From the first cable to the final handover, we bring practical expertise to the infrastructure people rely on every day.</p></div>
    </motion.div>
    <div className="mt-16 border-t border-[hsl(var(--foreground)/.15)]">
      {services.map((service, index) => { const Icon = service.icon; return <motion.article key={service.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: index * .07, duration: .55 }} className="service-row group grid gap-5 border-b border-[hsl(var(--foreground)/.13)] py-7 md:grid-cols-[90px_1fr_1.1fr_34px] md:items-center">
        <span className="service-number font-mono text-sm text-[hsl(var(--muted-foreground))]">{service.number}</span>
        <h3 className="flex items-center gap-4 font-display text-2xl tracking-[-.04em] sm:text-3xl"><Icon size={22} strokeWidth={1.5} className="text-[hsl(var(--primary))]" />{service.title}</h3>
        <div><p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">{service.description}</p><div className="mt-3 flex flex-wrap gap-2">{service.tags.map((tag) => <span key={tag} className="rounded-full border border-[hsl(var(--foreground)/.12)] px-2.5 py-1 text-[.65rem] font-semibold text-[hsl(var(--foreground)/.6)]">{tag}</span>)}</div></div>
        <ArrowRight size={19} className="text-[hsl(var(--muted-foreground))] transition-all group-hover:translate-x-1 group-hover:text-[hsl(var(--primary))]" />
      </motion.article>; })}
    </div>
  </section>;
}

function About() {
  return <section id="about" className="scroll-mt-20 bg-[hsl(var(--foreground))] text-[hsl(var(--background))]">
    <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:py-32">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}><p className="eyebrow text-[hsl(var(--primary))]">About Syspro Technologies</p><h2 className="mt-6 max-w-[520px] font-display text-5xl leading-[.95] tracking-[-.06em] sm:text-6xl">Complex systems.<br /><span className="text-[hsl(var(--secondary))]">Human answers.</span></h2><p className="mt-8 max-w-[470px] text-base leading-7 text-[hsl(var(--background)/.65)]">We believe technology support should feel less like another service request waiting to be resolved and more like a trusted partner who already understands the stakes. From delivering premium & high-performance hardware and secure networking to professional manpower management, we build and maintain the entire ecosystem that powers your business. SysPro combines technical discipline with a clear, human way of working. We are located at : 151, Boalia Main Road, Trinayani Apartment, Gound Floor, Boalia, Garia, Kolkata - 700084, West Bengal.</p><button onClick={() => scrollToId('contact')} className="mt-8 flex items-center gap-3 text-sm font-bold text-[hsl(var(--primary))] hover:text-[hsl(var(--background))]" data-testid="button-about-contact">Start a conversation <ArrowDownRight size={17} /></button></motion.div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ['01', 'Listen first', 'Every good solution starts by understanding the people and pressure behind the brief.'],
          ['02', 'Make it legible', 'We translate technical decisions into clear next steps your team can own.'],
          ['03', 'Stay close', 'Support is not a handover. We stay present through the work and after it.'],
          ['04', 'Build for change', 'The best infrastructure is ready for tomorrow, not just today.'],
        ].map(([num, title, text], index) => <motion.div key={num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="rounded-2xl border border-[hsl(var(--background)/.14)] p-6 sm:p-7"><span className="font-mono text-xs text-[hsl(var(--primary))]">{num}</span><h3 className="mt-12 font-display text-2xl tracking-[-.04em]">{title}</h3><p className="mt-3 text-sm leading-6 text-[hsl(var(--background)/.58)]">{text}</p></motion.div>)}
      </div>
    </div>
  </section>;
}

function Careers() {
  return <section id="careers" className="scroll-mt-20 border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--secondary)/.28)]">
    <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[.6fr_1.4fr] lg:items-start">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="lg:sticky lg:top-32">
          <p className="eyebrow text-[hsl(var(--accent-foreground))]">Jobs &amp; Careers at Syspro Technologies</p><h2 className="mt-5 max-w-[440px] font-display text-5xl leading-[.95] tracking-[-.06em] sm:text-6xl">Build what<br /><span className="text-[hsl(var(--accent-foreground))]">matters.</span></h2><p className="mt-7 max-w-[390px] text-base leading-7 text-[hsl(var(--muted-foreground))]">Join people who care about making technology useful, reliable, and a little easier to live with.</p><div className="mt-7 flex flex-col gap-3 text-sm font-semibold"><span className="flex items-center gap-3"><Check size={16} className="text-[hsl(var(--accent-foreground))]" /> A team that shares context</span><span className="flex items-center gap-3"><Check size={16} className="text-[hsl(var(--accent-foreground))]" /> Work that reaches real people</span><span className="flex items-center gap-3"><Check size={16} className="text-[hsl(var(--accent-foreground))]" /> Room to keep getting better</span></div>
        </motion.div>
         <div className="career-frame w-full max-w-[900px] justify-self-end overflow-hidden rounded-[1.5rem] shadow-[0_24px_60px_hsl(var(--foreground)/.14)]">
           <div className="h-1 bg-[linear-gradient(90deg,hsl(var(--primary)),hsl(var(--secondary)),hsl(var(--accent)))]" />
           <div className="flex flex-wrap items-center justify-between gap-3 bg-[hsl(var(--foreground))] px-5 py-4 text-[hsl(var(--background))]"><div className="flex items-center gap-2 text-sm font-bold"><BriefcaseBusiness size={17} className="text-[hsl(var(--primary))]" /> Open application</div><div className="flex items-center gap-3"><span className="eyebrow text-[hsl(var(--background)/.58)]">Secure form</span><a href="https://forms.gle/fFe17audQnzGgcyb8" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-[hsl(var(--primary))] transition-opacity hover:opacity-70" data-testid="link-open-full-application">Open full form <ArrowUpRight size={13} /></a></div></div>
           <div className="career-form-surface p-2 sm:p-3">
             <iframe title="Syspro Technologies jobs and careers application form" src="https://docs.google.com/forms/d/e/1FAIpQLSeeyDO3MN8V5LgC9Rf8PpYs8zgEjIp6X9pYXM9zg9P-SpDA3Q/viewform?embedded=true" allowFullScreen loading="lazy" className="career-form h-[450px] w-full bg-transparent sm:h-[500px]" data-testid="iframe-careers-form" />
           </div>
        </div>
      </div>
    </div>
  </section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <section id="contact" className="scroll-mt-20 bg-[hsl(var(--primary))]">
    <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 lg:py-32">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}><p className="eyebrow text-[hsl(var(--primary-foreground)/.63)]">Talk to SysPro</p><h2 className="mt-5 max-w-[500px] font-display text-5xl leading-[.93] tracking-[-.06em] text-[hsl(var(--primary-foreground))] sm:text-7xl">Let’s make<br />the next step<br /><span className="text-[hsl(var(--background))]">clear.</span></h2><p className="mt-7 max-w-[410px] text-base leading-7 text-[hsl(var(--primary-foreground)/.68)]">Tell us what your team is solving. We’ll bring the right questions and a practical place to begin.</p><div className="mt-9 flex flex-col gap-4"><a href="mailto:sysprotechjob@gmail.com" className="flex w-fit items-center gap-3 text-sm font-bold text-[hsl(var(--primary-foreground))] transition-opacity hover:opacity-65" data-testid="link-contact-email"><span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--primary-foreground)/.12)]"><Mail size={16} /></span>sysprotechjob@gmail.com</a><a href="tel:+91-9800284320/+91-8584821426" className="flex w-fit items-center gap-3 text-sm font-bold text-[hsl(var(--primary-foreground))] transition-opacity hover:opacity-65" data-testid="link-contact-phone"><span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--primary-foreground)/.12)]"><Phone size={16} /></span>+91-9800284320/+91-8584821426</a></div></motion.div>
      <div className="rounded-[1.5rem] bg-[hsl(var(--background))] p-6 shadow-[0_20px_60px_hsl(var(--foreground)/.16)] sm:p-8">
        {sent ? <div className="flex min-h-[390px] flex-col items-center justify-center text-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-[hsl(var(--primary)/.15)] text-[hsl(var(--primary))]"><Check size={27} /></span><h3 className="mt-6 font-display text-3xl tracking-[-.04em]">Message received.</h3><p className="mt-3 max-w-[320px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">Thank you for reaching out. The SysPro team will be in touch shortly.</p><button onClick={() => setSent(false)} className="mt-7 text-sm font-bold text-[hsl(var(--primary))] underline underline-offset-4" data-testid="button-send-another">Send another message</button></div> : <form onSubmit={submit} className="space-y-5" data-testid="form-contact"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Your name<input required name="name" placeholder="How should we call you?" className="contact-input mt-2 w-full rounded-lg border border-[hsl(var(--foreground)/.14)] bg-transparent px-3.5 py-3 text-sm placeholder:text-[hsl(var(--muted-foreground))]" data-testid="input-contact-name" /></label><label className="text-sm font-semibold">Work email<input required type="email" name="email" placeholder="you@organisation.org" className="contact-input mt-2 w-full rounded-lg border border-[hsl(var(--foreground)/.14)] bg-transparent px-3.5 py-3 text-sm placeholder:text-[hsl(var(--muted-foreground))]" data-testid="input-contact-email" /></label></div><label className="block text-sm font-semibold">What can we help with?<select name="service" className="contact-input mt-2 w-full rounded-lg border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--background))] px-3.5 py-3 text-sm" data-testid="select-contact-service"><option>Network Solutions</option><option>Computer Sales & Servicing</option><option>Network Accessories Maintenance</option><option>Computer Hardware Maintenance</option><option>Manpower Management</option><option>Something else</option></select></label><label className="block text-sm font-semibold">A little context<textarea required name="message" rows={5} placeholder="A few lines about your team, timeline, or challenge..." className="contact-input mt-2 w-full resize-none rounded-lg border border-[hsl(var(--foreground)/.14)] bg-transparent px-3.5 py-3 text-sm placeholder:text-[hsl(var(--muted-foreground))]" data-testid="textarea-contact-message" /></label><button type="submit" className="magnetic-btn flex w-full items-center justify-center gap-3 rounded-lg bg-[hsl(var(--foreground))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--background))]" data-testid="button-submit-contact">Send to SysPro <ArrowDownRight size={16} /></button><p className="text-center text-xs text-[hsl(var(--muted-foreground))]">We appreciate your inquiry and will contact you upon further review.</p></form>}
      </div>
    </div>
  </section>;
}

function Footer() {
  return <footer className="bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"><div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8"><div className="grid gap-10 border-b border-[hsl(var(--background)/.14)] pb-12 md:grid-cols-[1.3fr_.7fr_.7fr]"><div><Wordmark light /><p className="mt-5 max-w-[310px] text-sm leading-6 text-[hsl(var(--background)/.55)]">Steady technology support for the systems people depend on.</p></div><div><p className="eyebrow mb-4 text-[hsl(var(--primary))]">Navigate</p><div className="flex flex-col items-start gap-3 text-sm text-[hsl(var(--background)/.68)]"><button onClick={() => scrollToId('services')} data-testid="button-footer-services">Services</button><button onClick={() => scrollToId('about')} data-testid="button-footer-about">About</button><button onClick={() => scrollToId('careers')} data-testid="button-footer-careers">Jobs &amp; Careers</button></div></div><div><p className="eyebrow mb-4 text-[hsl(var(--primary))]">Reach us</p><div className="flex flex-col items-start gap-3 text-sm text-[hsl(var(--background)/.68)]"><a href="mailto:sysprotechjob@gmail.com" data-testid="link-footer-email">Email SysPro</a><a href="tel:+91-9800284320/+91-8584821426" data-testid="link-footer-phone">Call +91-9800284320/+91-8584821426</a><span className="flex items-center gap-2"><MapPin size={14} /> Serving India & beyond</span></div></div></div><div className="flex flex-col justify-between gap-5 pt-7 text-xs text-[hsl(var(--background)/.43)] sm:flex-row"><span>© {new Date().getFullYear()} Syspro Technologies. Built for better uptime.</span><div className="flex gap-5"><span>Technology with a human signal.</span><Linkedin size={15} /></div></div></div></footer>;
}

function Home() {
  return <div className="syspro-page noise-layer min-h-[100dvh]"><Header /><main><Hero /><TrustStrip /><Services /><About /><Careers /><Contact /></main><Footer /></div>;
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
    // Dynamically switch the routing base path depending on the active URL location
  const currentUrlPath = window.location.pathname;
  const dynamicBase = currentUrlPath.includes('/website-st') ? '/website-st' : '';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={dynamicBase}>
          <RoutedErrorBoundary>
            <Router />
          </RoutedErrorBoundary>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
