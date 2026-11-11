import {
  IonButton,
  IonButtons,
  IonFooter,
  IonToolbar,
} from '@ionic/react';

function BottomNav() {
  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons>
          <IonButton routerLink="/home">Home</IonButton>
          <IonButton routerLink="/items">Items</IonButton>
          <IonButton routerLink="/search">Search</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
}

export default BottomNav;
