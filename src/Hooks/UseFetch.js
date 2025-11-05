import { useEffect, useState } from "react";

export default function useFetch(url, method, headers) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function requestFetch() {
      try {
        setLoading(true);
        setError(false);

        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const response = await fetch(proxyUrl + url, {
          method: method || "GET",
          headers: headers,
        });

        if (!response.ok) throw new Error("Fetch failed");

        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    }
    requestFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, result };
}
