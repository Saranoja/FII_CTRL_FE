import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledResourcesManager = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
    min-height: 60vh;

    .header-wrapper {
      margin-bottom: ${theme.spacing(3)}px;
    }

    .resources-wrapper {
      max-height: 70vh;
      overflow: auto;
      margin: ${theme.spacing(4)}px 0;
    }

    .resources-upload-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        max-width: ${theme.spacing(100)}px;

        .resources-subject-picker, .file-picker {
            margin-bottom: ${theme.spacing(4)}px;
        }
    }
  `}
`;

export default StyledResourcesManager;
