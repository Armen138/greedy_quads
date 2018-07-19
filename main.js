import Game from "./game/game.js";
import VoxMesher from "./voxmesher/voxmesher.js";



let game = new Game({ width: 620, height: 620, fullscreen: false, aspect: "width" });

let loading = new game.Assets({
    "splash": "assets/armen138splash_small.png"
});

loading.on("ready", () => {
    let scene = new game.Scene(loading);
    let splash = new game.SpriteNode(loading.splash);
    scene.setColor("#1e3966");
    splash.setPosition(game.width / 2 - splash.width / 2, game.height / 2 - splash.height / 2);
    scene.add(splash);
    game.setScene(scene);
    new VoxMesher(game);
});

