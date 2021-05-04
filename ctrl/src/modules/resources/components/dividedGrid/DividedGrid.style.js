import styled, { css } from 'styled-components';

const StyledDividedGrid = styled.div`
	${({ theme }) => {
		const { spacing, breakpoints } = theme;

		return css`
			.divided-grid-segment {
				border-radius: ${`${spacing(1)}px`};
				border: none;
				padding: ${`${spacing(3)}px`} ${`${spacing(8)}px`};

				${breakpoints.down('sm')} {
					padding: ${`${spacing(3)}px`};
				}

				margin-bottom: ${`${spacing(3)}px`};

				.divided-grid-container {
					flex-wrap: nowrap;
					flex-direction: column;
					justify-content: space-evenly;

					${breakpoints.up('md')} {
						flex-direction: row;
					}

					.divided-grid-item {
						width: 45%;

						.root {
							margin-bottom: 24px;
						}

						.chip-container {
							margin-top: 24px;
							margin-bottom: 4px;
							max-height: 32px;
							overflow: auto;
							min-height: 32px;
						}
					}
				}
			}

			.grid-divider-loader {
				margin: ${`${spacing(2)}px`};
			}
		`;
	}}
`;

export default StyledDividedGrid;
