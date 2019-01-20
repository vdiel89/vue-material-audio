<template>
    <div class="md-layout md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-100">
            <md-vue-audio :file="file"></md-vue-audio>
        </div>
        <div class="md-layout-item md-size-100">
            <md-list>
                <md-list-item :class="selectedIndex === index? 'md-selected' : ''" v-for="(item, index) in files" :key="item.src" @click="onSelect(item, index)">
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-10">
                            {{ (index + 1) }}
                        </div>
                        <div class="md-layout-item md-size-60">
                            {{ item.name || item.src }}
                        </div>
                        <div class="md-layout-item md-size-30">
                            {{ formatTime(item.duration) }}
                        </div>
                    </div>
                </md-list-item>
            </md-list>
        </div>
    </div>
</template>

<script>
    import MdVueAudio from "./MdVueAudio";

    export default {
        name: "MdVueAudioPlaylist",
        components: {MdVueAudio},
        props: {
            files: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                file: null,
                selected: null,
                selectedIndex: 0
            }
        },
        methods: {
            onSelect(item, index) {
                this.selectedIndex = index;
                this.file = item.src;
            },
            formatTime(second){
                return second? new Date(second * 1000).toISOString().substr(11, 8) : '';
            }
        },
        mounted() {
            if (this.files.length > 0) {
                this.file = this.files[0].src;
            }
        }
    }
</script>

<style scoped>

</style>