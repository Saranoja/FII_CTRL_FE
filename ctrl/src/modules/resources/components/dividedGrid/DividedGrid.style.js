import styled from 'styled-components';

const StyledDividedGrid = styled.div`
	${({ theme }) => `
		.divided-grid-segment {
			border-radius: ${theme.spacing(1)}px;
			border: none;
			padding: ${theme.spacing(3)}px ${theme.spacing(8)}px;

			${theme.breakpoints.down('sm')} {
				padding: ${theme.spacing(3)}px;
			}

			margin-bottom: ${theme.spacing(3)}px;

			.divided-grid-container {
				flex-wrap: nowrap;
				flex-direction: column;
				justify-content: space-evenly;

				${theme.breakpoints.up('md')} {
					flex-direction: row;
				}

				.divided-grid-item {
					width: 45%;

					.chip-root {
						margin-bottom: ${theme.spacing(3)}px;
					}

					.chip-container {
						margin-top: ${theme.spacing(3)}px;
						margin-bottom: ${theme.spacing(0.5)}px;
						max-height: ${theme.spacing(4)}px;
						overflow: auto;
					}
				}
			}
		}

		.grid-divider-loader {
			margin: ${theme.spacing(2)}px;
		}
	`}
`;

export default StyledDividedGrid;
