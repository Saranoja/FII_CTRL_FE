/* eslint-disable import/no-anonymous-default-export */
import * as R from 'ramda';
import { isBlank } from '../../../utils';
import userManager from '../../userManager';

const initialData = userManager.getIdmData();
const account = initialData ? R.pick(['token', 'refresh_token'], initialData) : "";

export default {
  first_name: initialData.first_name,
  last_name: initialData.last,
  teaching: initialData.teaching,
  isLoading: false,
  hasIdm: !isBlank(account),
  idm: account,
};
