import { AlbumModel } from "./AlbumModel";

export interface SongModel extends AlbumModel {
    track: number;
    name: string;
    album_id: number;
}