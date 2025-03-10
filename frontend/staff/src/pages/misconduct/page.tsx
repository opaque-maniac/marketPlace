import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MouseEventHandler,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import { fetchMisconduct } from "../../utils/queries/misconducts/fetchmisconduct";
import { formatDate } from "../../utils/date";
import MisconductProfileTabs from "../../components/misconduct/profilecomponent";
import DeleteMisconductButton from "../../components/misconduct/deletemisconductbutton";
import EditMisconductLink from "../../components/misconduct/editmisconductlink";

const Description = ({ description }: { description: string }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const onclick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
  };

  return description.length > 200 ? (
    <>
      <p className="xl:w-10/12 w-auto">
        {clicked ? description : `${description.slice(0, 200)}...`}
      </p>
      <div>
        <button
          onClick={onclick}
          aria-label={clicked ? "Show less" : "Show more"}
          className="underline"
        >
          {clicked ? "Less" : "More"}
        </button>
      </div>
    </>
  ) : (
    <p className="xl:w-10/12 w-auto">{description}</p>
  );
};

export default function MisconductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, isError, error, isSuccess, data } = useQuery({
    queryKey: ["misconduct", id as string],
    queryFn: fetchMisconduct,
  });

  if (isError) {
    errorHandler(error, navigate, setErr, setError);
  }

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  const misconduct = data?.misconduct;

  return (
    <Transition>
      <Helmet>
        <title>Misconduct</title>
        <meta
          name="description"
          content="Complaints page for Hazina staff app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="relative pt-12 lg:pb-0 pb-10">
        <p className="absolute top-4 left-4">
          Home / <span className="font-bold">Misconduct</span>
        </p>
        {isLoading || !data ? (
          <PageLoader />
        ) : (
          <>
            {misconduct && (
              <div className="flex xl:flex-row flex-col xl:justify-center xl:items-start items-center">
                <div className="md:w-6/12 w-8/12">
                  {/* Misconduct details */}
                  <section className="flex flex-col gap-[10px]">
                    <h3 className="font-semibold text-lg">
                      {misconduct.misconduct}
                    </h3>
                    <p>{misconduct.userEmail}</p>
                    <p>
                      Action:{" "}
                      <span>{misconduct.response.replace("_", " ")}</span>
                    </p>
                    <Description description={misconduct.description} />
                    <p>{formatDate(misconduct.createdAt)}</p>
                    <div className="w-full flex md:flex-row flex-col md:justify-start justify-center items-start md:gap-10 gap-4">
                      <EditMisconductLink
                        id={misconduct.id}
                        staffID={misconduct.staffID}
                      />
                      <DeleteMisconductButton
                        id={misconduct.id}
                        staffID={misconduct.staffID}
                      />
                    </div>
                  </section>

                  {/* Misconduct personel */}
                  <section className="mt-6 xl:mb-0 mb-6">
                    <h3 className="font-bold text-lg">Personel:</h3>
                    <div>
                      <img
                        src={
                          misconduct.personel.image
                            ? misconduct.personel.image.url
                            : "/images/profile.svg"
                        }
                        alt={`${misconduct.personel.firstName} ${misconduct.personel.lastName}`}
                        className="w-20 h-20 rounded-full border border-black"
                      />
                    </div>
                    <div className="mt-2">
                      <p>
                        {misconduct.personel.firstName}{" "}
                        {misconduct.personel.lastName}
                      </p>
                      <p>{misconduct.personel.email}</p>
                      <p>
                        Role: <span>{misconduct.personel.role}</span>
                      </p>
                      <Link
                        to={`/staff/${misconduct.personel.id}`}
                        target="_blank"
                        className="underline text-blue-500 text-sm"
                      >
                        View profile
                      </Link>
                    </div>
                  </section>
                </div>

                {/* Misconduct profiles*/}
                <MisconductProfileTabs
                  customer={misconduct.customer}
                  seller={misconduct.seller}
                  staff={misconduct.staff}
                  userEmail={misconduct.userEmail}
                />
              </div>
            )}
          </>
        )}
      </main>
    </Transition>
  );
}
