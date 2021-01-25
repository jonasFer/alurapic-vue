<template>
    <button class="button" :class="estiloBotao" @click="disparaAcao()" :type="tipo">{{ rotulo }}</button>
</template>

<script>
export default {
    props: {
        tipo: {
            required: true,
            type: String
        },
        rotulo: {
            required: true,
            type: String
        },
        confirmacao: Boolean,
        estilo: String
    },
    methods: {
        disparaAcao() {
            if (this.confirmacao) {
                if(confirm('Deseja realizar a operação?')) {
                    this.$emit('botaoAtivado');
                }
                return;
            }
            this.$emit('botaoAtivado');
        }
    },
    computed: {
        estiloBotao() {
            if (this.estilo == 'danger') {
                return 'button-danger'
            }

            return 'button-default'
        }
    }
}
</script>

<style>
.button {
    display: inline-block;
    padding: 10px;
    border-radius: 3px;
    margin: 10px;
    font-size: 1.2em;
}

.button-danger {
    background: firebrick;
    color: white;
}

.button-default {
    background: darkcyan;
    color: white;
}
</style>
