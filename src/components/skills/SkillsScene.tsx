"use client";

import SkillPlatform from "./SkillPlatform";
import { skills } from "@/data/skills";
import { useCameraStore } from "@/store/useCameraStore";

export default function SkillsScene() {
  const entered = useCameraStore((s) => s.entered);
  const currentView = useCameraStore(
    (s) => s.currentView
  );

  const visible =
    entered &&
    currentView === "skills";

  return (
    <group visible={visible}     position={[0, 0, -35]}>
      {skills.map((skill) => (
        <SkillPlatform
          key={skill.id}
          name={skill.name}
          color={skill.color}
          position={skill.position}
        />
      ))}
    </group>
  );
}