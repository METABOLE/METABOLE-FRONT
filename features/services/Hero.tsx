import { IconCross } from '@/components/ui/Icons';
import ScrollButton from '@/components/ui/ScrollButton';
import ScrollingContainer from '@/components/ui/ScrollingContainer';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const { contextSafe } = useGSAP();

  return (
    <section className="pt-y-double-default gap-y-y-default pb-y-default flex min-h-screen w-screen flex-col justify-between">
      <ScrollingContainer scrollSpeed={15}>
        <div className="flex shrink-0 flex-row gap-x-7 pl-7">
          <h1 className="text-blue !text-[70px] !leading-normal md:!text-[120px]">SERVICES</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
          <h1 className="!text-[70px] !leading-normal text-black md:!text-[120px]">SERVICES</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
          <h1 className="text-blue !text-[70px] !leading-normal md:!text-[120px]">SERVICES</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
          <h1 className="!text-[70px] !leading-normal text-black md:!text-[120px]">SERVICES</h1>
          <div className="flex flex-col justify-between">
            <IconCross color={COLORS.BLUE} />
            <IconCross color={COLORS.BLUE} />
          </div>
        </div>
      </ScrollingContainer>
      <div className="px-x-default">
        <div className="md:pl-[10vw]">
          <h2 className="relative w-[60vw] md:w-[50vw]">
            <IconCross
              className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
              color={COLORS.BLUE}
            />
            Metabole est un <span className="text-blue">studio créatif</span> qui conçoit des{' '}
            <span className="text-blue">expériences intéractives</span> et
            <span className="text-blue">performantes</span>.
          </h2>
        </div>
      </div>
      <div className="px-x-default">
        <div className="md:pr-[5vw]">
          <p className="p2 relative ml-auto w-[60vw] md:w-[40vw]">
            <IconCross
              className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
              color={COLORS.BLUE}
            />
            En mettant l’accent sur <span className="text-blue">l’esthétique</span> et{' '}
            <span className="text-blue">l’accessibilité</span>, nous imaginons des interfaces
            fluides et <span className="text-blue">innovantes</span>, pensées pour{' '}
            <span className="text-blue">évoluer</span> avec les besoins de demain.
          </p>
        </div>
      </div>
      <div className="px-x-default flex justify-center">
        <ScrollButton />
      </div>
    </section>
  );
};

export default Hero;
