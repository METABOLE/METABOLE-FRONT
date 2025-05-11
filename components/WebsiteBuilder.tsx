const STEPS = [
  {
    title: 'Pages du site',
    description: (
      <p>
        <span className="text-black">Combien de pages pour raconter votre histoire ?</span>
        <br />
        <span className="text-black-30">
          Ajoutez et supprimez des pages en fonction de vos besoins. Vous pouvez nommer vos pages
          pour vous repérer
        </span>
      </p>
    ),
  },
  {
    title: 'Type d’animations',
    description:
      'Combien de pages pour raconter votre histoire ? Ajoutez et supprimez des pages en fonction de vos besoins. Vous pouvez nommer vos pages pour vous repérer',
  },
  {
    title: 'Options',
    description: (
      <p>
        <span className="text-black">Fonctionnalités, modules, intégrations.</span>
        <br />
        <span className="text-black-30">
          Blog, formulaire, multilingue, carte, CMS… cochez ce dont vous avez besoin. Tout est pensé
          pour vous simplifier la vie sans compromettre l'esthétique.
        </span>
      </p>
    ),
  },
];

const WebsiteBuilder = () => {
  return (
    <div className="grid h-[70vh] w-full grid-cols-3 gap-5">
      <div className="col-span-1 flex h-full w-full flex-col gap-5">
        {STEPS.map((step, index) => (
          <div
            key={index}
            className="bg-menu-background border-blue-30 flex h-[78px] flex-col overflow-hidden rounded-3xl border-[1px] p-2.5 backdrop-blur-xl transition-all hover:h-auto hover:p-6"
          >
            <div className="flex items-center gap-2.5">
              <span className="bg-blue p1 flex h-14 w-14 items-center justify-center rounded-[19px] text-white">
                {index + 1}
              </span>
              <h3 className="">{step.title}</h3>
            </div>
            <div className="pt-6">
              <div>{step.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-menu-background border-blue-30 col-span-2 h-full w-full rounded-3xl border-[1px] backdrop-blur-xl"></div>
    </div>
  );
};

export default WebsiteBuilder;
