import Transition from "./transition";

const PageLoader = () => {
  const color = "#000000";

  return (
    <Transition time={1}>
      <main
        style={{
          minHeight: "calc(100vh - 6.5rem)",
          maxHeight: "calc(100vh - 3.5rem)",
        }}
        className="flex justify-center items-center"
      >
        <div>
          <svg
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            height={150}
            width={150}
            className="animate-spin"
            aria-label="loading"
          >
            <g>
              <path
                fill={color}
                d="M256,0c-23.357,0-42.297,18.932-42.297,42.288c0,23.358,18.94,42.288,42.297,42.288
		c23.357,0,42.279-18.93,42.279-42.288C298.279,18.932,279.357,0,256,0z"
              />
              <path
                fill={color}
                d="M256,427.424c-23.357,0-42.297,18.931-42.297,42.288C213.703,493.07,232.643,512,256,512
		c23.357,0,42.279-18.93,42.279-42.288C298.279,446.355,279.357,427.424,256,427.424z"
              />
              <path
                fill={color}
                d="M74.974,74.983c-16.52,16.511-16.52,43.286,0,59.806c16.52,16.52,43.287,16.52,59.806,0
		c16.52-16.511,16.52-43.286,0-59.806C118.261,58.463,91.494,58.463,74.974,74.983z"
              />
              <path
                fill={color}
                d="M377.203,377.211c-16.503,16.52-16.503,43.296,0,59.815c16.519,16.52,43.304,16.52,59.806,0
		c16.52-16.51,16.52-43.295,0-59.815C420.489,360.692,393.722,360.7,377.203,377.211z"
              />
              <path
                fill={color}
                d="M84.567,256c0.018-23.348-18.922-42.279-42.279-42.279c-23.357-0.009-42.297,18.932-42.279,42.288
		c-0.018,23.348,18.904,42.279,42.279,42.279C65.645,298.288,84.567,279.358,84.567,256z"
              />
              <path
                fill={color}
                d="M469.712,213.712c-23.357,0-42.279,18.941-42.297,42.288c0,23.358,18.94,42.288,42.297,42.297
		c23.357,0,42.297-18.94,42.279-42.297C512.009,232.652,493.069,213.712,469.712,213.712z"
              />
              <path
                fill={color}
                d="M74.991,377.22c-16.519,16.511-16.519,43.296,0,59.806c16.503,16.52,43.27,16.52,59.789,0
		c16.52-16.519,16.52-43.295,0-59.815C118.278,360.692,91.511,360.692,74.991,377.22z"
              />
              <path
                fill={color}
                d="M437.026,134.798c16.52-16.52,16.52-43.304,0-59.824c-16.519-16.511-43.304-16.52-59.823,0
		c-16.52,16.52-16.503,43.295,0,59.815C393.722,151.309,420.507,151.309,437.026,134.798z"
              />
            </g>
          </svg>
          <div>
            <p className="text-xl font-bold mt-4 text-center">Loading...</p>
          </div>
        </div>
      </main>
    </Transition>
  );
};

export default PageLoader;
