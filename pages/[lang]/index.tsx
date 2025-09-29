import FloatingHalo from '@/components/shared/FloatingHalo';
import Hero from '@/features/home/Hero';
import Philosophy from '@/features/home/Philosophy';
import Expertise from '@/features/shared/expertise/Expertise';
import Faq from '@/features/shared/Faq';
import Timeline from '@/features/shared/timeline/Timeline';
import Us from '@/features/team/Us';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <FloatingHalo
        className="pointer-events-none absolute top-0 left-full -z-10 h-[150vw] w-[150vw] opacity-40"
        from="#1b17ee"
        to="#f1f2ff00"
      />
      <Hero />
      <Philosophy />
      <Expertise />
      <Timeline />
      <Us />
      {/* <TrustedBy /> */}
      <Faq />
    </div>
  );
}
