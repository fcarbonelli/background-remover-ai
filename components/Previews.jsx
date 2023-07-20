import React from 'react'

const Previews = () => {



  return (
    <section class="pb-10">
        <div class="container px-6 lg:py-5 mx-auto pb-5">
            <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-2xl ">Robust Human Video Matting
            </h1>

            <p class="mt-5 text-lg text-gray-600 sm:text-xl  text-center">
            Our AI-powered video background removal tool is designed specifically for robust human video matting. It uses a recurrent neural network to process videos ensuring more accurate and seamless background removal, especially when humans are present in the footage.
            </p>
        </div>
        <div id="gallery" class="relative w-full" data-carousel="static">
            
            <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <video src="/assets/videos/GreenScreenDemo.mp4" muted controls class="absolute rounded-lg block max-w-full lg:h-96 h-56 -translate-x-1/2 left-1/2" alt=""></video>
                </div>
                
                <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
                    <video src="/assets/videos/greenscreen2.mp4" muted controls class="absolute rounded-lg block max-w-full lg:h-96 h-56 -translate-x-1/2 left-1/2" alt=""></video>
                </div>
                
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <video src="/assets/videos/girl-dancing.mp4" muted controls class="absolute rounded-lg block max-w-full lg:h-96 h-56 -translate-x-1/2 left-1/2" alt=""></video>
                </div>
                
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <video src="/assets/videos/video-after.mp4" muted controls class="absolute rounded-lg block max-w-full lg:h-96 h-56 -translate-x-1/2 left-1/2" alt=""></video>
                </div>
                
            </div>
            
            <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center lg:h-full  px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-black dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center lg:h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-black dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>
        </div>

        
    </section>
  )
}

export default Previews