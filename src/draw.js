import React, {useRef, useEffect, useLayoutEffect} from "react";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components/macro";
import {stroke, defaultBrushConfig} from "croquis.js/lib/brush/simple";
import {getStroke} from "croquis.js/lib/stabilizer/pulled-string";
import {getStylusState} from "croquis.js/lib/stylus";
import {filename} from "paths.macro";
import ulog from "ulog";
const log = ulog(filename);  // eslint-disable-line no-unused-vars
const SIZE = 1000;

const Canvas = ({id}) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const tile = useSelector(state => state.tiles[id]);

  const down = event => downzz(event, ref);
  const up = event => upzz(event, ref);

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
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);

    return () => {
      if (canvas) {
        canvas.removeEventListener("pointerdown", down);
        canvas.removeEventListener("pointermove", move);
        canvas.removeEventListener("pointerup", up);
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

const downzz = (event, ref) => {
  event.preventDefault();
  st.drawing = true;
  const ctx = ref.current.getContext("2d");
  const stylusState = getStylusState(translate(event));
  st.pull = getStroke(stroke).down({
    stringLength: 50,
    targetConfig: {...defaultBrushConfig, ctx, size: 100, color: "red"},
  }, stylusState);
};

const normalise_pressure = p => {
  return p<.5?.5:p;
};

const translate = src => {
  const dst = {};
  dst.x = src.offsetX * st.scale;
  dst.y = src.offsetY * st.scale;
  dst.pressure = normalise_pressure(src.pressure);
  dst.tangentialPressure = src.tangentialPressure;
  dst.tiltX = src.tiltX;
  dst.tiltY = src.tiltY;
  dst.twist = src.twist;
  return dst;
};

const upzz = (event, ref) => {
  event.preventDefault();
  void(ref);
  st.pull.up(translate(event));
  st.pull = undefined;
  st.drawing = false;
};

const movezz = (event) => {
  event.preventDefault();
  if (st.drawing) {
    st.pull.move(translate(event));
  }
};

const st = {
  drawing: false,
  scale: 1,
  pull: undefined,
};

const Canvase = styled.canvas`
  cursor: crosshair;
  position: absolute;
  width: 100%;
  height: 100%;
  touch-action: none;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;
