.star {
  position: fixed;
  z-index: 2;
  color: white;
  font-size: 1rem;
  animation-duration: 1500ms;
  animation-fill-mode: forwards;
  pointer-events: none;
}

@keyframes fall-1 {
  0% {
    transform: translate(0px, 0px) rotateX(45deg) rotateY(30deg) rotateZ(0deg)
      scale(0.25);
    opacity: 0;
  }

  5% {
    transform: translate(10px, -10px) rotateX(45deg) rotateY(30deg) rotateZ(
        0deg
      )
      scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(25px, 200px) rotateX(180deg) rotateY(270deg) rotateZ(
        90deg
      )
      scale(1);
    opacity: 0;
  }
}

@keyframes fall-2 {
  0% {
    transform: translate(0px, 0px) rotateX(-20deg) rotateY(10deg) scale(0.25);
    opacity: 0;
  }

  10% {
    transform: translate(-10px, -5px) rotateX(-20deg) rotateY(10deg) scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(-10px, 160px) rotateX(-90deg) rotateY(45deg) scale(
        0.25
      );
    opacity: 0;
  }
}

@keyframes fall-3 {
  0% {
    transform: translate(0px, 0px) rotateX(0deg) rotateY(45deg) scale(0.5);
    opacity: 0;
  }

  15% {
    transform: translate(7px, 5px) rotateX(0deg) rotateY(45deg) scale(1);
    opacity: 1;
  }

  100% {
    transform: translate(20px, 120px) rotateX(-180deg) rotateY(-90deg) scale(
        0.5
      );
    opacity: 0;
  }
}
