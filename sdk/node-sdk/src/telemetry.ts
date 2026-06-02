import axios from "axios";

import { getBatch, removeBatch } from "./queue";

import { API_CONTROL_URL } from "./constants";

export function startTelemetryWorker() {
  setInterval(async () => {
    const batch = getBatch(100);

    if (!batch.length) return;

    try {
      await axios.post(`${API_CONTROL_URL}/sdk/usage/bulk`, {
        events: batch,
      });

      removeBatch(batch.length);

      console.log("Telemetry batch sent:", batch.length);
    } catch (error: any) {
      console.log("Telemetry failed");

      console.error(error.message);
    }
  }, 5000);
}
