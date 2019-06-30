<template>
    <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>{{title}}</md-dialog-title>
        <md-dialog-content>
            <i>
                <slot></slot>
            </i>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog">Schließen</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
    export default {
        name: "Lyrics",
        props: {
            showDialog: Boolean,
            title: String
        },
        methods: {
            closeDialog () {
                this.$emit('update:showDialog', false)
            },
        },
        watch: {
            showDialog(v) {
                this.$emit('update:showDialog', v)
            }
        }
    }
</script>

<style scoped>

</style>