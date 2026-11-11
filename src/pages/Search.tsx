import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import BottomNav from '../components/BottomNav';
import ItemCard from '../components/ItemCard';
import type { DeltaItem } from '../types';

interface Props {
  objects: DeltaItem[];
  loading: boolean;
  error: string;
}

function Search({ objects, loading, error }: Props) {
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();
  const results = objects.filter((item) =>
    Object.values(item).some((value) =>
      String(Array.isArray(value) ? value.join(' ') : value)
        .toLowerCase()
        .includes(normalizedSearch),
    ),
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonSearchbar
          value={search}
          placeholder="Busca un objecte"
          aria-label="Busca un objecte"
          onIonInput={(event) => setSearch(event.detail.value ?? '')}
        />
        {loading && (
          <p>
            <IonSpinner name="crescent" /> Carregant objectes...
          </p>
        )}
        {error && <IonText color="danger">{error}</IonText>}
        {!loading && !error && (
          <>
            <h2>{search ? 'Resultats' : 'Tots els objectes'}</h2>
            {results.length === 0 && <p>No s'han trobat objectes.</p>}
            {results.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </>
        )}
      </IonContent>
      <BottomNav />
    </IonPage>
  );
}

export default Search;
