import Video from "@models/video";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const videos = await Video.find({}).populate('creator')

        return new Response(JSON.stringify(videos), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all videos", { status: 500 })
    }
} 