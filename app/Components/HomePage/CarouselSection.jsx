"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import Link from "next/link";
import { FaHandPointRight } from "react-icons/fa";

gsap.registerPlugin(Observer);

const carouselData = [
  { title: "Service 1", description: "This is the first slide description." },
  { title: "Service 2", description: "Here goes some details about slide 2." },
  { title: "Service 3", description: "Amazing content lives on slide 3." },
  { title: "Service 4", description: "Explore slide 4 with cool facts." },
  { title: "Service 5", description: "Creative ideas bloom on slide 5." },
  { title: "Service 6", description: "Welcome to slide 6 – bold and bright." },
  { title: "Service 7", description: "Did you check slide 7 yet?" },
  { title: "Service 8", description: "Slide 8 wraps it up nicely." },
];

export default function CarouselSection() {
  const carouselRef = useRef(null);
  const progress = useRef({ value: 0 });

  useEffect(() => {
    const images = gsap.utils.toArray(".carousel-image");
    const radius = 260;

    Observer.create({
      target: carouselRef.current,
      type: "wheel,pointer",
      onPress: () => (carouselRef.current.style.cursor = "grabbing"),
      onRelease: () => (carouselRef.current.style.cursor = "grab"),
      onChange: (self) => {
        gsap.killTweensOf(progress.current);
        const p =
          self.event.type === "wheel"
            ? self.deltaY * -0.0005
            : self.deltaX * 0.05;

        gsap.to(progress.current, {
          duration: 2,
          ease: "power4.out",
          value: `+=${p}`,
        });
      },
    });

    const animate = () => {
      images.forEach((image, index) => {
        const theta = index / images.length - progress.current.value;
        const x = -Math.sin(theta * Math.PI * 2) * radius;
        const z = Math.cos(theta * Math.PI * 2) * radius;

        image.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${
          360 * -theta
        }deg)`;

        image.style.backgroundColor = index % 2 === 0 ? "#000" : "#fff";
        image.style.color = index % 2 === 0 ? "#fff" : "#000";
      });
    };

    gsap.ticker.add(animate);

    return () => {
      gsap.ticker.remove(animate);
    };
  }, []);

  return (
    <section className="carousel-section">
      <div className="gallery-section-header">
        <h2 className="galley-section-title">
          <FaHandPointRight /> &nbsp; Our Services
        </h2>
        <p className="galley-section-description">
          From innovative website development to result-driven digital
          marketing, our services are designed to help businesses thrive online
          through strategy, creativity, and cutting-edge technology.
        </p>
      </div>
      <div className="carousel" ref={carouselRef}>
        {carouselData.map((item, i) => (
          <div key={i} className="carousel-image">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <Link className="carousel-image-btn" href="/">
              {" "}
              Learn More{" "}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
