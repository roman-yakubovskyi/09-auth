import { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: `404 - Page not found`,
    description: 'The page you are looking for does not exist.',
    siteName: 'NoteHub',
    images: [
      {
        url: 'notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `NoteHub picture`,
      },
    ],
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
