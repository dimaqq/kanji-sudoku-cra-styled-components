import React, {useRef, useEffect} from "react";
import styled from "styled-components/macro";
import ulog from "ulog";
const log = ulog("draw");
const SIZE = 100;

const Canvas = () => {
  const ref = useRef();
  const click = event => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 15, 15);
    log.debug(event);
  };

  const down = event => {
    st.drawing = true;
    st.x = event.offsetX * st.scale;
    st.y = event.offsetY * st.scale;
  };

  const move = event => {
    const x = event.offsetX * st.scale;
    const y = event.offsetY * st.scale;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(st.x, st.y, x, y);
    st.x = x;
    st.y = y;
  };

  const up = event => {
    st.drawing = false;
    log.debug("up", event);
  };

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const r = canvas.getBoundingClientRect();
      st.scale = SIZE / r.width;
      canvas.addEventListener("mousedown", down);
      canvas.addEventListener("mousemove", move);
      canvas.addEventListener("mouseup", up);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", down);
        canvas.removeEventListener("mousemove", move);
        canvas.removeEventListener("mouseup", up);
      }
      st.drawing = false;
    };
  }, [move]);
  return <Canvase width={SIZE} height={SIZE} ref={ref} onClick={click}/>;
};

export default Canvas;

const st = {
  drawing: false,
  x: 0,
  y: 0,
  scale: 1,
};

const Canvase = styled.canvas`
  flex: auto;
  cursor: crosshair;
`;