import { useMutation } from "@tanstack/react-query";
import Loader from "../../../components/loader";
import ThumbsUp from "./thumbsUp";
import submitContactForm from "../submitForm";
// import { useContext } from "react";
// import ErrorContext from "../../../errorContext";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

const ContactForm = () => {
  const navigate = useNavigate();
  //   const [, setError] = useContext(ErrorContext);

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onError: () => {
      //   setError(true);
      navigate("/error/500", { replace: true });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    mutation.mutate(data);
  };

  if (mutation.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (mutation.isSuccess) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex justify-center items-center">
          <div
            aria-label="Thumbs Up Icon"
            className="w-10 h-10 rounded-full bg-red-500 flex justify-center items-center gap-2"
          >
            <ThumbsUp />
          </div>
          <div className="flex justify-center">
            <p>Message sent successfully!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="md:flex justify-center lg:gap-8 md:gap-4 mb-4">
          <div className="lg:mb-0 mb-4">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              aria-label="Name"
              placeholder="Your name"
              className="lg:w-56 w-full border-0 outline-none focus:ring-0 bg-gray-200 rounded"
            />
          </div>
          <div className="lg:mb-0 mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              aria-label="Name"
              placeholder="Your email"
              className="lg:w-56 w-full border-0 outline-none focus:ring-0 bg-gray-200 rounded"
            />
          </div>
          <div className="lg:mb-0 mb-4">
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              aria-label="Phone"
              placeholder="Phone number"
              className="lg:w-56 w-full border-0 outline-none focus:ring-0 bg-gray-200 rounded"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            aria-label="Message"
            placeholder="Your message"
            className="h-40 lg:w-800 w-full border-0 outline-none focus:ring-0 bg-gray-200 rounded"
          />
        </div>
        <div className="mt-4 flex lg:justify-end justify-center">
          <button type="submit" className="block w-36 h-10 bg-red-500 rounded">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
