import styled, { css } from 'styled-components';

const StyledResources = styled.div`
${() => {
        return css`
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .resources-subject-picker {
                margin-bottom: 24px;
            }

            .search-wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: flex-start;
                }

            .filepicker-wrapper, .articles-checkbox {
                margin-bottom: 24px;
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