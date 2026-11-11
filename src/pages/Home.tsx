import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import BottomNav from '../components/BottomNav';

function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Objectes de Deltarune</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h1>Benvingut a Deltarune Items</h1>
        <p>Explora els objectes i consulta tota la seva informació.</p>
        <IonButton expand="block" routerLink="/items">
          Veure objectes
        </IonButton>
      </IonContent>
      <BottomNav />
    </IonPage>
  );
}

export default Home;
