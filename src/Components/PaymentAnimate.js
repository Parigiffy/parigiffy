import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const marqueeTexts = [
  "Our thirdparties' payment gateways are currently been upgraded, kindly use the Eropay service. Sincere apologies",
];

const PaymentAnimate = () => {
  const marqueeElements = useRef([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const marqueeTween = useRef();

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      //   marqueeTween.pause().kill();
    };
  }, []);

  useEffect(() => {
    marqueeInitialSet();
    marqueeTween.current && marqueeTween.current.pause().kill();
    marqueeTween.current = gsap.to(marqueeElements.current, {
      x: `+=${screenWidth * 3.5}`,
      ease: "none",
      repeat: -1,
      duration: 30,
      rotation: 0.1,
      modifiers: {
        x: (x) => {
          return (parseFloat(x) % (screenWidth * 1.0)) + "px";
        },
      },
    });
  }, [screenWidth]);

  const marqueeInitialSet = () => {
    gsap.set(marqueeElements.current, {
      xPercent: -100,
      x: function (index) {
        return (screenWidth / 2) * index;
      },
    });
  };

  const resizeHandler = () => {
    gsap.set(marqueeElements.current, { clearProps: "all" });
    setScreenWidth(window.innerWidth);
  };

  const marqueeElementsRefHandler = (e, i) => {
    marqueeElements.current[i] = e;
  };

  const renderMarqueeElements = () => {
    // if (marqueeTexts.length === 1) {
    //   marqueeTexts[2] = marqueeTexts[1] = marqueeTexts[0];
    // }
    // if (marqueeTexts.length === 2) {
    //   marqueeTexts[2] = marqueeTexts[0];
    // }
    return marqueeTexts.map((e, i) => (
      <small
        className=' text-center m-0 p-0 '
        key={`marquee-${i}`}
        ref={(el) => marqueeElementsRefHandler(el, i)}
      >
        {e}
      </small>
    ));
  };
  return (
    <div
      className='  d-flex  py-1 bg-dark text-white flex overflow-hidden '
      //   style={{ minHeight: "10px" }}
    >
      {renderMarqueeElements()}
    </div>
  );
};

export default PaymentAnimate;
