import styled from 'styled-components';

const StyledResources = styled.div`
  ${({ theme }) => `
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
      height: 100%;
    }

    .filepicker-wrapper,
    .articles-checkbox {
      margin-bottom: 24px;
    }

    .resource-cards-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: baseline;
      gap: 16px;

      .tab-panel-root {
        padding: ${theme.spacing(3)}px 0;
      }
    }

    .grid-divider-loader {
      margin: ${theme.spacing(2)}px;
    }
  `}
`;

export default StyledResources;
