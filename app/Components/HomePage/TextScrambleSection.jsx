"use client";

import { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default function TextScrambleSection() {
  useEffect(() => {
    const paragraph = document.querySelector(".text-block p");

    const st = new SplitText(paragraph, {
      type: "chars",
      charsClass: "char",
    });

    st.chars.forEach((char) => {
      gsap.set(char, { attr: { "data-content": char.innerHTML } });
    });

    const textBlock = document.querySelector(".text-block");

    const handlePointerMove = (e) => {
      st.chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          gsap.to(char, {
            overwrite: true,
            duration: 1.2 - dist / 100,
            scrambleText: {
              text: char.dataset.content,
              chars: ".:",
              speed: 0.5,
            },
            ease: "none",
          });
        }
      });
    };

    textBlock.addEventListener("pointermove", handlePointerMove);

    return () => {
      textBlock.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <section className="text-block-section">
      <div className="text-block">
        <p>
          Websites are more than just functional spaces—they're immersive
          experiences where visuals, typography, and motion come together to
          tell a story, evoke emotions, and create memorable interactions.
          <br />
          <br />
          Every element, from the smallest detail to the overall design, plays a
          role in shaping how users feel and engage, transforming a simple visit
          into an inspiring journey.
        </p>
      </div>
    </section>
  );
}
