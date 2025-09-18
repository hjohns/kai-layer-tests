# KAI Layer for Tests

This is an experimental layer for providing a very simple testing framework for PrezUI. It is not intended to be a full-featured testing framework, but enable an easy way to test and demonstrate functionality in isolation in a consistent manner.

When you extend an existing PrezUI project with this layer, a new `/tests` route will be added to your project. This route serves as a landing page to show your simple tests that exist in the `pages/tests` directory.

To use this framework you simply extend your existing PrezUI project with this layer and create a new test page in the `pages/tests` directory.


## Creating a new PrezUI project

If you haven't already created a PrezUI project, you can do so by running the following command:

```bash

pnpm dlx create-prez-app@latest <project-name>

cd <project-name>
pnpm install

```

## Existing PrezUI project
- You may want to check the version of PrezUI you're using matches this layer's version of PrezUI.


Then follow the prompts to create your project.

## Installation

In your PrezUI project, add the following to your `nuxt.config.ts` file:

```javascript

    extends: [
        "prez-ui",
        ["github:hjohns/kai-layer-tests", { install: true }],
    ],

```
__Note:__ the next time you run your project, the dependencies in the tests layer package.json will be installed automatically.

Then preview your theme by running:
```bash
pnpm dev
```
You will see the additional install steps in the console.


## Issues

### Double menu issue:
- To avoid the double menu issue, you can use the following code in your `app.config.ts` file:

```javascript

export default defineAppConfig({
    // nav menu, name substitutions, breadcrumbs prepend & pagination config goes here
    menu: ()=>[]
});

```

### Override the menu completely:
- If you're using multiple layers it may be easier to redefine your menu entirely. This can be done by using a plugin:

```javascript

// plugins/override-menu.client.ts
export default defineNuxtPlugin(() => {
    const appConfig = useAppConfig()
    appConfig.menu = [
        { label: "Home", url: "/", active: true },
        { label: "Tests", url: "/tests", active: true },
        ...
    ]
})

```

### Version updates
- When a new version of PrezUI is released, it looks like all layer usage will need to align.
- Remove node_modules and pnpm-lock.yaml, then run pnpm install to get the latest dependencies.


### Layer updates
- When you re-run your application, the dependencies in the tests layer package.json should be installed automatically.
- If not, you can run `pnpm install` in the tests layer directory to get the latest dependencies.
- You can directly reference a branch, tag or commit hash when extending a given layer.

Example of extending a layer with a specific branch:
```javascript

    extends: [
        "prez-ui",
        ["github:hjohns/kai-layer-tests#main", { install: true }],
    ],

```

Example of extending a layer with a specific tag:
```javascript

    extends: [
        "prez-ui",
        ["github:hjohns/kai-layer-tests#v1.0.0", { install: true }],
    ],

```

Example of extending a layer with a specific commit hash:
```javascript

    extends: [
        "prez-ui",
        ["github:hjohns/kai-layer-tests#1234567890", { install: true }],
    ],

```    