import { useEffect } from 'react';
import {
  IonItem,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

import type { DeltaItem, FilterState } from '../types';

interface Props {
  objects: DeltaItem[];
  filters: FilterState;
}

function FilterButtons({ objects, filters }: Props) {
  const {
    selectedChapter,
    setSelectedChapter,
    selectedMainCategory,
    setSelectedMainCategory,
    selectedWeaponType,
    setSelectedWeaponType,
    selectedSource,
    setSelectedSource,
  } = filters;

  const allChapters = [
    ...new Set(objects.map((item) => item.Chapter).filter(Boolean)),
  ];
  const allMainCategories = [
    ...new Set(
      objects
        .map((item) =>
          item.Category.startsWith('Weapon-') ? 'Weapon' : item.Category,
        )
        .filter(Boolean),
    ),
  ];
  const allWeaponTypes = [
    ...new Set(
      objects
        .filter((item) => item.Category.startsWith('Weapon-'))
        .map((item) => item.Category.replace('Weapon-', ''))
        .filter(Boolean),
    ),
  ];
  const allSources = [
    'Shop',
    'Malius',
    'Forest',
    'Castle',
    'Cyber',
    'Sanctuary',
    'Default',
  ];

  function matchesSource(item: DeltaItem, source: string) {
    const itemSources = Array.isArray(item.Source)
      ? item.Source
      : item.Source.split(',').map((itemSource) => itemSource.trim());

    return (
      source === 'All' ||
      itemSources.some((itemSource) =>
        itemSource.toLowerCase().includes(source.toLowerCase()),
      )
    );
  }

  function matchesFilters(
    item: DeltaItem,
    selected: {
      chapter: string;
      mainCategory: string;
      weaponType: string;
      source: string;
    },
  ) {
    const itemMainCategory = item.Category.startsWith('Weapon-')
      ? 'Weapon'
      : item.Category;

    return (
      (selected.chapter === 'All' || item.Chapter === selected.chapter) &&
      (selected.mainCategory === 'All' ||
        itemMainCategory === selected.mainCategory) &&
      (selected.weaponType === 'All' ||
        selected.mainCategory !== 'Weapon' ||
        item.Category === `Weapon-${selected.weaponType}`) &&
      matchesSource(item, selected.source)
    );
  }

  const availableChapters = allChapters.filter((chapter) =>
    objects.some((item) =>
      matchesFilters(item, {
        chapter,
        mainCategory: selectedMainCategory,
        weaponType: selectedWeaponType,
        source: selectedSource,
      }),
    ),
  );
  const availableMainCategories = allMainCategories.filter((category) =>
    objects.some((item) =>
      matchesFilters(item, {
        chapter: selectedChapter,
        mainCategory: category,
        weaponType: category === 'Weapon' ? selectedWeaponType : 'All',
        source: selectedSource,
      }),
    ),
  );
  const availableWeaponTypes = allWeaponTypes.filter((type) =>
    objects.some((item) =>
      matchesFilters(item, {
        chapter: selectedChapter,
        mainCategory: 'Weapon',
        weaponType: type,
        source: selectedSource,
      }),
    ),
  );
  const availableSources = allSources.filter((source) =>
    objects.some((item) =>
      matchesFilters(item, {
        chapter: selectedChapter,
        mainCategory: selectedMainCategory,
        weaponType: selectedWeaponType,
        source,
      }),
    ),
  );

  useEffect(() => {
    if (objects.length === 0) return;

    if (
      selectedChapter !== 'All' &&
      !availableChapters.includes(selectedChapter)
    ) {
      setSelectedChapter('All');
    }
    if (
      selectedMainCategory !== 'All' &&
      !availableMainCategories.includes(selectedMainCategory)
    ) {
      setSelectedMainCategory('All');
    }
    if (
      selectedWeaponType !== 'All' &&
      !availableWeaponTypes.includes(selectedWeaponType)
    ) {
      setSelectedWeaponType('All');
    }
    if (
      selectedSource !== 'All' &&
      !availableSources.includes(selectedSource)
    ) {
      setSelectedSource('All');
    }
  }, [
    objects,
    selectedChapter,
    selectedMainCategory,
    selectedWeaponType,
    selectedSource,
    availableChapters,
    availableMainCategories,
    availableWeaponTypes,
    availableSources,
    setSelectedChapter,
    setSelectedMainCategory,
    setSelectedWeaponType,
    setSelectedSource,
  ]);

  return (
    <>
      <IonItem>
        <IonSelect
          label="Filtra per capítol"
          labelPlacement="stacked"
          value={selectedChapter}
          onIonChange={(event) =>
            setSelectedChapter(event.detail.value ?? 'All')
          }
        >
          <IonSelectOption value="All">All</IonSelectOption>
          {availableChapters.map((chapter) => (
            <IonSelectOption key={chapter} value={chapter}>
              {chapter}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonSelect
          label="Filtra per categoria principal"
          labelPlacement="stacked"
          value={selectedMainCategory}
          onIonChange={(event) =>
            setSelectedMainCategory(event.detail.value ?? 'All')
          }
        >
          <IonSelectOption value="All">All</IonSelectOption>
          {availableMainCategories.map((category) => (
            <IonSelectOption key={category} value={category}>
              {category}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      {selectedMainCategory === 'Weapon' && (
        <IonItem>
          <IonSelect
            label="Filtra per tipus d'arma"
            labelPlacement="stacked"
            value={selectedWeaponType}
            onIonChange={(event) =>
              setSelectedWeaponType(event.detail.value ?? 'All')
            }
          >
            <IonSelectOption value="All">All</IonSelectOption>
            {availableWeaponTypes.map((type) => (
              <IonSelectOption key={type} value={type}>
                {type}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      )}

      <IonItem>
        <IonSelect
          label="Filtra per llocs"
          labelPlacement="stacked"
          value={selectedSource}
          onIonChange={(event) => setSelectedSource(event.detail.value ?? 'All')}
        >
          <IonSelectOption value="All">All</IonSelectOption>
          {availableSources.map((source) => (
            <IonSelectOption key={source} value={source}>
              {source}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </>
  );
}

export default FilterButtons;
