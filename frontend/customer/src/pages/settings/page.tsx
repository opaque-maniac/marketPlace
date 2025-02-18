import { Link } from "react-router-dom";
import Transition from "../../components/transition";
import KeyIcon from "../../components/icons/key";
import EmailIcon from "../../components/icons/email";
import EditIcon from "../../components/icons/editicon";
import ProfileIcon from "../../components/icons/profileIcon";
import MetaTags from "../../components/metacomponent";

export default function SettingsPage() {
  return (
    <Transition>
      <MetaTags
        title="Settings | Hazina"
        description="Profile settings for Hazina"
        keywords={[
          "settings",
          "settings page",
          "account settings",
          "hazina settings",
          "hazina account settings",
        ]}
        image="/images/logo.svg"
        allowBots={false}
      />
      <main role="main" className="h-full pt-20 relative pb-6">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Settings</span>
        </p>
        <div className="absolute top-4 right-4">
          <Link
            to={"/profile"}
            aria-label="Go back to profile"
            className="block w-8 h-8 p-1 rounded-full border xl:border-transparent hover:border-black/50 border-black/50"
          >
            <ProfileIcon fill="#000" />
          </Link>
        </div>
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
