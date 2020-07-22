import React from 'react';
import { render } from 'react-native-testing-library';
import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => {
	return {
		useNavigation: jest.fn(),
	};
});

describe('SignIn page', () => {
	it('should contain email and password inputs', () => {
		const { getByPlaceholder } = render(<SignIn />);

		const emailInput = getByPlaceholder('E-mail');
		const passwordInput = getByPlaceholder('Password');

		expect(emailInput).toBeTruthy();
		expect(passwordInput).toBeTruthy();
	});
});
