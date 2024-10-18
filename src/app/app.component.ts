import {
  Component,
  signal,
  resource,
  computed,
  linkedSignal,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getAllPokemon } from './services/all-pokemon';
import { getSpecificPokemon } from './services/specific-pokemon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    @defer (when isGameReady() && !pokeApi.isLoading()) {
      <p>What Pokemon has the ID of {{ currentId() }}?</p>
      <input
        min="0"
        [max]="allPokemonApi.value()!.count"
        [(ngModel)]="guess"
        type="number"
      />
      @if (guess() !== -1) {
        <p>Your guess is {{ guess() }}? Well...</p>
        @if (guess() === currentId()) {
          <p>That's right! It's {{ pokeApi.value()!.name }}</p>
        } @else {
          <p>Nope! It's {{ pokeApi.value()!.name }}</p>
        }
      }
    } @placeholder {
      <p>Loading...</p>
    }
  `,
})
export class AppComponent {
  guess = model(-1);

  allPokemonApi = resource({
    loader: () => {
      return getAllPokemon();
    },
  });

  currentId = linkedSignal(() => {
    if (this.allPokemonApi.isLoading()) {
      return null;
    }
    return Math.floor(Math.random() * this.allPokemonApi.value()!.count);
  });

  isGameReady = computed(
    () => !this.allPokemonApi.isLoading() && this.currentId() !== null,
  );

  pokeApi = resource({
    request: () => ({
      currentId: this.currentId(),
      isGameReady: this.isGameReady(),
    }),
    loader: ({ request }) => {
      if (!request.isGameReady) return Promise.resolve(null);
      return getSpecificPokemon(request.currentId!);
    },
  });
}
