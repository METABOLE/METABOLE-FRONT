import { useSearchParams } from 'next/navigation';

const Index = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  return <div>Contact : {type}</div>;
};

export default Index;
