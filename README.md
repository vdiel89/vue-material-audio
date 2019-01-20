# vue-material-audio

Project is based on [Vue Material](https://vuematerial.io/) and [Vuetify-Audio](https://github.com/wilsonwu/vuetify-audio).

## Install
```
npm install --save vue-material-audio
```

## Example usage
### Audio
```
import Vue from 'vue';
import MdVueAudio from 'vue-material-audio'

Vue.use(MdVueAudio);
```
```
<md-vue-audio file="sample.mp3"></md-vue-audio>
```
### Audio Playlist
```
import Vue from 'vue';
import MdVueAudioPlaylist from 'vue-material-audio'

Vue.use(MdVueAudio);
```
```
<md-vue-audio-playlist
    :files="[{src: 'sample1.mp3', name: 'Sample 1', duration: 24}, {src: 'sample2.mp3', name: 'Sample 2', duration: 45}]"
></md-vue-audio-playlist>```
```

# For Developer
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```