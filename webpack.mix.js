const mix = require('laravel-mix');

mix.setPublicPath('src/')
    .disableNotifications()
    .sass('dev/sass/audio-player.scss', 'src/css')
    .options({ processCssUrls: false })
    .react('dev/js/app.js', 'src/js');