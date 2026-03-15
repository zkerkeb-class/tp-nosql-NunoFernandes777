export async function readApiResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.toLowerCase().includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return {
    error: text.includes("<!DOCTYPE")
      ? "The server returned an unexpected HTML error page."
      : text || "The server returned an unexpected response.",
  };
}
