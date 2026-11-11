import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from '@ionic/react';

import BottomNav from '../components/BottomNav';
import ItemCard from '../components/ItemCard';
import type { DeltaItem, FilterState } from '../types';
import FilterButtons from '../components/FilterButtons';

interface Props {
  objects: DeltaItem[];
  loading: boolean;
  error: string;
  filters: FilterState;
}

function filterItems(
  items: DeltaItem[],
  chapter: string,
  mainCategory: string,
  weaponType: string,
  source: string,
) {
  return items.filter((item) => {
    const matchChapter = chapter === 'All' || item.Chapter === chapter;
    const matchMainCategory =
      mainCategory === 'All' ||
      (mainCategory === 'Weapon'
        ? item.Category.startsWith('Weapon-')
        : item.Category === mainCategory);
    const matchWeaponType =
      mainCategory !== 'Weapon' ||
      weaponType === 'All' ||
      item.Category === `Weapon-${weaponType}`;
    const itemSources = Array.isArray(item.Source)
      ? item.Source
      : item.Source.split(',').map((itemSource) => itemSource.trim());
    const matchSource =
      source === 'All' ||
      itemSources.some((itemSource) =>
        itemSource.toLowerCase().includes(source.toLowerCase()),
      );

    return (
      matchChapter && matchMainCategory && matchWeaponType && matchSource
    );
  });
}

function Items({ objects, loading, error, filters }: Props) {
  const filteredItems = filterItems(
    objects,
    filters.selectedChapter,
    filters.selectedMainCategory,
    filters.selectedWeaponType,
    filters.selectedSource,
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Objectes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <FilterButtons objects={objects} filters={filters} />
        {loading && (
          <p>
            <IonSpinner name="crescent" /> Carregant objectes...
          </p>
        )}
        {error && <IonText color="danger">{error}</IonText>}
        {!loading && !error && filteredItems.length === 0 && (
          <p>No s'han trobat objectes amb aquests filtres.</p>
        )}
        {!loading &&
          !error &&
          filteredItems.map((item) => <ItemCard key={item.id} item={item} />)}
      </IonContent>
      <BottomNav />
    </IonPage>
  );
}

export default Items;
