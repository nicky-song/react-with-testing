# WFM UI

## REPOSITORY STRUCTURE

The repository is structured as a variation of a monorepo. It contains:

- A React.ts app at the root of the project
- Within src, we have 3 folders:
  - ofm: Order Fulfillment Module code (within Outbound)
  - inbound: Inbound code
  - shared: Components, constants, assets, and any code to be shared between the different sections of the application

So it is similar to a monorepo in the sense that we have different sections of the larger application, but instead of having separate projects using Nx or workspaces, we are just separating the application with folders for now.

If you find that your component/constant/asset is generic enough, place it in the shared folder so that we do not have any redundant code and is accessible to other parts of the application.

## DEVELOPMENT WORKFLOW

- This project uses [Yarn](https://yarnpkg.com/cli/install) for package management.

### Prerequisites

You need to install and configure the following tools:

- [Git](https://git-scm.com/)
- [Node.js LTS release](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started)
- [VSCode](https://code.visualstudio.com/download)
- \*[TypeScript](https://www.typescriptlang.org/download) - This is optional to install globally as you can just install it within the workspace
- \*[OFM BFF](https://gitlab.autozone.com/supply-chain/distribution-centers/services/order-fulfillment-bff) - If you wish to use the OFM part of the app, you will need to set up and run this repo locally to get data

## Project Setup

`yarn install`

In VSCode in the command palette (Shift + Command/Alt + P) select "Choose "Select TypeScript Version" and select "Use Workspace Version"

## Running the project

`yarn dev`

http://localhost:5173/ will now be available

## Unit tests

- `yarn test`: Run unit tests

- `yarn coverage`: Unit test coverage

## Other tools

- `yarn lint`: Run linter for TypeScript files

- `yarn stylelint`: Run linter for CSS/SASS/SCSS

- `yarn build`: Build project

These commands are not necessary to run as the pre-commit will lint your code for you and the pipelines will check that the application still builds with any new changes. Nevertheless, it can be helpful to run these commands every now and then, especially the build so that the pipeline is not failing.

## GIT GUIDELINES

### Commits

Subject lines of commits should be short, concise, and follow this format:

```
feat(ticket-number): add pink pig
^--^  ^----------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
```

Example:

```sh
feat(wms-100): implementing initial component structure
```

Read more details and AutoZone specific examples [here](https://dxp-b2c-docs-dev.apps.nonprod.mem.cloud.autozone.com/code-quality/git-hooks/). We also use [commitlint](https://github.com/conventional-changelog/commitlint) to enforce commit conventions.

A good resource to check out is the conventional commits documentation [here](https://www.conventionalcommits.org/en/v1.0.0/). There is also a VSCode extension for Conventional Commits that you can download if it makes your commit process easier.

Finally, remember to start the subject line with a lowercase letter and you don't need to add a period to the end of the **present tense** statement.

#### Commit Body Lines (optional)

- You can add more details about the commit in the body of the commit message (available in UI programs like SourceTree)

### Git Hooks

We use [`lefthook`](https://github.com/evilmartians/lefthook) to lint the changes before committing the code. If you want to skip the hooks, you can add `--no-verify` to your commit command:

```sh
git commit -m --no-verify "your message"
```

If you skip the pre-commit hooks, make sure to monitor the CI pipeline to ensure your changes pass the necessary checks.

### General Branching Strategy

- `main` - main branch. This is the default branch. Developers will branch off `main` to create a `feature` branch and merge back into `main`.

- `feat/ticket-number-short-desc` - feature branch. This is what you create when you begin work on a story. Base your branch off `main`.

- Other examples are similar to the feature branch, but you just change the first word to suit whatever your ticket is. If it is a bug ticket, then use `fix`, refactor then use `refactor`, documentation then use `docs` and so on. Follow the similar commit message strategy for this.

## CODE CONVENTIONS

Automatic code formatting and linting are handled using the following tools:

- [Prettier](https://prettier.io/) - used to format the code
- [ESLint](https://eslint.org/) - used to lint the JS and TS code
- [Stylelint](https://stylelint.io/) - used to lint the CSS code
- [Lefthook](https://github.com/evilmartians/lefthook) - used to run scripts before committing the code

This project comes with recommended VSCode settings and extensions. These are available in ".vscode" directory in the root. It is recommended to use these settings and install those suggested extensions.

NOTE: Ignoring a lint rule should be an exception rather than the norm.

### STARC

AutoZone's component library [STARC](https://starc.autozone.com) is used for components following the design system. You can also find specific px units, color variables, typography, animations, and so on for styling.

For most of your front-end development, if you need to develop anything, reference the STARC library before manually creating a component from scratch. If you are doing some specific styling like setting a height to `24px`, use the STARC variable for that (e.g., `var(--st-unit-6)`).

Even for something simple like creating a div, use the `View` component instead as it abstracts a lot of that functionality for you so that you can write less CSS.

Before starting any development, it is highly recommended that you just understand the STARC library by going through the documentation so that you are not writing redundant code.

### Typing

For this application, we use a library called [Zod](https://zod.dev/?id=introduction). It is recommended that you go through the documentation for this but in summary, it is a library that allows you to specify types for anything (usually schemas) which plays very well with TypeScript. It also does validation for types, i.e., if you have a variable or a query response that does not match an expected type, it can handle that.

In general, using vanilla TypeScript can be difficult sometimes since the engine might not be able to validate some of your complex variable types as easily. Zod abstracts this process for you so that it is easier to work with TypeScript.

If you want a good example, check out any of the schemas in `ofm/schemas/`. Just note that you do not have to use Zod for everything. If you need to create a simple type to use, using the built-in TypeScript functionality is more than enough. But if you are dealing with any complex types that may need validation or schemas, it is recommended to use Zod.

### Common Components

The common components are located under the `src/shared/components` directory. Each component should be in its own directory if it has multiple files, or in a single file. Example:

- `shared/components/Button.tsx`
- `shared/components/Dialog/Dialog.tsx`
- `shared/components/Dialog/styles.module.css`

To reiterate, any components specific to your stream (e.g., OFM or Inbound) should be in their relevant parent folder. The component names are also in `PascalCase`.

These shared components should only contain the UI logic. They should try not to contain any business logic or API calls - or import anything from a feature. If they need to import something from a feature, or make specific API calls, the component should be moved to a specific project folder.

### Services

Any services you make, i.e., functions to query or manipulate data through [Axios](https://axios-http.com/docs/intro), you should place in the relevant services folder. Any shared services should be in the `shared/services/` folder.

Note: For OFM, all of the services are just wrappers around `apiService.ts`. This was by design because apiService is the generic axios functionality and to ensure that all calls to a BE/BFF are authenticated and authorized otherwise they will fail. If you take a look at the `AuthInterceptor.tsx` component in the shared folder, you will see that there are interceptors set up to add a token for authentication for the `apiService` axios instance. So if you need to create your own axios instance to re-use, ensure that you add in the relevant interceptor logic in `AuthInterceptor`.

### Assets

A lot of the assets in the application will be shared, so place any new SVGs or anything relevant in the shared folder unless you are certain it is only for your specific project (e.g., an icon that will only be used in the inbound part of the app).

### Constants

Similar to assets, but the opposite idea: most of the constants that you use will likely be specific to your project so place it in the relevant project folder. If you have a constant that will be used everywhere, place it in the shared folder (e.g., expiration interval for auth).

### Utils

If you have any functionality that you think can be re-used across the application, place them in the utils folder. When deciding whether to place it in the `shared/utils/` folder or the utils folder of your specific project, use your best judgement. A good example of shared utils is the `pkceUtils.ts` file because it is relevant for the PING auth process which is shared across all projects.

### Styles

We use CSS modules with SCSS for styling. We also use the BEM convention just to keep the application consistent with [STARC](#starc) even though it is not necessary with CSS Modules. If you want to read more about CSS Modules, you can check it out [here](https://github.com/css-modules/css-modules).

The CSS with SCSS supports [nesting](https://sass-lang.com/documentation/syntax/) which can be useful for organizing your styling. But be aware that overly nested code can actually become more difficult to read. A good rule to follow is no more than 3 levels deep.

Most of your styling will be for your specific component that you create. This means that if you have a component for example called `Drawer.tsx`, in the same `Drawer/` folder, you would place your `Drawer.module.scss` styling there. To reference the styling in your component, you can do: `import s from './Drawer.module.scss';` and then when you are setting a class called `.container` for example, you reference it in your React code as `s['container']`.

If you have any styling that will be re-used elsewhere, place it in the shared folder within the global styling file or whichever file is relevant.

### Hooks

For this repo, whenever we want to do queries or mutations, we use [React Query](https://tanstack.com/query/v3/). A lot of hooks will be specific to your project in the application, so place it in your relevant project folder.

Overall, how it works is that it is a wrapper around your axios function that fetches or manipulates data, but it also allows you to access the query/mutation results in React hook format. If you want a good example, take a look at the `useGetWaves` hook in `ofm/services/hooks/`. The implementation of that hook can be found in `Replenishment.tsx` component within `ofm/components/`.

The reason that for OFM, a lot of hooks are within the `services` folder is just for organization purposes since they are tied to the services. If a hook is shared across the entire application, it simply goes into the `shared/hooks` folder.

An important hook to know for form management is `useForm`. You can read more documentation [here](https://react-hook-form.com/docs/useform), but essentially it is a way to manage any forms where there may be user input that needs to be validated. An example of this is in the `WillCallDrawer.tsx` within `ofm/components/WillCallDrawer/`. In that component, there is validation for user name text field to check that the user has typed in the minimum characters for their name before being able to move onto the next part of the flow. There are some good util functions that you can see in `ofm/utils/utils.ts` such as `getFormInputError` that will help you understand the hook in general.

### Pages

For each of your routes that you create, you should create a relevant page component to reference in the `App.tsx` browser router. If you want a good example of this, check out `ofm/routes/routes.tsx`.

These pages should be from where you do most of your API calls/logic so that you can keep all the data fetching logic there and pass in the relevant props to any generic child components you need to show on the page.

Similar to everything else, if you have a page specific to your project, keep it in your project folder in the `pages/` directory. There are not many shared pages except for generic stuff like the 404 page.

### State Management

Throughout the application, for any global state management, we use a library called [Jotai](https://jotai.org/). It is a very minimal library that works well with React because it allows the developer to create and use global states in hook style.

Using the useAtom hook, you can specify the name of your state, and the function to manipulate your state. This is good because in any page, you can simply reference that atom with that hook and get or set the value of that atom.

Typically if you have a state that you want to share with many components, using Jotai helps prevent unnecessary prop drilling.

A good rule of thumb is that if you are passing a state more than 2 component levels deep, it might be more efficient and cleaner to use Jotai atoms.

For a good example of the useAtom functionality, you can check out the `OrderDetailsDrawer.tsx` within `ofm/components/`. That or if you would like to see a global atom, check within `shared/atoms/` and see the relevant implementations.

Like everything else, if you have a project-specific atom, put it in your project folder, otherwise the shared folder.

## Final Notes

This repo strives to be developer-friendly, so ensure that you keep things simple and readable when coding. Try to also use all the relevant tools to help you. There is not much benefit in re-inventing the wheel.

If you do find that a specific library, CI/CD tool, or anything else would be useful for this repository, bring it up with the relevant leads.

Happy coding!
