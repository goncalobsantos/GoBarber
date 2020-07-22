import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
	type?: 'success' | 'error' | 'info';
	hasDescription: number;
}

const toastTypeVariations = {
	info: css`
		background: var(--color-light-info);
		color: var(--color-info);
	`,
	success: css`
		background: var(--color-light-success);
		color: var(--color-success);
	`,
	error: css`
		background: var(--color-light-error);
		color: var(--color-error);
	`,
};

export const Container = styled(animated.div)<ToastProps>`
	width: 36rem;
	position: relative;
	padding: 1.6rem 3rem 1.6rem 1.6rem;
	border-radius: 1rem;
	box-shadow: 0.2rem 0.2rem 0.8rem rgba(var(--color-black), 0.2);

	display: flex;

	& + div {
		margin-top: 0.8rem;
	}

	${(props) => toastTypeVariations[props.type || 'info']}

	> svg {
		margin: 0.4rem 1.2rem 0 0;
	}

	div {
		flex: 1;

		p {
			margin-top: 0.4rem;
			font-size: 1.4rem;
			opacity: 0.8;
			line-height: 2rem;
		}
	}

	button {
		position: absolute;
		right: 1.6rem;
		top: 1.9rem;
		opacity: 0.6;
		color: inherit;
		background: transparent;
		border: 0;
	}

	${(props) =>
		!props.hasDescription &&
		css`
			align-items: center;
			svg {
				margin-top: 0;
			}
		`}
`;
