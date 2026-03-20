# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Radio Esperanza 1140 AM — Angular 18 frontend for a Colombian Christian radio station. Uses Strapi as headless CMS backend and Bold for payment/donation processing. Amounts are in COP (Colombian Pesos).

## Commands

- `npm start` — dev server (localhost:4200)
- `npm run build` — production build
- `npm run build -- --configuration development` — dev build
- `npm test` — run tests (Karma/Jasmine)
- `npm run serve:ssr:web-radioesperanza-1140` — serve SSR build (port 4000)

## Architecture

**Angular 18 standalone components** — no NgModules. All components use `standalone: true`.

**Feature-based structure** under `src/app/`:
- `core/` — shared services, models, directives, and use-cases
- `features/` — page-level features (home, about-us, contact, programations, donation, donation-thanks, radio-player, bold-payment)
- `shared/` — reusable components (Footer)

**Clean Architecture layers in `core/`:**
- `domain/models/` — TypeScript interfaces (Programation, Promise, Testimonial, BannerImages, RadioPlayer, Contacto, Peticion)
- `domain/use-cases/` — business logic classes wrapping StrapiService calls
- `services/` — StrapiService (Strapi CMS API), BoldCheckoutService & BoldPaymentService (payment gateway)

**State management:** Angular Signals (`signal()`, `computed()`, `toSignal()`) for UI state; RxJS Observables for HTTP.

**Routing** (`app.routes.ts`): `/home`, `/about`, `/contact`, `/programations`, `/programations-list`, `/donacion`, `/donacion/gracias`, `/detail-programation/:id`. Wildcard redirects to `/home`.

## Backend Integration

- **Strapi CMS** — API base URL configured in `src/environments/environment*.ts` via `API_URL`. Endpoints: `/banners`, `/promises`, `/programations`, `/testimonials`, `/radio-player`, `/contactos`, `/peticiones`.
- **Bold Checkout** — payment SDK loaded dynamically. Integrity signatures validated via Strapi backend. Donation presets: $30k, $60k, $100k, $150k, $200k COP.

## Environments

Files in `src/environments/`:
- `environment.ts` — production
- `environment.development.ts` — local dev (Strapi on localhost:1337)
- `environment.local.ts` — local variant
- `environment.staging.ts` — staging

File replacement configured in `angular.json` under `configurations`.

## Styling

- **SCSS** — component-level `.component.scss` files + global `src/styles.scss`
- **Bootstrap 5.3.3** — loaded from node_modules in angular.json
- **Swiper 11** — carousel component with custom `SwiperDirective`
- **AOS** — scroll animations
- **SweetAlert2** — modal dialogs
- Theme colors defined in `src/variables.scss`: primary `#3ECCB5`, secondary `#000000`

## SSR

Server-side rendering enabled via `@angular/ssr` with Express (`server.ts`). Prerendering is on. SSR config in `app.config.server.ts`.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`): push to `main` triggers build and FTP deploy to cPanel. Uses Node.js 22.

## TypeScript Config

- Target/module: ES2022
- Strict mode: off globally, but `strictTemplates: true` for Angular templates
- `noImplicitOverride: true`
