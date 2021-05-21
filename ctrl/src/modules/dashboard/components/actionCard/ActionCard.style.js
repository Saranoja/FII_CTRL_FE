import styled from 'styled-components';

const StyledActionCard = styled.div`
  ${({ theme }) => `
        .action-card-wrapper {
            margin: ${theme.spacing(2)}px;
            box-shadow: 5px 7px 15px -5px rgba(0,0,0,0.5);
            border-radius: ${theme.spacing(1)}px;
            max-width: ${theme.spacing(40)}px;

            ${theme.breakpoints.up('sm')} {
                max-width: ${theme.spacing(36)}px;
            }

            .card-image {
                padding: ${theme.spacing(2)}px;
                background: ${theme.palette.primary};
            }
        }

        .action-card-wrapper:hover {
            box-shadow: 0px 0px 45px -30px rgba(23,23,23,0.9);
            transform: scale(1.05);
        }
    `}
`;

export default StyledActionCard;
