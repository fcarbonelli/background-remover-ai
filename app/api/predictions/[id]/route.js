export async function GET(req, { params }) {
    const response = await fetch(
      "https://api.replicate.com/v1/predictions/" + params.id,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
    if (response.status !== 200) {
      let error = await response.json();
      return new Response(JSON.stringify({ detail: error.detail }), { status: 500 })
    }
  
    const prediction = await response.json();
    return new Response(JSON.stringify(prediction))
  }

