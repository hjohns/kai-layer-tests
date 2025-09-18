# KAI Layer for Tests

This project was bootstrapped by `create-prez-app`.

To bootstrap you own PrezUI project with create-prez-app, run the following command:

```bash

pnpm dlx create-prez-app@latest <project-name>

cd <project-name>
pnpm install

```

Then follow the prompts to create your project.

## Installation

In your PrezUI project, add the following to your `nuxt.config.ts` file:

```javascript

    extends: [
        "prez-ui",
        ["github:hjohns/kai-layer-tests", { install: true }],
    ],

```

Then preview your theme by running:

```bash

pnpm dev

```
