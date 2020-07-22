import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBgImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: stretch;
`;

export const Background = styled.div`
	flex: 1;
	background: url(${signInBgImg}) no-repeat center;
	background-size: cover;
`;

export const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	max-width: 70rem;
	font-size: var(--default-font-size);
`;

const appearFromLeft = keyframes`
	from {
		opacity: 0;
		transform: translateX(-5rem);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

export const AnimationContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	animation: ${appearFromLeft} 1s;
	form {
		margin: 8rem 0;
		width: 34rem;
		text-align: center;

		h1 {
			margin-bottom: 2.4rem;
		}

		a {
			color: var(--color-light-grey);
			display: block;
			text-decoration: none;
			margin-top: 2.4rem;
			transition: color 0.2s;

			&:hover {
				color: ${shade(0.2, '#f4ede8')};
			}
		}
	}

	> a {
		color: var(--secondary-color);
		text-decoration: none;
		margin-top: 2.4rem;
		transition: color 0.2s;

		display: flex;
		align-items: center;

		svg  {
			margin-right: 1.6rem;
		}

		&:hover {
			color: ${shade(0.2, '#ff9000')};
		}
	}
`;
