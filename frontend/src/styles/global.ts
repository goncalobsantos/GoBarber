import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
		*,
		*::after,
		*::before {
			margin: 0;
			padding: 0;
			box-sizing: inherit;
			outline: 0
		}
		:root {
			--primary-color: #312e38;
			--primary-color-dark: #232129;
			--secondary-color: #ff9000;
			--color-black: #000;
			--color-white: #fff;
			--color-light-grey: #f4ede8;
			--color-dark-grey: #666360;
			--color-light-info: #ebf8ff;
			--color-info: #3172b7;
			--color-light-error: #fddede;
			--color-error: #c53030;
			--color-light-success: #e6fffa;
			--color-success: #2e656a;
			--default-font-size: 1.6rem;
		}
		html {
			font-size: 62.5%; /*1rem = 10px; 10px/16px = 62.5%*/
		}
		body {
			box-sizing: border-box;
			background: var(--primary-color);
			color: var(--color-white);
			text-rendering: optimizeLegibility !important;
			-webkit-font-smoothing: antialiased !important;
		}
		::selection {
			background-color: var(--secondary-color);
			color: var(--color-white);
		}

		body, input, button {
			font-family: 'Roboto Slab', serif;
			font-size: var(--default-font-size);

		}

		h1, h2, h3, h4, h5, h6, strong {
			font-weight: 500;
		}

		button {
			cursor: pointer;
		}
`;
