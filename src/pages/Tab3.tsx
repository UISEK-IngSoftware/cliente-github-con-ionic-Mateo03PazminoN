import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';


const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil del usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt="Silhouette of mountains" src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Harry_Potter_character_poster.jpg/250px-Harry_Potter_character_poster.jpg" />
      <IonCardHeader>
        <IonCardTitle>Mateo Pazmiño</IonCardTitle>
        <IonCardSubtitle>Mateo03PazminoN</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Soy un desarrollador de software apasionado a la tegnologia y a la magia</IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
