import { createClient } from 'contentful'
import Image from 'next/image'
import Head from 'next/head'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Typewriter from 'typewriter-effect'

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

  // console.log(features)
  const navItems = navigationMenu[0].fields.menus
  const heroFields = hero[0].fields
  var i = 1
  const heroSplitText = heroFields.heroText.split(',')

  return (
    <div
      className='font-poppins overflow-x-hidden'
      // style={{
      //   background: `url(${`https:${siteBackground.fields.file.url}`}) no-repeat bottom right/40%`,
      // }}
    >
      <Head>
        <title>Media Monitoring</title>
      </Head>
      <header className='bg-heroBg'>
        <div className='wrapper flex justify-between items-center py-12'>
          <div
            className='animate-fade-in-down opacity-0'
            style={{ animationDelay: '1s' }}
          >
            <Link href='/'>
              <a>
                <img src='/mm-logo.svg' alt='logo' className='2xsm:w-[50px]' />
              </a>
            </Link>
          </div>
          {/* <nav
            className='animate-fade-in-down opacity-0'
            style={{ animationDelay: '1.3s' }}
          >
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
          </nav> */}
        </div>
      </header>
      {/* hero section*/}
      <section
        className={
          styles.hero +
          ' bg-heroBg flex items-center pb-[86px] pt-[56px] md:pb-[56px] md:pt-[36px]'
        }
      >
        <div className='wrapper w-full grid grid-cols-2 md:grid-cols-1'>
          <div className='max-w-[631px]'>
            <h1
              className='font-SerifDisplay leading-[1.27]  min-h-[278px] text-[55px] pb-8 lg:text-[40px] lg:min-h-[212px] md:min-h-[152px] 2xsm:text-4xl 2xsm:pb-4 '
              style={{ animationDelay: '1s' }}
            >
              <Typewriter
                options={{ delay: 50 }}
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(1200)
                    .typeString(heroSplitText[0] + ',')
                    .pauseFor(500)
                    .typeString(heroSplitText[1])
                    .start()
                }}
              />
            </h1>
            <p
              className='text-lg leading-normal 2xsm:text-base animate-fade-in-down opacity-0 '
              style={{ animationDelay: '1.3s' }}
            >
              {' '}
              {heroFields.heroDescription}
            </p>
            <div>
              {/* <a
                href='#'
                className='btn px-[38px] table bg-[#007663] border text-white font-medium uppercase mr-4 transition ease-out hover:text-primary hover:bg-transparent hover:border-primary 2xsm:px-6 animate-scale-fade-in-down opacity-0'
                style={{ animationDelay: '1.6s' }}
              >
                {heroFields.heroPrimaryAction}
              </a> */}
              <div
                className={
                  styles.secondaryAction +
                  ' inline-flex flex-col justify-center animate-scale-fade-in-down opacity-0'
                }
                style={{ animationDelay: '1.7s' }}
              >
                <a
                  href={'tel:' + heroFields.heroSecondaryAction}
                  className='btn px-[40px] leading-[1.9] text-white flex items-center justify-center bg-primary border border-primary transition-all hover:bg-transparent hover:text-primary'
                >
                  <svg
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='mr-[7px]'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M9.09323 1.81792L11.9522 4.55702L11.9736 4.57795C12.7551 5.361 13.0761 6.44666 13.0761 7.42491C13.076 8.40316 12.755 9.48877 11.9737 10.2718L10.5826 11.6659C10.9101 12.8133 11.6906 14.0788 12.7773 15.1751C13.8668 16.2741 15.1319 17.0698 16.2997 17.402L17.6899 16.0087C18.4716 15.2253 19.5564 14.9027 20.5347 14.9027C21.513 14.9027 22.5978 15.2253 23.3795 16.0087C23.3795 16.0087 23.3795 16.0087 23.3795 16.0087L26.2311 18.8663C27.0124 19.6494 27.3334 20.735 27.3334 21.7133C27.3334 22.6916 27.0123 23.7771 26.231 24.5602C24.1047 26.6911 21.3308 27.3333 20.0592 27.3333C18.091 27.3333 16.3134 27.2122 14.2669 26.2548C12.2716 25.3214 10.1201 23.641 7.23492 20.7495C4.31064 17.8188 2.64842 15.4223 1.7289 13.3165C0.796764 11.1817 0.666748 9.43208 0.666748 7.90128C0.666748 6.83041 0.801322 5.80539 1.24953 4.75742C1.69325 3.71995 2.40608 2.74919 3.43271 1.72033C4.23651 0.914776 5.34462 0.632318 6.32038 0.670014C7.29243 0.707566 8.33754 1.06779 9.09323 1.81792ZM6.21744 3.33469C5.77614 3.31764 5.46719 3.45677 5.32037 3.6039C4.44603 4.48015 3.97063 5.17647 3.70136 5.80605C3.43658 6.42514 3.33341 7.06714 3.33341 7.90128C3.33341 9.22826 3.44128 10.5742 4.17275 12.2493C4.91684 13.9534 6.34396 16.0812 9.1226 18.8659C11.9403 21.6898 13.8281 23.1055 15.3968 23.8394C16.9143 24.5493 18.2255 24.6667 20.0592 24.6667C20.7352 24.6667 22.7916 24.2317 24.3433 22.6766C24.5125 22.5071 24.6667 22.1638 24.6667 21.7132C24.6668 21.2626 24.5125 20.9194 24.3434 20.7499L21.4919 17.8923C21.3231 17.7232 20.9821 17.5694 20.5347 17.5694C20.0873 17.5694 19.7463 17.7232 19.5776 17.8923L17.6766 19.7974C17.38 20.0946 16.9607 20.2348 16.545 20.1757C14.4619 19.8794 12.4283 18.6107 10.8835 17.0525C9.33928 15.4947 8.09946 13.4619 7.80887 11.4233C7.74974 11.0085 7.88905 10.59 8.18503 10.2934L10.086 8.38825C10.2551 8.21874 10.4094 7.87548 10.4094 7.42488C10.4094 6.98106 10.2598 6.64146 10.0937 6.46943L7.23889 3.73434L7.21751 3.71339C7.02346 3.51895 6.65736 3.35169 6.21744 3.33469Z'
                      fill='white'
                      className='transition-all'
                    />
                  </svg>
                  <span className='font-medium text-[32px] leading-[1.17] md:text-[26px] 2xsm:text-[18px] text-center'>
                    {' '}
                    {heroFields.heroSecondaryAction}
                  </span>
                </a>
                <span className='text-[14px] leading-loose opacity-50 text-center pt-[7px] 2xsm:text-xs'>
                  Please contact us for more information
                </span>
              </div>
            </div>
          </div>
          <div
            className={styles.heroImage + ' md:hidden relative'}
            style={{ animationDelay: '0.5s' }}
          >
            <div className='imageWrapper'>
              <div className='newspaper min-w-[620px] relative z-10 lg:hidden'>
                <img
                  src='/static/heroImage-elements/paper clip.png'
                  alt='paperclip'
                  className='paperClip absolute right-[115px] top-[118px] z-10'
                  data-aos='zoom-in'
                  data-aos-delay='1900'
                  data-aos-duration='1000'
                />
                <img
                  src='/static/heroImage-elements/tape.png'
                  alt='tape'
                  className='absolute top-[-56px] left-[90px] z-10'
                  data-aos='zoom-in'
                  data-aos-delay='1500'
                  data-aos-duration='1000'
                />
                <img
                  src='/static/heroImage-elements/newspaper-cuttings.png'
                  alt='newspaper'
                  className='absolute top-[-107px]'
                  data-aos='fade-right'
                  data-aos-duration='1000'
                  data-aos-delay='1200'
                />
              </div>
              <div className='circularLogo absolute right-[-10px] top-0 w-[252px] h-[252px] lg:right-[70px] lg:top-[50%] lg:transform lg:translate-y-[-50%]'>
                <img
                  src='/static/heroImage-elements/blank-brown-paper-textured-wallpaper 1.png'
                  alt='brown paper'
                  className='absolute rounded-[50%] right-0 z-[1]'
                  data-aos='zoom-in'
                  data-aos-duration='1000'
                  data-aos-easing='ease-out'
                />
                <img
                  src='/static/heroImage-elements/mm-logo.svg'
                  alt='logo'
                  className='absolute z-[1] top-[86px] right-[78px]'
                  data-aos='fade-right'
                  data-aos-easing='linear'
                  data-aos-duration='700'
                  data-aos-delay='300'
                />
                <img
                  src='/static/heroImage-elements/mm_text.png'
                  alt='text'
                  className='absolute top-0 transfrom z-[1] animate-rotate'
                  style={{ transform: 'scale(1.25)' }}
                  data-aos='fade-zoom-in'
                  data-aos-delay='1000'
                  data-aos-duration='1500'
                  data-aos-easing='ease-out'
                />
              </div>
            </div>
            {/* <img
              src={'https:' + hero[0].fields.heroImage.fields.file.url}
              alt={hero[0].fields.heroImage.fields.title}
            /> */}
          </div>
        </div>
      </section>
      <section className={styles.features + ' py-[105px] 2xsm:py-20'}>
        <div className='wrapper grid grid-cols-3 gap-[105px] md:grid-cols-2 md:gap-[40px] sm:grid-cols-1'>
          {features.map((feature, index) => {
            i = i + 500
            return (
              <div
                key={index}
                className={'_' + index + ' flex justify-between'}
                data-aos='fade-up'
                data-aos-once='true'
                data-aos-duration='2000'
              >
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
                  <h4 className='text-[28px] leading-[1.36] pb-3 2xsm:text-2xl'>
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
      <footer className=' bg-primary py-[90px] 2xsm:py-20 overflow-hidden'>
        <div className='wrapper flex justify-between items-center w-full md:flex-col'>
          <p
            className='text-[15px] leading-normal opacity-80 text-white md:mt-8 md:text-center md:order-2'
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-duration='1000'
          >
            Copyright © 2021. Media Monitoring. All rights reserved.{' '}
          </p>
          <div
            className='flex items-center'
            data-aos='fade-up'
            data-aos-once='true'
            data-aos-duration='1000'
            data-aos-delay='300'
          >
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
