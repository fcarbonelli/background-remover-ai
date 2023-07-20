import Video from "@models/video";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, video, predictionId, name } = await request.json();
    console.log({ userId, video, predictionId, name })
    try {
        await connectToDB();
        const newVideo = new Video({ creator: userId, video, predictionId, name });

        await newVideo.save();
        return new Response(JSON.stringify(newVideo), { status: 201 })
    } catch (error) {
        return new Response("Failed to save a new video", { status: 500 });
    }
}
