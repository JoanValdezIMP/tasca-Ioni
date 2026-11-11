import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';

import BottomNav from '../components/BottomNav';
import type { DeltaItem } from '../types';

interface Props {
  objects: DeltaItem[];
  loading: boolean;
  error: string;
}

function ItemDetail({ objects, loading, error }: Props) {
  const { id } = useParams<{ id: string }>();
  const item = objects.find((object) => String(object.id) === id);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/items" />
          </IonButtons>
          <IonTitle>Detall</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {loading && (
          <p>
            <IonSpinner name="crescent" /> Carregant objecte...
          </p>
        )}
        {error && <IonText color="danger">{error}</IonText>}
        {!loading && !error && !item && <p>No s'ha trobat aquest objecte.</p>}
        {!loading && !error && item && (
          <IonCard>
            <img src={item.Image} alt={item.Name} loading="lazy" />
            <IonCardHeader>
              <IonCardTitle>{item.Name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {Object.entries(item)
                .filter(
                  ([key]) =>
                    key !== 'id' && key !== 'Name' && key !== 'Image',
                )
                .map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}: </strong>
                    {Array.isArray(value) ? value.join(', ') : value}
                  </p>
                ))}
              <IonButton expand="block" routerLink="/items">
                Tornar als objectes
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
      <BottomNav />
    </IonPage>
  );
}

export default ItemDetail;
