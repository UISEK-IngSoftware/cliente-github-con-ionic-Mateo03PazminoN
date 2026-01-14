import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardSubtitle,
  useIonViewDidEnter,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  useIonAlert
} from '@ionic/react';

import './Tab1.css';
import { useState } from 'react';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, deleteRepository, updateRepository } from '../services/GithubService';
import Repoitem from '../components/Repoitem';
import { trashOutline, createOutline } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [presentAlert] = useIonAlert();

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  };

  useIonViewDidEnter(() => {
    console.log("IonViewDidEnter - Cargando repositorios");
    loadRepos();
  });

  const handleDelete = (repo: RepositoryItem) => {
    presentAlert({
      header: 'Confirmar eliminación',
      message: `¿Eliminar ${repo.name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            if (!repo.owner) {
              presentAlert({ header: 'Error', message: 'No se encontró propietario.', buttons: ['OK'] });
              return;
            }

            // Optimistic update: remove from UI immediately
            const previous = repos;
            setRepos((prev) => prev.filter(r => !(r.owner === repo.owner && r.name === repo.name)));

            try {
              await deleteRepository(repo.owner, repo.name);
              // success: list already updated optimistically
            } catch (err) {
              console.error(err);
              // revert on error
              setRepos(previous);
              presentAlert({ header: 'Error', message: 'No se pudo eliminar el repositorio; los cambios se revirtieron.', buttons: ['OK'] });
            }
          }
        }
      ]
    });
  };

  const handleEdit = (repo: RepositoryItem) => {
    presentAlert({
      header: 'Editar repositorio',
      inputs: [
        { name: 'name', type: 'text', value: repo.name, placeholder: 'Nombre' },
        { name: 'description', type: 'text', value: repo.description ?? '', placeholder: 'Descripción' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (inputData?: { name?: string; description?: string }) => {
            if (!repo.owner) {
              presentAlert({ header: 'Error', message: 'No se encontró propietario.', buttons: ['OK'] });
              return;
            }
            const newName = inputData?.name?.trim();
            const newDesc = inputData?.description ?? undefined;
            if (!newName) {
              presentAlert({ header: 'Error', message: 'El nombre no puede quedar vacío.', buttons: ['OK'] });
              return;
            }

            // Optimistic update: update UI immediately
            const previous = repos;
            setRepos((prev) => prev.map(r => (r.owner === repo.owner && r.name === repo.name) ? { ...r, name: newName, description: newDesc ?? null } : r));

            try {
              await updateRepository(repo.owner, repo.name, { name: newName, description: newDesc });
              presentAlert({ header: 'Éxito', message: 'Repositorio actualizado.', buttons: ['OK'] });
            } catch (err) {
              console.error(err);
              // revert on error
              setRepos(previous);
              presentAlert({ header: 'Error', message: 'No se pudo actualizar; los cambios se revirtieron.', buttons: ['OK'] });
            }
          }
        }
      ]
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
        <IonCardSubtitle>Estos son los Repositorios:</IonCardSubtitle>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repos.map((repo) => (
            <IonItemSliding key={repo.name}>
              <IonItemOptions side="start">
                <IonItemOption color="primary" onClick={() => handleEdit(repo)}>
                  <IonIcon slot="icon-only" icon={createOutline} />
                </IonItemOption>
              </IonItemOptions>

              <Repoitem repo={repo} />

              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => handleDelete(repo)}>
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;