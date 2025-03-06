import { useMutation } from "@tanstack/react-query";
import profileForm from "../../utils/reducers/profileForm";
import { Staff } from "../../utils/types";
import { updateProfile } from "../../utils/mutations/profile/updateprofile";
import { useNavigate } from "react-router-dom";
import { FormEventHandler, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../loader";

interface Props {
  profile: Staff;
}

export default function ProfileUpdateForm({ profile }: Props) {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const { state, dispatch, ActionType } = profileForm(profile);

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      navigate("/profile", {
        replace: true,
      });
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4">
      <div>
        <label htmlFor="firstName" className="sr-only">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={state.firstName}
          onChange={(e) =>
            dispatch({
              type: ActionType.CHANGE_FIRSTNAME,
              payload: e.currentTarget.value,
            })
          }
          onBlur={(e) =>
            dispatch({
              type: ActionType.CHANGE_FIRSTNAME,
              payload: e.currentTarget.value,
            })
          }
          className="block w-80 h-12 px-2 text-lg focus:ring-0 focus:outline-none bg-white border-b border-black mx-auto"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="sr-only">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={state.lastName}
          onChange={(e) =>
            dispatch({
              type: ActionType.CHANGE_LASTNAME,
              payload: e.currentTarget.value,
            })
          }
          onBlur={(e) =>
            dispatch({
              type: ActionType.CHANGE_LASTNAME,
              payload: e.currentTarget.value,
            })
          }
          className="block w-80 h-12 px-2 text-lg focus:ring-0 focus:outline-none bg-white border-b border-black mx-auto"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">
          Phone (Optional)
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="Phone (Optional)"
          value={state.phone}
          onChange={(e) =>
            dispatch({
              type: ActionType.CHANGE_PHONE,
              payload: e.currentTarget.value,
            })
          }
          onBlur={(e) =>
            dispatch({
              type: ActionType.CHANGE_PHONE,
              payload: e.currentTarget.value,
            })
          }
          className="block w-80 h-12 px-2 text-lg focus:ring-0 focus:outline-none bg-white border-b border-black mx-auto"
        />
      </div>
      <div>
        <label htmlFor="address" className="sr-only">
          Address (Optional)
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={state.address}
          onChange={(e) =>
            dispatch({
              type: ActionType.CHANGE_ADDRESS,
              payload: e.currentTarget.value,
            })
          }
          onBlur={(e) =>
            dispatch({
              type: ActionType.CHANGE_ADDRESS,
              payload: e.currentTarget.value,
            })
          }
          className="block w-80 h-12 px-2 text-lg focus:ring-0 focus:outline-none bg-white border-b border-black mx-auto"
          placeholder="Address (Optional)"
        />
      </div>
      <div className="w-80 mx-auto">
        <label htmlFor="image" className="block">
          Image
        </label>
        <input type="file" name="image" id="image" />
      </div>
      <div className="flex justify-end w-80 mx-auto">
        <button
          type="submit"
          aria-label="Submit update"
          disabled={isPending}
          className="flex justify-center items-center w-40 h-10 bg-red-500 text-white"
        >
          {isPending ? (
            <div className="w-6 h-6">
              <Loader color="#fff" />
            </div>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </div>
    </form>
  );
}
