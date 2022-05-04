import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AlbumModel } from '../models/AlbumModel';
import { ArtistModel } from '../models/ArtistModel';
import { SongModel } from '../models/SongModel';
import { BaseService } from '../services/base-service.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export interface MusicData {
  artistName: string;
  albumName: string;
  yearReleased: number;
  songTrack: number;
  songName: string;
}

@Component({
  selector: 'albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less']
})
export class AlbumsComponent implements OnInit {

  public musicColumns: string[] = ['artistName', 'albumName', 'yearReleased', 'songTrack', 'songName'];
  public musicTableSource: MatTableDataSource<MusicData>;

  public songs$: Observable<SongModel[]>;
  public artists$: Observable<ArtistModel[]>;
  public albums$: Observable<AlbumModel[]>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private baseService: BaseService) {

    let musicData: MusicData[] = [];
    this.musicTableSource = new MatTableDataSource(musicData);
  }

  ngOnInit(): void {
    this.songs$ = this.baseService.getSongs();
    this.artists$ = this.baseService.getArtists();
    this.albums$ = this.baseService.getAlbums();
    this.updateMusicTableSource();

  }

  ngAfterViewInit() {

    this.musicTableSource.paginator = this.paginator;
    this.musicTableSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.musicTableSource.filter = filterValue.trim().toLowerCase();


    if (this.musicTableSource.paginator) {
      this.musicTableSource.paginator.firstPage();
    }
  }

  public updateMusicTableSource() {
    let musicData: MusicData[] = [];
    this.songs$.subscribe(songsResp => {
      this.albums$.subscribe(albumsResp => {
        this.artists$.subscribe(artistsResp => {
          songsResp.forEach(eachSongResp => {
            albumsResp.forEach(eachAlbumResp => {
              if (eachSongResp.album_id === eachAlbumResp.id) {
                artistsResp.forEach(eachArtistResp => {
                  if (eachArtistResp.id === Number(eachAlbumResp.artist_id)) {
                    musicData.push({
                      artistName: eachArtistResp.name,
                      albumName: eachAlbumResp.name,
                      yearReleased: eachAlbumResp.year_released,
                      songTrack: eachSongResp.track,
                      songName: eachSongResp.name
                    })
                  }
                })
              }
            })
          })
          this.musicTableSource.data = musicData;
        })
      })
    })
  }
}
