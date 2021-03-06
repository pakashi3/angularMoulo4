import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViajes } from './../../models/destino-viaje.models';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.module';
import { VoteUpAction, VoteDownAction } from './../../models/destinos-viajes.state.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css'],
  animations: [
    trigger('esFavorito' , [
      state('estadoFavorito', style ({
      backgroundColor: 'PaleTurquoise'
    })),
    state('estadoNoFavorito', style({
      backgroundColor: 'WhiteSmoke'
    })),
    transition('estadoNoFavorito => estadoFavorito', [     
    animate('3s')
  ]),

    transition('estadoFavorito => estadoFavorito', [     
      animate('1s')
    ]),
  ])
  ]

})

export class DestinoViajeComponent implements OnInit {
  @Input() destinos: DestinoViajes;
  @Input() position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() Onclicked: EventEmitter<DestinoViajes>;

  constructor(private store: Store<AppState>) {
    this.Onclicked = new EventEmitter();
  }

  ngOnInit() {
  }

  ir() {
    this.Onclicked.emit(this.destinos);
    return false;
  }
  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destinos));
    return false;
  }
  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destinos));
    
    return false;
  }
}
