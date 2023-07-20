import { Schema, model, models } from 'mongoose';

const VideoSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  video: {
    type: String,
  },
  predictionId: {
    type: String,
    required: [true, 'Id is required.'],
  },
  name: {
    type: String,
    required: [true, 'Video Name is required.'],
  },
});

const Video = models.Video || model('Video', VideoSchema);

export default Video;