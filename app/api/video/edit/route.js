import Video from "@models/video";
import { connectToDB } from "@utils/database";

export const PUT = async (request) => {
  const { _id, video } = await request.json();
  
  try {
    await connectToDB();

    const updatedVideo = await Video.findByIdAndUpdate(
      _id,
      { video },
      { new: true }
    );

    if (updatedVideo) {
      return new Response(JSON.stringify(updatedVideo), { status: 200 });
    } else {
      return new Response("Video not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Failed to update the video", { status: 500 });
  }
};