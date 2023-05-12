import { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper homeStyles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import "swiper/swiper-bundle.css";
import homeStyles from "@/styles/Home.module.scss";
import { FaArrowDown } from "react-icons/fa";
import { RiMouseLine } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import { BiHomeAlt } from "react-icons/bi";
import { GrCatalog, GrCircleInformation, GrFormClose } from "react-icons/gr";
import { ImPriceTags } from "react-icons/im";
import { BsBarChartSteps, BsWhatsapp, BsEnvelopeAt } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { TbBrandTelegram } from "react-icons/tb";
import {
  AiOutlineSend,
  AiOutlineAppstore,
  AiOutlineArrowUp,
} from "react-icons/ai";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("home");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  const [activeCatalogSection, setActiveCatalogSection] =
    useState("photo-canvas");

  const handleCatalogSectionClick = (sectionId: string) => {
    setActiveCatalogSection(sectionId);
  };

  const handleActiveSection = (sectionId: string | null) => {
    setActiveSection(sectionId);
  };
  

  const config = {
    modules: [Navigation, Pagination, Scrollbar],

    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    cssMode: true,
    breakpoints: {
      568: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  };

  //  the prices **************************************************
  const [sizePrice, setSizePrice] = useState(0); // Replace 0 with the initial price value

  const sizes = [
    { name: "30X40", price: 40 },
    { name: "40X50", price: 60 },
    { name: "50X60", price: 80 },
    { name: "60X70", price: 100 },
  ];
  const styles = [
    { name: "photo on canvas", price: 40 },
    { name: "collage", price: 60 },
  ];
  const [formValues, setFormValues] = useState({
    style: styles[0], // Set the initial value for the style field
    size: sizes[0], // Set the initial value for the size field
    gift: false, // Set the initial value for the gift field
  });
  const calculatePrice = () => {
    const sizePrice =
      formValues.size.price +
      formValues.style.price +
      (formValues.gift ? 10 : 0);
    setSizePrice(sizePrice);
  };

  //  // change colors of nav while scrolling  *******************
  //  let sections = document.querySelectorAll<HTMLElement>('section[id]');

  //  const scrollActive = () => {
  //    sections = document.querySelectorAll<HTMLElement>('section[id]');
  //    const scrolly = window.pageYOffset;
  //    sections.forEach((current) => {
  //      const sectionHeight = current.offsetHeight;
  //      const sectionTop = current.offsetTop - 300;
  //      const sectionId = current.getAttribute('id');

  //      if (scrolly > sectionTop && scrolly <= sectionTop + sectionHeight) {
  //        const elt = document.querySelector(
  //          '.nav__menu a[href*=' + sectionId + ']'
  //        ) as HTMLElement;

  //        elt.classList.add('active_link');
  //      } else {
  //        const elt = document.querySelector(
  //          '.nav__menu a[href*=' + sectionId + ']'
  //        ) as HTMLElement;
  //        elt.classList.remove('active_link');
  //      }
  //    });
  //  }

  const scrollActive = () => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const scrolly = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 300;
      const sectionName = current.getAttribute("id");

      if (scrolly > sectionTop && scrolly <= sectionTop + sectionHeight) {
        handleActiveSection(sectionName);
      }
    });
  };

  // // SCROLL up JS ***************************************

  const scrollUp = () => {
   const scrolly = window.pageYOffset;

   const scrollUp = document.getElementById('scroll-up') as HTMLElement;
   console.log(scrollUp)
   // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scro
   if (scrolly >= 560) setShowScroll(true);
   else setShowScroll(false);
  }

  useEffect(() => {
    calculatePrice();
    window.addEventListener("scroll", scrollActive);
    window.addEventListener('scroll', scrollUp);
    return () => {
      window.removeEventListener("scroll", scrollActive);
      window.removeEventListener('scroll', scrollUp);
    };
  }, [activeSection]);

  return (
    <div className={homeStyles.first__container}>
      <header className={homeStyles.header} id="header">
        <nav className={`${homeStyles.nav} ${homeStyles.container} `}>
          <a href="#" className="">
            <img className={homeStyles.logo} src="/images/logo1.png" alt="" />
          </a>
          <a href="#" className={homeStyles.nav__name}>
            <span>MorArtist</span>
          </a>
          <div
            className={`${homeStyles.nav__menu} ${
              showMenu ? homeStyles.show__menu : ""
            }`}
            id="nav-menu"
          >
            <ul className={`${homeStyles.nav__list} ${homeStyles.grid} `}>
              <li className={homeStyles.nav__item}>
                <a
                  href="#home"
                  className={`${homeStyles.nav__link} 
                  ${activeSection === "home" ? homeStyles.active_link : ""} `}
                >
                  <BiHomeAlt className={homeStyles.nav__icon} /> Home
                </a>
              </li>
              <li className={homeStyles.nav__item}>
                <a
                  href="#catalog"
                  className={`${homeStyles.nav__link} 
                ${activeSection === "catalog" ? homeStyles.active_link : ""} `}
                >
                  <GrCatalog className={homeStyles.nav__icon} /> Catalog
                </a>
              </li>
              <li className={homeStyles.nav__item}>
                <a
                  href="#prices"
                  className={`${homeStyles.nav__link} 
                  ${activeSection === "prices" ? homeStyles.active_link : ""} `}
                >
                  <ImPriceTags className={homeStyles.nav__icon} /> Prices
                </a>
              </li>
              <li className={homeStyles.nav__item}>
                <a
                  href="#steps"
                  className={`${homeStyles.nav__link} 
                  ${activeSection === "steps" ? homeStyles.active_link : ""} `}
                >
                  <BsBarChartSteps className={homeStyles.nav__icon} /> Steps
                </a>
              </li>
              <li className={homeStyles.nav__item}>
                <a
                  href="#contactus"
                  className={`${homeStyles.nav__link} 
                  ${
                    activeSection === "contactus" ? homeStyles.active_link : ""
                  } `}
                >
                  <AiOutlineSend className={homeStyles.nav__icon} /> ContactUs
                </a>
              </li>
              <li className={homeStyles.nav__item}>
                <a
                  href="#about"
                  className={`${homeStyles.nav__link} 
                  ${activeSection === "about" ? homeStyles.active_link : ""} `}
                >
                  <GrCircleInformation className={homeStyles.nav__icon} /> About
                </a>
              </li>
            </ul>
            <GrFormClose
              className={`${homeStyles.nav__close} ${
                showMenu ? homeStyles.show__menu : ""
              }`}
              id="nav-close"
              onClick={toggleMenu}
            />
          </div>
          <div className={homeStyles.nav__btns}>
            <div
              className={`${homeStyles.nav__toggle}`}
              id="nav-toggle"
              onClick={toggleMenu}
            >
              <AiOutlineAppstore />
            </div>
          </div>
        </nav>
      </header>

      <main className={homeStyles.main}>
        {/* <!--==================== HOME ====================--> */}
        <section
          className={`${homeStyles.home} ${homeStyles.section}`}
          id="home"
        >
          <div
            className={`${homeStyles.home__container} ${homeStyles.container}`}
            id="grid"
          >
            <div className={`${homeStyles.home__content} ${homeStyles.grid}`}>
              {/* <!-- social media --> */}
              <div className={homeStyles.home__social}>
                <a
                  href="https://www.instagram.com/morartist_portraits/"
                  target="_blank"
                  className={homeStyles.home__social_icon}
                >
                  <FiInstagram />
                </a>
                <a
                  href="https://web.facebook.com/profile.php?id=100084967522574"
                  target="_blank"
                  className={homeStyles.home__social_icon}
                >
                  <FaFacebookSquare />
                </a>
              </div>

              <div className={homeStyles.home__img}>
                <svg
                  className={homeStyles.home__blob}
                  viewBox="0 0 200 187"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <mask id="mask0" mask-type="alpha">
                    <path
                      d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                    130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                    97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                    0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                    />
                  </mask>
                  <g mask="url(#mask0)">
                    <path
                      d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                    165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                    129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                    -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                    />
                    <image
                      className={homeStyles.home__blob_img}
                      href="/images/IMG_1.jpg"
                    />
                  </g>
                </svg>
              </div>

              <div className={homeStyles.home__data}>
                <h1 className={homeStyles.home__title}>MorArtist is here</h1>
                <h3 className={homeStyles.home__subtitle}>
                  The Best Portrait Workshop
                </h3>
                <p className={homeStyles.home__description}>
                  send us a photo and get a sketch of your portrait on canvas.
                </p>
                <a
                  href="#contactus"
                  className={`${homeStyles.button} ${homeStyles.button__flex} `}
                >
                  Contact Us
                  <AiOutlineSend className={homeStyles.button__icon} />
                </a>
              </div>
            </div>

            <div className={homeStyles.home__scroll}>
              <a
                href="#catalog"
                className={`${homeStyles.home__scroll_button} ${homeStyles.button__flex} `}
              >
                <RiMouseLine className={homeStyles.home__scroll_mouse} />

                {/* <a href="#catalog" className="home__scroll_button button__flex"> */}
                {/* ${homeStyles.home__scroll_mouse} */}
                <span className={homeStyles.home__scroll_name}>
                  see the catalog
                </span>
                <FaArrowDown className={homeStyles.home__arrow_down} />
              </a>
            </div>
          </div>
        </section>

        {/* <!--==================== catalog  ====================--> */}
        <section
          className={`${homeStyles.catalog} ${homeStyles.section}`}
          id="catalog"
        >
          <h2 className={homeStyles.section__title}>Catalog</h2>
          <span className={homeStyles.section__subtitle}></span>
          <div
            className={`${homeStyles.catalog__container}  ${homeStyles.container} `}
          >
            <div className={homeStyles.catalog__tabs}>
              <div
                className={`${homeStyles.catalog__button} ${
                  homeStyles.button__flex
                } ${
                  activeCatalogSection === "photo-canvas"
                    ? homeStyles.catalog__active
                    : ""
                }`}
                onClick={() => handleCatalogSectionClick("photo-canvas")}
              >
                photo on canvas
              </div>
              <div
                className={`${homeStyles.catalog__button}  ${
                  homeStyles.button__flex
                } ${
                  activeCatalogSection === "collage"
                    ? homeStyles.catalog__active
                    : ""
                }`}
                onClick={() => handleCatalogSectionClick("collage")}
              >
                collage
              </div>
            </div>
            <div className={homeStyles.catalog__sections}>
              {/* ========= ======= catalog CONTENT 1 ======== ========= */}
              {activeCatalogSection === "photo-canvas" && (
                <div
                  className={`${homeStyles.catalog__content} ${homeStyles.catalog__active}`}
                  id="photo-canvas"
                >
                  <div className={homeStyles.catalog__data}>
                    <Swiper {...config}>
                      {/* ========== slid 1 ========== */}
                      <SwiperSlide>
                        <div
                          className={`${homeStyles.slid__content} ${homeStyles.grid}`}
                        >
                          <div className={homeStyles.img__container}>
                            <img
                              src="/images/IMG_1.jpg"
                              alt=""
                              className={homeStyles.slid__img}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                      {/* ========== slid 2 ========== */}
                      <SwiperSlide>
                        <div
                          className={`${homeStyles.slid__content} ${homeStyles.grid}`}
                        >
                          <div className={homeStyles.img__container}>
                            <img
                              src="/images/IMG_2.webp"
                              alt=""
                              className={homeStyles.slid__img}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                      {/* ========== slid 3 ========== */}
                      <SwiperSlide>
                        <div
                          className={`${homeStyles.slid__content} ${homeStyles.grid}`}
                        >
                          <div className={homeStyles.img__container}>
                            <img
                              src="/images/IMG_1.jpg"
                              alt=""
                              className={homeStyles.slid__img}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                      {/* Add Arrows */}
                      <div className={homeStyles.swiper_button_next}>
                        <i
                          className={`uil uil-angle-right-b ${homeStyles.swiper_slid_icon}`}
                        ></i>
                      </div>
                      <div className={homeStyles.swiper_button_prev}>
                        <i
                          className={`uil uil-angle-left-b ${homeStyles.swiper_slid_icon}`}
                        ></i>
                      </div>
                    </Swiper>
                  </div>
                </div>
              )}

              {/* ========= ======= catalog CONTENT 2 ======== ========= */}

              {activeCatalogSection === "collage" && (
                <div className={homeStyles.catalog__content} id="collage">
                  <div className={homeStyles.catalog__data}>
                    <Swiper {...config}>
                      {/* ========== slid 1 ========== */}
                      <SwiperSlide>
                        <div
                          className={`${homeStyles.slid__content}  ${homeStyles.grid}`}
                        >
                          <div className={homeStyles.img__container}>
                            <img
                              src="/images/IMG_2.webp"
                              alt=""
                              className={homeStyles.slid__img}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                      {/* ========== slid 2 ========== */}
                      <SwiperSlide>
                        <div
                          className={`${homeStyles.slid__content}  ${homeStyles.grid}`}
                        >
                          <div className={homeStyles.img__container}>
                            <img
                              src="/images/IMG_2.webp"
                              alt=""
                              className={homeStyles.slid__img}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                      {/* ========== slid 3 ========== */}
                      <SwiperSlide>
                        <div
                          className={`${homeStyles.slid__content}  ${homeStyles.grid}`}
                        >
                          <div className={homeStyles.img__container}>
                            <img
                              src="/images/IMG_2.webp"
                              alt=""
                              className={homeStyles.slid__img}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                      {/* Add Arrows */}
                      <div className={homeStyles.swiper_button_next}>
                        <i
                          className={`uil uil-angle-right-b ${homeStyles.swiper_slid_icon}`}
                        ></i>
                      </div>
                      <div className={homeStyles.swiper_button_prev}>
                        <i
                          className={`uil uil-angle-left-b ${homeStyles.swiper_slid_icon}`}
                        ></i>
                      </div>
                    </Swiper>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* <!--==================== prices  ====================--> */}

        <section className={homeStyles.section} id="prices">
          <h2 className={homeStyles.section__title}>Prices</h2>
          <span className={homeStyles.section__subtitle}></span>
          <div
            className={`${homeStyles.about__container} ${homeStyles.container} ${homeStyles.grid}`}
          >
            <img
              src="/images/IMG_1.jpg"
              alt=""
              className={homeStyles.about__img}
            />
            <div className={homeStyles.form__container}>
              {/* select  */}
              <form className={homeStyles.form} onChange={calculatePrice}>
                <div className={homeStyles.field__container}>
                  <label className={homeStyles.field__label} htmlFor="style">
                    Select the portrait size
                  </label>
                  <select className={homeStyles.select__style} name="style">
                    {styles.map((style, index) => (
                      <option key={index} value={style.name}>
                        {style.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={homeStyles.field__container}>
                  <label className={homeStyles.field__label} htmlFor="size">
                    Choose a portrait style
                  </label>
                  <select className={homeStyles.select__size} name="size">
                    {sizes.map((size, index) => (
                      <option key={index} value={size.name}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={homeStyles.field__container}>
                  <label className={homeStyles.field__label} htmlFor="gift">
                    Additional Service
                  </label>
                  <br />
                  <input
                    className={homeStyles.select__gift}
                    type="checkbox"
                    name="gift"
                  />
                  <span className={homeStyles.gift__text}> gift packaging</span>
                </div>
              </form>

              <div className={homeStyles.display__price}>
                <p>{sizePrice} DH</p>
              </div>
            </div>
          </div>
        </section>

        {/* <!--==================== steps  ====================--> */}

        <section className={homeStyles.section} id="steps">
          <h2 className={homeStyles.section__title}>Steps</h2>
          <span className={homeStyles.section__subtitle}></span>
          <div
            className={`${homeStyles.STEPS__container} ${homeStyles.container} ${homeStyles.grid} `}
          >
            {/* <!-- ==================== step 1 ========== =======--> */}

            <div className={homeStyles.STEPS__content}>
              <div className={homeStyles.STEPS__header}>
                <span className={homeStyles.STEPS__icon}>1&nbsp;</span>
                <div>
                  <h1 className={homeStyles.STEPS_title}>
                    You make your command
                  </h1>
                  <span className={homeStyles.STEPS_subtitle}>
                    contact us and send a photo if necessary
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- ==================== step 2 ========== =======--> */}

            <div className={homeStyles.STEPS__content}>
              <div className={homeStyles.STEPS__header}>
                <span className={homeStyles.STEPS__icon}>2</span>
                <div>
                  <h1 className={homeStyles.STEPS_title}>
                    Our artists use their magical talents
                  </h1>
                  <span className={homeStyles.STEPS_subtitle}>
                    we send you the photo for your approval
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- ==================== step 3 ========== =======--> */}

            <div className={homeStyles.STEPS__content}>
              <div className={homeStyles.STEPS__header}>
                <span className={homeStyles.STEPS__icon}>3</span>
                <div>
                  <h1 className={homeStyles.STEPS_title}>We print the photo</h1>
                  <span className={homeStyles.STEPS_subtitle}>
                    we print the photo and stretch it on a wooden stretcher
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- ==================== step 4 ========== =======--> */}

            <div className={homeStyles.STEPS__content}>
              <div className={homeStyles.STEPS__header}>
                <span className={homeStyles.STEPS__icon}>4</span>
                <div>
                  <h1 className={homeStyles.STEPS_title}>Delivery</h1>
                  <span className={homeStyles.STEPS_subtitle}>
                    we deliver in all of Morocco. The cost of delivery depends
                    on the tariffs of the delivery service.
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- ==================== step 5 ========== =======--> */}

            <div className={homeStyles.STEPS__content}>
              <div className={homeStyles.STEPS__header}>
                <span className={homeStyles.STEPS__icon}>5</span>
                <div>
                  <h1 className={homeStyles.STEPS_title}>Payment</h1>
                  <span className={homeStyles.STEPS_subtitle}>
                    We use cash on delivery or credit card
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!--==================== contact  ====================--> */}
        <section
          className={`${homeStyles.contact} ${homeStyles.section} `}
          id="contactus"
        >
          <h2 className={homeStyles.section__title}>Contact us</h2>
          <span className={homeStyles.section__subtitle}></span>
          <div className={homeStyles.contact__bg}>
            <div
              className={`${homeStyles.contact__container}  ${homeStyles.container} ${homeStyles.grid}`}
            >
              <div className={homeStyles.contact__data}>
                <h2 className={homeStyles.contact__title}>
                  You have an idea about what you want
                </h2>
                <p className={homeStyles.contact__description}>
                  choose your convenient messenger and order it now!
                </p>
                <a
                  href="https://wa.me/212708938216"
                  target="_blank"
                  className={`${homeStyles.button} ${homeStyles.button__flex} ${homeStyles.button__contact} ${homeStyles.button__whatsapp}`}
                >
                  <i className="uil uil-whatsapp"></i>
                  <BsWhatsapp className={homeStyles.button__contact_icon} />
                  WhatsApp
                </a>
                <a
                  href="https://t.me/MorArtist"
                  target="_blank"
                  className={`${homeStyles.button} ${homeStyles.button__flex} ${homeStyles.button__contact} ${homeStyles.button__telegram}`}
                >
                  <TbBrandTelegram
                    className={homeStyles.button__contact_icon}
                  />
                  Telegram
                </a>
                <a
                  href="mailto: morartist.contact@gmail.com"
                  target="_blank"
                  className={`${homeStyles.button} ${homeStyles.button__flex} ${homeStyles.button__contact} ${homeStyles.button__email}`}
                >
                  <BsEnvelopeAt className={homeStyles.button__contact_icon} />
                  Email
                </a>
              </div>

              <img
                src="/images/project.png"
                alt=""
                className={homeStyles.contact__img}
              />
            </div>
          </div>
        </section>
        {/* <!--==================== ABOUT ====================--> */}

        <section id="about">
          <footer className={homeStyles.footer}>
            <div className={homeStyles.footer__bg}>
              <div
                className={`${homeStyles.footer__container} ${homeStyles.grid}`}
              >
                <div>
                  <h1 className={homeStyles.footer__title}>About us</h1>

                  <p className={homeStyles.about__us}>
                    MorArtist is a Moroccan workshop for creating and selling
                    portraits well designed by our professional artists.
                  </p>
                  <p className={homeStyles.about__us}>
                    Our vision is to make the Moroccan houses more artistic by
                    creating the best portraits for decoration.
                  </p>
                  <p className={homeStyles.about__us}>
                    Our mission is to make our customers joyful and satisfied by
                    our designs and quality.
                  </p>
                </div>
                <ul className={homeStyles.footer__links}>
                  <li>
                    <a href="#catalog" className={homeStyles.footer__link}>
                      {" "}
                      Catalog{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#prices" className={homeStyles.footer__link}>
                      {" "}
                      Prices{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#contactus" className={homeStyles.footer__link}>
                      ContactUs{" "}
                    </a>
                  </li>
                </ul>
                <div>
                  <ul className={`${homeStyles.footer__socials}`}>
                    <li>
                      <a
                        href="https://web.facebook.com/profile.php?id=100084967522574"
                        target="_blank"
                        className={homeStyles.footer__social}
                      >
                        <FaFacebookSquare />
                      </a>
                      <a
                        href="https://www.instagram.com/morartist_portraits/"
                        target="_blank"
                        className={homeStyles.footer__social}
                      >
                        <FiInstagram />
                      </a>
                    </li>
                  </ul>
                  <div className={homeStyles.footer__mail}>
                    morartist.contact@gmail.com
                  </div>
                  <div className={homeStyles.footer__number}>
                    +212 7 08 93 82 16
                  </div>
                </div>
              </div>
              <p className={homeStyles.footer__copy}>
                &#169; MorArtist. All rights reserved
              </p>
            </div>
          </footer>
        </section>

        {/* <!--==================== SCROLL TOP ====================--> */}
        <a href="#" className={`${homeStyles.scrollup} ${
              showScroll ? homeStyles.show_scroll : ""
            }`} id="scroll-up">
          
          {/* <i className={`uil uil-arrow-up ${homeStyles.scrollup__icon}`}></i> */}
          <AiOutlineArrowUp className={homeStyles.scrollup__icon} />
        </a>
      </main>
    </div>
  );
}
