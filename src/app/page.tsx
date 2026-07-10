import Experience from "@/components/canvas/Experience";
import HeroOverlay from "@/components/ui/HeroOverlay";
import ProjectModal from "@/components/ui/ProjectModal";
import Navbar from "@/components/ui/Navbar";
import AboutContinue from "@/components/ui/AboutContinue";
import ContactExitSigns from "@/components/stadium/ContactExitSigns";


export default function Home() {
  return (
    <>
      <Experience />

      <Navbar />

      <HeroOverlay />
            <AboutContinue />


      <ProjectModal />

     
    </>
  );
}