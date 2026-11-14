# Projektkontext – M. B. Grabnar GmbH

> Arbeitsgrundlage für alle weiteren Arbeiten in diesem Workspace. Diese Datei fasst die geprüften Projektentscheidungen aus dem Quellrepository zusammen. Bei Widersprüchen gelten die unten beschriebene Priorität und die jeweils neueste bestätigte Entscheidung.

## 1. Repository-Regeln und Herkunft

- **Workspace und einziges Schreibziel:** `fmbecker/grabnar_relaunch_gpt`.
- **Quellrepository:** `fmbecker/grabnar_relaunch`. Ausschließlich lesen. Dort niemals Dateien ändern, Commits erstellen, Branches anlegen oder PRs verändern.
- Geprüfter Quellstand: Branch `main`, Commit `96c9acc66b29f43ac3ecec6f4cb059551881b02c` (Merge-Commit vom 01.11.2026).
- Beim Review enthielt die Quelle 288 Dateien, darunter 36 Binärdateien.
- Der Workspace war zu Beginn dieses Transfers praktisch leer. **Aktualisierung 14.11.2026:** Der vollständige ursprüngliche Projektstand einschließlich Anwendungscode, Assets und Git-Historie wurde über Integrationsbranch `integrate/source-main-2026-11-13` und Pull Request #1 in den Workspace übernommen. Die ursprüngliche README liegt zusätzlich unter `docs/SOURCE-README.md`; die Workspace-README und `AGENTS.md` blieben erhalten.
- Import-Merge auf `main`: `0012391699596ddb3c26b9b524a305c75aa44947` (14.11.2026). CMS- und Web-Workflows auf `main` waren erfolgreich; das CMS-Container-Image konnte nach Korrektur der GHCR-Paketberechtigung veröffentlicht werden.
- Aktiver Redesign-Arbeitsbranch: `feat/premium-b2b-redesign`, aus diesem `main`-Stand erstellt. `main` bleibt bis zur geprüften Freigabe unangetastet.
- Vor Änderungen am Workspace zuerst dessen aktuellen Branch, Dateibaum und letzte Commits prüfen. Quelländerungen nach dem oben genannten SHA separat vergleichen und nur nach bewusster Entscheidung übernehmen.

## 2. Produkt und Zielgruppen

Website-Relaunch für **M. B. Grabnar Gebäudereinigungs- und Handwerker-Service GmbH** (`M. B. Grabnar GmbH`), Stuttgart und Region.

Primäre Zielgruppe: Hausverwaltungen, Facility-Verantwortliche und Geschäftsführer kleiner und mittlerer Unternehmen. Sie suchen einen zuverlässigen Dienstleister für ihr Objekt, wollen Leistungen und Qualitätsnachweise schnell prüfen und bevorzugen häufig den direkten Anruf.

Sekundäre Zielgruppe: Bewerber, insbesondere Reinigungskräfte, Vorarbeiter und Objektleitungen.

**Keine Privatkunden ansprechen.** Keine Inhalte zu Privathaushalten, Privatwohnungen oder Privatumzügen.

Produktziele:
1. Gewerbliche Anfragen und Anrufe erzeugen; Kontakt muss auf jeder Seite schnell erreichbar sein.
2. Bewerbungen ermöglichen: externe Stellenangebote über Europersonal und zusätzlich eine eigene Initiativbewerbung.
3. Inhalte sollen von Redakteuren in Wagtail pflegbar sein.
4. Schnelle, barrierearme, SEO-fähige Website mit wartbarer Architektur.

Markenleitgedanke: „Zusammenkommen ist der Anfang – Zusammenarbeiten ist der Erfolg.“

Ton: Deutsch, Sie-Form, sachlich-direkt, knapp und ohne unbelegte Werbeversprechen.

## 3. Bestätigte Unternehmensangaben und Inhaltsgrenzen

Dürfen verwendet werden:
- Meisterbetrieb des Gebäudereinigerhandwerks.
- Zertifizierung nach ISO 9001 und ISO 14001.
- Erlaubnis zur Arbeitnehmerüberlassung (AÜG).
- Maurerarbeiten gehören zum Angebot.
- Bodenversiegelung ohne Einschränkung auf bestimmte Bodenarten.
- Bezeichnung „Desinfektion nach IfSG §17/3“ ist laut Firma korrekt.
- Positionierung: Reinigung, Gebäudedienste und Handwerkerleistungen aus einer Hand; inhabergeführt und regional im Raum Stuttgart.

**Strikt nicht erwähnen:** Die Bewachungserlaubnis nach § 34a GewO. Sie ist zwar vorhanden, soll aber nicht auf der Website aufgeführt werden.

Keine erfundenen Gründungsjahre, Mitarbeiterzahlen, Kunden, Referenzen, Testimonials, Logos oder sonstige Kennzahlen. Keine neuen Unternehmensbehauptungen ohne Bestätigung. Vorhandene Texte und redaktionelle Freigaben sind in den Quelldokumenten dokumentiert.

## 4. Informationsarchitektur

Vier Leistungskategorien mit insgesamt 22 Leistungen:

- `/gebaeudereinigung/` (9): baureinigung, containerreinigung, desinfektion, glasreinigung, grundreinigung, industriereinigung, sonderreinigung, polsterreinigung, unterhaltsreinigung.
- `/gebaeudedienste/` (3): gruenanlagenpflege, hausmeisterdienste, winterdienst.
- `/handwerkerdienste/` (6): bauhilfsarbeiten, bodenverlegerarbeiten, fliesenlegerarbeiten, malerarbeiten, trockenbau, bodenversiegelung.
- `/services/` (4): entruempelung, arbeitnehmerueberlassung, transportarbeiten, wachdienste.

Weitere Seiten: Startseite, Unternehmen, Karriere, Kontakt, Impressum, Datenschutz, AGB. Karriere ersetzt die alte leere Seite `/stellenangebote/`. Kontaktformular-Duplikate und die alte Danke-Seite werden auf `/kontakt/` umgeleitet.

Die Datei `docs/redirects.csv` im Quellrepository enthält die Alt-zu-Neu-Weiterleitungen. Die dortige Struktur umfasst 28 Weiterleitungen (zusätzlich zu unveränderten URLs).

## 5. Technik – beschlossene Zielarchitektur

Monorepo mit zwei fachlich getrennten Anwendungen:

### CMS / Backend – `cms/`
- Python mindestens 3.12.
- Wagtail 7.4 LTS, Django 5.2 LTS (laut Aufgabenstand; genaue Pins in `cms/pyproject.toml` des Quellstands).
- PostgreSQL 16, Paketverwaltung `uv`.
- Headless Wagtail API v2 unter `/api/v2/`.
- Seitentypen: HomePage, StandardPage, ServiceIndexPage, ServicePage, JobIndexPage, JobPage.
- Gemeinsame StreamField-Blöcke in `cms/blocks/`.
- Eigene Site Settings für Kontakt, Footer und Tracking.
- Eigene Form-Endpunkte: Kontakt und Bewerbung; Speicherung im CMS-Admin und E-Mail-Benachrichtigung.
- Bewerbungsupload: maximal 10 MB, PDF/DOCX. Spam-Schutz ohne externes CAPTCHA.
- Headless Preview mit Setting `WAGTAIL_HEADLESS_PREVIEW`.

### Frontend – `web/`
- Astro (Aufgabenstand: Astro 7), statischer Build / SSG.
- Tailwind CSS 4.
- React 19 ausschließlich für interaktive Islands (z. B. Kontakt-/Bewerbungsformular, Jobfilter, Galerie-Lightbox).
- Wagtail-API-Client und Blocktypen in `web/src/lib/`.
- Bilder ausschließlich über Wagtail-Renditions, responsive `srcset`.
- Eine SSR-Route für Redaktionsvorschau unter `/preview/`; sonst statisch.
- SEO: Metadaten, Sitemap, strukturierte Daten (LocalBusiness, JobPosting).

### Hosting / Betrieb
- Bestehender Linode-VPS; kein geplanter DNS-Wechsel.
- Nginx liefert statisches Frontend aus und proxyt CMS/API sowie Preview.
- CMS in Docker Compose mit PostgreSQL.
- Wagtail-Publish-Signal triggert den Frontend-Build über einen lokalen Webhook.
- CMS-Admin durch IP-Allowlist/VPN oder vorgeschaltete Basic-Auth schützen.
- Umami self-hosted, cookiefrei; keine personenbezogenen Daten oder Formularinhalte tracken.

### Kritischer Block-Vertrag
Jeder StreamField-Block muss synchron existieren in:
1. `cms/blocks/blocks.py`
2. `web/src/lib/types.ts`
3. genau einer passenden Komponente unter `web/src/components/blocks/`

Bei Blockänderungen alle drei Stellen gemeinsam anpassen, CMS-Tests und Migrationen ausführen. Keine isolierte Änderung nur auf einer Seite.

## 6. Designentscheidungen – neueste bestätigte Fassung

Die spätere Entscheidung in `docs/06-design.md` hat Vorrang vor älteren offenen Punkten im Briefing.

- Gewählt: **Aufbau von Entwurf B**, handwerklich-präsent, selbstbewusst und hochwertig.
- Dunkle Flächen: Markenblau `#2D78BC`.
- Akzent: `#005A96` (bestätigt am 31.10.2026); Logo-Hellblau `#8BC1E5` bleibt Teil der Markenskala, ist aber nicht der Akzent.
- Überschriften: Manrope 800, selbst gehostet.
- Fließtext: Arial.
- Logo: helle und weiße Variante; weiße Variante auf blauen Flächen.
- Keine externen Fonts, CDNs oder sonstigen externen Requests.
- Bild-Fallback: `BrandPattern.astro` mit dem Turm-Motiv aus dem Logo. Fotos später durch echte Firmenfotos ersetzen.
- Containerbreite 1280 px; Header-Navigation bis 1024 px; Telefonnummer ausgeschrieben ab 1360 px, darunter Icon-Button.
- Ecken 2 px, Karten ohne Schatten; reduzierte Bewegung und `prefers-reduced-motion`.
- Startseite: Hero mit Motto, Headline „Reinigung, Dienste und Handwerk aus einer Hand“, Subline und CTAs; Faktenleiste; vier abwechselnde Bild-Text-Leistungsbereiche; Merkmale auf Blau; Karriere-Teaser; Abschlussband mit großer Telefonnummer; Footer.
- Leistungsseiten: blauer Kopfbereich mit Kategorie, Titel, Kurztext, CTA und Bild; Faktenleiste; Einleitung; Leistungs-/Objektliste; verwandte Leistungen; Abschlussband.
- Keine Marineblau-/Gelb-Kombination aus einem frühen Entwurf; Versalien sparsam einsetzen.

## 7. Barrierefreiheit, Performance und Qualität

Verbindliche Ziele:
- WCAG 2.1 AA mindestens.
- Lighthouse mobil Ziel 100/100/100/100; axe 0 Verstöße.
- Sichtbare Fokuszustände, Touch-Ziele mindestens 44 px.
- `prefers-reduced-motion` respektieren.
- Mobile bei 390 px ohne horizontales Scrollen; Header bis 1024 px ohne Überlauf.
- Tracking-Events bei neuen Links, Buttons und Formularen erhalten; keine personenbezogenen Daten tracken.
- Nie mit roten Prüfungen pushen.

Prüfungen laut Quelldokumentation:
- Frontend: `pnpm lint && pnpm check && pnpm build && pnpm check:tracking`
- CMS: `uv run ruff check . && uv run pytest -q`
- Gesamt-Audit: `node scripts/audit.mjs`
- Vorher-/Nachher-Screenshots bei 1440 px und 390 px vergleichen.

Die Quelldokumentation meldet für den damaligen Stand am 01.11.2026: acht Seiten mit a11y/bp/seo 100, axe 0; Performance 100, Startseite 99 (LCP 2,3 s durch Hero-Bild). Das ist ein historischer dokumentierter Messstand, keine aktuelle Workspace-Prüfung.

## 8. Offene Punkte aus der Aufgabenliste des Quellprojekts

Vor Go-live / vor realem Betrieb zu klären:
- Empfängeradresse des Kontaktformulars: Altseite sendete an `mail@aivii.de`; Firma muss Zieladresse bestätigen.
- Linode-Bestandsaufnahme: OS, Nginx, RAM/Disk, Docker, certbot.
- Eigene Fotos (Team, Objekte, Fahrzeuge) und Vektorlogo anfordern.
- Kombiniertes ISO-9001/14001-Siegel im CMS hochladen.
- Content-Overrides mit der Firma prüfen; Status „Vorschlag“ vs. „freigegeben“ beachten.
- Europersonal-URL und Einbettungshöhe prüfen.
- Impressum, Datenschutz und AGB rechtlich prüfen; Datenschutz muss Bewerbungsupload, 180-Tage-Speicherfrist, Umami und Europersonal-Embed abdecken.
- Karte: selbst gehostetes Leaflet/OSM war noch offen; bisher Adresse plus OSM-Link.
- Umami v3 aktualisieren/konfigurieren; Website-ID, API-Key, Reports und Monatsberichtsempfänger festlegen.
- SMTP-Zugang für Formulare einrichten.
- Deployment: **GHCR-Paketzugriff für den Workspace ist eingerichtet; CMS-Image-Push auf `main` erfolgreich (14.11.2026).** Weiterhin offen: Docker/Node/pnpm auf dem Zielserver, Staging, Preview-Dienst, Backup/Offsite-Restore, Nginx-Umschaltung und TLS prüfen.
- Search Console und Sitemap nach Go-live prüfen.
- Altserver erst nach Sicherung von Mediathek und MySQL-Dump und nach angemessener Übergangszeit abschalten.

Die Aufgabenliste ist im Quellrepository `docs/04-aufgaben.md` die Fortschrittsquelle. Diese Punkte sind aus dem Stand vom 01.11.2026 übernommen und müssen vor Ausführung erneut gegen den aktuellen Quellstand geprüft werden.

## 9. Quellenhierarchie im ursprünglichen Repository

Für die weitere Arbeit in der Reihenfolge:
1. `PRODUCT.md` – Produktziel, Zielgruppen und nicht verhandelbare Produktgrenzen.
2. `CLAUDE.md` – technische Arbeitsregeln und Projektkonventionen.
3. `docs/01-ist-analyse.md` – Ist-Zustand der Altseite.
4. `docs/02-konzept.md` – freigegebene Informationsarchitektur, Inhaltsmodell und bestätigte Fakten.
5. `docs/03-technik.md` – Architektur- und Betriebsentscheidungen.
6. `docs/04-aufgaben.md` – Aufgaben-/Fortschrittsliste.
7. `docs/05-tracking.md` – Tracking-Spezifikation.
8. `docs/06-design.md` – neueste Designentscheidungen.
9. `docs/design/brief-rework.md` – ursprüngliches Rework-Briefing; ältere offene Optionen sind durch spätere Entscheidungen in `docs/06-design.md` überholt.
10. `docs/content-neu/`, `docs/content-export/`, `docs/content-overrides.csv`, `docs/redirects.csv` – redaktionelle Inhalte, Freigaben und Migration.

## 10. Nächster sinnvoller Schritt – Premium-B2B-Redesign (Stand 14.11.2026)

**Integrationsphase abgeschlossen.** Die früher hier aufgeführten Import-Schritte sind erledigt. Für die weitere Umsetzung gilt:

1. **Baseline sichern:** Vorhandene Startseite und zentrale Seitentypen bei 1440 px und 390 px gegen `docs/design/nachher/` prüfen. CI-Stand auf `main` ist grün; das ist kein Ersatz für eine visuelle Abnahme.
2. **Designsystem prüfen und gezielt verfeinern:** `web/src/styles/global.css`, `Header.astro`, `blocks/Hero.astro`, `blocks/ServiceGrid.astro` und gemeinsame UI-Komponenten. Markenfarben, Logo, Manrope 800 und Arial sowie `docs/06-design.md` als verbindliche Grundlage beibehalten.
3. **Startseite als Referenz:** Bildkomposition, Weißraum, Typohierarchie, Leistungsdarstellung, Qualitätsnachweise und Kontakt-CTAs für gewerbliche Entscheider ausarbeiten. Keine unbelegten Aussagen oder neuen Firmenkennzahlen.
4. **Weitere Seitentypen konsistent überarbeiten:** Kategorie, Leistung, Unternehmen, Karriere und Kontakt. Wagtail-Block-Vertrag und Umami-Tracking unverändert funktionsfähig halten.
5. **Qualität und Review:** `pnpm lint`, `pnpm check`, `pnpm check:tracking`, Build gegen Seed-CMS, Lighthouse/axe, Mobile- und Desktop-Screenshots; Änderungen erst nach grünen Prüfungen per PR nach `main` bringen.

**Abgrenzung:** Kein Go-live, kein Server- oder DNS-Eingriff, keine Änderungen am read-only-Quellrepository. Echte Firmenfotos und rechtliche Freigaben bleiben gesonderte Abhängigkeiten.
