import Video from "@models/video";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const videos = await Video.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(videos), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch videos created by user", { status: 500 })
    }
} 