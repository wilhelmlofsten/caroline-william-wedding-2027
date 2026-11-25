import { useEffect, useState, type FormEvent } from "react";
import cwMonogram from "@/assets/cw-monogram.png";
import heroFlower from "@/assets/hero-flower.png";

const OSA_EMAIL = "carrowillegotland2027@gmail.com";
const CEREMONY_TIME = new Date("2027-08-07T14:00:00+02:00").getTime();

function getCountdown() {
  const remaining = Math.max(0, CEREMONY_TIME - Date.now());
  return {
    done: remaining === 0,
    days: String(Math.floor(remaining / 86400000)).padStart(2, "0"),
    hours: String(Math.floor(remaining / 3600000) % 24).padStart(2, "0"),
    minutes: String(Math.floor(remaining / 60000) % 60).padStart(2, "0"),
    seconds: String(Math.floor(remaining / 1000) % 60).padStart(2, "0"),
  };
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState(getCountdown);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header>
        <a className="brand" href="#start" aria-label="Till startsidan">
          <img src={cwMonogram} alt="CW-monogram" />
        </a>
        <button
          className="menu-btn"
          id="menu-btn"
          type="button"
          aria-label="Öppna menyn"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
        <nav id="nav" className={menuOpen ? "open" : undefined}>
          <a href="#program" onClick={closeMenu}>PROGRAM</a>
          <a href="#boende" onClick={closeMenu}>Boende &amp; Resa</a>
          <a href="#vardar" onClick={closeMenu}>Helgens toastpar</a>
          <a href="#tips" onClick={closeMenu}>Våra Tips</a>
          <a href="#faq" onClick={closeMenu}>Q&amp;A</a>
          <a href="#osa" className="nav-osa" onClick={closeMenu}>O.S.A</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="start">
          <img className="hero-flower" src={heroFlower} alt="" aria-hidden="true" />
          <div className="hero-inner">
            <div className="eyebrow">Vi ska gifta oss!</div>
            <h1>
              <span>Caroline</span>
              <span>&amp; William</span>
            </h1>
            <div className="line" />
            <div className="date">6–7 augusti 2027</div>
            <div className="place">Ljugarn · Gotland</div>
            <div className="buttons">
              <a className="button" href="#program">Helgens program</a>
              <a className="button outline" href="#osa">Svara på inbjudan</a>
            </div>
          </div>
        </section>

        <div className="announcement">
          Vi hoppas att du vill vara med och fira! <strong>O.S.A. senast 29 april 2027.</strong>
        </div>

        <section className="section" id="program">
          <div className="wrap">
            <div className="program-columns">
              <div className="program-copy">
                <h2>Helgens program</h2>
                <p className="lead">
                  Vi samlar våra favoritpersoner på vår favoritö. Här är planen – resten får vi hitta på tillsammans!
                </p>
                <div className="program">
                  <div className="entry">
                    <div className="day">Fredag 6 augusti</div>
                    <div className="location">
                      Välkomstmingel på Smakrike
                      <br />
                      Krog &amp; Logi, i Ljugarn
                    </div>
                    <div className="time">18.30 – cirka 22.00</div>
                    <p className="note">
                      Vi mjukstartar helgen med något gott i glaset, lättare middag i form av fingerfood och en massa efterlängtat häng. Smakrikes bar stänger kl. 23.00, men om benen inte vill gå hem än ligger Bruna Dörren precis bredvid.
                    </p>
                  </div>
                  <div className="line" />
                  <div className="entry">
                    <div className="day">Lördag 7 augusti</div>
                    <div className="location">
                      Vigsel i Lau kyrka därefter
                      <br />
                      Middag &amp; fest på Hajdeby Södra Gård
                    </div>
                    <div className="time">14.00</div>
                    <p className="note">
                      Nu är det dags på riktigt! Bussar avgår <em>sharp 13:30</em> från Strandlogiets parkering. Efter vigseln väntar drink, middag och dans. Returbussar går 01:00 och 02:30 och vi bjuder på en standby-taxi till hotellen som går ungefär var 40:e minut fram tills 03.00.
                    </p>
                  </div>
                </div>
              </div>
              <div className="program-map" aria-label="Kartillustration över Ljugarn, Lau kyrka och Hajdeby Södra Gård">
                <GotlandMap />
              </div>
            </div>
          </div>
        </section>

        <section className="countdown" aria-label="Nedräkning till vigseln">
          <h2>Vi räknar dagarna …</h2>
          <div className="clock" role="timer" aria-live="off">
            <div>
              <div className="num" id="days">{clock.days}</div>
              <div className="lbl">Dagar</div>
            </div>
            <div>
              <div className="num" id="hours">{clock.hours}</div>
              <div className="lbl">Timmar</div>
            </div>
            <div>
              <div className="num" id="minutes">{clock.minutes}</div>
              <div className="lbl">Minuter</div>
            </div>
            <div>
              <div className="num" id="seconds">{clock.seconds}</div>
              <div className="lbl">Sekunder</div>
            </div>
          </div>
          <p className="clock-caption" id="clock-caption">
            {clock.done ? "Nu är det dags!" : "… tills vi säger ja i Lau kyrka!"}
          </p>
        </section>

        <section className="section" id="boende">
          <div className="wrap hotels">
            <div className="eyebrow">Ett stenkast från havet</div>
            <h2>Boende</h2>
            <p>
              Vi har paxat rummen på <strong>Strandlogiet</strong> och <strong>Strandvillan</strong>, så att alla kan bo nära varandra och få ännu mer tid tillsammans. Här finns både enkelrum, dubbelrum och lägenheter.
            </p>
            <p>
              Rummen är reserverade <strong>fredag 6 augusti till söndag 8 augusti 2027</strong>. Båda boendena ligger vid upphämtningsplatserna för lördagens bussar till vigseln och Hajdeby Södra Gård. Dessutom ligger Smakrike precis intill Strandlogiet – smidigare blir det knappast!
            </p>
            <p>
              Gotland är en populär sommarfavorit, så boka gärna hotell och flyg eller färja så snart ni kan. <strong>Efter 29 april släpps de förbokade rummen till allmänheten.</strong>
            </p>
            <div className="hotelbuttons">
              <a
                className="button"
                href="https://www.strandlogietljugarn.se/boka/?code=CAWI&check_in=2027-08-06&check_out=2027-08-08&target=search"
                target="_blank"
                rel="noopener noreferrer"
              >
                Boka Strandlogiet
              </a>
              <a
                className="button outline"
                href="https://www.strandvillanljugarn.se/book/sv/?code=CAWI&check_in=2027-08-06&check_out=2027-08-08&target=search"
                target="_blank"
                rel="noopener noreferrer"
              >
                Boka Strandvillan
              </a>
            </div>
            <p className="small" style={{ marginTop: 15 }}>
              Båda länkarna är förinställda på 6–8 augusti med gästkoden CAWI.
            </p>
          </div>
        </section>

        <section className="section soft" id="resa">
          <div className="wrap">
            <div className="twocol">
              <div>
                <div className="eyebrow">Vägen till firandet</div>
                <h2>Resa &amp; färdmedel</h2>
                <p>
                  En stor ö kräver lite planering. Ni bokar själva färja eller flyg till Gotland och transporten vidare till Ljugarn.
                </p>
                <p>
                  Kommer ni från Göteborg eller Skåne rekommenderar vi färjan från <strong>Oskarshamn</strong>. För er som reser från Stockholm är <strong>Nynäshamn</strong> smidigt. Bil kan även hyras på Visby flygplats.
                </p>
              </div>
              <div>
                <div className="travelrow">
                  <h3>Under helgen</h3>
                  <p>
                    Bussar avgår <em>sharp</em> från <strong>Strandlogiets parkering 13.30</strong>. Vigseln i Lau kyrka börjar <strong>14.00</strong>. Sedan fortsätter firandet på Hajdeby Södra Gård.
                  </p>
                </div>
                <div className="travelrow">
                  <h3>När dansskorna vill hem</h3>
                  <p>
                    Returbussarna avgår från Hajdeby <strong>01.00 och 02.30</strong>. Vi bjuder dessutom på en standby-taxi till de förbokade hotellen i Ljugarn under kvällen och natten, med avgångar ungefär var 40:e minut från 23.00 fram tills 03.00. Om ni bokar boende i egen logi utanför Ljugarn ber vi er att förboka taxi i egen regi (Taxi Gotland eller Taxi Visby / Taxi Kurir).
                  </p>
                  <p className="small">Exakt returhållplats och eventuella taxiinstruktioner meddelas senare.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section dresscode-green" id="kladkod">
          <div className="wrap">
            <div className="eyebrow">Färg, Festligt ledigt, Form och Finess</div>
            <h2>Klädkod</h2>
            <div className="dresscode-copy">
              <p>
                Vi kör <strong>sommarkavaj</strong> båda dagarna med lite extra finess på lördagen!
              </p>
              <p>
                Ett litet tips från oss: gräs, sand och grus är en del av charmen, så välj skor som trivs även utanför dansgolvet. Någon varmare tröja, sjal eller jacka är inte heller helt fel till kvällens svalare timmar.
              </p>
            </div>
          </div>
        </section>

        <section className="section soft" id="tips">
          <div className="wrap">
            <div className="center">
              <div className="eyebrow">Om ni har lite tid över</div>
              <h2>Våra Gotlandsfavoriter</h2>
              <p className="lead">Varför inte göra en liten semester av hela kalaset? Här är några ställen vi gärna tipsar om.</p>
            </div>
            <div className="tips">
              <div className="tip">
                <span className="n">01</span>
                <h3>En fredag i Visby</h3>
                <p>Strosa runt, ta en lunch och njut av ön innan vi ses i Ljugarn på kvällen.</p>
              </div>
              <div className="tip">
                <span className="n">02</span>
                <h3>Folhammars raukar</h3>
                <p>Ett klassiskt Gotlandsstopp precis norr om Ljugarn. Mäktiga stenar och havsluft!</p>
              </div>
              <div className="tip">
                <span className="n">03</span>
                <h3>Mullvalds strandskog</h3>
                <p>För er som hellre hittar en lugnare strand än den allra mest välbesökta.</p>
              </div>
              <div className="tip">
                <span className="n">04</span>
                <h3>Närsholmen</h3>
                <p>Ta bilen hit för en promenad bland öppna landskap och vacker natur.</p>
              </div>
              <div className="tip">
                <span className="n">05</span>
                <h3>Sudret</h3>
                <p>Stannar ni några extra dagar? Ta en utflykt längre söderut på ön och passa på att besöka Sibbjäns!</p>
              </div>
              <div className="tip">
                <span className="n">06</span>
                <h3>Ljugarn</h3>
                <p>Ät vällagade tacos på Tülls foodtruck &amp; taqueria, eller spela tennis eller padel vid Bjärkvallen.</p>
                <p>
                  Regnar det? Abonnera{" "}
                  <a href="https://bastun.foreningenljugarn.se/" target="_blank" rel="noopener noreferrer">
                    Strandbastun
                  </a>
                  , alldeles vid strandkanten bredvid Sjöviksgården.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="wrap">
            <div className="center">
              <div className="eyebrow">Det praktiska, samlat</div>
              <h2>Q&amp;A</h2>
              <p className="lead">För vi vet att det är en del att hålla reda på när man ska på bröllop på en ö.</p>
            </div>
            <div className="faqs">
              <details>
                <summary>När behöver ni svara?</summary>
                <p>
                  Senast 29 april 2027, via formuläret längre ned eller genom att mejla till{" "}
                  <a href={`mailto:${OSA_EMAIL}`}>{OSA_EMAIL}</a>.
                </p>
              </details>
              <details>
                <summary>Får barn följa med?</summary>
                <p>Barnfritt firande under hela helgen. Ammande barn? Hojta till oss – det går bra under fredagen och lördagens vigsel.</p>
              </details>
              <details>
                <summary>Hur bokar vi hotell?</summary>
                <p>Vi har förbokat rum på Strandlogiet och Strandvillan den 6–8 augusti. Använd knapparna under Boende och boka helst före 29 april.</p>
              </details>
              <details>
                <summary>Boende om jag bara kan delta på lördagen?</summary>
                <p>Efter den 29 april öppnar hotellen för allmänheten. Boka gärna då om det finns rum kvar, men skriv i bokningen att du ska på bröllopet. Är hotellen fullbokade finns det gott om andra alternativ, till exempel Villa Alskog, Havsängen eller Ardrebo B&amp;B.</p>
              </details>
              <details>
                <summary>Hur kommer vi hem från festen?</summary>
                <p>Med returbuss kl. 01.00 eller 02.30, eller vår standby-taxi till hotellen som går ungefär var 40:e minut.</p>
              </details>
              <details>
                <summary>Ska vi ta med en present?</summary>
                <p>Nej verkligen inte! Att ni vill komma och fira med oss är present nog. &lt;3</p>
              </details>
              <details>
                <summary>Vem kontaktar jag om jag vill hålla tal?</summary>
                <p>
                  Vår toastmaster Victor Pettersson eller toastmadame Mikaela Lindén. Hör av dig i förväg om du vill hålla tal eller spex – inga spontana inslag under kvällen. Mikaela (<a href="tel:0725457788">072-545 77 88</a>) &amp; Victor (<a href="tel:0760212181">076-021 21 81</a>).
                </p>
              </details>
            </div>
            <div className="contactcard" id="vardar">
              <h3>Helgens toastpar</h3>
              <p>
                Vill ni bidra med ett tal, spex eller en överraskning? Hör gärna av er till <strong>Victor Pettersson</strong>, vår toastmaster, eller <strong>Mikaela Lindén</strong>, vår toastmadame, i förväg så hjälper de er att ordna det!
              </p>
              <p className="small">
                <strong>Mikaela:</strong> <a href="tel:0725457788">072-545 77 88</a> &amp; <strong>Victor:</strong>{" "}
                <a href="tel:0760212181">076-021 21 81</a>
              </p>
            </div>
          </div>
        </section>

        <section className="section rsvp" id="osa">
          <div className="wrap twocol">
            <div>
              <div className="eyebrow">O.S.A. &amp; övrig information</div>
              <h2>Kommer du?</h2>
              <p>
                Vi hoppas såklart på ett stort, härligt JA! Svara senast <strong>29 april 2027</strong>. Ange gärna ifall ni närvarar under hela helgen eller bara kan komma på lördagen.
              </p>
              <p>
                Ta gärna med information om allergier, specialkost eller om du hellre vill ha alkoholfritt i glaset. Och om du vill svara även för din respektive går det fint.
              </p>
              <p>
                Det går även jättebra att mejla ditt O.S.A. till{" "}
                <a href={`mailto:${OSA_EMAIL}`}>{OSA_EMAIL}</a>.
              </p>
            </div>
            <RsvpForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src={cwMonogram} alt="CW-monogram" />
        <h3>Caroline &amp; William</h3>
        <p>6–7 augusti 2027 · Gotland</p>
        <p>
          <a href={`mailto:${OSA_EMAIL}`}>{OSA_EMAIL}</a>
        </p>
        <p>www.carolinewilliamgotland.com</p>
      </footer>
    </>
  );
}

function GotlandMap() {
  return (
    <svg
      viewBox="0 0 620 590"
      role="img"
      aria-label="Illustrerad östkust på Gotland med Hajdeby Södra Gård i norr, Ljugarn vid kusten och Lau kyrka sydväst om Ljugarn."
    >
      <defs>
        <linearGradient id="fade-x" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="black" />
          <stop offset=".14" stopColor="white" />
          <stop offset=".90" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </linearGradient>
        <linearGradient id="fade-y" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="black" />
          <stop offset=".13" stopColor="white" />
          <stop offset=".90" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </linearGradient>
        <mask id="paper-edge-fade" maskUnits="objectBoundingBox">
          <rect width="620" height="590" fill="url(#fade-x)" />
          <rect width="620" height="590" fill="url(#fade-y)" style={{ mixBlendMode: "multiply" }} />
        </mask>
      </defs>
      <g mask="url(#paper-edge-fade)">
        <path
          d="M0 0 H450 C438 27 442 46 451 65 C467 65 474 55 482 42 C491 48 495 62 492 77 C498 94 516 103 520 114 C541 107 559 117 562 133 C570 143 582 142 594 150 C615 164 621 193 610 214 C604 225 590 242 576 247 C569 259 572 277 559 279 C547 276 547 257 535 244 C523 235 513 240 505 253 C498 272 499 280 488 292 C483 307 482 326 470 341 C460 353 444 360 427 372 C423 398 413 411 398 423 C379 450 370 458 354 480 C337 510 332 538 318 590 H0Z"
          fill="#fafbf9"
          opacity=".48"
        />
        <path
          d="M450 0 C438 27 442 46 451 65 C467 65 474 55 482 42 C491 48 495 62 492 77 C498 94 516 103 520 114 C541 107 559 117 562 133 C570 143 582 142 594 150 C615 164 621 193 610 214 C604 225 590 242 576 247 C569 259 572 277 559 279 C547 276 547 257 535 244 C523 235 513 240 505 253 C498 272 499 280 488 292 C483 307 482 326 470 341 C460 353 444 360 427 372 C423 398 413 411 398 423 C379 450 370 458 354 480 C337 510 332 538 318 590"
          fill="none"
          stroke="#aab7ac"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#cbd4c9" strokeWidth="1.10" strokeLinecap="round" strokeLinejoin="round">
          <path d="M149 496 Q172 456 218 424 Q260 399 294 365 Q340 334 400 319" />
          <path d="M400 319 Q381 273 354 247 Q332 208 320 171 Q349 134 380 116 Q399 103 422 89" />
          <path d="M320 171 Q261 197 222 210 Q158 223 99 204 L0 184" />
          <path d="M149 496 Q110 467 70 454 Q35 445 0 445" />
        </g>
        <g fill="none" stroke="#aab7ac" strokeLinecap="round" strokeLinejoin="round" opacity=".19">
          <path
            d="M454 5 C444 28 446 44 455 61 M488 51 C496 66 490 75 498 89 M566 135 C572 149 588 143 599 160 M603 220 C598 231 586 241 579 245 M533 246 C518 238 510 249 508 260 M486 300 C478 323 475 339 459 354 M424 377 C416 394 414 411 399 425 M355 483 C344 508 333 536 322 563"
            strokeWidth=".9"
          />
        </g>
        <g fill="none" stroke="#bec9bd" strokeLinecap="round" opacity=".14" strokeWidth=".85">
          <path d="M144 498 Q169 457 215 425 Q260 401 295 368 M401 322 Q379 275 350 248 Q334 208 321 172 M316 173 Q260 199 224 213 Q160 225 112 208" />
        </g>
      </g>
      <g fill="#b7573c" stroke="#ffffff" strokeWidth="3.5">
        <circle cx="422" cy="89" r="8" />
        <circle cx="400" cy="319" r="8" />
        <circle cx="149" cy="496" r="8" />
      </g>
      <g fill="#292b26" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="25" fontWeight="600">
        <text x="405" y="62" textAnchor="end">Hajdeby Södra Gård</text>
        <text x="378" y="306" textAnchor="end">Ljugarn</text>
        <text x="170" y="497">Lau kyrka</text>
      </g>
    </svg>
  );
}

function isYesNo(value: string): value is "Ja" | "Nej" {
  return value === "Ja" || value === "Nej";
}

function RsvpForm() {
  const [withPartner, setWithPartner] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const fri = String(data.get("fri") || "").trim();
    const sat = String(data.get("sat") || "").trim();
    const food = String(data.get("food") || "").trim();
    const noalc = String(data.get("noalc") || "").trim();
    const pname = String(data.get("respektive_namn") || "").trim();
    const pfri = String(data.get("pfri") || "").trim();
    const psat = String(data.get("psat") || "").trim();
    const pfood = String(data.get("pfood") || "").trim();
    const palc = String(data.get("palc") || "").trim();
    const note = String(data.get("note") || "").trim();

    const invalidGuest =
      name.length < 2 ||
      name.length > 120 ||
      email.length > 255 ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      !isYesNo(fri) ||
      !isYesNo(sat) ||
      food.length > 1000 ||
      note.length > 2000;
    const invalidPartner =
      withPartner &&
      (pname.length < 2 || pname.length > 120 || !isYesNo(pfri) || !isYesNo(psat) || pfood.length > 1000);

    if (invalidGuest || invalidPartner) {
      setStatus("error");
      setFeedback("Kontrollera dina uppgifter och försök igen.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    const payload: Record<string, string> = {
      _subject: withPartner ? `OSA: ${name} & ${pname}` : `OSA: ${name} (Fre: ${fri}, Lör: ${sat})`,
      _template: "table",
      _replyto: email,
      _honey: String(data.get("website") || ""),
      Namn: name,
      "E-post": email,
      "Fredag (6 aug)": fri,
      "Lördag (7 aug)": sat,
      "Allergier / specialkost": food || "–",
      Alkoholfritt: noalc || "Nej / inga särskilda önskemål",
      "O.S.A. för respektive": withPartner ? "Ja" : "Nej",
    };

    if (withPartner) {
      payload["Respektives namn"] = pname;
      payload["Respektive – Fredag (6 aug)"] = pfri;
      payload["Respektive – Lördag (7 aug)"] = psat;
      payload["Respektive – Specialkost"] = pfood || "–";
      payload["Respektive – Alkoholfritt"] = palc || "Nej / inga särskilda önskemål";
    }
    payload["Hälsning"] = note || "–";

    try {
      const response = await fetch(`https://formsubmit.co/ajax/77da6cb8c26555171dd6254e97c71074`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) !== "true") throw new Error();
      setStatus("success");
      setFeedback("Tack! Ditt svar är skickat till oss.");
      form.reset();
      setWithPartner(false);
    } catch {
      setStatus("error");
      setFeedback(`Något gick fel. Försök igen eller mejla oss på ${OSA_EMAIL}.`);
    }
  };

  return (
    <form className="rsvpform" id="rsvpform" onSubmit={submit}>
      <div className="sub">Dina uppgifter</div>
      <label htmlFor="name">För- och efternamn *</label>
      <input id="name" name="name" autoComplete="name" minLength={2} maxLength={120} required placeholder="Vad heter du?" />
      <label htmlFor="email">E-post *</label>
      <input id="email" name="email" type="email" autoComplete="email" maxLength={255} required placeholder="din@epost.se" />
      <label htmlFor="fri">Kommer du på fredagen? *</label>
      <select id="fri" name="fri" required defaultValue="">
        <option value="">Välj</option>
        <option value="Ja">Ja</option>
        <option value="Nej">Nej</option>
      </select>
      <label htmlFor="sat">Kommer du på lördagen? *</label>
      <select id="sat" name="sat" required defaultValue="">
        <option value="">Välj</option>
        <option value="Ja">Ja</option>
        <option value="Nej">Nej</option>
      </select>
      <label htmlFor="food">Allergier eller specialkost</label>
      <textarea id="food" name="food" maxLength={1000} rows={2} placeholder="Något vi ska tänka på?" />
      <label htmlFor="noalc">Önskar du alkoholfritt?</label>
      <select id="noalc" name="noalc" defaultValue="Nej / inga särskilda önskemål">
        <option value="Nej / inga särskilda önskemål">Nej / inga särskilda önskemål</option>
        <option value="Ja tack!">Ja tack!</option>
      </select>

      <div className="sub">O.S.A. för din respektive</div>
      <label className="toggle" htmlFor="withpartner">
        <input
          id="withpartner"
          type="checkbox"
          checked={withPartner}
          onChange={(event) => setWithPartner(event.target.checked)}
        />
        Ja, jag vill även O.S.A. för min respektive
      </label>
      <div className="partner" id="partner" hidden={!withPartner}>
        <p style={{ margin: "0 0 14px", fontSize: 13 }}>Fyll i din respektives namn och vilka dagar hen kommer.</p>
        <label htmlFor="pname">Respektives för- och efternamn *</label>
        <input
          id="pname"
          name="respektive_namn"
          autoComplete="off"
          minLength={withPartner ? 2 : undefined}
          maxLength={120}
          required={withPartner}
          placeholder="För- och efternamn"
        />
        <label htmlFor="pfri">Kommer din respektive på fredagen? *</label>
        <select id="pfri" name="pfri" required={withPartner} defaultValue="">
          <option value="">Välj</option>
          <option value="Ja">Ja</option>
          <option value="Nej">Nej</option>
        </select>
        <label htmlFor="psat">Kommer din respektive på lördagen? *</label>
        <select id="psat" name="psat" required={withPartner} defaultValue="">
          <option value="">Välj</option>
          <option value="Ja">Ja</option>
          <option value="Nej">Nej</option>
        </select>
        <label htmlFor="pfood">Respektives specialkost</label>
        <textarea id="pfood" name="pfood" maxLength={1000} rows={2} />
        <label htmlFor="palc">Önskar din respektive alkoholfritt?</label>
        <select id="palc" name="palc" defaultValue="Nej / inga särskilda önskemål">
          <option value="Nej / inga särskilda önskemål">Nej / inga särskilda önskemål</option>
          <option value="Ja tack!">Ja tack!</option>
        </select>
      </div>

      <label htmlFor="note">Något mer ni vill hälsa?</label>
      <textarea id="note" name="note" maxLength={2000} rows={3} placeholder="Vi blir glada för en liten hälsning också!" />

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Webbplats</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Skickar..." : "Skicka O.S.A."}
      </button>
      {feedback && (
        <div className={`status ${status === "error" ? "error" : ""}`} role="status">
          {feedback}
        </div>
      )}
    </form>
  );
}
