export const setupTitleChanger = ({ isFrench }: { isFrench: boolean }) => {
  const defaultTitle = 'Metabole Studio';
  const alternateTitles = isFrench
    ? ['🔥 Revenez-nous voir !', '✨ Metabole vous attend...']
    : ['🔥 Come back to see us!', '✨ Metabole is waiting for you...'];

  let titleIndex = 0;
  let intervalId: number | null = null;

  const changeTitle = () => {
    titleIndex = titleIndex === 0 ? 1 : 0;
    document.title = alternateTitles[titleIndex];
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      const [firstTitle] = alternateTitles;
      document.title = firstTitle;
      intervalId = window.setInterval(changeTitle, 1500);
    } else {
      document.title = defaultTitle;
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  });
};
