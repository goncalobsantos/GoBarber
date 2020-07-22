import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
	> header {
		height: 14.4rem;
		background: #28262e;
		display: flex;
		align-items: center;

		div {
			width: 100%;
			max-width: 112rem;
			margin: 0 auto;

			svg {
				color: #999591;
				width: 2.5rem;
				height: 2.5rem;
			}
		}
	}
`;

export const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	margin: -17.5rem auto 0;
	font-size: var(--default-font-size);

	form {
		margin: 8rem 0;
		width: 34rem;
		text-align: center;
		display: flex;
		flex-direction: column;

		h1 {
			margin-bottom: 2.4rem;
			font-size: 2rem;
			text-align: left;
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

		.password-fields {
			margin-top: 2.4rem;
		}
	}
`;

export const AvatarInput = styled.div`
	margin-bottom: 3.2em;
	position: relative;
	width: 18.6rem;
	align-self: center;
	img {
		width: 18.6rem;
		height: 18.6rem;
		border-radius: 50%;
	}

	label {
		position: absolute;
		width: 4.8rem;
		height: 4.8rem;
		border: 0;
		background: #ff9000;
		right: 0;
		bottom: 0;
		border-radius: 50%;
		transition: background-color 0.4s;

		display: flex;
		align-items: center;
		justify-content: center;

		cursor: pointer;

		input {
			display: none;
		}

		svg {
			width: 2rem;
			height: 2rem;
			color: #312e38;
		}

		&:hover {
			background: ${shade(0.2, '#ff9000')};
		}
	}
`;
