import WebsiteBuilder from '@/components/WebsiteBuilder';

const Pricing = () => {
  return (
    <section className="px-x-default py-y-default">
      <div className="pt-y-default mx-auto w-full space-y-3 pb-14 text-center md:w-2/3">
        <h1>Website Builder</h1>
        <p className="text-blue p1">En 3 étapes, imaginez le site qui vous ressemble.</p>
        <p className="p2">
          Choisissez le nombre de pages, le style d’animation et les options essentielles. A la fin,
          vous obtenez une estimation claire. Libre à vous de nous contacter pour donner vie à cette
          idée.
        </p>
      </div>
      <WebsiteBuilder />
    </section>
  );
};

export default Pricing;
