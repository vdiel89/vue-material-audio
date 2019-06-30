<template>
    <div id="app-content" class="md-layout md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-30">
            <md-card class="player-card">
                <md-card-content>
                    <md-tabs md-sync-route>
                        <md-tab id="tab-home" md-label="Single Player">
                            <md-vue-audio
                                    file="/audio/SampleAudio_0.4mb.mp3"
                            >
                                <i>Some lyrics</i>
                            </md-vue-audio>
                        </md-tab>

                        <md-tab id="tab-pages" md-label="Playlist">
                            <md-vue-audio-playlist
                                    :files="[{src: '/audio/SampleAudio_0.4mb.mp3', name: 'SampleAudio 04', duration: 24}, {src: '/audio/SampleAudio_0.7mb.mp3', name: 'SampleAudio 07', duration: 45}]"
                            ></md-vue-audio-playlist>
                        </md-tab>
                    </md-tabs>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>
    import MdVueAudio from "./components/MdVueAudio";
    import MdVueAudioPlaylist from "./components/MdVueAudioPlaylist";

    export default {
        name: 'app',
        components: {
            MdVueAudioPlaylist,
            MdVueAudio

        }
    }
</script>

<style>
    #app-content {
        margin: 0;
    }

    #app-content > .md-layout-item > .player-card {
        margin-top: 20px;
    }
</style>
