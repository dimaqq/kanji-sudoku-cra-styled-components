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

//const foo = getStroke(stroke);  // FIXME

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
  //const xevent = new event.constructor(event.type, event, {x, y});

  const stylusState = getStylusState(translate(event));
  //st.foo = stroke.down({ctx, size: 10, color: "black"}, stylusState);
  st.poo = getStroke(stroke).down({
    stringLength: 100,
    targetConfig: {...defaultBrushConfig, ctx, size: 100, color: "red"},
  }, stylusState);
};

const translate = src => {
  const dst = {};
  dst.x = src.offsetX * st.scale;
  dst.y = src.offsetY * st.scale;
  dst.pressure = src.pressure;
  dst.tangentialPressure = src.tangentialPressure;
  dst.tiltX = src.tiltX;
  dst.tiltY = src.tiltY;
  dst.twist = src.twist;
  return dst;
};

const upzz = (event, ref) => {
  event.preventDefault();
  void(ref);
  //st.foo.up(event);
  st.poo.up(translate(event));
  //st.foo = undefined;
  st.poo = undefined;
  st.drawing = false;
};

const movezz = (event, ref) => {
  event.preventDefault();
  if (st.drawing) {
    const x = event.offsetX * st.scale;
    const y = event.offsetY * st.scale;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(x, y, 30, 30);
    st.x = x;
    st.y = y;

    //st.foo.move(event);
    st.poo.move(translate(event));
  }
};


const st = {
  drawing: false,
  x: 0,
  y: 0,
  scale: 1,
  //foo: undefined,
  poo: undefined,
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
