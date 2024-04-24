import React, { useState } from "react";

function CreateTracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courierCode, setCourierCode] = useState("");
  const [response, setResponse] = useState();
  const apiKey = "asat_28e7b109a10b4eb0ad8ec71bf381d07a";

  const handleTrackingSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://api.aftership.com/v4/trackings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "as-api-key": apiKey,
        },
        body: JSON.stringify({
          tracking: {
            tracking_number: trackingNumber,
            slug: courierCode,
          },
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setResponse(data.meta.message);
      } else {
        setResponse(data.meta.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleTrackingSubmit}>
        <h1>Create Tracking</h1>
        <label>
          Tracking Number:
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Courier Code:
          <input
            type="text"
            value={courierCode}
            onChange={(e) => setCourierCode(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response:</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
}

export default CreateTracking;
