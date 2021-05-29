import styled from 'styled-components';

const StyledActionsSegment = styled.div`
  ${({ theme }) => `
    .edit-announcement-button {
        margin-right: ${theme.spacing(1)}px;
    }
  `}
`;

export default StyledActionsSegment;
