import { Helmet } from "react-helmet";
import Transition from "../../components/transition";

const AboutPage = () => {
  return (
    <Transition>
      <Helmet>
        <title>About</title>
        <meta name="description" content="About Hazina" />
        <meta name="robots" content="nofollow" />
        <meta name="googlebot" content="nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full pt-20 relative pb-6">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">About</span>
        </p>
        <section className="md:flex justify-center items-center gap-4 mb-12">
          <div className="md:w-5/12 md:mb-0 mb-4">
            <p className="md:text-start text-center">
              Welcome to Hazina, your premier destination for discovering unique
              and high-quality products from around the globe. At Hazina, we
              believe that shopping should be an enriching experience, filled
              with discovery and delight. Our marketplace is designed to connect
              you with a diverse range of products, each curated to meet the
              highest standards of quality and craftsmanship. Whether {`you're`}{" "}
              searching for artisanal treasures, cutting-edge innovations, or
              everyday essentials, Hazina offers a carefully selected assortment
              to cater to your every need. Our commitment to excellence ensures
              that every item on our platform is not only exceptional but also
              reflects our passion for quality and customer satisfaction.
            </p>
          </div>
          <div>
            <img
              src="/images/about-1.jpg"
              alt=""
              className="md:w-400 w-300 md:mx-0 mx-auto"
            />
          </div>
        </section>
        <section className="md:flex justify-center items-center gap-4">
          <div className="md:w-5/12 md:order-2 md:mb-0 mb-4">
            <p className="md:text-end text-center">
              At the heart of Hazina is our dedication to supporting a vibrant
              community of artisans, creators, and vendors. We are more than
              just a marketplace; we are a community where innovation meets
              tradition and where every purchase contributes to a global
              ecosystem of craftsmanship and creativity. Our mission is to
              provide a platform that empowers sellers to reach new audiences
              and fosters a marketplace that values transparency,
              sustainability, and integrity. Join us on this journey as we
              celebrate the beauty of diverse cultures and craftsmanship, and
              experience the joy of finding something truly special at Hazina.
            </p>
          </div>
          <div>
            <img
              src="/images/about-2.jpg"
              alt=""
              className="md:w-400 w-300 md:mx-0 mx-auto"
            />
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default AboutPage;
