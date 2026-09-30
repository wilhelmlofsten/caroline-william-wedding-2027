import { useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import sunset from "@/assets/sunset.jpg";
import monogram from "@/assets/hero-monogram.jpg";
import monogramRound from "@/assets/monogram-round.jpg";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

const nav = [
  ["Hem", "hem"], ["Vår historia", "historia"], ["Program", "program"],
  ["Plats", "plats"], ["Boende", "boende"], ["OSA", "osa"],
] as const;

function useCountdown() {
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, Math.floor((new Date("2027-08-06T18:30:00+02:00").getTime() - Date.now()) / 1000)));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return [Math.floor(remaining / 86400), Math.floor(remaining % 86400 / 3600), Math.floor(remaining % 3600 / 60), remaining % 60];
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const countdown = useCountdown();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <div className="site-shell">
    <header className={`site-nav ${scrolled || menuOpen ? "site-nav-solid" : ""}`}>
      <a href="#hem" className="nav-mark" aria-label="Caroline och William, till toppen">C<span>&</span>W</a>
      <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`} aria-label="Huvudmeny">
        {nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <Button variant="ghost" size="icon" className="nav-toggle" aria-label={menuOpen ? "Stäng meny" : "Öppna meny"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </header>

    <main>
      <section id="hem" className="hero" aria-labelledby="hero-title">
        <img className="hero-photo" src={monogram} alt="" aria-hidden="true" />
        <div className="hero-wash" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Vi ska gifta oss</p>
          <h1 id="hero-title">Caroline <span>&</span> William</h1>
          <div className="hero-rule" />
          <p className="hero-date">Gotland <span>·</span> 6–7 augusti 2027</p>
          <a href="#valkommen" className="hero-scroll" aria-label="Scrolla till välkomsthälsningen"><span>Scrolla vidare</span><ArrowDown size={16} /></a>
        </div>
        <span className="hero-side-note">Ett sommarminne att dela tillsammans</span>
      </section>

      <section id="valkommen" className="intro section-pad">
        <div className="intro-inner reveal">
          <p className="eyebrow">Till våra favoritmänniskor</p>
          <span className="ornament">✳</span>
          <h2>Hej favoritmänniskor!</h2>
          <p>Det har blivit dags. Vi ska göra det officiellt, lova varandra evig trohet och framför allt ställa till med en hej dundrande fest.</p>
          <p>Det här är bara ett digitalt litet livstecken så att ni kan låsa in datumen i kalendern redan nu. Inbjudan med alla praktiska detaljer, klockslag & OSA-info kommer i höst.</p>
          <p className="intro-signoff">Vi längtar efter att fira med er! <span>Caroline & William</span></p>
        </div>
      </section>

      <section className="countdown-band" aria-label="Nedräkning till bröllopet">
        <div className="countdown-inner reveal">
          <div className="countdown-heading"><span className="eyebrow">Vi räknar dagarna</span><p>Snart ses vi på Gotland.</p></div>
          <div className="countdown-values">{countdown.map((value, i) => <div className="countdown-unit" key={i}><strong>{String(value).padStart(2, "0")}</strong><span>{["dagar", "timmar", "minuter", "sekunder"][i]}</span></div>)}</div>
        </div>
      </section>

      <section id="historia" className="story section-pad">
        <div className="section-heading reveal"><p className="eyebrow">Det bästa har bara börjat</p><h2>Vår historia</h2><div className="section-divider" /></div>
        <div className="story-grid">
          <div className="story-image-wrap reveal"><img src={sunset} alt="Caroline och William på resa tillsammans" loading="lazy" /><span className="image-caption">Ett ögonblick, mitt i allt det fina.</span></div>
          <div className="story-copy reveal"><span className="story-number">01 / VÅR BERÄTTELSE</span><h3>Två personer.<br /><em>Ett äventyr.</em></h3><p>Det är något alldeles särskilt med att få dela livet med sin favoritperson. Nu ser vi fram emot nästa kapitel — och att få börja det tillsammans med er på Gotland.</p><p>Mer av vår historia kommer snart. Tills dess: spara datumen, packa för sommar och gör er redo att fira med oss.</p><a className="text-link" href="#program">Se helgens program <ArrowRight size={16} /></a></div>
        </div>
      </section>

      <section id="program" className="program section-pad">
        <div className="section-heading reveal"><p className="eyebrow">Två dagar att minnas</p><h2>Helgens program</h2><div className="section-divider" /><p>En helg fylld av kärlek, skratt och dans. Vi uppdaterar med fler detaljer när den officiella inbjudan kommer.</p></div>
        <div className="program-grid reveal">
          <div className="program-day"><div className="day-head"><span>01</span><div><p>6 augusti 2027</p><h3>Fredag</h3></div></div><div className="event"><time>18.30</time><span>Välkomstmingel</span></div><div className="event"><time>22.00</time><span>Fri lek</span></div></div>
          <div className="program-day"><div className="day-head"><span>02</span><div><p>7 augusti 2027</p><h3>Lördag</h3></div></div><div className="event"><time>13.30</time><span>Bussar avgår från Ljugarn</span></div><div className="event"><time>14.00</time><span>Vigsel i Lau kyrka</span></div><div className="event"><time>15.30</time><span>Bussar avgår från Lau kyrka</span></div><div className="event"><time>16.00</time><span>Drink & lekar</span></div><div className="event"><time>18.00</time><span>Middag</span></div><div className="event"><time>22.15</time><span>Fest</span></div><div className="event"><time>00–03</time><span>Bussar / taxi hemåt</span></div></div>
        </div>
        <p className="program-note reveal">Tiderna är preliminära – slutliga detaljer kommer med inbjudan.</p>
      </section>

      <section id="plats" className="place section-pad"><div className="place-inner reveal"><p className="eyebrow">Östersjöns pärla</p><h2>Vi ses på <em>Gotland</em></h2><p>En sommarhelg på ön, med havet nära och tid att vara tillsammans. Vigseln är planerad i Lau kyrka och lördagens bussar avgår från Ljugarn.</p><div className="place-details"><div><span className="detail-icon">✳</span><h3>Hitta hit</h3><p>Res med färja till Visby från Nynäshamn eller Oskarshamn, eller flyg till Visby flygplats.</p><a className="text-link" href="https://www.destinationgotland.se/" target="_blank" rel="noopener noreferrer">Boka färja <ArrowUpRight size={15} /></a></div><div><span className="detail-icon">✳</span><h3>Lau kyrka</h3><p>Vigseln äger rum i Lau kyrka på sydöstra Gotland. Mer om transporterna kommer i inbjudan.</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Lau+kyrka+Gotland" target="_blank" rel="noopener noreferrer">Visa på karta <ArrowUpRight size={15} /></a></div></div></div></section>

      <section id="boende" className="stay section-pad"><div className="section-heading reveal"><p className="eyebrow">Gör en helg av det</p><h2>Boende på ön</h2><div className="section-divider" /><p>Augusti är en eftertraktad tid på Gotland. Vi rekommenderar att boka ert boende i god tid.</p></div><div className="stay-grid reveal"><div><span>01</span><h3>Ljugarn</h3><p>En härlig utgångspunkt nära lördagens bussavgång. Här finns hotell, pensionat och sommarboenden.</p></div><div><span>02</span><h3>Södra Gotland</h3><p>Utforska boenden i byarna kring Lau och längs kusten för en lugn helg nära firandet.</p></div><div><span>03</span><h3>Visby med omnejd</h3><p>För dig som vill kombinera bröllopshelgen med stadsliv och upptäckter på ön.</p></div></div><p className="stay-note">Konkreta boendetips och praktisk information kommer i höst.</p></section>

      <section id="osa" className="rsvp section-pad"><div className="rsvp-inner"><div className="rsvp-aside reveal"><p className="eyebrow">Vi hoppas att du kommer</p><h2>Låt oss<br /><em>veta.</em></h2><div className="section-divider" /><p>Den officiella inbjudan och OSA kommer i höst. Vill du redan nu ge oss en hint om du kan vara med? Skriv gärna här.</p><img src={monogramRound} alt="C och W monogram" loading="lazy" /></div><RsvpForm /></div></section>
    </main>
    <footer className="footer"><a href="#hem" className="footer-mark">C<span>&</span>W</a><p>Gotland · 6–7 augusti 2027</p><div className="footer-line" /><p className="footer-love">Med kärlek, Caroline & William</p><a href="#hem" className="back-top">Till toppen ↑</a></footer>
  </div>;
}

function RsvpForm() {
  const [attending, setAttending] = useState(true);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const guest_count = attending ? Number(data.get("guest_count")) : 0;
    const plus_one_name = String(data.get("plus_one_name") || "").trim();
    const dietary_notes = String(data.get("dietary_notes") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (name.length < 2 || name.length > 120 || email.length > 255 || !/^\S+@\S+\.\S+$/.test(email) || guest_count < 0 || guest_count > 10 || plus_one_name.length > 120 || dietary_notes.length > 1000 || message.length > 2000) {
      setStatus("error"); setFeedback("Kontrollera dina uppgifter och försök igen."); return;
    }
    setStatus("sending"); setFeedback("");
    try {
      const response = await fetch(`${API_BASE}/api/rsvp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, attending, guest_count, plus_one_name, dietary_notes, message, website: String(data.get("website") || "") }) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message);
      setStatus("success"); setFeedback(result.message);
      form.reset();
    } catch (error) { setStatus("error"); setFeedback(error instanceof Error ? error.message : "Något gick fel. Försök igen."); }
  };
  return <form className="rsvp-form reveal" onSubmit={submit} noValidate={false}>
    <div className="form-heading"><span className="eyebrow">Ett tidigt svar</span><h3>Kan du vara med?</h3><p>Fyll i dina uppgifter nedan så hörs vi snart igen.</p></div>
    <div className="form-row"><label>Ditt namn <span>*</span><input name="name" type="text" autoComplete="name" minLength={2} maxLength={120} required placeholder="För- och efternamn" /></label><label>E-postadress <span>*</span><input name="email" type="email" autoComplete="email" maxLength={255} required placeholder="namn@exempel.se" /></label></div>
    <fieldset><legend>Kommer du? <span>*</span></legend><div className="radio-row"><label><input type="radio" name="attending" value="yes" checked={attending} onChange={() => setAttending(true)} /> Ja, jag kommer gärna</label><label><input type="radio" name="attending" value="no" checked={!attending} onChange={() => setAttending(false)} /> Nej, tyvärr inte</label></div></fieldset>
    {attending && <div className="form-row"><label>Antal personer totalt<select name="guest_count" defaultValue="1">{Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></label><label>Namn på medföljande<input name="plus_one_name" type="text" maxLength={120} placeholder="Om du tar med någon" /></label></div>}
    {attending && <label>Matpreferenser eller allergier<textarea name="dietary_notes" maxLength={1000} rows={2} placeholder="Berätta gärna om något vi behöver veta" /></label>}
    <label>Vill du skriva något till oss?<textarea name="message" maxLength={2000} rows={3} placeholder="En hälsning, en fråga eller bara ett hej..." /></label>
    <div className="honeypot" aria-hidden="true"><label>Webbplats<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
    <Button variant="wedding" type="submit" disabled={status === "sending"} className="submit-btn">{status === "sending" ? "Skickar..." : "Skicka mitt svar"} <ArrowRight size={17} /></Button>
    {feedback && <p role="status" className={`form-feedback ${status === "success" ? "form-success" : "form-error"}`}>{status === "success" && <Check size={18} />} {feedback}</p>}
  </form>;
}
