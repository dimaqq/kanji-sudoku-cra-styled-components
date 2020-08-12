import React, {useRef, useEffect, useLayoutEffect} from "react";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components/macro";
import {filename} from "paths.macro";
import ulog from "ulog";
const log = ulog(filename);  // eslint-disable-line no-unused-vars
const SIZE = 1000;

const Canvas = ({id}) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const tile = useSelector(state => state.tiles[id]);

  const down = event => {
    event.preventDefault();
    st.drawing = true;
    //st.x = event.offsetX * st.scale;
    //st.y = event.offsetY * st.scale;
    log.debug(event);
  };
  const up = event => {
    event.preventDefault();
    st.drawing = false;
    log.debug("up", event);
  };

  useEffect(() => {
    const canvas = ref.current;
    return () => {
      dispatch({type: "SAVE_TILE", id, data: canvas.toDataURL()});
    };
  }, [ref, dispatch, id]);

  const erase = () => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useLayoutEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = tile;
    ctx.drawImage(img, 0, 0);

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
  }, [ref, tile]);
  return <>
    <Canvase width={SIZE} height={SIZE} ref={ref}/>
    <Button onClick={erase}>Erase</Button>
  </>;
};

export default Canvas;

Canvas.propTypes = {id: PropTypes.number.isRequired};

const movezz = (event, ref) => {
  event.preventDefault();
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
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, 30, 30);
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

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;
