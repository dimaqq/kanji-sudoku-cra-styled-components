import React, {useRef, useLayoutEffect} from "react";
import styled from "styled-components/macro";
import {filename} from "paths.macro";
import ulog from "ulog";
const log = ulog(filename);  // eslint-disable-line no-unused-vars
const SIZE = 1000;

const Canvas = () => {
  const ref = useRef();

  const down = event => {
    st.drawing = true;
    //st.x = event.offsetX * st.scale;
    //st.y = event.offsetY * st.scale;
    log.debug(event);
  };
  const up = event => {
    st.drawing = false;
    log.debug("up", event);
  };

  useLayoutEffect(() => {
    const canvas = ref.current;
    const move = e => movezz(e, ref);
    const r = canvas.getBoundingClientRect();
    st.scale = SIZE / r.width;
    canvas.addEventListener("touchstart", down);
    canvas.addEventListener("touchmove", move);
    canvas.addEventListener("touchend", up);
    canvas.addEventListener("mousedown", down);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", up);

    return () => {
      if (canvas) {
        canvas.removeEventListener("touchstart", down);
        canvas.removeEventListener("touchmove", move);
        canvas.removeEventListener("touchend", up);
        canvas.removeEventListener("mousedown", down);
        canvas.removeEventListener("mousemove", move);
        canvas.removeEventListener("mouseup", up);
      }
      st.drawing = false;
    };
  }, [ref]);
  return <Canvase width={SIZE} height={SIZE} ref={ref}/>;
};

export default Canvas;

const movezz = (event, ref) => {
  if (st.drawing) {
    let x, y;
    if (event.touches) {
      const t = event.touches[0];
      x = (t.pageX - t.target.offsetLeft) * st.scale;
      y = (t.pageY - t.target.offsetTop) * st.scale;
    }
    else {
      x = event.offsetX * st.scale;
      y = event.offsetY * st.scale;
    }
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, 3, 3);
    st.x = x;
    st.y = y;
  }
};


const st = {
  drawing: false,
  x: 0,
  y: 0,
  scale: 1,
};

const Canvase = styled.canvas`
  cursor: crosshair;
  position: absolute;
  width: 100%;
  height: 100%;
`;
