import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from "../../services/selectors";
import { LOGIN_ROUTE_URL,} from "../../constants";
import { IInitialStateAuth } from "../../types";

export interface IProtectRoute {
  element: any;
  path?: string;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: React.FC<IProtectRoute> = (props) => {
  const {
    element,
    onlyUnAuth = false
  } = props;
  
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { user }: IInitialStateAuth = useSelector(getAuth);

  React.useEffect(() => {
    if (!user && onlyUnAuth) {
      navigate(LOGIN_ROUTE_URL, { state: { from: pathname }, replace: true });
    }
  }, [element, navigate, onlyUnAuth, pathname, user]);

  return element
};  