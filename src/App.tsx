import { useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/logo-mark.png";
import couple from "@/assets/couple.jpg";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const OSA_EMAIL = "carrowillegotland2027@gmail.com";

const nav = [
  ["Hem", "hem"], ["OSA", "osa"], ["Program", "program"],
  ["Plats", "plats"], ["Klädkod", "kladkod"], ["Boende", "boende"],
] as const;

const schedule = [
  { name: "Fredag", date: "6 augusti", events: [["18.30–22.30", "Välkomstmingel på Smakrike krog & Logi"]] },
  { name: "Lördag", date: "7 augusti", events: [["13.30", "Bussar avgår från Ljugarn"], ["14.00", "Vigsel i Lau kyrka"], ["15.30", "Bussar avgår från Lau kyrka"], ["16.00", "Drink & lekar"], ["18.00", "Middag"], ["22.15", "Fest"], ["00–03", "Bussar / taxi hemåt"]] },
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
  const [active, setActive] = useState<string>("hem");
  const countdown = useCountdown();
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const current = nav.filter(([, id]) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 120).at(-1);
      setActive(current?.[1] ?? "hem");
    };
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
      <a href="#hem" className="nav-mark" aria-label="Caroline och William, till toppen"><img src={logoMark} alt="" /></a>
      <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`} aria-label="Huvudmeny">
        {nav.map(([label, id]) => <a key={id} href={`#${id}`} className={active === id ? "nav-active" : undefined} aria-current={active === id ? "location" : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <span className="nav-date">6–7 aug 2027</span>
      <Button variant="ghost" size="icon" className="nav-toggle" aria-label={menuOpen ? "Stäng meny" : "Öppna meny"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </header>

    <main>
      <section id="hem" className="hero" aria-labelledby="hero-title">
        <div className="hero-text">
          <p className="eyebrow hero-eyebrow">Vi ska<br />gifta oss</p>
          <h1 id="hero-title">Caroline<br /><span>&</span> William</h1>
          <p className="hero-date">Gotland<br />6–7 augusti 2027</p>
          <a href="#valkommen" className="text-link hero-scroll">Scrolla vidare <ArrowDown size={14} /></a>
        </div>
        <div className="hero-panel"><img src={couple} alt="Caroline och William framför en solnedgång" /></div>
      </section>

      <section id="valkommen" className="intro split section-pad">
        <div className="split-head reveal">
          <p className="eyebrow">Vi ska gifta oss!</p>
          <h2 className="block-title">Hej favoritmänniskor!</h2>
        </div>
        <div className="split-body reveal">
          <p>Äntligen är det dags – vi ska gifta oss!</p>
          <p>Det betyder allt för oss att få samla våra nära och kära på Gotland för en hel helg av firande. Här på hemsidan hittar ni alla detaljer om programmet och annat som är bra att veta inför resan.</p>
          <p>Snälla glöm inte att OSA senast den 29 maj så vi vet om ni firar med oss. Vi längtar efter er!</p>
        </div>
      </section>

      <section className="countdown-band" aria-label="Nedräkning till bröllopet">
        <div className="countdown-inner reveal">
          <div className="countdown-heading"><span className="eyebrow">Vi räknar dagarna</span><p>Snart ses vi på Gotland.</p></div>
          <div className="countdown-values">{countdown.map((value, i) => <div className="countdown-unit" key={i}><strong>{String(value).padStart(2, "0")}</strong><span>{["dagar", "timmar", "minuter", "sekunder"][i]}</span></div>)}</div>
        </div>
      </section>

      <section id="osa" className="rsvp section-pad"><RsvpForm /></section>

      <section id="program" className="program">
        <div className="program-intro reveal">
          <p className="eyebrow">Två dagar att minnas</p>
          <h2 className="block-title">Helgens program</h2>
          <p>En helg fylld med kärlek, skratt, dans och kanske en lek eller två. Vi har fått nöjet av att få styra bröllopsfest i en regi på det fina, lantliga och bäst-i-fest säkrade Hajdeby gårds party lada!</p>
          <p>Basecamp med fredags chill-krök och avgång för diverse färdmedel har vi lagt i hippie-byn Ljugarn där vi reserverat hotellrum för dom som vill.</p>
          <p>Toast mästarna för helgen är inga mindre än Victor ”Pson” och Mikaela Lindén som utlovat inget mindre än en 2+ kväll!</p>
        </div>
        <div className="program-panel reveal">
          {schedule.map(day => <div className="program-day" key={day.name}>
            <h3>{day.name}<span>{day.date}</span></h3>
            <span className="day-dash" aria-hidden="true" />
            <ul>{day.events.map(([time, label]) => <li key={time}><time>{time}</time><span>{label}</span></li>)}</ul>
          </div>)}
          <p className="program-note">Tiderna är preliminära – slutliga detaljer kommer med inbjudan.</p>
        </div>
      </section>

      <section id="plats" className="place columns section-pad">
        <div className="column reveal"><p className="eyebrow">Östersjöns pärla</p><h2 className="block-title">Vi ses på Gotland</h2><p>En sommarhelg på ön, med havet nära och tid att vara tillsammans. Vigseln är planerad i Lau kyrka och lördagens bussar avgår från Ljugarn.</p></div>
        <div className="column reveal"><h3 className="block-title">Hitta hit</h3><p>Res med färja till Visby från Nynäshamn eller Oskarshamn, eller flyg till Visby flygplats.</p><a className="text-link" href="https://www.destinationgotland.se/" target="_blank" rel="noopener noreferrer">Boka färja <ArrowUpRight size={14} /></a></div>
        <div className="column reveal"><h3 className="block-title">Lau kyrka</h3><p>Vigseln äger rum i Lau kyrka på sydöstra Gotland. Mer om transporterna kommer i inbjudan.</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Lau+kyrka+Gotland" target="_blank" rel="noopener noreferrer">Visa på karta <ArrowUpRight size={14} /></a></div>
      </section>

      <section id="kladkod" className="dress split section-pad">
        <div className="split-head reveal"><p className="eyebrow">Vad ska jag ha på mig?</p><h2 className="block-title">Klädkod</h2></div>
        <div className="split-body reveal"><h3 className="block-title">Festlig sommarelegans</h3><p>Klä dig fint men somrigt – tänk ljusa tyger, sommarklänningar och kostym utan slips. Vigseln är i kyrka och festen i en lada på landet, så välj gärna skor som klarar både gräs och dansgolv.</p><p>Gotländska augustikvällar kan bli svala, så ta med en tröja eller sjal till kvällen.</p></div>
      </section>

      <section id="boende" className="stay split section-pad">
        <div className="split-head reveal"><p className="eyebrow">Gör en helg av det</p><h2 className="block-title">Boende på ön</h2><p>Augusti är en eftertraktad tid på Gotland. Vi rekommenderar att boka ert boende i god tid.</p><p className="stay-note">Konkreta boendetips och praktisk information kommer i höst.</p></div>
        <div className="split-body reveal"><h3 className="block-title">Ljugarn</h3><p>Gotlands pärla om ni frågar oss med stränder så långt ögat når, röj på det legendariska Bruna dörren och en minigolfbana där Carro vann över William senast det spelades.</p><p>Vi har förreserverat rum på Strandlogiet som man kan boka <a className="inline-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">här</a>.</p><p>Är man mer inne på att bo på ett ställe som kan husera en bäbis eller två så kan man även boka hemtrevliga hus i Ljugarn <a className="inline-link" href="https://www.stugknuten.com/sv/hyra-stuga/ljugarn" target="_blank" rel="noopener noreferrer">här</a>.</p></div>
      </section>

      <section className="kids split section-pad" aria-labelledby="kids-title">
        <div className="split-head reveal"><p className="eyebrow">Viktigt besked</p><h2 id="kids-title" className="block-title">Meddelande till alla barn under 5 år</h2></div>
        <div className="split-body reveal"><p>Är DU en ammande bäbis som precis har lärt dig att läsa, häng med mamma och pappa på bröllopsfirande på Gotland och njut av en full dag med härliga intryck som kommer göra att du sover gott under natten.</p><p>Är DU ett barn som börjat äta klämmisar och redan har börjat ifrågasätta samhällets sociala strukturer? Stanna hemma en helg och häng med mormor och morfar och ät godis tills du spricker, mamma och pappa är hemma inom kort!</p></div>
      </section>
    </main>
    <footer className="footer linen"><a href="#hem" className="emboss footer-mark" aria-label="Caroline och William, till toppen"><span /></a><p>Gotland · 6–7 augusti 2027</p><p className="footer-love">Med kärlek, Caroline & William</p><a href="#hem" className="text-link back-top">Till toppen ↑</a></footer>
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
    <div className="form-heading"><span className="eyebrow">Vi hoppas att du kommer</span><h3 className="block-title">OSA</h3><p>Den officiella inbjudan och OSA kommer i höst. Vill du redan nu ge oss en hint om du kan vara med? Skriv gärna här.</p><p>Fyll i dina uppgifter i formuläret nedan om du kan eller inte kan delta. OSA senast 29 maj. <strong>Det går bra att OSA genom vår bröllopsmail <a className="inline-link" href={`mailto:${OSA_EMAIL}?subject=${encodeURIComponent("OSA – Caroline & William 2027")}`}>{OSA_EMAIL}</a></strong></p></div>
    <div className="form-row"><label>Ditt namn <span>*</span><input name="name" type="text" autoComplete="name" minLength={2} maxLength={120} required placeholder="För- och efternamn" /></label><label>E-postadress <span>*</span><input name="email" type="email" autoComplete="email" maxLength={255} required placeholder="namn@exempel.se" /></label></div>
    <fieldset><legend>Kommer du? <span>*</span></legend><div className="radio-row"><label><input type="radio" name="attending" value="yes" checked={attending} onChange={() => setAttending(true)} /> Ja, jag kommer gärna</label><label><input type="radio" name="attending" value="no" checked={!attending} onChange={() => setAttending(false)} /> Nej, tyvärr inte</label></div></fieldset>
    {attending && <div className="form-row"><label>Antal personer totalt<select name="guest_count" defaultValue="1">{Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></label><label>Namn på medföljande<input name="plus_one_name" type="text" maxLength={120} placeholder="Om du tar med någon" /></label></div>}
    {attending && <label>Matpreferenser eller allergier<textarea name="dietary_notes" maxLength={1000} rows={2} placeholder="Berätta gärna om något vi behöver veta" /></label>}
    <label>Vill du skriva något till oss?<textarea name="message" maxLength={2000} rows={3} placeholder="En hälsning, en fråga eller bara ett hej..." /></label>
    <div className="honeypot" aria-hidden="true"><label>Webbplats<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
    <Button variant="wedding" type="submit" disabled={status === "sending"} className="submit-btn">{status === "sending" ? "Skickar..." : "Skicka mitt svar"} <ArrowRight size={17} /></Button>
    <p className="form-mail">Du kan också OSA via mail till <a className="inline-link" href={`mailto:${OSA_EMAIL}?subject=${encodeURIComponent("OSA – Caroline & William 2027")}`}>{OSA_EMAIL}</a>.</p>
    {feedback && <p role="status" className={`form-feedback ${status === "success" ? "form-success" : "form-error"}`}>{status === "success" && <Check size={18} />} {feedback}</p>}
  </form>;
}
