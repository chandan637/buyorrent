import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingPage from "../Common/Loading";

import { gLoginSuccess } from "../../services/authService";

const GLoginPage = (props: any): any => {
  const history = useHistory();

  const fetchProperty = async () => {
    const sid = props?.match?.params?.sid;
    const nid = props?.match?.params?.nid;
    await gLoginSuccess({ sid, nid });
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return <LoadingPage />;
};

export default GLoginPage;
