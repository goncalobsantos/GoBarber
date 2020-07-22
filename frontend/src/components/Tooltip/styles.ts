import styled from 'styled-components';

export const Container = styled.div`
	position: relative;

	span {
		background: var(--secondary-color);
		padding: 0.8rem;
		border-radius: 0.4rem;
		font-size: 1.4rem;
		font-weight: 500;
		opacity: 0;
		transition: all 0.4s;
		visibility: hidden;

		position: absolute;
		bottom: calc(100% + 1.2rem);
		width: 16rem;
		left: 50%;
		transform: translateX(-50%);

		color: var(--primary-color);

		&::before {
			content: '';
			border-style: solid;
			border-color: var(--secondary-color) transparent;
			border-width: 0.6rem 0.6rem 0 0.6rem;
			position: absolute;
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	&:hover span {
		opacity: 1;
		visibility: visible;
		transition: opacity 0.4s;
	}
`;
