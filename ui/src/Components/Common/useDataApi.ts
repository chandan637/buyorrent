import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useToken } from "./TokenContext";

const dataFetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: false };
    case "FETCH_SUCCESS":
      return {
        isLoading: false,
        error: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      throw new Error("Invalid Data API Action");
  }
};

const useDataApi = (method:any, initialUrl:any, requestData: any, initialData:any) => {
  const [url, setUrl] = useState(initialUrl);
  const { token } = useToken();

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    error: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      console.log("fetchData", url);
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios({
          // baseURL: process.env.REACT_APP_API_ENDPOINT!,
          method,
          url,
          data: requestData,
          timeout: 4000,
          headers: {
            common: {
              "Content-Type": "application/json"
              // Authorization: token && `Bearer ${token}`
            }
          }
        });

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        } else {
          console.log("fetchData.canceled", result.data);
        }
      } catch (error) {
        console.error("fetchData", error.message);
        // console.log('fetchData', JSON.stringify(error, ' ', ' '))

        let payload = error.message;
        if (error.response) {
          payload = error.response.data;
        }

        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE", payload });
        }
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      // TODO support https://github.com/axios/axios#cancellation
      didCancel = true;
    };
  }, [url, initialUrl, requestData, token, method]);

  return [state, setUrl];
};

export default useDataApi;
