# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Analytics

This project sends Google Analytics 4 events only in production builds. Before deploying, create a local `.env` file from `.env.example` and configure `VITE_GA_MEASUREMENT_ID` in the deployment provider as well.

The integration records page views plus `portfolio_entered`, `project_opened`, `project_link_clicked`, `resume_downloaded`, `contact_link_clicked`, `contact_form_opened`, and `contact_form_submitted`. In GA4, mark the resume download and contact events as key events to measure recruiter engagement.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
