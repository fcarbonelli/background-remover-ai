import React from 'react'
import Profile from '@components/Profile'

const page = () => {
  return (
    <section className='w-full'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>Thank you!</span>
        </h1>
        <p className='desc text-left'>
            You will receive an email with the video soon! <br /> <br />
            If you don't receive the email in the next hour, please reach out to <i> carbonelli.francisco@gmail.com</i> for support
        </p>

        <div className='mt-10 '>
            <p className='desc font-semibold'>Instructions for download </p>
            <p className="desc">
                You will receive an email with a "Preview Video" button. <br />
                It will open the video in a new tab. <br />
                Rigth click on it and select "Save video" <br /> <br />

                Enjoy the video and thank you!
            </p>
        </div>
    </section>
  )
}

export default page