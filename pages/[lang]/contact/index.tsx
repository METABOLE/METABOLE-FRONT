import ContactForm from '@/components/ContactForm';
import { CONTACT } from '@/constants';
import { useLanguage } from '@/providers/language.provider';

const ContactPage = () => {
  const { isFrench } = useLanguage();

  return (
    <div className="px-x-default py-y-double-default gap-x-x-default gap-y-default grid md:grid-cols-2 md:grid-rows-2 md:gap-y-0">
      <div>
        <h1>
          {isFrench ? (
            <>
              Un <span className="text-blue">projet</span> ou une{' '}
              <span className="text-blue">question</span> ?
            </>
          ) : (
            <>
              A <span className="text-blue">project</span> or a{' '}
              <span className="text-blue">question</span>?
            </>
          )}
        </h1>
        <h3 className="h3 max-w-xl pt-6">
          {isFrench ? (
            <>
              Partagez-nous les grandes lignes via le formulaire ci-dessous.{' '}
              <strong>On revient vers vous sous 48h</strong> pour faire avancer les choses ensemble.
            </>
          ) : (
            <>
              Share the key details with us using the form below.{' '}
              <strong>We’ll get back to you within 48 hours</strong> to move forward together.
            </>
          )}
        </h3>
      </div>
      <ContactForm className="row-span-2" />
      <div className="mt-auto">
        <h3 className="block md:hidden">
          {isFrench ? 'Ou sinon, directement ici :' : 'Or directly here :'}
        </h3>
        <p className="text-black-30 pt-12 uppercase">MAIL : </p>
        <a className="pt-2" href={'mailto:' + CONTACT.EMAIL}>
          {CONTACT.EMAIL}
        </a>
        <p className="text-black-30 pt-6 uppercase">TELEPHONE : </p>
        <a className="pt-2" href={'tel:' + CONTACT.PHONE}>
          {CONTACT.PHONE}
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
