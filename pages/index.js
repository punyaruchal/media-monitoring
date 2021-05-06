import { createClient } from 'contentful'
import Image from 'next/image'
import Head from 'next/head'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

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

  const siteBackground = await client.getAsset('6YQV5vMlXzdu8q5brrIzB4')

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
      siteBackground,
    },
    revalidate: 1,
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
    siteBackground,
  } = props

  console.log(features)
  const navItems = navigationMenu[0].fields.menus
  const heroFields = hero[0].fields

  return (
    <div
      className='font-poppins'
      // style={{
      //   background: `url(${`https:${siteBackground.fields.file.url}`}) no-repeat bottom right/40%`,
      // }}
    >
      <Head>
        <title>Media Monitoring</title>
      </Head>
      <header className='bg-heroBg '>
        <div className='wrapper flex justify-between items-center py-12 '>
          <div>
            <Link href='/'>
              <a>
                <img src='/mm-logo.svg' alt='logo' />
              </a>
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <a
                  href='#'
                  className='font-medium text-primary border border-primary rounded py-[5px] px-[24px] transition ease-out hover:text-white hover:border-[#007663] hover:bg-[#007663]'
                >
                  Log In
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {/* hero section*/}
      <section
        className={
          styles.hero + ' bg-heroBg flex items-center pb-[86px] md:py-[76px]'
        }
      >
        <div className='wrapper flex justify-between items-center'>
          <div className='max-w-[631px]'>
            <h1 className='font-SerifDisplay leading-[1.27] text-[55px] pb-8 lg:text-[40px]'>
              {heroFields.heroText}
            </h1>
            <p className='text-lg leading-normal '>
              {' '}
              {heroFields.heroDescription}
            </p>
            <div className='inline-flex flex-wrap'>
              <a
                href='#'
                className='btn px-[38px] table bg-[#007663] border text-white font-medium uppercase mr-4 transition ease-out hover:text-primary hover:bg-transparent hover:border-primary'
              >
                {heroFields.heroPrimaryAction}
              </a>
              <div
                className={
                  styles.secondaryAction + ' flex flex-col justify-center'
                }
              >
                <a
                  href={'tel:' + heroFields.heroSecondaryAction}
                  className='btn px-[23px] leading-[1.9] flex items-center font-light border border-black border-opacity-50 hover:text-primary hover:border-primary'
                >
                  or, call{' '}
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='mx-[10px]'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M6.31986 0.863439L8.46412 2.91777L8.48014 2.93346C9.06624 3.52075 9.30699 4.335 9.30698 5.06868C9.30697 5.80237 9.0662 6.61658 8.48019 7.20386L7.43689 8.24944C7.6825 9.10999 8.26788 10.0591 9.08295 10.8813C9.90007 11.7056 10.8489 12.3023 11.7247 12.5515L12.7674 11.5065C13.3537 10.919 14.1672 10.6771 14.901 10.6771C15.6347 10.6771 16.4483 10.919 17.0346 11.5065C17.0346 11.5065 17.0345 11.5065 17.0346 11.5065L19.1732 13.6498C19.7593 14.2371 20 15.0513 20 15.785C20 16.5187 19.7592 17.3329 19.1732 17.9201C17.5784 19.5183 15.498 20 14.5444 20C13.0682 20 11.735 19.9092 10.2001 19.1911C8.70361 18.4911 7.09001 17.2307 4.92613 15.0621C2.73292 12.8641 1.48625 11.0667 0.796617 9.48734C0.0975118 7.88628 0 6.57406 0 5.42596C0 4.62281 0.10093 3.85404 0.437087 3.06807C0.769875 2.28997 1.3045 1.5619 2.07447 0.79025C2.67733 0.186084 3.50841 -0.0257596 4.24022 0.00251215C4.96926 0.0306763 5.75309 0.300845 6.31986 0.863439ZM4.16302 2.00102C3.83204 1.98823 3.60033 2.09258 3.49022 2.20293C2.83446 2.86011 2.47791 3.38235 2.27596 3.85454C2.07738 4.31886 2 4.80036 2 5.42596C2 6.4212 2.0809 7.43063 2.6295 8.68701C3.18757 9.96508 4.25791 11.5609 6.34189 13.6494C8.45519 15.7674 9.87104 16.8292 11.0476 17.3796C12.1857 17.912 13.169 18 14.5444 18C15.0513 18 16.5936 17.6738 17.7574 16.5075C17.8843 16.3803 18 16.1228 18 15.7849C18 15.447 17.8843 15.1896 17.7575 15.0625L15.6188 12.9192C15.4923 12.7924 15.2365 12.6771 14.901 12.6771C14.5654 12.6771 14.3097 12.7924 14.1831 12.9192L12.7574 14.3481C12.5349 14.571 12.2205 14.6761 11.9087 14.6318C10.3463 14.4096 8.82113 13.458 7.66259 12.2894C6.5044 11.121 5.57453 9.59639 5.35659 8.06748C5.31224 7.75636 5.41673 7.44249 5.63871 7.22003L7.06444 5.79119C7.19129 5.66406 7.30698 5.40661 7.30698 5.06866C7.30699 4.7358 7.19477 4.4811 7.07022 4.35208L4.9291 2.30076L4.91307 2.28505C4.76753 2.13921 4.49296 2.01377 4.16302 2.00102Z'
                      fill='black'
                    />
                  </svg>{' '}
                  <span className='font-medium'>
                    {' '}
                    {heroFields.heroSecondaryAction}
                  </span>
                </a>
                <span className='text-[14px] leading-loose opacity-50 text-center'>
                  for more information and assistance
                </span>
              </div>
            </div>
          </div>
          <div className='md:hidden'>
            <img
              src={'https:' + hero[0].fields.heroImage.fields.file.url}
              alt={hero[0].fields.heroImage.fields.title}
            />
          </div>
        </div>
      </section>
      <section className={styles.features + ' py-[105px]'}>
        <div className='wrapper grid grid-cols-3 gap-[105px] md:grid-cols-2 md:gap-[40px] sm:grid-cols-1'>
          {features.map((feature, index) => {
            return (
              <div key={index} className='flex justify-between'>
                <div className='mr-8'>
                  <Image
                    src={'https:' + feature.fields.icon.fields.file.url}
                    width={feature.fields.icon.fields.file.details.image.width}
                    height={
                      feature.fields.icon.fields.file.details.image.height
                    }
                    layout='fixed'
                  />
                </div>
                <div className='max-w-[265px] md:max-w-none'>
                  <h4 className='text-[28px] leading-[1.36] pb-3'>
                    {feature.fields.title}
                  </h4>
                  <p className='text-[#7A7A7A]'>{feature.fields.description}</p>
                </div>
              </div>
            )
          })}
          {/* <div
            className='info flex'
            style={{
              flexBasis: `346px`,
            }}
          >
            <div className='logo mr-8'>
              <img
                src={'https:' + features[0].fields.icon.fields.file.url}
                alt={'https:' + features[0].fields.icon.fields.file.fileName}
              />
            </div>
            <div className='text'>
              <h4 className='text-[28px] leading-[1.36] pb-3'>
                {features[0].fields.title}
              </h4>
              <p className='text-[#7A7A7A]'>{features[0].fields.description}</p>
            </div>
          </div>*/}
        </div>
      </section>
      {/* <section className='flex flex-wrap justify-center flex-col text-center items-center py-20'>
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
        <div className='mt-20 flex flex-wrap justify-center'>
          <p className='mb-6 mr-1 w-full'>contact us for more info</p>
          <div className='mb-1 flex w-full justify-center'>
            <label className='block font-bold mr-1' htmlFor=''>
              Phone:
            </label>
            <a href={`tel:${contactInfo[0].fields.phone}`}>
              {contactInfo[0].fields.phone}
            </a>
          </div>
          <div className='flex'>
            <label className='block mb-1 font-bold mr-1' htmlFor=''>
              Email:
            </label>
            <p>{contactInfo[0].fields.email}</p>
          </div>
        </div>
      </section> */}
      {/* <section className='py-24 bg-gray-200'>
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
        <div className='flex justify-center gap-9'>
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
                  className='bg-gray-200 rounded max-w-[334px] ml-8 flex flex-col'
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
        <div className='flex justify-center'>
          <div className='w-[412px] mr-48'>
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
          <div className='flex flex-col items-center justify-center text-left'>
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
      </section> */}

      {/* <footer className='grid grid-cols-12 justify-center items-center my-14'>
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
          Copyright 2021. Media Monitoring. All rights reserved.
        </p>
      </footer> */}
      <footer className=' bg-primary py-[90px]'>
        <div className='wrapper flex justify-between items-center w-full md:flex-col'>
          <p className='text-[15px] leading-normal opacity-80 text-white md:mb-8 md:text-center'>
            Copyright © 2021. Media Monitoring. All rights reserved.{' '}
          </p>
          <div className='flex items-center'>
            <svg
              width='67'
              height='47'
              viewBox='0 0 67 47'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M49.4682 46.9558H66.9999L51.4782 0H33.9465L49.4682 46.9558Z'
                fill='white'
              />
              <path
                d='M24.8457 46.9558H42.3216L26.7999 0H9.32407L24.8457 46.9558Z'
                fill='white'
              />
              <path
                d='M0 46.9559H17.5317L7.14666 21.5518L0 46.9559Z'
                fill='white'
              />
            </svg>
            <h2 className='text-white text-[28px] leading-[1.36] ml-2'>
              Media Monitoring
            </h2>
          </div>
        </div>
      </footer>
    </div>
  )
}
