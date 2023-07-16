---
title: Testing in svelte
description: Testing Svelte App with Vitest(unit) and Playwright(E2E)
excerpt: One does not simply test the components
date: '2023-7-16'
categories:
  - tutorial
  - technical
  - general

published: true
---

# {title}

The following post will get updated with all some common test cases

When scaffolding a svelteapp you choose whether to use the playwright and vitest to be installed additionally

Well they dont work out of the box for more complex test use cases

Things we will need

- [@testing-library/svelte](https://github.com/testing-library/svelte-testing-library)
- [jsdom](https://github.com/jsdom/jsdom)
- [@sveltejs/vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte)
- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) and its type [@types/testing-library\_\_jest-dom](https://www.npmjs.com/package/@types/testing-library__jest-dom)

We need the jest-dom for more extendible `expect` methods

Now install everything as dev dependency

```sh
pnpm add -D @testing-library/svelte jsdom @sveltejs/vite-plugin-svelte
# jest-dom
pnpm add -D @testing-library/jest-dom @types/testing-library__jest-dom
```

after the installation we need to setup our _vitest_ config

`vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		globals: true,
		environment: 'jsdom'
	}
});
```

Now we test our dependencies and build a simple component

on your `src/lib` create a components directory and create a component `Button.svelte`

```svelte
<script lang="ts">
	export let clicked = 0;
</script>

<button on:click={() => (clicked += 1)}>{clicked} {clicked >= 2 ? 'times' : 'time'} clicked</button>
```

The button is simple it will change its text when it is clicked here are the test that goes with it
on the same directory create a file named `button.test.ts`

```ts
import { render, fireEvent } from '@testing-library/svelte';

import { describe, it } from 'vitest';
// this  is required for custom jest matchers like toBeInTheDocument
import '@testing-library/jest-dom';
// importing the component itself
import Button from './Button.svelte';

describe('Button component test', async () => {
	it('should render button with text "0 time clicked" ', () => {
		const { getByRole, getByText } = render(Button);
		// the page should have a button
		expect(getByRole('button')).toBeInTheDocument();
		// the button should have text "0 time clicked"
		expect(getByText('0 time clicked')).toBeInTheDocument();
	});
	it('should increment correctly with multiple click events', async () => {
		const { getByText } = render(Button);

		// first click - the button text will change the text to "1 time clicked"
		await fireEvent.click(getByText('0 time clicked'));
		// second click - the button text will change the text to "2 times clicked"
		await fireEvent.click(getByText('1 time clicked'));
		// third click - the button text will change the text to "3 times clicked"
		await fireEvent.click(getByText('2 times clicked'));

		// finally check the final value after clicking 3 times
		expect(getByText('3 times clicked')).toBeInTheDocument();
	});
});
```

Now time to run our tests

```sh
# This runs both playwright(e2e) and vitest(unit) in our project
pnpm test
```

## User Events

The good thing about `testing-library` it has more to offer with their `user-event`

```sh
pnpm add -D @testing-library/user-event
```

[Read more here](https://testing-library.com/docs/user-event/setup)

TODO

## TODO more tests including playwright

---

## Content here
