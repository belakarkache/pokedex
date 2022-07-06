<template>
  <main class="pokemon-grid" :class="{ 'pokemon-grid__loading': loading }">
    <PokemonCard
      :reference="pokemon"
      v-for="pokemon in pokemonList"
      :key="pokemon.name"
    />
  </main>

  <div class="pokemon-grid__actions">
    <button @click="handlePagination(previousPage)" :disabled="!previousPage">
      Previous
    </button>
    <button @click="handlePagination(nextPage)" :disabled="!nextPage">
      Next
    </button>
  </div>
</template>

<script>
import { getPokemon } from "@services";
import PokemonCard from "@components/PokemonCard.vue";

export default {
  name: "App",
  components: { PokemonCard },
  data() {
    return {
      nextPage: "",
      previousPage: "",
      pokemonList: [],
      count: "",
      loading: false,
    };
  },
  mounted() {
    getPokemon().then((resp) => {
      this.handleAssignments(resp);
    });
  },
  methods: {
    handlePagination(url) {
      this.loading = true;
      getPokemon(url).then((resp) => {
        this.handleAssignments(resp);
      });
    },
    handleAssignments(resp) {
      this.pokemonList = resp.results;
      this.nextPage = resp.next;
      this.previousPage = resp.previous;
      this.count = resp.count;
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
.pokemon-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  gap: 20px;
  transition: 0.2s ease all;
  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    button {
      font-family: "Barlow Condensed", sans-serif;
      text-transform: uppercase;
      padding: 5px 10px;
      border: none;
      border-radius: 8px;
      font-size: 20px;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 10px;
      }
      &:disabled {
        cursor: not-allowed;
      }
    }
  }
  &__loading {
    filter: blur(10px);
  }
}
</style>