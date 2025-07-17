import { generatePath } from 'react-router-dom';
import { LogoutSource, ROUTES } from './routes';

export const getLogoutRoute = (source: LogoutSource) => {
  return generatePath(ROUTES.logout, { source });
};
