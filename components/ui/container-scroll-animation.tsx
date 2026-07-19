"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  // Keep initial render deterministic across server and client.
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    const id = window.requestAnimationFrame(checkMobile);
    window.addEventListener("resize", checkMobile);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [8, 0] : [20, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.92, 1] : [1.05, 1]
  );
  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, -40] : [0, -100]
  );

  return (
    <div
      className="relative flex h-[36rem] items-center justify-center px-4 py-8 sm:h-[48rem] sm:px-6 md:h-[64rem] md:p-12 lg:h-[80rem] lg:p-20"
      ref={containerRef}
    >
      <div
        className="relative w-full py-6 sm:py-10 md:py-24 lg:py-40"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto max-w-5xl px-2 text-center sm:px-0"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto -mt-6 h-[14rem] w-full max-w-5xl rounded-2xl border-2 border-espresso/30 bg-espresso p-1.5 shadow-2xl sm:-mt-8 sm:h-[20rem] sm:rounded-[24px] sm:border-4 sm:p-2 md:-mt-12 md:h-[32rem] md:rounded-[30px] lg:h-[40rem] lg:p-6"
    >
      <div className="h-full w-full overflow-hidden rounded-xl bg-cream sm:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
