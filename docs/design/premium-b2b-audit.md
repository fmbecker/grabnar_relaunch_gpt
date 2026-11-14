# Premium-B2B-Redesign – Komponenten-Audit und Umsetzungsplan

Stand: 14.11.2026 · Branch: `feat/premium-b2b-redesign`

## Prüfgrundlage und Grenzen

Geprüft wurden die tatsächlichen Quelldateien auf dem Feature-Branch: `web/src/styles/global.css`, `web/src/components/Header.astro`, `web/src/components/blocks/Hero.astro`, `web/src/components/blocks/ServiceGrid.astro`, `web/src/components/blocks/Facts.astro`, `web/src/components/ui/LinkButton.astro` und `web/src/components/ui/Picture.astro`, außerdem `docs/06-design.md` und `docs/PROJECT-CONTEXT.md`.

Dies ist ein **Code- und Design-Audit**, keine visuelle Browserabnahme. Aktuelle Screenshots, lokale Rendering-Tests und Lighthouse-Messungen für den Feature-Branch liegen noch nicht vor. Die erfolgreiche `main`-CI ist nur die technische Ausgangsbasis.

## Befunde

| Priorität | Bereich | Ist-Zustand im Code | Design-Aufgabe |
| --- | --- | --- | --- |
| P1 | Hero | Blaues Raster mit 7/5-Spalten, Manrope-Headline, Motto, CTAs, diagonal beschnittenem Bild/Fallback | Foto als Hauptträger der Premium-Anmutung prüfen; Fokuspunkt, mobile Bildhöhe und Zeilenumbrüche bei 390/1440 px visuell abstimmen |
| P1 | Header | Weißer Sticky-Header, sieben Navigationspunkte, Dropdowns, responsiver Telefon-CTA, mobiles Details-Menü | Logo-/Nav-Gewichtung und Abstände überprüfen; aktive Zustände und Dropdown-Interaktion auf Tastatur/Mobilgeräten testen |
| P1 | ServiceGrid | Vier alternierende Bild-Text-Reihen, 4:3-Bilder, Nummerierung, Links zu Leistungen | Einheitliche Bilddramaturgie und Textlängen; vertikalen Rhythmus und Informationshierarchie optimieren |
| P1 | Facts | Blaue Faktenleiste mit flex-wrap und gleichartiger Typografie für alle Items | 390-px-Umbrüche, visuelle Trennung und Lesereihenfolge prüfen, ohne unbestätigte Zahlen hinzuzufügen |
| P2 | Buttons | Gemeinsame Primary/Secondary-Klassen; LinkButton bewahrt Umami-Tracking | Fokus-, Hover-, Kontrast- und Dark-Surface-Varianten in allen Kontexten testen |
| P2 | Bilder | Wagtail-Renditions, srcset, responsive sizes und eager Hero vorhanden | LCP und Crop/Fokuspunkt prüfen; keine direkten externen Bild-URLs |
| P2 | Typografie | Manrope 800 selbst gehostet, Arial Body, fluid display/title, 1280-px-Container | Optische Größenbalance, Satzlängen und Kontrast pro Breakpoint validieren |

## Verbindliche Designrichtung

- Premium-B2B für Gewerbe, Industrie, Büros und Immobilien; sachlich, souverän, visuell präzise.
- Bestehendes Corporate Design beibehalten: `#2D78BC` als Markenblau, `#005A96` als Akzent, `#8BC1E5` als ergänzende Markenfarbe.
- Typografie: Manrope 800 für Überschriften, Arial für Fließtext. Keine externen Font-Requests.
- Designlinie B (Handwerk & Präsenz) weiterentwickeln, **kein** neuer konkurrierender Stil.
- Flächige Bilder und kontrollierter Weißraum statt Schatten, dekorativer Karten und unnötiger Animationen.
- Inhaltliche Unternehmensbehauptungen ausschließlich aus bestätigten Quellen. Keine Privatkundenansprache.

## Nächster Implementierungsschnitt

1. **Baseline reproduzieren:** `main` und Feature-Branch bei 390 px und 1440 px rendern; Startseite, Kategorie, Leistung, Kontakt vergleichen. Screenshots unter `docs/design/premium-b2b/` ablegen.
2. **Design-Tokens gezielt justieren:** Erst nach Sichtprüfung in `global.css`; Kontraste und Breakpoints dokumentieren.
3. **Startseiten-Hero verfeinern:** Layout, Bildkomposition, Textbreiten, CTA-Gewichtung und mobile Reihenfolge. Vorhandene `HeroValue`-Schnittstelle beibehalten, sofern keine neue CMS-Anforderung nachgewiesen ist.
4. **Header und Facts abstimmen:** Navigation, Telefon-CTA, Faktenrhythmus, responsive Darstellung.
5. **ServiceGrid optimieren:** Wechselnde Bild-Text-Reihen, Abstände, Lesbarkeit und verlässliche mobile Anordnung.
6. **Prüfen vor Commit:** `pnpm lint && pnpm check && pnpm build && pnpm check:tracking`, dazu Lighthouse/axe und 390/1440-px-Screenshots. Wenn ein Wagtail-Block verändert wird, CMS-Block, TypeScript-Typ und Astro-Komponente synchron anpassen und CMS-Tests ausführen.

## Abnahmekriterien

- Corporate Design, vorhandene Unternehmensinhalte, Umami-Events und CMS-Anbindung erhalten.
- Keine horizontale Scrollleiste bei 390 px; Header bei 1024 px ohne Überlauf; Touch-Ziele mindestens 44 px.
- WCAG 2.1 AA, axe 0 Verstöße; Lighthouse-Ziel mobil 100/100/100/100 (Messwert, nicht ungeprüft behaupten).
- Keine externen CDNs/Fonts; Bilder aus Wagtail-Renditions; `prefers-reduced-motion` respektiert.
- Redesign ausschließlich im Workspace-Feature-Branch; kein Deployment, kein Eingriff in `grabnar_relaunch`.

## Visueller Regressionstest – 14.11.2026

Die CI erzeugt über `web/scripts/screenshots.mjs` Screenshots bei 390 und 1440 px. Verglichen wurden die Artefakte der Web-Läufe für `ebb0aea` (Baseline vor der mobilen ServiceGrid-Verdichtung) und `0558fd6` (danach), jeweils aus derselben Seed-CMS-Testumgebung.

| Seite / Breite | Vorher | Nachher | Differenz |
| --- | ---: | ---: | ---: |
| Startseite 390 px | 7633 px | 7226 px | −407 px (−5,3 %) |
| Startseite 1440 px | 6336 px | 6288 px | −48 px (−0,8 %) |
| Gebäudereinigung 390/1440 px | unverändert | unverändert | pixelidentisch |
| Kontakt 390/1440 px | unverändert | unverändert | pixelidentisch |

**Ergebnis:** Die mobile Verdichtung wirkt auf die gewünschte Seite und reduziert die Scrolllänge deutlich. Diese Messung ersetzt keine manuelle Qualitätsabnahme von Typografie, Fotografie und visueller Hierarchie. Beide CI-Läufe sind erfolgreich; die Screenshots sind als GitHub-Actions-Artefakt `responsive-screenshots` verfügbar.

## Bildkonzept für die nächste Iteration

**Ziel:** Der visuelle Schwerpunkt soll auf der konkreten Arbeit und Materialqualität liegen, nicht auf abstrakten Gebäudesilhouetten. Die aktuellen `BrandPattern`-Flächen bleiben ein technisch robuster Fallback, bis freigegebenes Bildmaterial vorliegt.

| Einsatz | Motivrichtung | Bildausschnitt | Anforderungen |
| --- | --- | --- | --- |
| Startseiten-Hero | Moderne Gewerbeimmobilie mit nachvollziehbarer Dienstleistungssituation | Weit, klare Architektur, freie Fläche für das Layout | Keine sichtbaren Marken, keine erfundenen Grabnar-Teams; Foto muss auf 390 und 1440 px funktionieren |
| Gebäudereinigung | Fachgerechte Unterhalts- oder Glasreinigung in Büro-/Gewerbeobjekten | Handlungsnah, Werkzeuge und Oberflächen sichtbar | Schutzkleidung und Arbeitsabläufe plausibel, keine erkennbaren Personen ohne Freigabe |
| Gebäudedienste | Technischer Gebäudebetrieb und Objektpflege | Räumliche Tiefe, sachliche Details | Nicht als Sicherheitsdienst nach §34a darstellen |
| Handwerk | Präzise Ausführung von Fliesen-, Maler- oder anderen belegten Gewerken | Detail und Materialtextur | Keine unrealistischen Werkzeuge oder fehlerhaften Bauteilanschlüsse |
| Weitere Leistungen | Je nach tatsächlich dokumentiertem Leistungsumfang | Einheitlicher fotografischer Stil | Keine zusätzlichen Leistungsversprechen erfinden |

### Bildregeln

1. Natürliches Tageslicht, kühle neutrale Blau-Grau-Palette, realistische Materialien und Perspektiven.
2. Echte freigegebene Firmenfotografie bevorzugen. Generierte Bilder nur als **Illustrations- bzw. Konzeptmotive** kennzeichnen und vor einer produktiven Verwendung gesondert freigeben.
3. Keine Schrift, Wasserzeichen, Logos, erkennbaren Gesichter oder fremden Marken im Motiv.
4. Für Hero und ServiceGrid passende Bildausschnitte in Wagtail hinterlegen und über vorhandene Renditions ausgeben; Fokuspunkt für Mobilansichten kontrollieren.
5. Alt-Texte beschreiben den tatsächlich sichtbaren Inhalt, nicht die gewünschte Werbebotschaft. Dekorative Platzhalter bleiben `aria-hidden`.
6. Keine externen Bild-CDNs oder Stock-URLs direkt im Frontend einbinden.

### Freigabekriterium

Vor dem Austausch der Platzhalter müssen Herkunft, Nutzungsrechte, Aussagekraft und CMS-Integration jedes Bildes geprüft sein. Bis dahin ist die bestehende Illustration eine bewusste, transparente Zwischenlösung.
