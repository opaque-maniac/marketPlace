import { FormEventHandler, useContext } from "react";
import Transition from "../../components/transition";
import { Seller } from "../../utils/types";
import useProfileForm from "./useProfileForm";
import Loader from "../../components/loader";
import { useMutation } from "@tanstack/react-query";
import { sendUpdateProfile } from "../../utils/mutations/profile/updateprofile";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../utils/store";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  profile: Seller;
}

const ProfileForm = ({ profile }: Props) => {
  const { state, dispatch, ActionType } = useProfileForm(profile);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

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
        className="shadow-lg md:w-8/12 w-11/12 mx-auto md:mb-0 mb-8"
      >
        <div className="md:flex block justify-center items-center md:gap-14">
          <div className="mb-4">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={state.name}
              onChange={(e) =>
                dispatch({
                  type: ActionType.CHANGE_NAME,
                  payload: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: ActionType.CHANGE_NAME,
                  payload: e.target.value,
                })
              }
              className="block w-72 h-12 px-2 text-lg auth-input md:mx-0 mx-auto focus:auth-input focus:outline-none bg-white"
              required
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
              className="block w-72 h-12 px-2 text-lg auth-input md:mx-0 mx-auto focus:auth-input focus:outline-none bg-white"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="md:flex block justify-center items-center md:gap-14">
          <div>
            <div className="mb-2">
              <label htmlFor="address (optional)" className="sr-only">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
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
                className="block w-72 h-12 px-2 text-lg auth-input md:mx-0 mx-auto focus:auth-input focus:outline-none bg-white"
                placeholder="Address (optional)"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone (optional)" className="sr-only">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
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
                className="block w-72 h-12 px-2 text-lg auth-input md:mx-0 mx-auto focus:auth-input focus:outline-none bg-white"
                placeholder="Phone (optional)"
              />
            </div>
          </div>
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
        </div>
        <div className="h-20 flex justify-center md:justify-end items-center md:pr-6">
          <button
            type="submit"
            className="h-10 w-40 rounded-lg bg-red-400 text-center"
            aria-label="Submit Profile"
          >
            {isPending ? <Loader color="#000000" /> : "Submit"}
          </button>
        </div>
      </form>
    </Transition>
  );
};

export default ProfileForm;
