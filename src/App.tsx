import { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Navigate, Route } from 'react-router-dom';

import Home from './pages/Home';
import Items from './pages/Items';
import Search from './pages/Search';
import ItemDetail from './pages/ItemDetail';
import type { DeltaItem, FilterState } from './types';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

setupIonicReact();

function getCookie(name: string) {
  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${name}=`));

  if (!cookie) return null;

  return decodeURIComponent(cookie.substring(name.length + 1));
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=10000; SameSite=Lax`;
}

function App() {
  const [objects, setObjects] = useState<DeltaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedChapter, setSelectedChapter] = useState(
    () => getCookie('chapter') || 'All',
  );
  const [selectedMainCategory, setSelectedMainCategory] = useState(
    () => getCookie('mainCategory') || 'All',
  );
  const [selectedWeaponType, setSelectedWeaponType] = useState(
    () => getCookie('weaponType') || 'All',
  );
  const [selectedSource, setSelectedSource] = useState(
    () => getCookie('source') || 'All',
  );

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await fetch('https://dummyjson.com/c/4b8a-e2f2-4895-9df0');

        if (!response.ok) {
          throw new Error('Error carregant els objectes');
        }

        const data: DeltaItem[] = await response.json();
        setObjects(data);
      } catch (loadError) {
        setError("No s'han pogut carregar els objectes");
        console.error(loadError);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  useEffect(() => setCookie('chapter', selectedChapter), [selectedChapter]);
  useEffect(
    () => setCookie('mainCategory', selectedMainCategory),
    [selectedMainCategory],
  );
  useEffect(
    () => setCookie('weaponType', selectedWeaponType),
    [selectedWeaponType],
  );
  useEffect(() => setCookie('source', selectedSource), [selectedSource]);

  const filters: FilterState = {
    selectedChapter,
    setSelectedChapter,
    selectedMainCategory,
    setSelectedMainCategory,
    selectedWeaponType,
    setSelectedWeaponType,
    selectedSource,
    setSelectedSource,
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" element={<Home />} />
          <Route
            path="/items"
            element={
              <Items
                objects={objects}
                loading={loading}
                error={error}
                filters={filters}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search objects={objects} loading={loading} error={error} />
            }
          />
          <Route
            path="/items/:id"
            element={
              <ItemDetail objects={objects} loading={loading} error={error} />
            }
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
