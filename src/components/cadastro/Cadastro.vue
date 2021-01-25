<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"></h2>
    <form @submit.prevent="grava">
        <div class="controle">
            <label for="titulo">TÍTULO</label>
            <input id="titulo" autocomplete="off" v-model="foto.titulo" v-validate data-vv-rules="required">
            <span class="erro" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
        </div>

        <div class="controle">
            <label for="url">URL</label>
            <input id="url" autocomplete="off" v-model.lazy="foto.url">
            <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
        </div>

        <div class="controle">
            <label for="descricao">DESCRIÇÃO</label>
            <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
        </div>

        <div class="centralizado">
            <meu-botao rotulo="GRAVAR" tipo="submit"/>
            <router-link to="/"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
        </div>
    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Button from '../shared/button/Button.vue';
import Foto from '../../domain/model/Foto';
import FotoService from "../../domain/service/FotoService";

export default {

    components: {
        'imagem-responsiva': ImagemResponsiva,
        'meu-botao': Button
    },
    data() {
        return {
            foto: new Foto(),
            id: this.$route.params.id
        }
    },
    methods: {
        grava() {
            if (this.foto._id) {
                this.service
                    .update(this.foto)
                    .then(() => {
                        this.foto = new Foto();
                        this.$router.push({ name: 'home' });
                    }, error => console.log(error));
                return;
            }

            this.service
                .save(this.foto)
                .then(() => this.foto = new Foto(), error => console.log(error));
        }
    },
    created() {
        this.service = new FotoService(this.$resource);
        if (this.id) {
            this.service
                .find(this.id)
                .then(foto => this.foto = foto);
        }
    }
}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }
  .erro {
      color: red;
  }
</style>
