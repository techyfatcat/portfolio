"use client";

import Stand from "./Stand";
import { PITCH_LENGTH, PITCH_WIDTH, STAND_OFFSET_Z, STAND_OFFSET_X } from "@components/lib/stadiumLayout";

const LENGTH = 105;
const WIDTH = 68;
const CLEARANCE = 12;

export default function Stands() {
  return (
    <>
      <Stand position={[0, 0, STAND_OFFSET_Z]} rotation={[0, 0, 0]} length={PITCH_LENGTH + 30} />
      <Stand position={[0, 0, -STAND_OFFSET_Z]} rotation={[0, Math.PI, 0]} length={PITCH_LENGTH + 30} />
      <Stand position={[STAND_OFFSET_X, 0, 0]} rotation={[0, -Math.PI / 2, 0]} length={PITCH_WIDTH + 30} />
      <Stand position={[-STAND_OFFSET_X, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={PITCH_WIDTH + 30} />
    </>
  );
}
