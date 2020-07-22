import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
	isFocused: boolean;
	isFilled: boolean;
	withError: boolean;
}

export const Container = styled.div<ContainerProps>`
	background: var(--primary-color-dark);
	border-radius: 1rem;
	color: var(--color-dark-grey);
	border: 2px solid var(--primary-color-dark);
	padding: 1.6rem;
	width: 100%;

	display: flex;
	align-items: center;

	& + div {
		margin-top: 0.8rem;
	}

	${(props) =>
		props.withError &&
		css`
			border-color: var(--color-error);
		`}

	${(props) =>
		props.isFocused &&
		css`
			color: #ff9000;
			border-color: #ff9000;
		`}

	${(props) =>
		props.isFilled &&
		css`
			color: #ff9000;
		`}


	input {
		color: var(--color-light-grey);
		background: transparent;
		flex: 1;
		border: 0;

		&::placeholder {
			color: var(--color-dark-grey);
		}
	}
	svg {
		margin-right: 1.6rem;
	}
`;

export const Error = styled(Tooltip)`
	height: 2rem;
	margin-left: 1.6rem;
	svg {
		margin: 0;
	}

	span {
		background: var(--color-error);
		color: var(--color-white);

		&::before {
			border-color: var(--color-error) transparent;
		}
	}
`;
