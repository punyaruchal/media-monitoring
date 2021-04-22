import { createClient } from 'contentful'
import Image from 'next/image'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Autoplay])

export async function getStaticProps() {
  // * Connect to Contentful CMS
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  // * Fetch contents from Contentful
  const hero = await client.getEntries({ content_type: 'hero' })
  const navigationMenu = await client.getEntries({
    content_type: 'navigationMenu',
  })
  const features = await client.getEntries({ content_type: 'features' })
  const testimonials = await client.getEntries({ content_type: 'testimonials' })
  const pricing = await client.getEntries({ content_type: 'pricing' })
  const pricingOptions = await client.getEntries({
    content_type: 'pricingOptions',
  })
  const inquiry = await client.getEntries({ content_type: 'inquiry' })
  const contactInfo = await client.getEntries({ content_type: 'contactInfo' })

  return {
    props: {
      features,
      hero,
      navigationMenu,
      testimonials,
      pricing,
      pricingOptions,
      inquiry,
      contactInfo,
    },
  }
}

export default function Home(props) {
  const {
    // * Destructuring each props items and renaming
    features: { items: features },
    hero: { items: hero },
    navigationMenu: { items: navigationMenu },
    testimonials: { items: testimonials },
    pricingOptions: { items: pricingOptions },
    pricing: { items: pricing },
    inquiry: { items: inquiry },
    contactInfo: { items: contactInfo },
  } = props

  console.log(contactInfo)
  const navItems = navigationMenu[0].fields.menus
  const heroFields = hero[0].fields

  return (
    <div className='px-4 container mx-auto'>
      <header className='flex justify-between items-center'>
        <h2 className='font-bold text-3xl'>mm</h2>
        <nav>
          <ul className='flex gap-12'>
            {navItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            <li>Login</li>
          </ul>
        </nav>
      </header>
      <section className='flex flex-wrap justify-between items-center py-20'>
        <div className='lg:w-2/5'>
          <h1 className='font-bold text-4xl mb-4 leading-normal'>
            {heroFields.heroText}
          </h1>
          <p className='mb-6'>{heroFields.heroDescription}</p>
          <div className='flex flex-wrap gap-4'>
            <button className='bg-gray-800 text-white py-3 px-7 rounded-md w-56'>
              {heroFields.heroPrimaryAction}
            </button>
            <button className='border border-gray-800 rounded-md py-3 px-7 w-56'>
              {heroFields.heroSecondaryAction}
            </button>
          </div>
        </div>
        <Image
          src={`https:${heroFields.heroImage.fields.file.url}`}
          width={500}
          height={400}
          objectFit='cover'
        />
      </section>
      <section className='py-24 bg-gray-200'>
        <Swiper slidesPerView={1} autoplay={{ reverseDirection: false }}>
          {testimonials.map((testimony, index) => {
            return (
              <SwiperSlide key={index}>
                <div className='text-center max-w-lg m-auto'>
                  <p className='font-bold mb-5'>
                    {testimony.fields.organization}
                  </p>
                  <blockquote className='text-3xl mb-7'>
                    {testimony.fields.testimony}
                  </blockquote>
                  <p>{testimony.fields.testimonyBy}</p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>
      <section className='py-24'>
        <div className='flex items-center'>
          {features.map((feature, index) => {
            return (
              <div key={index} className='border-r p-12 last:border-r-0'>
                <h3 className='text-2xl mb-4'>{feature.fields.title}</h3>
                <p className='text-gray-700'>{feature.fields.description}</p>
              </div>
            )
          })}
        </div>
      </section>
      <section className='py-24'>
        <div className='flex justify-between gap-7'>
          <div>
            <h3 className='text-2xl font-bold mb-5'>
              {pricing[0].fields.heading}
            </h3>
            <p className='text-gray-700'>{pricing[0].fields.description}</p>
          </div>
          <div className='flex'>
            {pricingOptions.map((option, index) => {
              return (
                <div
                  className='bg-gray-200 rounded max-w-sm ml-8 flex flex-col'
                  key={index}
                >
                  <div className='px-8 pt-8 pb-5'>
                    <div className='flex justify-between mb-4'>
                      <p className='font-bold'>{option.fields.heading}</p>
                      <p>$ {option.fields.price}</p>
                    </div>
                    <p className='text-gray-700 text-sm h-10'>
                      {option.fields.description}
                    </p>
                  </div>
                  <hr className='border-gray-400' />
                  <div className='flex-grow flex flex-col justify-between'>
                    <div className='p-8'>
                      <ul className='list-disc pl-8 text-gray-700 text-sm'>
                        {option.fields.features.map((feature, index) => {
                          return (
                            <li className='mb-3' key={index}>
                              {feature}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <button className='mb-8 mt-4 text-sm w-40 mx-auto py-3 border border-gray-800 rounded'>
                      {option.fields.actionButton}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className='py-16'>
        <div className='flex'>
          <div className='w-[412px]'>
            <form action='' className='p-14 shadow-xl rounded-md'>
              <div className='mb-4'>
                <label
                  className='block text-sm text-gray-600 mb-1'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='px-3 py-1 border border-gray-300 rounded-md w-full'
                  type='email'
                  id='email'
                />
              </div>
              <div className='flex gap-1 mb-4'>
                <div>
                  <label
                    className='block text-sm text-gray-600 mb-1'
                    htmlFor='firstName'
                  >
                    First name
                  </label>
                  <input
                    className='px-3 py-1 border border-gray-300 rounded-md w-full'
                    type='text'
                    id='firstName'
                  />
                </div>
                <div>
                  <label
                    className='block text-sm text-gray-600 mb-1'
                    htmlFor='lastName'
                  >
                    Last name
                  </label>
                  <input
                    className='px-3 py-1 border border-gray-300 rounded-md w-full'
                    type='text'
                    id='lastName'
                  />
                </div>
              </div>
              <div className='mb-4'>
                <label
                  className='block text-sm text-gray-600 mb-1'
                  htmlFor='organization'
                >
                  Organization Name
                </label>
                <input
                  className='px-3 py-1 border border-gray-300 rounded-md w-full'
                  type='text'
                  id='organization'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-sm text-gray-600 mb-1'
                  htmlFor='contactNumber'
                >
                  Contact number
                </label>
                <input
                  className='px-3 py-1 border border-gray-300 rounded-md w-full'
                  type='text'
                  id='contactNumber'
                />
              </div>
              <button className='bg-gray-800 text-white uppercase py-3 rounded text-sm w-full mt-5'>
                Start free trial
              </button>
            </form>
          </div>
          <div className='flex-grow flex flex-col items-center justify-center text-left'>
            <div>
              <h3 className='text-2xl font-bold mb-3'>
                {contactInfo[0].fields.heading}
              </h3>
              <p className='text-gray-500 mb-10 text-sm max-w-xs'>
                {contactInfo[0].fields.description}
              </p>
              <p className='font-bold mb-6'>{contactInfo[0].fields.helper}</p>
              <div className='mb-5'>
                <label className='block mb-1 font-bold' htmlFor=''>
                  Phone
                </label>
                <p>{contactInfo[0].fields.phone}</p>
              </div>
              <div>
                <label className='block mb-1 font-bold' htmlFor=''>
                  Email
                </label>
                <p>{contactInfo[0].fields.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='py-16'>
        <div className='max-w-3xl mx-auto text-center'>
          <h3 className='text-2xl font-bold'>{inquiry[0].fields.heading}</h3>
          <div className='mt-6'>
            <input
              type='text'
              placeholder='Enter your contact number'
              className='rounded border-gray-300 border px-4 py-2 mr-2 h-10 text-sm w-60'
            />
            <button className='text-xs uppercase text-white bg-gray-900 rounded h-10 px-8 align-top '>
              send
            </button>
          </div>
        </div>
      </section>

      <footer className='grid grid-cols-12 justify-between items-center my-14'>
        <h2 className='col-span-2'>mm</h2>
        <nav className='col-span-7 justify-self-center'>
          <ul className='flex gap-12'>
            <li>Home</li>
            {navItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </nav>
        <p className='text-xs text-gray-500 col-span-3'>
          Copyright 2020. Media Monitoring. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
