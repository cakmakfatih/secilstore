import { InvalidFieldsResponse } from 'next-auth';

export const isInvalidFieldsError = (obj: any): obj is InvalidFieldsResponse => {
  return (
    obj?.data !== undefined && (obj.data.Username !== undefined || obj.data.Password !== undefined)
  );
};

export const isGeneralError = (obj: any): obj is InvalidFieldsResponse => {
  return obj?.message !== undefined;
};
