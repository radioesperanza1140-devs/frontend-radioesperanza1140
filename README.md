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

src/
├── app/
│ ├── core/ # Código compartido, servicios globales, guards
│ │ ├── guards/
│ │ ├── interceptors/
│ │ ├── models/ # Modelos globales
│ │ ├── services/ # Servicios compartidos
│ │ └── utils/ # Utilidades generales
│ ├── features/ # Componentes standalone de cada sección
│ │ ├── home/ # Home
│ │ │ ├── components/ # Componentes específicos de Home
│ │ │ ├── pages/ # Páginas específicas
│ │ │ ├── services/ # Servicios de Home
│ │ │ └── home-page.component.ts
│ │ ├── programming/ # Programación
│ │ ├── testimonials/ # Testimonios
│ │ ├── about-us/ # Nosotros
│ │ └── contact/ # Contáctenos
│ ├── shared/ # Componentes, directivas y pipes reutilizables
│ │ ├── components/
│ │ ├── directives/
│ │ ├── pipes/
│ │ └── shared.module.ts
│ ├── app.config.ts # Configuración global del router
│ └── app.component.ts # Componente raíz (Standalone)
├── assets/ # Recursos estáticos
│ ├── images/
│ └── styles/
│ ├── main.scss # Estilos globales
│ ├── variables.scss # Variables de diseño
│ └── mixins.scss # Mixins reutilizables
└── environments/ # Configuración de entornos (dev, prod)

cambion en readme
