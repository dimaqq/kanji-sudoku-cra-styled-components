import React, {useRef, useEffect} from "react";
import styled from "styled-components/macro";
import ulog from "ulog";
const log = ulog("draw");
const SIZE = 100;

const Canvas = () => {
  const ref = useRef();

  const down = event => {
    st.drawing = true;
    //st.x = event.offsetX * st.scale;
    //st.y = event.offsetY * st.scale;
    log.debug(event);
  };

  const move = event => {
    if (st.drawing) {
      let x, y;
      if (event.touches) {
        x = (event.touches[0].pageX - event.touches[0].target.offsetLeft) * st.scale;
        y = (event.touches[0].pageY - event.touches[0].target.offsetTop) * st.scale;
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

  const up = event => {
    st.drawing = false;
    log.debug("up", event);
  };

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const r = canvas.getBoundingClientRect();
      st.scale = SIZE / r.width;
      canvas.addEventListener("touchstart", down);
      canvas.addEventListener("touchmove", move);
      canvas.addEventListener("touchend", up);
      canvas.addEventListener("mousedown", down);
      canvas.addEventListener("mousemove", move);
      canvas.addEventListener("mouseup", up);
    }
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
  }, [move]);
  return <Canvase width={SIZE} height={SIZE} ref={ref}/>;
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
