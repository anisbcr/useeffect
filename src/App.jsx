import React, { useEffect, useState } from "react";
import "../components/Coins.css";
import axios from "axios";
function Coins() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [table, setNewTable] = useState([]);
  const [error, setError] = useState(null);
  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/stats',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl'
    },
    headers: {
      'x-rapidapi-key': '02e3b30362mshb1b1104986bf70ap1e6be3jsnc20a9e313251',
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
    }
  };

  useEffect(() => {
    if (started) {
      const fetchUrl = async () => {
        try {
          const res = await axios.request(options);
          console.log("API response:", res.data);
          setNewTable([res.data.data]);
          setLoading(true);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Failed to fetch data.");
          setLoading(false);
        }
      };

      fetchUrl();
    }
  }, [started]);
  const start = () => {
    setStarted(true);
  };

  return (
    <div className="coins-container">
      {!started ? (
        <button onClick={start}>Start</button>
      ) : loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2 className="error-message">{error}</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Total Coins</th>
              <th>Total Markets</th>
              <th>Total Exchanges</th>
            </tr>
          </thead>
          <tbody>
            {table.map((item, index) => (
              <tr key={index}>
                <td>{item.totalCoins}</td>
                <td>{item.totalMarkets}</td>
                <td>{item.totalExchanges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Coins;
