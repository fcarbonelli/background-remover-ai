import React from 'react'

const FAQ = () => {
  return (
    
    <section>
        <div class="items-center w-full px-5 py-8 mx-auto md:px-12 lg:px-16 max-w-7xl">
        <div>
            <div class="max-w-2xl">
            <p class="text-4xl text-black">
                Frequently Asked Questions
            </p>
            <p class="max-w-2xl mt-4 text-lg tracking-tight text-gray-600">
                If you have other questions, please contact us at [support email]
            </p>
            </div>
        </div>
        <div class="w-full mx-auto mt-8 text-left">
            <div class="relative items-center gap-12 m-auto lg:inline-flex md:order-first">
            <div class="p-4 mx-auto lg:max-w-7xl lg:p-0">
                <ul role="list" class="grid grid-cols-1 gap-4 list-none lg:grid-cols-3 lg:gap-12">
                <li>
                    <div>
                    <p class="mt-5 text-lg font-medium leading-6 text-black">
                        How does the background removal process work?
                    </p>
                    </div>
                    <div class="mt-2 text-base text-gray-500">
                    Our background removal process utilizes an advanced AI model specifically trained to remove the background from videos featuring people. This model analyzes each frame, accurately identifies the subject, and intelligently removes the background, resulting in a clean and professional-looking video.
                    </div>
                </li>
                <li>
                    <div>
                    <p class="mt-5 text-lg font-medium leading-6 text-black">
                    Can I use the rendered videos for commercial purposes?
                    </p>
                    </div>
                    <div class="mt-2 text-base text-gray-500">
                    Absolutely! You have full rights to use the rendered videos for any commercial purposes. Whether it's for marketing, advertising, or any other business-related activities, feel free to leverage the edited videos to enhance your content and captivate your audience.
                    </div>
                </li>
                <li>
                    <div>
                    <p class="mt-5 text-lg font-medium leading-6 text-black">
                    Is my uploaded video secure and protected?
                    </p>
                    </div>
                    <div class="mt-2 text-base text-gray-500">
                    We prioritize the security and confidentiality of your uploaded videos. Our system ensures the protection of your data throughout the entire process.
                    </div>
                </li>
                <li>
                    <div>
                    <p class="mt-5 text-lg font-medium leading-6 text-black">
                    How accurate is the background removal?
                    </p>
                    </div>
                    <div class="mt-2 text-base text-gray-500">
                    Our background removal process delivers excellent results, especially when videos feature people as the primary subject. The AI model has been trained extensively to excel in accurately separating the subject from the background, resulting in precise and high-quality background removal.
                    </div>
                </li>
                <li>
                    <div>
                    <p class="mt-5 text-lg font-medium leading-6 text-black">
                    Is there a refund policy if I encounter any issues?
                    </p>
                    </div>
                    <div class="mt-2 text-base text-gray-500">
                    Yes, we have a refund policy in place for cases where customers encounter issues with our service. If you experience any difficulties or have concerns, please reach out to our dedicated support team at (support email). 
                    </div>
                </li>
                <li>
                    <div>
                    <p class="mt-5 text-lg font-medium leading-6 text-black">
                    Is there a limit to the video length that can be processed?
                    </p>
                    </div>
                    <div class="mt-2 text-base text-gray-500">
                    Currently, our system supports video processing for up to 3 minutes in length.
                    </div>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    </section>            
  )
}

export default FAQ