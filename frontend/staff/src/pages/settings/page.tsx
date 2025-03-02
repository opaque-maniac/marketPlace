import { Link } from "react-router-dom";
import Transition from "../../components/transition";
import KeyIcon from "../../components/icons/key";
import EmailIcon from "../../components/icons/email";
import EditIcon from "../../components/icons/editicon";

export default function SettingsPage() {
  return (
    <Transition>
      <main role="main" className="h-full pt-20 relative pb-6">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Settings</span>
        </p>
        <section className="xl:w-4/12 md:w-6/12 w-11/12 mx-auto shadow-md px-4 py-8 border rounded">
          <ul className="flex flex-col gap-8">
            <li>
              <Link
                to={"/change-email"}
                className="flex justify-start items-center gap-2"
              >
                <div className="rounded-full w-7 h-7 bg-black text-white p-1">
                  <EmailIcon />
                </div>
                <p>Change Email</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/change-password"}
                className="flex justify-start items-center gap-2"
              >
                <div className="rounded-full w-7 h-7 bg-black text-white p-1">
                  <KeyIcon />
                </div>
                <p>Change Password</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/profile/update"}
                className="flex justify-start items-center gap-2"
              >
                <div className="rounded-full w-7 h-7 bg-black text-white p-1">
                  <EditIcon />
                </div>
                <p>Edit Profile</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/profile/delete"}
                className="flex justify-start items-center gap-2"
              >
                <div className="rounded-full w-7 h-7 bg-black text-white p-1">
                  <EditIcon />
                </div>
                <p>Delete Profile</p>
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </Transition>
  );
}
