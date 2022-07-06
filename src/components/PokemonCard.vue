<template>
  <div class="card" :class="[pokemonColor, loading ? 'card__loading' : '']">
    <img
      v-if="imageSource"
      :src="imageSource"
      width="100"
      height="100"
      class="card__pokemon-image"
    />

    <div class="card__pokemon-types">
      <span v-for="pokemonType in pokemon.types" :key="pokemonType.type.name">
        <img
          :src="fetchPokemonTypeIcon(pokemonType.type.name)"
          width="30"
          height="30"
          v-tippy="pokemonType.type.name"
        />
      </span>
    </div>

    <h2 class="card__title">
      <span class="pokemon-id">
        <img src="@assets/icons/pokeball.svg" width="20" height="20" />
        #{{ pokemon.id }}
      </span>

      <span class="pokemon-name">
        {{ pokemon.name }}
      </span>
    </h2>
  </div>
</template>

<script>
import { getPokemon, getPokemonColor } from "@services";

export default {
  name: "PokemonCard",
  props: {
    reference: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pokemon: {},
      loading: false,
    };
  },
  computed: {
    imageSource() {
      return this.pokemon
        ? this.pokemon?.sprites?.other?.dream_world.front_default
        : "";
    },
    pokemonColor() {
      if (this.pokemon.color) {
        return `bg-${this.pokemon.color}`;
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.loading = true;
    getPokemon(this.reference.url)
      .then((resp) => {
        this.pokemon = resp;
      })
      .finally(() => {
        this.fetchPokemonColor(this.pokemon.id);
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    fetchPokemonColor(id) {
      getPokemonColor(id).then((resp) => {
        this.pokemon.color = resp.color.name;
      });
    },
    fetchPokemonTypeIcon(type) {
      if (type) {
        return new URL(
          `../assets/icons/pokemon-types/icon-${type}.svg`,
          import.meta.url
        ).href;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 200px;
  height: 175px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  transition: 0.2s ease all;
  &__loading {
    filter: blur(10px);
  }
  &__title {
    background: white;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    font-weight: 400;
    height: 40px;
    padding: 0 10px;
    justify-content: space-between;
    .pokemon-id {
      font-size: 17px;
      display: flex;
      align-items: center;
      img {
        margin-right: 2px;
      }
    }
    .pokemon-name {
      font-weight: 600;
    }
  }
  &__pokemon-image {
    margin-top: 60px;
    margin-left: 20px;
  }
  &__pokemon-types {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 40px;
  }
}
</style>