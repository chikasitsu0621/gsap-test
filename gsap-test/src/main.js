import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import "./style.css";

gsap.registerPlugin(MorphSVGPlugin);

const blobPath = document.querySelector("#blobPath");

const shapeIds = [
  "#blobShape01",
  "#blobShape02",
  "#blobShape03",
  "#blobShape04",
];

// 最初の表示形状を、必ず1つ目のshapeに合わせる
const firstShape = document.querySelector(shapeIds[0]);
blobPath.setAttribute("d", firstShape.getAttribute("d"));

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  const tl = gsap.timeline({
    repeat: -1,
  });

  const loopShapes = [
    ...shapeIds.slice(1),
    shapeIds[0],
  ];

  loopShapes.forEach((shape) => {
    tl.to(blobPath, {
      duration: 2.5,
      ease: "sine.inOut",
      morphSVG: {
        shape,
        shapeIndex: "auto",
        type: "rotational",
        curveMode: true,
        smooth: {
          points: 80,
          redraw: true,
        },
        precision: 3,
      },
    });
  });
}