import * as React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { getAuth } from "../../services/selectors";
import { LOGIN_ROUTE_URL, ORIGIN_ROUTE_URL,} from "../../constants";
import { IInitialStateAuth } from "../../types";
import { IProtectRoute } from "./interfaces";
import { useAppSelector } from "../../services/store";

export const ProtectedRoute: React.FC<IProtectRoute> = (props) => {
  const {
    element,
    onlyUnAuth = false
  } = props;

  const { user, getUserRequest }: IInitialStateAuth = useAppSelector(getAuth);
  
    const location = useLocation();

    const located = location.state?.from || ORIGIN_ROUTE_URL;
    
    if (getUserRequest) { return null }

    if (onlyUnAuth && user.email) {
      return <Navigate to={ located } />;
    }
  
    if (!onlyUnAuth && !user.email) {
      return <Navigate to={LOGIN_ROUTE_URL} state={{ from: location }}/>;
    }
    
    return element;
};  