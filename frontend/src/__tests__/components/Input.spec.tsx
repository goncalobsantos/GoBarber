import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
	return {
		useField: () => {
			return {
				fieldName: 'email',
				defaultValue: '',
				error: '',
				registerField: jest.fn(),
			};
		},
	};
});

describe('Input component', () => {
	it('should be able to render the input component', () => {
		const { getByPlaceholderText } = render(
			<Input name="email" placeholder="Email" />,
		);

		const inputElement = getByPlaceholderText('Email');
		expect(inputElement).toBeTruthy();
	});

	it('should be able to render the input highlighting', async () => {
		const { getByPlaceholderText, getByTestId } = render(
			<Input name="email" placeholder="Email" />,
		);

		const inputElement = getByPlaceholderText('Email');
		const containerElement = getByTestId('input-container');

		fireEvent.focus(inputElement);

		await wait(() => {
			expect(containerElement).toHaveStyle('color: #ff9000;');
			expect(containerElement).toHaveStyle('border-color: #ff9000;');
		});

		fireEvent.blur(inputElement);

		await wait(() => {
			expect(containerElement).not.toHaveStyle('color: #ff9000;');
			expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
		});
	});

	it('should keep the input highlighting when input is filled', async () => {
		const { getByPlaceholderText, getByTestId } = render(
			<Input name="email" placeholder="Email" />,
		);

		const inputElement = getByPlaceholderText('Email');
		const containerElement = getByTestId('input-container');

		fireEvent.change(inputElement, {
			target: { value: 'gdoe@example.com' },
		});

		fireEvent.blur(inputElement);

		await wait(() => {
			expect(containerElement).toHaveStyle('color: #ff9000;');
		});
	});
});
