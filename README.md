# WebRadioesperanza1140

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Architecture

src/app/
├── core/                           # Lógica y configuración central
│   ├── data/                       # Servicios y fuentes de datos (API)
│   │   └── api/                    # Servicios específicos de API
│   │       └── strapi.service.ts
│   ├── domain/                     # Entidades y casos de uso (use cases)
│   │   ├── models/                 # Modelos de negocio (e.g., Banner, Promise)
│   │   └── use-cases/              # Casos de uso (lógica de negocio)
│   │       ├── get-banner.usecase.ts
│   │       └── get-promises.usecase.ts
├── data/                           # Fuentes de datos externas y repositorios
│   ├── repositories/               # Interfaces de repositorios
│   │   ├── banner.repository.ts
│   │   └── promises.repository.ts
├── presentation/                   # Capa de presentación y UI
│   ├── components/                 # Componentes compartidos
│   │   ├── navbar/
│   │   │   └── navbar.component.ts # Componente de Navbar
│   │   ├── banner/
│   │   │   └── banner.component.ts # Componente de Banner
│   │   └── promises/
│   │       └── promises.component.ts # Componente de Promises
│   └── pages/                      # Páginas principales de la aplicación
│       └── home/                   # Página de inicio
│           └── home.component.ts
├── shared/                         # Elementos compartidos
│   ├── directives/                 # Directivas reutilizables
│   ├── pipes/                      # Pipes personalizados
│   ├── components/                 # Componentes compartidos (botones, inputs)
│   └── shared.module.ts            # Módulo de elementos compartidos
└── app.routes.ts                   # Configuración de rutas principales
└── main.ts                         # Punto de entrada de la aplicación



