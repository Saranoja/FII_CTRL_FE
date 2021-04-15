import styled, { css } from 'styled-components';

const StyledCustomFilePicker = styled.div`
${({ theme }) => {
        const { spacing, palette } = theme;

        return css`
            .filepicker-wrapper {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                gap: ${`${spacing(1)}px`};
                border: 1px solid ${palette.grey[700]};
                padding: ${`${spacing(0.5)}px`};
                padding-right: ${`${spacing(1)}px`};
                border-radius: ${`${spacing(1)}px`};

                .uploaded-filename {
                    color: ${palette.grey[400]};
                    width: ${`${spacing(20)}px`};
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        `;
    }}
`


export default StyledCustomFilePicker;