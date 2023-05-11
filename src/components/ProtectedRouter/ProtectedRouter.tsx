import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { getAuth } from "../../services/selectors";
import * as React from "react";
import { LOGIN_ROUTE_URL, ORIGIN_ROUTE_URL } from "../../constants";

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

  const { user } = useSelector(getAuth);
  console.log(user)

  // const [isUserLoaded, setUserLoaded] = React.useState(false);

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

  return !user && onlyUnAuth ? element : <Navigate to={ORIGIN_ROUTE_URL} replace/>;
};  