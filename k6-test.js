import http from "k6/http";

const TARGET_URL = "https://conflrmsecurity.com/";

const params = {
  headers: { "Cache-Control": "no-cache" },
  timeout: "3s",       // don't wait longer than 3s per request
  responseType: "none", // discard response body — saves memory and CPU
};

export default function () {
  const requests = Array.from({ length: 20 }, () => ["GET", TARGET_URL, null, params]);
  http.batch(requests);
}
