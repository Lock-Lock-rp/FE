import { useEffect, useState } from "react";
import { getAlerts } from "../api/api";
import LogBox from "./LogBox";

export default function Alerts() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlerts()
      .then(data => {
        const logStrings = data.map(alert => `${alert.timestamp} ${alert.message}`);
        setLogs(logStrings);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>로딩 중...</div>;

  return <LogBox logs={logs || []} />;
}
