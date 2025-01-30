import { useMutation } from "@tanstack/react-query";
import { sendContact } from "../../utils/mutations/contact";
import { FormEventHandler, MutableRefObject, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

const ContactForm = () => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const ref: MutableRefObject<HTMLFormElement | null> = { current: null };
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendContact,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: (data) => {
      if (!data) {
        setError(true);
        navigate("/500");
      }
      ref.current?.reset();
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const phone = (formData.get("phone") as string) ?? undefined;
    const message = formData.get("message") as string;
    mutation.mutate({ email, name, phone, message });
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        ref={ref}
        className="md:w-auto w-80 md:mx-0 mx-auto md:pt-2 pt-1"
      >
        <div className="md:flex justify-between items-center mb-4">
          <div className="px-2 mb-4 md:mb-0">
            <label htmlFor="name" className="sr-only">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              className="block w-full h-10 bg-gray-200 focus:outline-none pl-1 focus:border-b border-black"
            />
          </div>
          <div className="px-2 mb-4 md:mb-0">
            <label htmlFor="email" className="sr-only">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              className="block w-full h-10 bg-gray-200 focus:outline-none pl-1 focus:border-b border-black"
            />
          </div>
          <div className="px-2 mb-4 md:mb-0">
            <label htmlFor="phone" className="sr-only">
              Your Phone
            </label>
            <input
              type="phone"
              name="phone"
              id="phone"
              placeholder="Your Phone"
              className="block w-full h-10 bg-gray-200 focus:outline-none pl-1 focus:border-b border-black"
            />
          </div>
        </div>
        <div className="px-2">
          <label htmlFor="message" className="sr-only">
            Your Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Your Message"
            className="block w-full h-40 bg-gray-200 focus:outline-none pl-1 focus:border-b border-black"
          ></textarea>
        </div>
        <div className="flex md:justify-end justify-center items-center h-24 md:pr-2">
          <button
            aria-label="Send Message"
            disabled={mutation.isIdle ? false : true}
            className="flex justify-center items-center bg-red-400 rounded-lg"
            type="submit"
            style={{ width: "215px", height: "56px" }}
          >
            {mutation.isPending ? <Loader color="#ffffff" /> : "Send Message"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
