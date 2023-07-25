"use client";

import { React, useState } from "react";
import Link from "next/link";

const Form = ({ type, video, setVideo, submitting, handleSubmit }) => {

  const [videoBase64, setVideoBase64] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoName, setVideoName] = useState("");

  const handleVideoUpload = (event) => {
    handleVideoRemove();
      const file = event.target.files[0];
      if(file){
          setVideoName(file.name);
          const reader = new FileReader();
      
          reader.onload = (event) => {
              const base64 = event.target.result;
              setVideoBase64(base64);
      
              const videoElement = document.createElement("video");
              videoElement.src = base64;
              videoElement.addEventListener("loadedmetadata", () => {
                setVideoDuration(videoElement.duration);
              });
          };
          reader.readAsDataURL(file);
      }
  };

  const updateVideo = () => {
    setVideo({ ...video, video: videoBase64 });

  };

  const handleVideoRemove = () => {
      setVideoBase64(null); 
      setVideoDuration(0); 
  };

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Video</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Intructions and considerations...
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >

        {!videoBase64 && (
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Upload Video
          </span>
          
          <input type="file" accept="video/*" name="file" id="file" class="sr-only" onChange={handleVideoUpload}/>
          <label for="file" class="bg-white relative flex min-h-[150px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center hover:bg-grey-800">
              <div >
                  <span class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">Browse Videos</span>
              </div>
          </label>
        </label>)}

        {videoBase64 && (<>
        <div class="mb-5 flex flex-wrap">
            <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">Video to render</label>
            
            <video controls>
                <source src={videoBase64} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
                
            <p>Video Duration: {videoDuration.toFixed(2)} seconds</p>
        </div>

        <div class="mb-5 rounded-md bg-white py-4 px-8 glassmorphism">
            <div class="flex items-center justify-between">
                <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                {videoName}
                </span>
                <button class="text-[#07074D]" onClick={handleVideoRemove}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
        </>
        )}

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/profile' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            onClick={updateVideo}
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
