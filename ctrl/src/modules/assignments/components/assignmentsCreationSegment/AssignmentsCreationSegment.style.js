import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const StyledAssignmentsCreationSegment = styled.div`
  ${({ theme }) => `


  `}
`;

export const StyledInput = styled(Input)`
  ${({ theme }) => `
    &&:before {
      border-bottom: none;
    }

    &&:after {
      border-bottom: none;
    }

    .MuiSelect-select:focus {
      background: transparent;
      border-bottom: none;
    }

`}
`;

export const StyledSelect = styled(Select)`
  ${({ theme }) => `
    :focus {
      background: transparent;
      border-bottom: none;
    }
`}
`;

export const StyledFormControl = styled(FormControl)`
  ${({ theme }) => `
    &.input-form-control-root {
      border-radius: ${theme.spacing(0.5)}px;
      border: 1px solid rgba(255, 255, 255, 0.23);
      padding: 0 14px ${theme.spacing(1)}px;
      margin-bottom: ${theme.spacing(2)}px;
    }
  `}
`;

export default StyledAssignmentsCreationSegment;
