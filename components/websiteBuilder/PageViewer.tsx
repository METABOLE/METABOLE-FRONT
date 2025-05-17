import { useLanguage } from '@/providers/language.provider';
import { Page } from '@/types';
import PageCard from './PageCard';

const PageViewer = ({
  pages,
  handleDeletePage,
}: {
  pages: Page[];
  handleDeletePage: (id: string) => void;
}) => {
  const { isFrench } = useLanguage();
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {pages.map((page, index) => (
        <div
          key={page.id}
          className="absolute top-0 left-0 flex h-full w-full items-center justify-center"
          style={{
            transform: `translate(${-index * 46}px,${index * 10}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          <PageCard
            title={isFrench ? page.title.fr : page.title.en}
            onDelete={() => handleDeletePage(page.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default PageViewer;
