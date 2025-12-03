import { IonLabel, IonItem, IonThumbnail

 } from '@ionic/react';
import './Repoitem.css';

interface RepoProps {
  name: string;
  imageUrl: string;
}

const Repoitem: React.FC<RepoProps> = ({ name, imageUrl }) => {
  return (
    <IonItem>
        <IonThumbnail slot="start">
            <img src={imageUrl} alt={name} />
        </IonThumbnail>
        <IonLabel>{name}</IonLabel>
    </IonItem>
  );
};

export default Repoitem;
