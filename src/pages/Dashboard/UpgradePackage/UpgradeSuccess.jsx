import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpgradeSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const [result, setResult] = useState(null);
  

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/upgrade-success?session_id=${sessionId}`)
        .then((res) => {
          setResult(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-green-600">Upgrade Successful ✅</h2>

      {!sessionId && (
        <p className="mt-4 text-red-500">
          No session id found. Please try upgrading again.
        </p>
      )}

      {result?.success && (
        <div className="mt-4">
          <p className="text-lg">
            Transaction ID: <span className="font-semibold">{result.transactionId}</span>
          </p>
        </div>
      )}

      <div className="mt-6">
        <Link to="/dashboard/upgrade-package" className="btn btn-accent text-white">
          Back to Upgrade Package
        </Link>
      </div>
    </div>
  );
};

export default UpgradeSuccess;
