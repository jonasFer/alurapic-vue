
<template>
    <div>
        <h1 class="centralizado">{{ titulo }}</h1>

        <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
        <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="Filtre por parte do titulo">

        <ul class="lista-fotos">
            <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">
                <meu-painel :titulo="foto.titulo">
                    <imagem-responsiva v-meu-trasform.animate="15" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
                    <router-link :to="{ name: 'alterar', params: { id: foto._id }}">
                        <meu-botao tipo="button" rotulo="Alterar"></meu-botao>
                    </router-link>
                    <meu-botao
                        tipo="button"
                        rotulo="Remover"
                        :confirmacao=true
                        @botaoAtivado="remove(foto)"
                        estilo="danger"
                    />
                </meu-painel>
            </li>
        </ul>
    </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Button from '../shared/button/Button.vue';
import FotoService from "../../domain/service/FotoService";

export default {
    components: {
        'meu-painel': Painel,
        'imagem-responsiva' : ImagemResponsiva,
        'meu-botao': Button
    },
    data() {
        return {
            titulo: 'Alurapic',
            fotos: [],
            filtro: '',
            mensagem: ''
        }
    },
    created() {
        this.service = new FotoService(this.$resource);
        this.service
            .list()
            .then(fotos => this.fotos = fotos, error => console.log(error));
    },
    computed: {
        fotosComFiltro() {
            if(this.filtro) {
                let exp = new RegExp(this.filtro.trim(), 'i');
                return this.fotos.filter(foto => exp.test(foto.titulo));
            }

            return this.fotos;
        }
    },
    methods: {
        remove(foto) {
            this.service.delete(foto._id)
                .then(() => {
                    let index = this.fotos.indexOf(foto);
                    this.fotos.splice(index, 1);
                    this.mensagem = "Foto removida com sucesso";
                },error => {
                    this.mensagem = "Não foi possivel remover a foto";
                    console.log(error);
                });
        }
    }
}
</script>

<style>
    .lista-fotos {
        list-style: none;
    }

    .lista-fotos .lista-fotos-item {
        display: inline-block;
    }

    .filtro {
        display: block;
        width: 100%;
    }
</style>
