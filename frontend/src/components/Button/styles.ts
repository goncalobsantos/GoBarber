import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
	font-size: var(--default-font-size);
	background: var(--secondary-color);
	height: 5.6rem;
	border-radius: 1rem;
	border: 0;
	padding: 0 1.6rem;
	color: var(--primary-color);
	width: 100%;
	font-weight: 500;
	margin-top: 1.6rem;
	transition: background 0.2s;

	&:hover {
		background: ${shade(0.2, '#ff9000')};
	}
`;
