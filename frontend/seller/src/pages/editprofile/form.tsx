import { FormEventHandler } from "react";
import Transition from "../../components/transition";
import { Seller } from "../../utils/types";
import useProfileForm from "./useProfileForm";
import Loader from "../../components/loader";

interface Props {
  profile: Seller;
  isLoading: boolean;
  handler: FormEventHandler<HTMLFormElement>;
}

const ProfileForm = ({ profile, isLoading, handler }: Props) => {
  const { state, dispatch, ActionType } = useProfileForm(profile);

  return (
    <Transition>
      <form
        onSubmit={handler}
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
            {isLoading ? <Loader color="#000000" /> : "Submit"}
          </button>
        </div>
      </form>
    </Transition>
  );
};

export default ProfileForm;
