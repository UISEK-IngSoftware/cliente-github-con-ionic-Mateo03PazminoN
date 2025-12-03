import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/react';

import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Estos son los repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
           <IonItem>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://1000marcas.net/wp-content/uploads/2020/01/Android-Logo-2014-1.png" />
            </IonThumbnail>
            <IonLabel>Android-project</IonLabel>
          </IonItem>

          <IonItem>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://1000marcas.net/wp-content/uploads/2020/01/Android-Logo-2014-1.png" />
            </IonThumbnail>
            <IonLabel>Android-project</IonLabel>
          </IonItem>

          <IonItem>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://1000marcas.net/wp-content/uploads/2020/01/Android-Logo-2014-1.png" />
            </IonThumbnail>
            <IonLabel>Android-project</IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://1000marcas.net/wp-content/uploads/2020/01/Android-Logo-2014-1.png" />
            </IonThumbnail>
            <IonLabel>Android-project</IonLabel>
          </IonItem>
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;