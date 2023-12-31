# An SSG first portfolio page with blog and project section

## Features

- blog
  supported syntax for slug should be `.md` `.svex`
- projects
  same as the blog but has image previews
- gitcms???
  work in progress to include github discussions

## Libraries used

- SvelteKit
- Tailwind

### Other Packages Used

- mdsvex
- List here
- List here

```sh
# Install dependencies first
pnpm install
# Run dev
pnpm dev
```

# Deployment

This app defaults to adapted static which bundles this application in static mode
so it can be hosted to an `httpd` `apache` `nginx` `github pages`

[Static Site Generation(SSG)](https://kit.svelte.dev/docs/adapter-static) here is the link

Cloudflare Pages , Vercel and other deployments will be added here also incase i change
my cloud provider but i use cloudflare as of this writing

---

## This app is deployable via github pages and a docker instance with nginx

### Github Pages Option 1

A workflow no config deployment is added at `.github/workflows/gh-pages-deploy.yml`

Check or Set the Pages on Section to use Github Actions
![option_1](https://github.com/directormac/directormac.github.io/assets/5866196/6122f04c-0e67-4aeb-8daa-3cf37a061a78)

### For Github Pages Option 2

> before continuing please delete the `.github` directory as it will affect this workflow

A script is added at `package.json`

```json
{
	"script": {
		"gh-pages": "vite build && touch build/.nojekyll && npx gh-pages -d build -t true"
	}
}
```

TODO - Explain script

if deploying on your main e.g `username.github.io` where this repo name should be `username.github.io`

```sh
pnpm gh-pages
```

if its on a seperate repo e.g `username.github.io/specialpage` and repo name is `specialpage`
appen the following into the `svelte.config.js`

TODO Edit based on new conflig on svelte.config.js

```diff
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
+   paths: {
+			base: dev ? '' : process.env.BASE_PATH
+   },
  },
};

export default config;
```

Given that all links in this app should also use the base path

```svelte
<script lang="ts">
	import { base } from '$app/paths';
</script>

<nav>
	<a href={$base}>Home</a>
	<a href="{$base}/about">About</a>
	<a href="{$base}/contents">Content</a>
	<a href="{$base}/contents/morecontents">More Content</a>
</nav>
```

> A `.nojekyll` is already provided in the script

```json
{
	"scripts": {
		"gh-pages": "vite build && touch build/.nojekyll && npx gh-pages -d build -t true"
	}
}
```

After your first commit to remote run this command it will create a gh-pages branch

```sh
pnpm gh-pages
```

after that go to your repo on `github.com` and go to the Settings tab selec Pages and choose gh-pages as your branch
![option_2](https://github.com/directormac/directormac.github.io/assets/5866196/26958862-b020-4c66-af6e-d49f1c69446e)

### For Docker deployments

A `dockerfile` , `ningx/nginx.conf` is already provided in this repo modify them as you see fit

for docker instance customization edit the `dockerize.sh` default options will follow
the variables from your `package.json` `name` and `version`

```sh
pnpm dockerize
```

Your app is deployed at `http://localhost:8001` if this port isnt available edit `dockerfile` and `nginx/nginx.conf`

---

### FAQ

For development i added aliases to `svelte.config.js`

```diff
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
+		alias: {
+			$components: 'src/lib/components',
+			$stores: 'src/lib/stores',
+			$utils: 'src/lib/utils'
+		}
	}
};

export default config;

```
