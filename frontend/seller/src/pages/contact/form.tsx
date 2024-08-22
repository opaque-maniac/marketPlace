const ContactForm = () => {
  return (
    <form>
      <div>
        <div>
          <label htmlFor="name" className="sr-only">
            Your Name
          </label>
          <input type="text" name="name" id="name" placeholder="Your Name" />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            Your Phone
          </label>
          <input
            type="phone"
            name="phone"
            id="phone"
            placeholder="Your Phone"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Your Message
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Your Message"
        ></textarea>
      </div>
      <div>
        <button type="submit">Send Message</button>
      </div>
    </form>
  );
};

export default ContactForm;
