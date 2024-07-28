import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send send request."
    );
  }

  return resData;
}

function useHttp(url, config, initialData) {
  const [error, setError] = useState();
  const [data, setdata] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  function clearData(){
    setdata(initialData);
  }


  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {...config, body: data});
        setdata(resData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    error,
    data,
    isLoading,
    sendRequest,
    clearData
  };
}

export default useHttp;
