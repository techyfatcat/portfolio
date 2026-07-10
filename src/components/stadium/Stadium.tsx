"use client";

import AdvertisingBoards from "@components/world/AdvertisingBoards";
import CornerFlags from "./CornerFlags";
import Entrance from "./Entrance";
import Goals from "./Goals";
import LEDRibbon from "./LEDRibbon";
import Pitch from "./Pitch";
import Roof from "./Roof";
import RoofSupports from "./RoofSupports";
import Seats from "./Seats";
import SeatSection from "./SeatSection";
import Stairs from "./Stairs";
import Stands from "./Stands";
import Jumbotron from "@components/world/Jumbotron";
import { projects } from "@/data/projects";

export default function Stadium() {
  return (
    <group>
      <Pitch />
      <Goals />
      <RoofSupports />
      <Roof />
      
      <Stands />

     <Jumbotron
    position={[64.2, 1.9, 0]}
    rotation={[0.00, -Math.PI / 2, 0]}
    width={15}
    height={8.5}
    projects={projects}
/>
     
    </group>
  );
}