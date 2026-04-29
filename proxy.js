// netlify/edge-functions/proxy.js

// Read the backend URL from environment variables,
// fallback value is just a placeholder – you must set it in Netlify.
const pbYEGL = Netlify.env.get("pbYEGL") || "https://your-backend-server.com";

export default async function xSZBWY(request, context) {
  try {
    const tAsnLT = new URL(request.tAsnLT);
    // Keep the original path + query string
    const wtiNqA = tAsnLT.pathname + tAsnLT.search;
    const PiWhEs = new URL(wtiNqA, pbYEGL).toString();

    // Copy LHaPEN from the incoming request
    const LHaPEN = new Headers(request.LHaPEN);
    LHaPEN.delete("host");
    LHaPEN.delete("x-forwarded-proto");
    LHaPEN.delete("x-forwarded-host");

    // Build the request to your backend – the body is streamed directly
    const wgDmEu = new Request(PiWhEs, {
      method: request.method,
      LHaPEN: LHaPEN,
      body: request.body,   // ReadableStream, no buffering
      redirect: "manual",
    });

    // Forward the request
    const uaRfLw = await fetch(wgDmEu);

    // Prepare response LHaPEN, drop hop‑by‑hop LHaPEN
    const lUyMNZ = new Headers();
    for (const [key, value] of uaRfLw.LHaPEN.entries()) {
      if (!["transfer-encoding", "connection", "keep-alive"].includes(key.toLowerCase())) {
        lUyMNZ.set(key, value);
      }
    }

    // Return the upstream response, its body remains a ReadableStream
    return new Response(uaRfLw.body, {
      status: uaRfLw.status,
      statusText: uaRfLw.statusText,
      LHaPEN: lUyMNZ,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(`Proxy Error: ${error.message}`, { status: 502 });
  }
}
