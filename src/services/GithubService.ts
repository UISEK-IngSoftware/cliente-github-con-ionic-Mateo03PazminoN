import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";
import AuthService from "./AuthService";

// Tipo mínimo para mapear la respuesta parcial de la API de GitHub
interface GithubRepo {
    name: string;
    description: string | null;
    owner?: {
        avatar_url?: string | null;
        login?: string | null;
    } | null;
    language?: string | null;
}

const GITHUB_API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use((config) => {
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get(`user/repos`, {
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation: "owner"
            }
        });

        const data = response.data as GithubRepo[];
        const repositories: RepositoryItem[] = data.map((repo) => ({
            name: repo.name,
            description: repo.description ?? null,
            imageUrl: repo.owner?.avatar_url ?? null,
            owner: repo.owner?.login ?? null,
            language: repo.language ?? null,
        }));
        return repositories;
    } catch (error){
        console.error("Hubo un error al obtener repositorios", error);
        return [];
    }
}

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try{
        const response = await githubApi.post(`user/repos`, repo);
        console.log("Repositorio ingresado", response.data);                        
    }catch (error) {
        console.error("Error al crear repositorio", error);
    }
};

export const getUserInfo = async () : Promise<UserInfo> => {
    try {
        const response = await githubApi.get(`/user`);
        return response.data as UserInfo;

    } catch (error) {
        console.error("Error al obtener información del ususario", error);
        const userNotFound : UserInfo = {
            login: "undefined",
            name: "Usuario no encontrado",
            bio: "No se pudo obtener la información del usuario",
            avatar_url: "https://cdn-icons-png.flaticon.com/512/17450/17450410.png"
        }
        return userNotFound;
    }
};

// --- Nuevas funciones añadidas para PUT (PATCH) y DELETE ---

/**
 * Actualiza un repositorio existente. GitHub usa PATCH para actualizaciones parciales.
 * @param owner El login del propietario del repositorio.
 * @param repoName El nombre actual del repositorio.
 * @param newData Los datos a actualizar (ej: { name: 'nuevo-nombre', description: 'desc' })
 */
export const updateRepository = async (owner: string, repoName: string, newData: { name?: string, description?: string }): Promise<RepositoryItem | null> => {
    try {
        // La URL de GitHub para editar es /repos/{owner}/{repo}
        const response = await githubApi.patch(`/repos/${owner}/${repoName}`, newData);
        console.log("Repositorio actualizado", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar repositorio", error);
        throw error; // Es mejor relanzar el error para manejarlo en la UI
    }
};

/**
 * Elimina un repositorio existente.
 * @param owner El login del propietario del repositorio.
 * @param repoName El nombre del repositorio a eliminar.
 */
export const deleteRepository = async (owner: string, repoName: string): Promise<void> => {
    try {
        // La URL de GitHub para eliminar es /repos/{owner}/{repo}
        await githubApi.delete(`/repos/${owner}/${repoName}`);
        console.log(`Repositorio ${repoName} eliminado con éxito.`);
    } catch (error) {
        console.error("Error al eliminar repositorio", error);
        throw error; // Relanzar para manejo en la UI
    }
};