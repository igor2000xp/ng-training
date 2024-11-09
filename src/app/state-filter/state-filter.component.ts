import { Component, OnInit } from '@angular/core';
import {combineLatest, Observable, BehaviorSubject} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe, NgForOf} from '@angular/common';

interface State {
  abbreviation: string;
  name: string;
}

@Component({
  selector: 'app-state-filter',
  templateUrl: './state-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf, HttpClientModule
  ],
  styleUrls: ['./state-filter.component.css']
})
export class StateFilterComponent implements OnInit {

  // states$ = new Observable<State[]>();
  states$ = new BehaviorSubject<State[]>([{abbreviation: 'ABC', name: 'def'}, {abbreviation: 'XYZ', name: 'gej'}]) ;
  filteredStates$ = new Observable<State[]>();
  filter = new UntypedFormControl('');
  filter$ = new Observable<string>();

  constructor(private http: HttpClient) {
    // this.states$ = http.get<State[]>('http://localhost:8000/states');
    // this.filter = new UntypedFormControl('');
    // this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    // this.filteredStates$ = combineLatest(this.states$, this.filter$).pipe(
    //   map(([states, filterString]) => states.filter(state => state.name.indexOf(filterString) !== -1))
    // );
  }

  ngOnInit(): void {
    // this.states$ = this.http.get<State[]>('http://localhost:8000/states');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredStates$ = combineLatest(this.states$, this.filter$).pipe(
      map(([states, filterString]) => states.filter(state => state.name.indexOf(filterString) !== -1))
    );
  }

}
