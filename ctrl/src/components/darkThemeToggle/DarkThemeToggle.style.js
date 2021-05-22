import styled from 'styled-components';

const StyledDarkThemeToggle = styled.div`
  ${({ theme }) => `
  .toggle-root {
    position: absolute;
    top: ${theme.spacing(1)}px;;
    right: ${theme.spacing(7)}px;
  }`}
`;

export default StyledDarkThemeToggle;
