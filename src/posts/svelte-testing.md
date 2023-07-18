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

it is basically has more to offer than `fireEvent`, We will now also look more into testing svelte components
with props, and will be using the `getByTestId` where the elements that we will be testing must have a `data-testid`
property.

Here is our `LoginForm.svelte`

```svelte
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let email = '';
	let password = '';
	let isFormSubmitted = false;

	// Email regex to validate email
	$: isEmailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

	// Password length validation
	$: isPasswordValid = password.length <= 8;

	// Function to handle form submission
	function handleSubmit() {
		if (isEmailValid && isPasswordValid) {
			isFormSubmitted = true;
			dispatch('submit', { email, password });
		}
	}
</script>

<div>
	<form data-testid="login-form" on:submit|preventDefault={handleSubmit}>
		<label for="email">Email</label>
		<input
			data-testid="email-input"
			type="email"
			id="email"
			name="email"
			placeholder="Email"
			required
			bind:value={email}
		/>
		<label for="password">Password</label>
		<input
			data-testid="password-input"
			type="password"
			id="password"
			name="password"
			placeholder="Password"
			required
			bind:value={password}
		/>
		<button type="submit" data-testid="login-button" disabled={!isEmailValid || !isPasswordValid}>
			Login
		</button>
	</form>
</div>

<style>
	div {
		width: 50vw;
		/* height: 30vh; */
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		margin-top: 2rem;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;
	}

	button {
		margin-top: 1rem;
		font-size: 1rem;
	}
</style>
```

And our test file `loginForm.test.ts`

```typescript
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
// this  is required for custom jest matchers like toBeInTheDocument
import '@testing-library/jest-dom';
// importing the component itself
import LoginForm from './LoginForm.svelte';

const user = userEvent.setup();

describe('LoginForm component test', async () => {
	// Rendering everything by getByTestId which looks for data-testid=""
	it('Should render form and children with initial conditions', () => {
		const { getByTestId } = render(LoginForm);

		// Check form if rendered
		expect(getByTestId('login-form')).toBeInTheDocument();

		// Check both inputs if rendered
		expect(getByTestId('email-input')).toBeInTheDocument();
		expect(getByTestId('password-input')).toBeInTheDocument();

		// Check button if rendered && disabled
		expect(getByTestId('login-button')).toBeInTheDocument();
		expect(getByTestId('login-button')).toBeDisabled();
	});

	it('Should enable button after email input', async () => {
		const { getByTestId } = render(LoginForm);

		// User inputs element at email-input
		await user.type(getByTestId('email-input'), 'test@test.com');

		// Checks if input has value
		expect(getByTestId('email-input')).toHaveValue('test@test.com');

		// Login Button Should be enabled
		expect(getByTestId('login-button')).toBeEnabled();
	});

	it('Should require password-input', async () => {
		const { getByTestId } = render(LoginForm);
		// User input email
		await user.type(getByTestId('email-input'), 'test@test.com');
		// User clicks Login button
		await user.click(getByTestId('login-button'));
		// Checks password-input invalid
		expect(getByTestId('password-input')).toBeInvalid();
	});

	it('Should submit form', async () => {
		// Initiliaze component with props
		const { getByTestId, component } = render(LoginForm, {
			props: {
				email: 'test@test.com',
				password: 'testpassword'
			}
		});

		// Click Submit button
		await user.click(getByTestId('login-button'));

		// expect isFormSubmitted prop to be true
		expect(component.isFormSubmitted === true);
	});
});
```

## TODO more tests including playwright

---

## Content here
