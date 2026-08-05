import { useEffect } from 'react';

export function usePageMeta(title, description) {
  useEffect(() => {
    const defaultTitle = document.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const defaultDescription = descriptionTag?.getAttribute('content');

    document.title = title;
    if (description && descriptionTag) descriptionTag.setAttribute('content', description);

    return () => {
      document.title = defaultTitle;
      if (defaultDescription && descriptionTag) descriptionTag.setAttribute('content', defaultDescription);
    };
  }, [title, description]);
}
