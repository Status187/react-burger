import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { getAuth } from "../../services/selectors";
import * as React from "react";
import { ORIGIN_ROUTE_URL } from "../../constants";
import { IInitialStateAuth } from "../../types";

export interface IProtectRoute {
  element: any;
  path?: string;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: React.FC<IProtectRoute> = (props) => {
  const {
    element,
    path,
    onlyUnAuth = false
  } = props;

  const { user }: IInitialStateAuth = useSelector(getAuth);
  console.log('ProtectedRoute', user, onlyUnAuth)

  if (user.email.length > 0 && !onlyUnAuth) {
    return element
  }

  return user.email.length === 0 && onlyUnAuth === true ? element : <Navigate to={ORIGIN_ROUTE_URL} replace/>;

    // const init = async () => {
  //   await getUser();
  //   setUserLoaded(true);
  // };

  // React.useEffect(() => {
  //   init();
  // }, []);

  // if (!onlyUnAuth) {
  //   return null;
  // }
};  