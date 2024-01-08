import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Something went wrong, request not sent!");
  }

  return resData;
}

export default function useHttp(url, config, initialValue) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialValue);

  const sendRequest = useCallback(
    async function sendRequest() {
      {
        setIsLoading(true);
        try {
          const resData = await sendHttpRequest(url, config);
          setData(resData);
        } catch (error) {
          setError(error.message || "Something goes wrong!");
        }
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
      console.log("khoda");
    }
  }, [sendRequest, config]);

  return {
    isLoading,
    error,
    data,
    sendRequest,
  };
}
