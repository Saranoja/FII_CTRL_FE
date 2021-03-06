/* eslint-disable import/no-anonymous-default-export */
import * as R from 'ramda';
import { isBlank } from '../../../utils';
import userManager from '..';

const initialData = userManager.getIdmData();
const account = initialData
  ? R.pick(['token', 'refresh_token'], initialData)
  : '';

export default {
  first_name: initialData.first_name,
  last_name: initialData.last_name,
  teaching: initialData.teaching,
  email: initialData.email,
  group: initialData.group,
  year: initialData.year,
  admin: initialData.admin,
  isLoading: false,
  hasId: !isBlank(account),
  idm: account,
  id: initialData.id,
  subjects: initialData.subjects,
};
