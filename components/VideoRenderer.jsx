"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BuyButton from "./BuyButton";


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const VideoRenderer = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [predictionId, setPredictionId] = useState("");
  const [email, setEmail] = useState("");

  const [videoBase64, setVideoBase64] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoName, setVideoName] = useState("");
  const [price, setPrice] = useState();

  const createVideo = async (video) => {
    setIsSubmitting(true);
    
    try {
      
      const uploadResponse = await fetch(`https://e4opydwo8a.execute-api.us-east-1.amazonaws.com/video?email=${encodeURIComponent(orderRef.current.email)}&isGreenScreen=false&fileName=${encodeURIComponent(orderRef.current.videoName)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: video, 
      });

      if (uploadResponse.status !== 200) {
        console.log("Error uploading video to S3:", uploadResponse);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_video: video,
        }),
      });
      let prediction = await response.json();

      if (response.status !== 201) {
        setError(prediction.detail);
        setIsSubmitting(false);
        return;
      }

      setPrediction(prediction);
      setPredictionId(prediction.id)

      const orderBody = {
        email: orderRef.current.email,
        predictionId: prediction.id,
        videoName: orderRef.current.videoName,
        cost: orderRef.current.cost,
        videoLength: orderRef.current.videoLength,
      };

      const orderResponse = await fetch("https://e4opydwo8a.execute-api.us-east-1.amazonaws.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderBody),
      });

      if (orderResponse.status !== 200) {
        // Handle any error cases for the new POST request
      }

    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
    finally {
      setIsSubmitting(false);
    }
  };


  // ---- HANDLE VIDEO LOADER ----
  const handleVideoUpload = (event) => {
      handleVideoRemove();
      const file = event.target.files[0];
      if(file){
          setVideoName(file.name);
          orderRef.current.videoName = file.name;
          setVideoError(null); 

          const reader = new FileReader();
      
          reader.onload = (event) => {
              const base64 = event.target.result;
              setVideoBase64(base64);
      
              const videoElement = document.createElement("video");
              videoElement.src = base64;
              videoElement.addEventListener("loadedmetadata", () => {
                if(videoElement.duration > 180) {alert("Video can not be longer than 3 minutes!"); handleVideoRemove() }
                setVideoDuration(videoElement.duration);
                orderRef.current.videoLength = videoElement.duration.toFixed(2);
                

              });
          };
          reader.readAsDataURL(file);

      }
  };

  useEffect(() => {
    if (videoBase64) {
      calculatePrice();
    }
  }, [videoBase64]);

  const calculatePrice = () => {
    const minutes = Math.ceil(orderRef.current.videoLength / 60); 
    let price;
    if (minutes <= 1) {
      price = "$4.99"; 
    } else if (minutes <= 2) {
      price = "$9.99"; 
    } else if (minutes <= 3){
      price = "$14.99"; 
    }
  
    //habilitar el buy button
    orderRef.current.cost = price;
    setPrice(price)
  };

  const handleVideoRemove = () => {
      setVideoBase64(null); 
      setVideoDuration(0); 
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    orderRef.current.email = event.target.value;
    if(email === ""){setIsFormValid(false)} else {setNameError(null)}

  };

  //---- HANDLE LEMON SQUEEZY PAYMENTS ----

  const videoBase64Ref = useRef(null);

  const orderRef = useRef({
    email: '',
    videoName: '',
    cost: '',
    videoLength: 0,
  });

  useEffect(() => {
    const handleScriptLoad = () => {

      window.createLemonSqueezy();
      LemonSqueezy.Setup({
        eventHandler: (event) => {
          console.log(event.event)
          if (event.target !== 'metamask-inpage') {
            if (event.event === 'Checkout.Success') {
              console.log(event.event)
              const video = videoBase64Ref.current;
              createVideo(video)
            }
          }   
        }
      })
    };

    const script = document.createElement('script');
    script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
    script.async = true;
    script.onload = handleScriptLoad;

    document.body.appendChild(script);

  }, []);

  useEffect(() => {
    videoBase64Ref.current = videoBase64;
    if(videoBase64){handleSubmit();}
  }, [videoBase64]);

  const [nameError, setNameError] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!email) {
      setNameError("Please fill the email field!")
    } else {
      setNameError(null)
    }
    if(!videoBase64Ref.current){
      setVideoError("Please upload a video!")
    } else {
      setVideoError(null)
    } 

    if(email && videoBase64Ref.current) {
      setIsFormValid(true)
    }
  };

  return (
    <section className='w-full max-w-full flex-start flex-col my-10'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>Create Video</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Important Notes.
      </p>
      <p className='mt-5 text-md text-gray-600  max-w-2xl text-left '>
      • Price is just $4.99 for up to a 3 minute video. <br />
      • Ensure your video prominently features a person in a clear position for best results. <br />
      • Please note that the rendered video output will NOT include sound. <br />
      • Expect your rendered video in your inbox within 5 to 10 minutes. (check Spam folder)<br />
      • If it takes longer than an hour, contact us for support at carbonelli.francisco@gmail.com
      </p>
    

      <form id="create-video"
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <div class="mb-2">
          <label for="email" class="font-satoshi font-semibold text-base text-gray-700">
          Send video to this email:
          </label>
          <input
          type="email"
          name="email"
          id="email"
          placeholder="example@domain.com"
          value={email}
          onChange={handleEmailChange}
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {nameError && <div className="text-red-500">{nameError}</div>}
        </div>

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
        {videoError && <div className="text-red-500">{videoError}</div>}

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

        <div className='flex-end mt-3'>

        <BuyButton/>
          
        {/*isFormValid ? (<a
        href='https://vesica-lab.lemonsqueezy.com/checkout/buy/a1673e8f-ba61-4250-861a-a66f8064aae9?embed=1&logo=0&dark=1'
        class="lemonsqueezy-button p-5 py-2 text-sm bg-primary-orange rounded-full text-white"
    >
        Submit Order 🛒 $4.99
    </a>
        ) : (
          <button
            className="p-5 py-2 text-sm bg-primary-orange rounded-full text-white"
            onClick={handleSubmit}
          >
            Submit Order 🛒 $4.99
          </button>
        )*/}
          
        </div>
        <div className='flex-end'>
          <p className="text-md text-gray-600 text-right ">
            Safe and secure checkout powered by LemonSqueezy <br /> We do not make ourselves responsible if the data entered is incorrect.
          </p>
        </div>
      </form>
      <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>

    </section>
  );
};

export default VideoRenderer;
