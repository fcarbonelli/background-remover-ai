export async function POST(req, res) {
    const { input_video } = await req.json();

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "73d2128a371922d5d1abf0712a1d974be0e4e2358cc1218e4e34714767232bac",
        input: { input_video: input_video },
      }),
    });
  
    if (response.status !== 201) {
        let error = await response.json();
        return new Response(JSON.stringify({ detail: error.detail }), { status: 500 })
    }
  
    const prediction = await response.json();
    return new Response(JSON.stringify(prediction), { status: 201 })
  }