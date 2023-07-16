import { expect, it, describe } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import { brand } from '../config';

import Header from './Header.svelte';

describe('Header Navigation', () => {
	it('should display logo', () => {
		const { getByText } = render(Header);
		const logo = getByText(brand);
		expect(logo).toBeInTheDocument();
	});
});
