import { STEPS } from '@/constants/websiteBuilder.constant';
import clsx from 'clsx';
import { useState } from 'react';
import Button from './Button';

const WebsiteBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="grid h-[80vh] w-full grid-cols-2 gap-5 lg:grid-cols-3">
      <div className="col-span-1 flex h-full w-full flex-col gap-5">
        {STEPS.map((step, index) => (
          <div
            key={index}
            className={clsx(
              'border-blue-30 ease-power4-in-out flex h-[78px] flex-col overflow-hidden rounded-3xl border-[1px] bg-[#e9e9fd] p-2.5 backdrop-blur-xl transition-all duration-500',
              activeStep === index ? 'flex-grow p-6' : 'bg-blue-10',
            )}
            onMouseEnter={() => setActiveStep(index)}
          >
            <h3 className="flex items-center gap-2.5">
              <span className="bg-blue p1 flex h-14 w-14 items-center justify-center rounded-[19px] text-white">
                {index + 1}
              </span>
              <span>{step.title}</span>
            </h3>
            <div className="pt-6">{step.description}</div>
            <div className="smoother-y-blue-menu-background shrink overflow-hidden">
              <div className="no-scrollbar h-full shrink-0 overflow-scroll py-6" data-lenis-prevent>
                {step.step}
              </div>
            </div>
            <div className="mt-auto ml-auto pt-6">
              <Button className="shrink-0" color="secondary">
                Suivant
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-blue-30 col-span-1 h-full w-full shrink-0 rounded-3xl border-[1px] bg-[#e9e9fd] backdrop-blur-xl lg:col-span-2"></div>
    </div>
  );
};

export default WebsiteBuilder;
