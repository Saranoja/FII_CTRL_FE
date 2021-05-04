import styled, { css } from 'styled-components';

const StyledActionCard = styled.div`
	${({ theme }) => {
		const { spacing, palette } = theme;

		return css`
            .action-card-wrapper {
                margin: ${`${spacing(2)}px`};
                box-shadow: 5px 7px 15px -5px rgba(0,0,0,0.5);
                width: ${`${spacing(34)}px`};
                border-radius: ${`${spacing(1)}px`};

                .card-image {
                    /* border: none; */
                    padding: ${`${spacing(2)}px`};
                    background: ${palette.primary};
                }
            }

            .action-card-wrapper:hover {
                box-shadow: 0px 0px 45px -30px rgba(23,23,23,0.9);
                transform: scale(1.05);
            }
    }`;
	}}
`;

export default StyledActionCard;
