import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';

import type { DeltaItem } from '../types';

interface Props {
  item: DeltaItem;
}

function ItemCard({ item }: Props) {
  const source = Array.isArray(item.Source)
    ? item.Source.join(', ')
    : item.Source;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{item.Name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{item.Chapter}</p>
        <p>{item.Category}</p>
        <p>{source}</p>
        <img src={item.Image} alt={item.Name} loading="lazy" />
        <IonButton expand="block" routerLink={`/items/${item.id}`}>
          Veure detall
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export default ItemCard;
