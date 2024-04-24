import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";

function GetTracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [response, setResponse] = useState(null);
  const apiKey = "asat_28e7b109a10b4eb0ad8ec71bf381d07a";

  const handleTrackingSubmit = async (event) => {
    event.preventDefault();
    try {
      let apiUrl = "https://api.aftership.com/v4/trackings";
      if (trackingNumber) {
        const queryParams = new URLSearchParams({
          tracking_numbers: trackingNumber,
        });
        apiUrl += `?${queryParams.toString()}`;
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "as-api-key": apiKey,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setResponse(data);
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
        <label>
          Tracking Number:
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h1>Get Tracking</h1>
        <h2>Tracking Data:</h2>
        {response && response.data && response.data.trackings && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tracking Number</TableCell>
                <TableCell>Origin Country</TableCell>
                <TableCell>Destination Country</TableCell>
                <TableCell>Shipment Type</TableCell>

                <TableCell>Waybill Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Current Location</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Shipment Package Count</TableCell>
                <TableCell>Shipment Pickup Date</TableCell>
                <TableCell>Shipment Delivery Date</TableCell>
                <TableCell>Shipment Weight</TableCell>
                <TableCell>Signature Requirement</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {response.data.trackings.map((tracking) => (
                <TableRow key={tracking.id}>
                  <TableCell>{tracking.tracking_number}</TableCell>
                  <TableCell>{tracking.origin_country_iso3}</TableCell>
                  <TableCell>{tracking.destination_country_iso3}</TableCell>
                  <TableCell>{tracking.shipment_type}</TableCell>

                  <TableCell>{tracking.subtag_message}</TableCell>
                  <TableCell>{tracking.customer_name}</TableCell>
                  <TableCell>{tracking.order_id}</TableCell>
                  <TableCell>{tracking.order_date}</TableCell>
                  <TableCell>{tracking.shipment_package_count}</TableCell>
                  <TableCell>{tracking.shipment_pickup_date}</TableCell>
                  <TableCell>{tracking.shipment_delivery_date}</TableCell>
                  <TableCell>
                    {tracking.shipment_weight} {tracking.shipment_weight_unit}
                  </TableCell>
                  <TableCell>{tracking.signature_requirement}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {response && !response.data && <p>No response data received.</p>}
      </div>
    </div>
  );
}

export default GetTracking;
