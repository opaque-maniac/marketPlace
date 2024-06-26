const AboutPage = () => {
  return (
    <div className="lg:pt-10 relative md:pt-0 pt-8">
      <span className="absolute top-4 left-4">
        <span>Home</span> / <span className="font-bold">About</span>
      </span>
      <section className="lg:flex justify-center items-center lg:gap-6 gap-4 lg:mx-auto lg:w-800">
        <div className="lg:w-5/12 md:w-10/12 md:mx-auto lg:mx-0 w-auto">
          <h1 className="text-3xl font-bold lg:text-start text-center">
            About us
          </h1>
          <div className="pt-4">
            <p className="lg:text-start text-center lg:px-0 px-1">
              At <span className="font-bold">Hazina</span>, {"we're"} passionate
              about creating a thriving marketplace that empowers both buyers
              and sellers. We believe in fostering a community built on trust,
              transparency, and a commitment to quality. Our platform provides a
              user-friendly experience that simplifies the buying and selling
              process, allowing you to focus on what matters most – finding the
              perfect product or connecting with the right customer.
            </p>
            <p className="lg:text-start text-center lg:px-0 px-1 mt-2">
              {"We're"} constantly innovating and evolving to meet the needs of
              our growing community. We value your feedback and strive to create
              a marketplace that exceeds your expectations. Whether {"you're"} a
              seasoned seller or a curious first-time buyer, we welcome you to
              join us and experience the difference Hazina can make.
            </p>
          </div>
        </div>
        <div>
          <img
            src="/images/svg/online.svg"
            alt="Someone holding a laptop and bank card"
            className="md:w-400 md:h-400 h-300 w-300 object-cover rounded lg:mx-0 mx-auto z-0"
          />
        </div>
      </section>
      <section className="lg:flex justify-center items-center lg:gap-6 mt-12 mb-8 lg:mx-auto lg:w-800">
        <div className="lg:w-5/12 md:w-10/12 md:mx-auto lg:mx-0 w-auto lg:order-2">
          <h1 className="text-3xl font-bold lg:text-start text-center">
            Founder
          </h1>
          <div className="pt-4">
            <p className="lg:text-start text-center lg:px-0 px-1">
              Life as a young man can be a whirlwind. Between studies, hobbies,
              and social commitments, finding the right clothes and gear can
              feel overwhelming. Hazina is here to help. We offer a variety of
              stylish and affordable options for the go-getter on the move. From
              backpacks that can handle daily essentials to comfortable tees for
              any adventure, Hazina has what you need to look and feel your
              best, wherever life takes you.
            </p>
            <p className="lg:text-start text-center lg:px-0 px-1 mt-2">
              And now, thanks to Mark Mbithi, all of this is possible. Mark is a
              young entrepreneur who founded Hazina with a vision to create a
              marketplace that connects people with the products they love. He
              believes in the power of community and the importance of building
              relationships that last. With Hazina, Mark hopes to inspire others
              to pursue their passions and live life to the fullest. Join us on
              this journey and discover the endless possibilities that await you
              at Hazina.
            </p>
          </div>
        </div>
        <div>
          <img
            src="/images/svg/founder.svg"
            alt="Hazina founder, Mark Mbithi"
            className="md:w-400 md:h-400 h-300 w-300 object-cover rounded lg:mx-0 mx-auto z-0"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
