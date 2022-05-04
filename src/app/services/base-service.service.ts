import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongModel } from '../models/SongModel';
import { AlbumModel } from '../models/AlbumModel';
import { ArtistModel } from '../models/ArtistModel';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private baseUrl: string = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  public getSongs(): Observable<SongModel[]> {
    let songsUrl = this.baseUrl + '/songs';
    return this.http.get<SongModel[]>(songsUrl).pipe(
      map(songResponse => {
        return songResponse;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  public getAlbums(): Observable<AlbumModel[]> {
    let albumsUrl = this.baseUrl + '/albums';
    return this.http.get<AlbumModel[]>(albumsUrl);
  }

  public getArtists(): Observable<ArtistModel[]> {
    let artistsUrl = this.baseUrl + '/artists';

    return this.http.get<ArtistModel[]>(artistsUrl);
  }

}
