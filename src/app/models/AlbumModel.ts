import { ArtistModel } from "./ArtistModel";

export interface AlbumModel extends ArtistModel {
    name: string;
    year_released: number;
    artist_id: number;
}