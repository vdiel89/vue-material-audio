<template>
    <div class="audio-content">
        <div class="md-layout md-gutter md-alignment-top-center">
            <div class="md-layout-item audio-action-content">
                <md-button class="md-icon-button md-primary" @click.native="playing ? pause() : play()" :disabled="loaded === false">
                    <md-icon v-if="playing === false || paused === true">play_arrow</md-icon>
                    <md-icon v-else>pause</md-icon>
                </md-button>
                <md-button class="md-icon-button md-primary" @click.native="stop()" :disabled="loaded === false">
                    <md-icon>stop</md-icon>
                </md-button>
                <md-button class="md-icon-button md-primary" @click.native="mute()" :disabled="loaded === false">
                    <md-icon v-if="isMuted === false">volume_up</md-icon>
                    <md-icon v-else>volume_off</md-icon>
                </md-button>
                <md-button class="md-icon-button md-primary" @click.native="loaded ? download() : reload()">
                    <md-icon v-if="loaded === false">refresh</md-icon>
                    <md-icon v-else>get_app</md-icon>
                </md-button>
                <md-button class="md-icon-button md-primary" @click="showLyrics = true" v-if="this.$slots.default">
                    <md-icon>message</md-icon>
                    <Lyrics :show-dialog.sync="showLyrics" :title="file"><slot></slot></Lyrics>
                </md-button>
            </div>
        </div>
        <div class="md-layout md-gutter md-alignment-top-center">
            <div class="md-layout-item">
                <md-progress-bar ref="progressBar" class="md-accent" @click.native="setPosition($event)" :md-value="percentage"></md-progress-bar>
                <p>{{ currentTime }} / {{ duration }}</p>
            </div>
        </div>
        <audio id="player" ref="player" v-on:ended="ended" v-on:canplay="canPlay" :src="file"></audio>
    </div>
</template>
<script>
    import Lyrics from "./Lyrics.dialog";
    const formatTime = (second) => new Date(second * 1000).toISOString().substr(11, 8);

    export default {
        name: 'MdVueAudio',
        components: {Lyrics},
        props: {
            file: {
                type: String,
                default: null
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            ended: {
                type: Function,
                default: () => {},
            },
            canPlay: {
                type: Function,
                default: () => {},
            },
        },
        computed: {
            duration() {
                return this.audio ? formatTime(this.totalDuration) : ''
            },
        },
        data () {
            return {
                isMuted: false,
                loaded: false,
                playing: false,
                paused: false,
                currentTime: '00:00:00',
                audio: undefined,
                percentage: 0,
                totalDuration: 0,
                showLyrics: false
            }
        },
        methods: {
            setPosition (event) {
                let width = this.$refs.progressBar.$el.clientWidth;
                this.percentage = event.offsetX / width * 100;
                this.audio.currentTime = this.audio.duration / 100 * this.percentage;
            },
            stop () {
                this.paused = this.playing = false;
                this.audio.pause();
                this.audio.currentTime = 0;
            },
            play () {
                if (this.playing) return;
                this.paused = false;
                this.audio.play();
                this.playing = true
            },
            pause () {
                this.paused = !this.paused;
                (this.paused) ? this.audio.pause() : this.audio.play()
            },
            download () {
                this.audio.pause();
                window.open(this.file, '_blank');
            },
            mute () {
                this.isMuted = !this.isMuted;
                this.audio.muted = this.isMuted;
            },
            reload () {
                this.audio.load();
            },
            _handleLoaded: function () {
                if (this.audio.readyState >= 2) {
                    if (this.autoPlay) this.audio.play();
                    this.loaded = true;
                    this.totalDuration = parseInt(this.audio.duration)
                } else {
                    throw new Error('Failed to load sound file')
                }
            },
            _handlePlayingUI: function () {
                this.percentage = this.audio.currentTime / this.audio.duration * 100;
                this.currentTime = formatTime(this.audio.currentTime);
            },
            _handlePlayPause: function (e) {
                if (e.type === 'pause' && !this.paused && !this.playing) {
                    this.currentTime = '00:00:00'
                }
            },
            _handleEnded () {
                this.paused = this.playing = false;
            }
        },
        mounted () {
            this.audio = this.$refs.player;
            this.audio.addEventListener('timeupdate', this._handlePlayingUI);
            this.audio.addEventListener('loadeddata', this._handleLoaded);
            this.audio.addEventListener('pause', this._handlePlayPause);
            this.audio.addEventListener('play', this._handlePlayPause);
            this.audio.addEventListener('ended', this._handleEnded);
        },
        beforeDestroy () {
            this.audio.removeEventListener('timeupdate', this._handlePlayingUI);
            this.audio.removeEventListener('loadeddata', this._handleLoaded);
            this.audio.removeEventListener('pause', this._handlePlayPause);
            this.audio.removeEventListener('play', this._handlePlayPause);
            this.audio.removeEventListener('ended', this._handleEnded);
        }
    }
</script>

<style>
        .audio-content .audio-action-content{
            text-align: center;
        }

        .audio-content .md-progress-bar .md-progress-bar-buffer {
            display: none;
        }
</style>
