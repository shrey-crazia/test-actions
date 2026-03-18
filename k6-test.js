import http from "k6/http";
import { check } from "k6";

const TARGET_URL = "https://conflrmsecurity.com/";

export default function () {
  // Fire 10 requests in parallel per VU per iteration
  const requests = Array.from({ length: 10 }, () => ["GET", TARGET_URL, null, {
    headers: { "Cache-Control": "no-cache" },
  }]);

  const responses = http.batch(requests);

  responses.forEach((res) => {
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
  });

  // No sleep — each VU loops as fast as possible
}
