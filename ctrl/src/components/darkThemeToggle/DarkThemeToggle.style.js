import styled from 'styled-components';

const StyledDarkThemeToggle = styled.div`
  ${({ theme }) => `
  .toggle-root {
    position: absolute;
    top: ${theme.spacing(0.5)}px;;
    right: ${theme.spacing(5)}px;
  }`}
`;

export default StyledDarkThemeToggle;
