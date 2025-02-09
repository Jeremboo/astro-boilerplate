import { useStore } from '@nanostores/preact';
import { h } from 'preact';
import { useEffect, useMemo } from 'preact/hooks';

import SECTIONS from '~data/sections';
import { setLanguage } from '~store/i18n';
import { $sectionCurrent } from '~store/sections';
import type { Languages, Sections } from '~types/enum';
import type { SectionListProps } from '~types/index';

import PopupError from './PopupError';

type Props = {
  lang: Languages;
};

export default function App({ lang }: Props) {
  const sectionCurrent = useStore($sectionCurrent);

  const dynamicComponent = useMemo(() => SECTIONS[sectionCurrent as Sections] as SectionListProps, [sectionCurrent]);

  useEffect(() => {
    setLanguage(lang);
  }, [lang]);

  return (
    <>
      {
        // NOTE 2023-12-09 jeremboo: The key property is VITAL to be sure the transition it's working
        h(dynamicComponent.component, { key: dynamicComponent.props.sectionName, ...dynamicComponent.props })
      }
      <PopupError />
    </>
  );
}
