import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpgradeSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const [result, setResult] = useState(null);

  const calledRef = useRef(false); // ✅ add this

  useEffect(() => {
    if (!sessionId) return;
    if (calledRef.current) return; // ✅ stop double call
    calledRef.current = true;

    axiosSecure
      .patch(`/upgrade-success?session_id=${sessionId}`)
      .then((res) => setResult(res.data))
      .catch(console.log);
  }, [sessionId, axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-green-600">Upgrade Successful ✅</h2>

      {result?.success && (
        <p className="mt-4 text-lg">
          Transaction ID: <span className="font-semibold">{result.transactionId}</span>
        </p>
      )}

      <div className="mt-6">
        <Link to="/dashboard/upgrade-package" className="btn btn-accent text-white">
          Back
        </Link>
      </div>
    </div>
  );
};

export default UpgradeSuccess;
