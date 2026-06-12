# Rapport d'analyse UX/UI — Site public MCTD

**Date** : 12 juin 2026
**Cible** : `frontend/src/app/(site)` + site en production (https://mctd.africadigitalconnect.net)
**Méthode** : double évaluation indépendante — (A) revue design type directeur artistique sur code source + inspection navigateur en production (desktop 1440 px, mobile 390 px, pages accueil / formations / don) ; (B) collecte de preuves outillées (greps, mesures de poids, comptages a11y).
**Objectif déclaré** : un site réellement institutionnel, au design moderne, sans friction cognitive, optimisé.

---

## 1. Synthèse exécutive

**Score global : 18/40** (heuristiques de Nielsen) — sous la moyenne des interfaces réelles (20–32).

Le site a **la bonne fondation de marque** : palette navy `#1A3C6E` + or liturgique `#C8941A`, typographie EB Garamond/Nunito, localisation ivoirienne authentique (FCFA, Wave/Orange/MTN/Moov), hygiène d'accessibilité sincère. L'identité « chaleureux, sérieux, transformateur » est posée.

Mais il est tiré vers le bas par **quatre problèmes structurels** :

1. **~20 Mo d'images PNG sur le hero** et un hero de 150vh majoritairement vide, sans titre H1 — pour un public explicitement sur connexions mobiles lentes.
2. **Les trois conversions principales sont factices en production** : le bouton de don ne fait rien, le formulaire de contact simule un succès sans rien envoyer, la boutique n'a pas de checkout.
3. **Zéro photo réelle hors hero** : équipe, témoignages, formations, événements = rectangles navy + icônes. Pour une communauté religieuse, c'est le bug n°1 d'adéquation émotionnelle.
4. **Données fabriquées et placeholders en prod** : stats inventées, téléphone « +225 XX XX XX XX XX », liens légaux et sociaux en `#`.

Décompte des problèmes : **2 × P0, 2 × P1, 2 × P2**, plus une série d'observations mineures.

---

## 2. Design Health Score (Nielsen)

| # | Heuristique | Score /4 | Problème clé |
|---|-----------|:---:|-----------|
| 1 | Visibilité de l'état du système | 2 | « Confirmer mon don » est un `type="button"` **sans handler** (`don/page.tsx:242`) ; aucun loading/skeleton sur le site |
| 2 | Correspondance système / monde réel | 3 | Très bon (FCFA, vocabulaire pastoral) ; mais « E-learning » dans la nav vs « Formations » partout ailleurs |
| 3 | Contrôle et liberté | 2 | Géolocalisation demandée **au chargement** (`a-propos/page.tsx:17`) ; refus = carte punie ; ticker non fermable |
| 4 | Cohérence et standards | 3 | Système de design cohérent, mais ~220 hex inline sur le site public au lieu des tokens de `globals.css` |
| 5 | Prévention des erreurs | 1 | Don : « Confirmer mon don de **NaN** FCFA » possible, montants négatifs acceptés ; contact : `noValidate` annule les `required` |
| 6 | Reconnaissance plutôt que rappel | 3 | Sous-menu E-learning passe `?cat=…` que `formations/page.tsx` **ne lit jamais** |
| 7 | Flexibilité et efficacité | 2 | Les montants prédéfinis de l'accueil (`page.tsx:299-308`) ne pré-remplissent pas `/don` |
| 8 | Esthétique et design minimaliste | 2 | Hero 150vh majoritairement vide ; faux logos Visa/Mastercard dessinés en SVG (`don/page.tsx:9-18`) ; gimmicks TiltCard 3D |
| 9 | Récupération d'erreurs | 1 | Aucun état d'erreur sur aucun formulaire ; faux succès contact ; erreur React #418 (hydration) en console prod sur /don |
| 10 | Aide et documentation | 1 | Pas de FAQ ; « Confidentialité » et « Mentions légales » pointent vers `#` (`Footer.tsx:131-132`) |
| **Total** | | **18/40** | **Acceptable-faible** : flux factices et gestion d'erreur absente |

---

## 3. Verdict anti-patterns (« est-ce que ça sent l'IA ? »)

**Verdict : partiellement.** La palette et la typographie sont de vraies décisions ; la **structure** est un gabarit.

### Ce qui est sain
- Pas de gradient text, pas de `bg-gradient` Tailwind (0 occurrence), pas de palette indigo/violet SaaS.
- Un seul `backdrop-blur` (navbar sticky, défendable).
- Navy + or + EB Garamond : territoire juste pour le registre catholique-institutionnel.

### Les tells confirmés
| Tell | Localisation |
|---|---|
| Eyebrow doré uppercase tracké répété au-dessus de **chaque** section | `page.tsx:128, 254` ; `a-propos/page.tsx:57, 97, 142` ; généralisé via la prop `eyebrow` de `ui.tsx:29` |
| Hero-metric template (compteur animé + label ×3) **dupliqué 3 fois** | `page.tsx:105-119`, `don/page.tsx:48-61`, `a-propos/page.tsx:70-89` |
| 6 grilles de cartes identiques icône+titre+texte | accueil ×2, boutique, don, contact… |
| PageHeader centré identique sur toutes les pages intérieures | `ui.tsx:22-41` |
| Barre verticale colorée (side-stripe `w-2 h-12`) | cartes Vision/Mission/Valeurs, `a-propos/page.tsx:122-127` |
| Blocs navy + icônes Lucide à la place de photos | ~95 % du site |

*Note de méthode : le détecteur déterministe du skill impeccable a crashé (module `detect-antipatterns.mjs` absent du bundle) ; compensé par des greps ciblés. Pas d'overlay navigateur.*

---

## 4. Ce qui fonctionne (à préserver)

1. **Identité chromatique et typographique juste** (`globals.css:3-25`) : navy profond + or liturgique + EB Garamond pour les titres. Exactement le territoire demandé, loin du paroissial daté comme du SaaS froid. **C'est la fondation à garder.**
2. **Localisation produit réelle** : FCFA, Wave/Orange/MTN/Moov avec vrais logos, CinetPay nommé, livraison Abidjan, don anonyme (culturellement pertinent), copy « intention de prière ». Pas un template américain traduit.
3. **Hygiène d'accessibilité au-dessus de la moyenne** : `useReducedMotion` honoré dans chaque composant d'animation (19 occurrences), fallback CSS `prefers-reduced-motion`, skip-link, `:focus-visible` doré cohérent, cibles tactiles 44 px sur les pills.

---

## 5. Problèmes prioritaires

### [P0-1] Hero d'accueil : 150vh majoritairement vide, ~20 Mo d'images, pas de H1
- **Localisation** : `page.tsx:34` (`min-h-[150vh]`), `page.tsx:13-15` (background-size non-cover), `public/logos/accueil1.png` (1,9 Mo), `accueil2.png` (7,3 Mo), `accueil3.png` (11 Mo). **Zéro `next/image` dans tout le projet.**
- **Impact** : 30 s à 2 min de chargement en 3G (public cible : connexions mobiles lentes, données facturées). Sur mobile, le poster occupe ~25 % du hero puis ~un écran de vide gris avant les CTA. Aucun H1 : le slogan « Vivre de la vie de Dieu » n'apparaît qu'en footer. Constaté en production.
- **Fix** : hero 85–100vh ; photos recadrées exportées WebP/AVIF ≤ 200 Ko via `next/image` (`priority` sur la première) ; `background-size: cover` ; H1 textuel (« Vivre de la vie de Dieu ») + sous-titre + CTA au-dessus de la ligne de flottaison ; posters d'événements déplacés vers la page événements ; fond de secours navy au lieu de gris.

### [P0-2] Les trois conversions principales sont factices en production
- **Localisation** : don `don/page.tsx:242` (bouton sans handler), contact `contact/page.tsx:40` (`onSubmit → setSent(true)`, rien n'est envoyé, message « réponse sous 24 h »), boutique `boutique/page.tsx:80` (panier sans checkout).
- **Impact** : un site en prod qui simule la réussite d'un don ou d'un message est une **faute de confiance** envers des fidèles et donateurs, pas un détail technique. Peak-end catastrophique : l'utilisateur finit son parcours sur du néant ou un mensonge.
- **Fix** : brancher CinetPay/une API ; à défaut, remplacer par des canaux explicites et réels (WhatsApp Business, `mailto:`, USSD mobile money affiché) et **retirer tous les écrans de faux succès**.

### [P1-1] Zéro imagerie réelle hors hero
- **Localisation** : `formations/page.tsx:66-68`, `evenements/page.tsx:69-70`, `page.tsx:180-183, 220-221`, équipe en initiales `a-propos/page.tsx:152-157`, témoignages sans visages `page.tsx:259-282`. Les champs `thumbnail`/`banner`/`photo`/`avatar` existent dans `mockData.ts` mais **ne sont jamais utilisés**.
- **Impact** : pour un brand religieux communautaire dont « le contenu est le produit », l'absence totale de visages inverse la preuve sociale et refroidit le site (anti-référence « ONG froide » de votre PRODUCT.md).
- **Fix** : photos réelles (fondateurs, retraites, cultes — elles existent, le hero le prouve) sur les cartes événements et l'équipe pastorale en priorité ; témoignages avec portraits.

### [P1-2] Données fabriquées et coordonnées placeholder en production
- **Localisation** : stats don inventées (`don/page.tsx:49-53` : « 284 donateurs ce mois », « 98 % transactions réussies ») ; « 2500+ fidèles / 48 modules » (`page.tsx:106-108`) contredit par « 4 modules » sur la page formations ; téléphone « +225 XX XX XX XX XX » (`Footer.tsx:118`, `page.tsx:327`, `contact/page.tsx:117`) ; réseaux sociaux et pages légales en `href="#"`.
- **Impact** : un chiffre faux recoupé par un donateur détruit plus de confiance que pas de chiffre. Le téléphone placeholder est un cul-de-sac pour le persona le moins technophile.
- **Fix** : vraies données ou suppression pure et simple des compteurs ; vrai numéro ; vraies URLs sociales ; pages légales réelles (obligation de toute façon).

### [P2-1] La carte « Nous trouver » géolocalise le visiteur au lieu de l'église
- **Localisation** : `a-propos/page.tsx:17-19, 182, 188` — l'iframe affiche la position du **visiteur** et le lien itinéraire a pour destination… le visiteur lui-même. Prompt de permission intrusif au chargement.
- **Fix** : coordonnées fixes du Centre Pastoral (comme le fait correctement `contact/page.tsx:186`), suppression de toute géolocalisation.

### [P2-2] Sous-menu E-learning inopérant et inaccessible
- **Localisation** : `Navbar.tsx:17-20` (liens `?cat=…` jamais lus par formations), dropdown en `group-hover` pur (`Navbar.tsx:83`) invisible au clavier et au tactile. Bug connexe : `animations.tsx:33` (`value.replace(/\s/g,"")`) produit « 1 240 000FCFA » sans espace (vérifié en prod).
- **Fix** : lire `useSearchParams` côté formations ; ouvrir le menu au focus/clic ; corriger la regex du compteur.

---

## 6. Charge cognitive (friction)

- **Page don : ~24 micro-décisions empilées** (anonymat → type → montant 6+1 → affectation ×5 → 5 champs → paiement ×5). La question « don anonyme ? » est posée **en premier** alors qu'elle ne concerne presque personne. Replier anonymat et affectation en options secondaires.
- **Navbar desktop : 10 cibles simultanées**, dont 3 boutons d'action concurrents (Don, Inscription, Connexion). Galerie et Boutique peuvent passer en second niveau.
- **Double navigation mobile** au recouvrement partiel : hamburger (8 entrées) + bottom bar (5 onglets) — modèle mental flou.
- **Redondances** : horaires des cultes dupliqués (footer + contact), coordonnées en triple.
- **Ticker d'annonces** : 16 s pour lire une phrase, texte coupé au chargement, non cliquable alors qu'il annonce des inscriptions.

---

## 7. Red flags par persona

**Première visiteuse, mobile, connexion lente à Abidjan**
~20 Mo d'images ; tout le site est `"use client"` avec animations `whileInView` partant d'`opacity: 0` → sections invisibles avant hydratation (constaté en capture pleine page) ; poster illisible puis vide gris. Rebond probable avant tout contenu.

**Fidèle de 55 ans, peu technophile, cherche un événement**
« E-learning » = jargon anglais ; cartes événements = 3 rectangles navy identiques sans photo ; ticker trop rapide non cliquable ; numéro de téléphone placeholder = impasse totale.

**Donateur de la diaspora sur /don**
Stats codées en dur avec bug typographique visible ; ~24 micro-décisions puis bouton final inerte ; mobile money inutilisable depuis l'étranger ; faux logo Visa/Mastercard à l'endroit exact où il faut paraître bancaire.

---

## 8. Observations mineures

- `PulseIcon` à `repeat: Infinity` sur le CTA don (`animations.tsx:294-306`) : pulsation sans fin, légèrement télévangéliste (anti-référence).
- `text-gray-400` (~2,8:1, sous AA 4,5:1) sur du texte porteur de sens en `text-xs` : instructeurs, prix, descriptions de paiement.
- `logo_mctd.jpg` : halo blanc sur footer navy → passer en PNG/SVG détouré.
- EB Garamond chargée par `<link>` render-blocking (`layout.tsx:27-30`) au lieu de `next/font` (incohérent : Nunito l'utilise).
- TiltCard 3D + rotations d'icônes au hover : gimmick « portfolio de dev », hors registre pastoral.
- « Mon Compte » de la bottom bar pointe en dur vers `/auth/connexion` même connecté (`MobileNav.tsx:12`).
- Mode « clignotant » des bannières (`animations.tsx:107-114`) : à éviter (risque WCAG 2.3.1).
- ~220 couleurs hex inline sur le périmètre public (top : `don/page.tsx` ×21, accueil ×18, `Footer.tsx` ×16) au lieu des tokens CSS existants.

---

## 9. Plan d'action recommandé (ordre conseillé)

| Ordre | Chantier | Sévérité | Contenu |
|:---:|---|:---:|---|
| 1 | **Performance + hero** | P0 | Images WebP/AVIF via `next/image`, hero 85–100vh avec H1 « Vivre de la vie de Dieu », `next/font` pour EB Garamond, fond de secours navy |
| 2 | **Flux réels** | P0 | Don branché (CinetPay) ou canaux honnêtes ; contact réellement envoyé ; suppression des faux succès ; validation des formulaires (NaN, négatifs) |
| 3 | **Imagerie + données vraies** | P1 | Photos communauté/équipe/événements ; suppression des stats inventées ; vrai téléphone ; vraies URLs sociales et légales |
| 4 | **Dé-gabarisation** | P1–P2 | Casser les patterns répétés (eyebrows, hero-metrics ×3, grilles identiques, PageHeader unique) ; varier les compositions |
| 5 | **Frictions** | P2 | Don replié (anonymat/affectation secondaires), nav allégée, carte fixée, sous-menu réparé, ticker cliquable |
| 6 | **Polish final** | P3 | Contrastes AA, logo détouré, motion calmée, tokens CSS au lieu des hex inline |

**Estimation de l'effet** : les chantiers 1–3 font passer le site de « démo déployée » à « institution crédible ». Le chantier 4 le fait passer de « template propre » à « identité ».

---

## 10. Questions ouvertes pour la direction

1. **Pourquoi le site cache-t-il ses visages ?** Les photos existent (le hero le prouve). Droits à l'image, workflow d'upload, ou décision jamais prise ?
2. **Que se passe-t-il aujourd'hui quand quelqu'un veut donner 25 000 FCFA ?** Le site en prod doit-il convertir, ou assume-t-on une phase « vitrine » le temps de brancher le paiement ?
3. **Quel est le message des 3 premières secondes ?** Un site dont le slogan est « Vivre de la vie de Dieu » ne l'écrit nulle part au-dessus de la ligne de flottaison.

---

*Snapshot de critique archivé : `.impeccable/critique/2026-06-12T14-12-57Z__frontend-src-app-site.md` (score 18/40, première mesure — relancer `/impeccable critique` après corrections pour suivre la tendance).*
