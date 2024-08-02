const PageLoader = () => {
  return (
    <section
      className="w-screen flex justify-center items-center height-mb lg:height-lg md:height-md lg:mt-20 mt-12 md:mt-14"
      style={{ height: "calc(100vh - 3.5rem)" }}
    >
      <div className="w-full">
        <div className="w-full flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 82.9242 63.3824"
          >
            <defs />
            <g stroke="#000">
              <text
                xmlSpace="preserve"
                strokeWidth="2.6457"
                fontFamily="MV Boli"
                fontSize="85.3333"
                fontWeight="400"
                opacity=".92"
                style={{
                  fontFamily: '"MV Boli", Normal',
                  fontVariantLigatures: "normal",
                  fontVariantCaps: "normal",
                  fontVariantNumeric: "normal",
                  fontVariantEastAsian: "normal",
                  whiteSpace: "pre",
                  marginBottom: "10px",
                }}
                transform="matrix(.32505 0 0 .51156 -31.6168 -115.574)"
              >
                <tspan x="92.0098" y="290.1864">
                  Hazina
                </tspan>
              </text>
              <g
                fill="#fff"
                strokeOpacity=".9856"
                strokeWidth="1.9126"
                transform="translate(-67.0675 -78.4326)"
              >
                <ellipse
                  cx="79.2541"
                  cy="137.1393"
                  rx="4.26"
                  ry="3.719"
                  className="animate-bounce-delay-1"
                />
                <ellipse
                  cx="111.4561"
                  cy="137.1396"
                  rx="4.26"
                  ry="3.719"
                  className="animate-bounce-delay-2"
                />
                <ellipse
                  cx="140.6692"
                  cy="137.1396"
                  rx="4.26"
                  ry="3.719"
                  className="animate-bounce-delay-3"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default PageLoader;
