"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHandPointRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  useEffect(() => {
    // gsap.utils
    //   .toArray(".gallery-section-images .image-wrapper")
    //   .forEach((el) => {
    //     const img = el.querySelector("img");

    //     gsap.fromTo(
    //       img,
    //       {
    //         scale: 1.5,
    //         opacity: 0,
    //         y: 80,
    //         filter: "blur(5px) contrast(120%)",
    //       },
    //       {
    //         scale: 1,
    //         opacity: 1,
    //         y: 0,
    //         filter: "blur(0px) contrast(100%)",
    //         ease: "power2.out",
    //         scrollTrigger: {
    //           trigger: el,
    //           start: "top 90%",
    //           end: "top 60%",
    //           scrub: 1,
    //         },
    //       }
    //     );
    //   });

    const wrappers = document.querySelectorAll(".image-wrapper");

    wrappers.forEach((wrapper) => {
      const button = wrapper.querySelector(".view-button");

      wrapper.addEventListener("mousemove", (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(button, {
          x,
          y,
          duration: 0.2,
          ease: "power3.out",
        });
      });

      wrapper.addEventListener("mouseenter", () => {
        gsap.to(button, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          pointerEvents: "auto",
        });
      });

      wrapper.addEventListener("mouseleave", () => {
        gsap.to(button, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          pointerEvents: "none",
        });
      });
    });
  }, []);

  return (
    <section className="gallery-section">
      <div className="gallery-section-header">
        <h2 className="galley-section-title">
          <FaHandPointRight /> &nbsp; Recent Work
        </h2>
        <p className="galley-section-description">
          A curated selection of our latest projects—crafted with precision,
          creativity, and purpose to deliver impactful digital experiences.
        </p>
      </div>

      <div className="gallery-section-container">
        <div className="gallery-section-images">
          {[
            {
              src: "/projects/CalledtoSurf.png",
              href: "https://calledtosurf.com/",
            },
            {
              src: "/projects/ClaretWorld.png",
              href: "https://claretworld.com/",
            },
            {
              src: "/projects/UniqayaLifeStyles.png",
              href: "https://uniqaya.com/",
            },
            {
              src: "/projects/vixenAndFox.png",
              href: "https://vixenandfox.com.au/",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={index === 0 || index === 3 ? "full" : "half"}
            >
              <div className="image-wrapper">
                <img src={item.src} alt="Project" />
                <a
                  className="view-button"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
