import Image from 'next/image';

const BackgroundStatic = () => {
  return (
    <Image
      alt="Background"
      className="fixed inset-0 -z-10 h-screen w-screen object-cover opacity-50"
      height={883}
      src="/images/background.svg"
      width={1440}
    />
  );
};

export default BackgroundStatic;
