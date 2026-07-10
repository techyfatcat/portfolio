"use client";

import Goal from "./Goal";
import { GOAL_LINE_X } from "@components/lib/stadiumLayout";

export default function Goals() {
  return (
    <>
      <Goal position={[GOAL_LINE_X, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Goal position={[-GOAL_LINE_X, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </>
  );
}