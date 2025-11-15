export class Game {

    game_count;
    appid;
    name;
    playtime_window_forever;
    playtime_mac_forever;
    playtime_linux_forever;
    playtime_deck_forever;
    rtime_last_played;

    constructor(game) {
        Object.assign(this, game);
    }
}