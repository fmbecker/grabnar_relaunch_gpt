# Arbeitsregeln für diesen Workspace

- Schreibziel ist ausschließlich `fmbecker/grabnar_relaunch_gpt`.
- `fmbecker/grabnar_relaunch` ist eine read-only-Quelle. Dort niemals schreiben, committen, Branches oder Pull Requests ändern.
- Vor jeder Änderung den aktuellen Workspace-Branch und betroffene Dateien prüfen.
- Produkt- und Inhaltsentscheidungen aus `docs/PROJECT-CONTEXT.md` beachten. Bei Konflikten die dort beschriebene Quellenhierarchie nutzen und neuere bestätigte Entscheidungen priorisieren.
- Keine Privatkunden ansprechen. Die Bewachungserlaubnis nach § 34a GewO niemals erwähnen. Keine erfundenen Zahlen, Referenzen, Kunden oder Unternehmensbehauptungen.
- Wagtail-Blockänderungen immer synchron in CMS-Block, TypeScript-Typ und Astro-Blockkomponente umsetzen.
- Keine externen Fonts/CDNs/Requests; Fonts selbst hosten. Bilder nur über Wagtail-Renditions.
- Tracking über Umami erhalten, aber niemals personenbezogene Daten oder Formularinhalte senden.
- Vor Commits die betroffenen Prüfungen ausführen; nie mit roten Checks pushen.
- Kleine, nachvollziehbare Commits mit Präfixen `docs:`, `cms:` oder `web:`.
- Bei Änderungen an Hosting, Domain, Go-live oder Löschen von Altinhalten vorher explizit Rücksprache halten.
