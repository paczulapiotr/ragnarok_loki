import { result } from 'store/utility';

export const actionTypes = {
  ADD_COLUMN_REQUEST: 'ADD_COLUMN_REQUEST',
  ADD_COLUMN_FINISHED: 'ADD_COLUMN_FINISHED',
  ADD_COLUMN_FAILED: 'ADD_COLUMN_FAILED',
};

export const addColumnRequest = payload => result(actionTypes.ADD_COLUMN_REQUEST, payload);
