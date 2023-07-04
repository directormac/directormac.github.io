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

### For GH Pages follow this guide

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

```diff
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
+   paths: {
+     base: process.env.NODE_ENV === "production" ? "/anotherslash" : "",
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
![image](https://github.com/directormac/directormac.github.io/assets/5866196/4371701d-4d83-4cc0-b759-4eb1599b2a0a)
![AnotherImage](static/gh-pages.png)
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
