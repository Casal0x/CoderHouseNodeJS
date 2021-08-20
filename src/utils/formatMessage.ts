import moment from 'moment';

export const formatMessages = (data) => {
  return {
    ...data,
    time: moment().format('h:mm a'),
  };
};
