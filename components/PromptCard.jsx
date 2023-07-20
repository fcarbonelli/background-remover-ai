"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [video, setVideo] = useState("")  

  useEffect(() => {
    const fetchPrediction = async () => {
      if (post.video === "") {
        const response = await fetch("/api/predictions/" + post.predictionId, { cache: "no-cache" });
        const data = await response.json();
        if(data.status === "succeeded"){
          try {
            const response = await fetch("/api/video/edit", {
              method: "PUT",
              body: JSON.stringify({ _id: post._id, video: data.output }),
            });
        
            if (response.ok) {
              console.log("Video updated successfully");
              setVideo(data.output);
              post.video = data.output;
            } else {
              console.error("Failed to update video");
            }
          } catch (error) {
            console.error("Error occurred during API call:", error);
          }
        }
      }
    };

    fetchPrediction();
  }, [post]);


  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
        >
          

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              Green Screen Video
            </h3>
          </div>
        </div>

        
      </div>

      {(post.video === "" && video === "") ? (
        <>
          <div className='my-4 w-full flex-center'>
            <p className='pr-2 font-inter text-sm text-gray-500'>Video is processing... </p>
            <Image
              src='assets/icons/loader.svg'
              width={50}
              height={50}
              alt='loader'
              className='object-contain'
            />
          </div>
        </>
      ) : (
        <div className="my-4">
          <video src={post.video} controls />
        </div>
      )}
      <p className='font-inter text-sm blue_gradient'> {post.name} </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Download
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
