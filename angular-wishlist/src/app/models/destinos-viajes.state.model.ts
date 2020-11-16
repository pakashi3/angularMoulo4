import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViajes } from './../models/destino-viaje.models';



// Estado
export interface DestinosViajesState {
    items: DestinoViajes[];
    loading: boolean;
    favorito: DestinoViajes;
}

export const initializeDestinosViajesState = function() {
    return {
        items: [],
        loading: false,
        favorito: null
    };
};

// ACCIONES
export enum DestinosViajesActionTypes {
    NUEVO_DESTINO = '[Destinos Viajes] Favorito',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
    VOTE_UP = '[Destinos Viajes] Vote Up',
    VOTE_DOWN = '[Destinos Viajes] Vote Down'
}
export class NuevoDestinoAction implements Action {
    type = DestinosViajesActionTypes.NUEVO_DESTINO;
    constructor (public destino: DestinoViajes) {}
}

export class ElegidoFavoritoAction implements Action {
    type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino: DestinoViajes) {}
}

export class VoteUpAction implements Action {
    type = DestinosViajesActionTypes.VOTE_UP;
    constructor(public destino: DestinoViajes) {}
}

export class VoteDownAction implements Action {
    type = DestinosViajesActionTypes.VOTE_DOWN;
    constructor(public destino: DestinoViajes) {}
}



export type DestinosViejaesActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction;

// REDUCERS

export function reducerDestinosViajes(
    state:DestinosViajesState,
    action:DestinosViejaesActions
) : DestinosViajesState {
    switch (action.type){
        case DestinosViajesActionTypes.NUEVO_DESTINO: {
            return {
                ...state,
                items: [...state.items, (action as NuevoDestinoAction).destino ]
            };
        }
        case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
            state.items.forEach(x => x.setSelected(false));
            const fav: DestinoViajes = (action as ElegidoFavoritoAction).destino;
            fav.setSelected(true);
            return {
                ...state,
                favorito: fav
            };
        }
        case DestinosViajesActionTypes.VOTE_UP: {
            const d: DestinoViajes = (action as VoteUpAction).destino;
            d.voteUp();
            return {
                ...state,
            };
        }
        case DestinosViajesActionTypes.VOTE_DOWN: {
            const d: DestinoViajes = (action as VoteDownAction).destino;
            d.voteDown();
            return {
                ...state,
            };
        }
    }
    return state;
}

// EFFECTS
@Injectable()
export class DestinosViajesEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
    map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    );

    constructor(private actions$: Actions) {}
}