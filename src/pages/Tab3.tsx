import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';
import { useState } from 'react';
import { UserInfo } from '../interfaces/UserInfo';
import { getUserInfo } from '../services/GithubService';
import { logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import AuthService from '../services/AuthService';
import LoadingSpinner from '../components/LoadingSpinner';


const Tab3: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const history = useHistory();

  const loadUserInfo = async () => {
    setLoading(true);
    try {
      const info = await getUserInfo();
      setUserInfo(info);
    } catch (error) {
      console.error("Error cargando perfil", error);
    } finally {
      setLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  })

  const handleLogout = async () => {
    setLoading(true); 
    try {
      await AuthService.logout();
      history.replace('/login');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setLoading(false); 
    }
  }

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
        
        {userInfo && (
          <IonCard>
            <img alt={userInfo?.name} src={userInfo?.avatar_url} />
            <IonCardHeader>
              <IonCardTitle>{userInfo?.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{userInfo?.bio}</IonCardContent>
          </IonCard>
        )}

        <IonButton expand="block" color="danger" onClick={handleLogout} disabled={loading}>
          <IonIcon slot="start" icon={logOutOutline} />
          {loading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
        </IonButton>
      </IonContent>
      <LoadingSpinner isOpen={loading} />
    </IonPage>
  );
};

export default Tab3;
