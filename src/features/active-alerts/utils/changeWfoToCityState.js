// ex: 'NWS Charlotte NC' --> 'Charlotte, NC'
export const changeWfoToCityState = (senderName) => {
  return senderName
    .slice(4)
    .split(/\s(?=[A-Z]{2})/)
    .join(", ");
};
