"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [predictionId, setPredictionId] = useState("");

  useEffect(() => {
    if (predictionId) {
      const fetchVideo = async () => {
        try {
          const response = await fetch("/api/video/new", {
            method: "POST",
            body: JSON.stringify({
              userId: session?.user.id,
              video: "",
              predictionId: predictionId,
              name: videoName,
            }),
          });
  
          // Handle response accordingly
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchVideo();
    }
  }, [predictionId]);

  const createVideo = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_video: videoBase64,
        }),
      });
      let prediction = await response.json();

      if (response.status !== 201) {
        setError(prediction.detail);
        return;
      }
      setPrediction(prediction);
      setPredictionId(prediction.id)
      console.log({prediction})

      if (response.ok) {
        await sleep(2000);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsSubmitting(false);
    }
  };

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

  const handleVideoRemove = () => {
      setVideoBase64(null); 
      setVideoDuration(0); 
  };


  useEffect(() => {
    const handleScriptLoad = () => {
      // Script has finished loading, you can access the object here
      window.createLemonSqueezy();
      // Use the object as needed
      LemonSqueezy.Setup({
        eventHandler: (event) => {
          if (event.target !== 'metamask-inpage') {
            // Process events only if they are not triggered by Metamask
            if (event.event === 'Checkout.Success') {
              console.log('HEY');
            }
            console.log(event);
          }   
        }
      })
      //console.log("HEEY "+lemonsqueezy)

    };

    const script = document.createElement('script');
    script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
    script.async = true;
    script.onload = handleScriptLoad;

    document.body.appendChild(script);

  }, []);


  function downloadFile() {
    const url = "https://replicate.delivery/pbxt/gzlc3YFivFLzGV1QbIIWds4J8EQp1nuXH6TaVHYx68g9UlTE/green-screen.mp4";
    const link = document.createElement("a");
    link.href = url;
    link.download = "green-screen.mp4";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>Create Video</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Intructions and considerations...
      </p>

      <form
        onSubmit={createVideo}
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
        <div class="mb-5">
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
          
          <a href="https://vesica-lab.lemonsqueezy.com/checkout/buy/a1673e8f-ba61-4250-861a-a66f8064aae9?embed=1&discount=0&dark=1"
           class="lemonsqueezy-button px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">Buy AI Video Background Remover Tool</a>

          




          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `Creating...` : "Create"}
          </button>
        </div>
      </form>

      {error && <div>{error}</div>}

      {prediction && (
        <div>
            {prediction.output && (
              <p>{prediction.output[prediction.output.length - 1]}</p>
            )}
            <p>status: {prediction.status + prediction.logs}</p>
        </div>
      )}

    </section>
  );
};

export default CreatePrompt;
