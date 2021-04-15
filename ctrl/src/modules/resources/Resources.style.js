import styled, { css } from 'styled-components';

const StyledResources = styled.div`
${() => {
        return css`
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            gap: 24px;

            .ui.fluid.dropdown {
                width: 384px;
                box-shadow: 6px 10px 14px -6px rgba(119,125,128,0.5);
            }

            .search-wrapper {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: flex-start;
                gap: 24px;

                .ui.secondary.button.resource-submit-button {
                    margin: 0;
                }
            }

            .resource-cards-wrapper {
                display: flex;
                flex-direction: row;
                justify-content: start;
                align-items: baseline;
                gap: 16px;
            }
        `;
    }}
`


export default StyledResources;