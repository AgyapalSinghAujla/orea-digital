"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function HeroSection() {
  const divRef = useRef(null);

  useEffect(() => {
    const mySplitText = new SplitText(divRef.current, {
      type: "chars",
      position: "relative",
    });

    const chars = mySplitText.chars;

    gsap
      .timeline({ yoyo: true, repeat: -1, repeatDelay: 0.5, delay: 1 })
      .to(chars, {
        duration: 0.2,
        fontWeight: 900,
        color: "#e6f03a",
        scale: 0.7,
        y: 6,
        ease: "power2.in",
        rotation: "180deg",
        stagger: {
          grid: "auto",
          amount: 0.8,
          from: "center",
        },
      })
      .to(
        chars,
        {
          duration: 0.4,
          fontWeight: 200,
          color: "#fff",
          scale: 1,
          y: 0,
          rotation: "360deg",
          ease: "power3.inOut",
          stagger: {
            grid: "auto",
            amount: 0.8,
            from: "center",
          },
        },
        "-=0.3"
      );
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-section-animated-text" ref={divRef}>
        CODE.
        <br />
        CREATE.
        <br />
        ELEVATE.
        <br />
      </div>
    </section>
  );
}
