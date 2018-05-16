# html5-audio-react

  This is anhtml5 audio player that is based on [react](https://reactjs.org/).

## Getting Started

  So this is my first project on git hub. I made basic audio player on react. If you want to create your own audio player this might be good start.

### Prerequisites
  
  You need node.js and npm for development. You can get them [here](https://nodejs.org/).
  I used **laravel-mix** standalone for its webpack module to complie **jsx** and **scss**.
  
  Just write in **terminal (cmd)** `npm run watch` for development and `npm run production` for release version

### Usage

  Add to your `<head>`
  
```
  <link href="src/css/audio-player.css" type="text/css" rel="stylesheet">
  <script src="src/js/app.js"></script>
```

  To create a player

```
  <script>
      // list all audio you would like to play
      let playList = [
          {path: "/path/to/dir/audio.mp3", name: "Some custom name"},
          {path: "/path/to/dir/audio2.mp3", name: "One more custom name"},
          {path: "/path/to/dir/audio3.mp3"},  //will give it a default name
      ];

      //adding player to your page
      createPlayer(
          {playList: playList}, 
          document.getElementById("app")
      );
  </script>
```

### Cons

  Because it uses react to render itself any data in `app` will be removed.
  Also player does not check wherethere file exists. Such verification should be made on server.
