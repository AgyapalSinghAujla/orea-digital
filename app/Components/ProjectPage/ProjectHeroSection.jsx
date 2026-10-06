"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Draggable from "gsap/Draggable";

gsap.registerPlugin(InertiaPlugin, Draggable);

export const ProjectHeroSection = () => {
  useEffect(() => {
    const friction = -0.5;
    const ball = document.querySelector(".ball");
    const playground = document.querySelector(".project-hero-section-playground");

    if (!ball || !playground) return;

    const ballProps = gsap.getProperty(ball);
    const radius = ball.getBoundingClientRect().width / 2;
    const tracker = InertiaPlugin.track(ball, "x,y")[0];

    let vw = playground.clientWidth;
    let vh = playground.clientHeight;

    gsap.defaults({ overwrite: true });

    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      x: vw / 2,
      y: vh / 2
    });

    const draggable = new Draggable(ball, {
      bounds: playground,
      onPress() {
        gsap.killTweensOf(ball);
        this.update();
      },
      onDragEnd: animateBounce,
      onDragEndParams: []
    });

    const resizeHandler = () => {
      vw = playground.clientWidth;
      vh = playground.clientHeight;
    };

    window.addEventListener("resize", resizeHandler);

    function animateBounce(x = "+=0", y = "+=0", vx = "auto", vy = "auto") {
      gsap.fromTo(
        ball,
        { x, y },
        {
          inertia: {
            x: vx,
            y: vy
          },
          onUpdate: checkBounds
        }
      );
    }

    function checkBounds() {
      let r = radius;
      let x = ballProps("x");
      let y = ballProps("y");
      let vx = tracker.get("x");
      let vy = tracker.get("y");
      let xPos = x;
      let yPos = y;

      let hitting = false;

      if (x + r > vw) {
        xPos = vw - r;
        vx *= friction;
        hitting = true;
      } else if (x - r < 0) {
        xPos = r;
        vx *= friction;
        hitting = true;
      }

      if (y + r > vh) {
        yPos = vh - r;
        vy *= friction;
        hitting = true;
      } else if (y - r < 0) {
        yPos = r;
        vy *= friction;
        hitting = true;
      }

      if (hitting) {
        animateBounce(xPos, yPos, vx, vy);
      }
    }

    return () => {
      draggable.kill();
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <section className="project-hero-section">
      <div className="project-hero-section-playground">
        {/* <img
          className="ball"
          src="https://assets.codepen.io/16327/circle.png"
          alt="Bouncing Ball"
        /> */}
        <img
          className="ball"
          src="/ball-white.svg"
          alt="Bouncing Ball"
        />
        <span className="drag-message">*drag ball to play</span>
      </div>
      <div className="project-hero-section-content">
        <h1 className="project-hero-section-title">Our Projects</h1>
        <p className="project-hero-section-description">
          Explore the full spectrum of digital solutions we've crafted — from
          high-converting websites to robust, scalable web applications. Every
          project reflects our team's commitment to innovation, functionality,
          and user-first design. Discover how we turn concepts into impactful
          experiences.
        </p>
      </div>
    </section>
  );
};
