import Transition from "../../components/transition";
import { Customer } from "../../utils/types";
import useProfileForm from "../../utils/reducers/customerProfileForm";
import Loader from "../../components/loader";
import { useMutation } from "@tanstack/react-query";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../utils/errorHandler";
import useUserStore from "../../utils/store";
import { FormEventHandler, useContext } from "react";

interface Props {
  profile: Customer;
}

const ProfileForm = ({ profile }: Props) => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isAdmin = useUserStore((state) => state.role) === "ADMIN";
  const { state, dispatch, ActionType } = useProfileForm(profile);

  const { isPending, mutate } = useMutation({
    mutationFn: sendUpdateProfile,
    onSuccess: (data) => {
      if (data) {
        navigate("/profile", { replace: true });
      } else {
        setError(true);
        navigate("/500", { replace: true });
      }
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate({ data: formData, id: user as string });
  };

  return (
    <Transition>
      <form
        onSubmit={submitHandler}
        className="shadow-lg border pt-4 xl:w-5/12 md:w-7/12 w-11/12 mx-auto md:flex flex-col md:gap-2 md:p-4"
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-72 h-12 px-2 text-lg auth-input md:mx-0 mx-auto focus:auth-input focus:outline-none bg-white"
              value={state.email}
              onChange={(e) =>
                dispatch({
                  type: ActionType.CHANGE_EMAIL,
                  payload: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: ActionType.CHANGE_EMAIL,
                  payload: e.target.value,
                })
              }
              required
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="name" className="sr-only">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="block w-72 h-12 px-2 text-lg auth-input md:mx-0 mx-auto focus:auth-input focus:outline-none bg-white"
              value={state.firstName}
              onChange={(e) =>
                dispatch({
                  type: ActionType.CHANGE_FIRSTNAME,
                  payload: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: ActionType.CHANGE_FIRSTNAME,
                  payload: e.target.value,
                })
              }
              required
              placeholder="First Name"
            />
          </div>
          <div>
            <label htmlFor="name" className="sr-only">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="block w-72 h-12 px-2 text-lg auth-input md:mx-0 mx-auto focus:auth-input focus:outline-none bg-white"
              value={state.lastName}
              onChange={(e) =>
                dispatch({
                  type: ActionType.CHANGE_LASTNAME,
                  payload: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: ActionType.CHANGE_LASTNAME,
                  payload: e.target.value,
                })
              }
              required
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 pt-2">
          <div className="mb-2">
            <label htmlFor="address (optional)" className="sr-only">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="block w-72 h-12 px-2 text-lg auth-input md:mx-0 mx-auto focus:auth-input focus:outline-none bg-white"
              value={state.address}
              onChange={(e) =>
                dispatch({
                  type: ActionType.CHANGE_ADDRESS,
                  payload: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: ActionType.CHANGE_ADDRESS,
                  payload: e.target.value,
                })
              }
              placeholder="Address (optional)"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="sr-only">
              Phone (optional)
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block w-72 h-12 px-2 text-lg auth-input md:mx-0 mx-auto focus:auth-input focus:outline-none bg-white"
              value={state.phone}
              onChange={(e) =>
                dispatch({
                  type: ActionType.CHANGE_PHONE,
                  payload: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: ActionType.CHANGE_PHONE,
                  payload: e.target.value,
                })
              }
              placeholder="Phone (optional)"
            />
          </div>
        </div>
        {isAdmin && (
          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-72 h-12 px-2 text-lg auth-input md:mx-0 mx-auto focus:auth-input focus:outline-none bg-white"
              placeholder="Password (optional)"
            />
          </div>
        )}
        <div className="flex flex-col justify-center items-center gap-4">
          <div>
            <label htmlFor="image" className="md:mx-0 mx-auto w-72 block">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="md:mx-0 mx-auto w-72 block"
            />
          </div>
          <div className="h-20 flex justify-center xl:justify-end items-center md:pr-8 xl:py-4">
            <button
              type="submit"
              className={`h-10 w-40 rounded-lg bg-red-400 flex justify-center items-center text-white font-semibold ${
                isPending ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-label="Submit Profile"
            >
              {isPending ? (
                <div className="w-6 h-6">
                  <Loader color="#000000" />{" "}
                </div>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </Transition>
  );
};

export default ProfileForm;
