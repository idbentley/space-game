     _______  _______  _______  _______  _______  _______  _______  __   __  _______ 
    |       ||       ||   _   ||       ||       ||       ||   _   ||  |_|  ||       |
    |  _____||    _  ||  |_|  ||       ||    ___||    ___||  |_|  ||       ||    ___|
    | |_____ |   |_| ||       ||       ||   |___ |   | __ |       ||       ||   |___ 
    |_____  ||    ___||       ||      _||    ___||   ||  ||       ||       ||    ___|
     _____| ||   |    |   _   ||     |_ |   |___ |   |_| ||   _   || ||_|| ||   |___ 
    |_______||___|    |__| |__||_______||_______||_______||__| |__||_|   |_||_______|

# Welcome

Welcome to SpaceGame.  SpaceGame is a simple multiplayer top-down space shooter game.

Currently in early stages of development.


# How to use

Requires `ruby` and the `webrick` gem to be installed for the time being.  The server needs to become more complicated, but this was just a jumping point.  Start up a server by running

    ruby test_server.rb

then point your browser to `localhost:3000`.  And you're online!



# Technical Details

The SpaceGame engine is being developed in javascript.  The directory structure is defined as follows:

     .
     ├── app
     │   ├── css
     │   │   ├── compiled
     │   │   ├── reset.css
     │   │   └── sass
     │   ├── images
     │   │   └── sprite
     │   └── js
     │       ├── event
     │       ├── library
     │       ├── object
     │       └── view
     │           └── engine
     ├── README
     └── test_server.rb

 * app/css/sass directory holds all style assets in a pre-compiled 'sass' format.  Run the `sass` command with the `--watch` modifier to run the sass compiler in watch mode.  Any changes will be compiled properly.  `.css` files should *never* be modified directly.

    sass --watch app/css/sass/:app/css/compiled

 * app/images holds big _world_ type images.  This section needs to be expanded upon.
 * app/images/sprite holds sprites.  If you have multiple sprites for a given entity, place all the sprites for that entity into a sub-directory named appropriately.
 * app/js/event holds event engines.  The simplest, and most obvious engine is the `manualEngine`.
 * app/js/library holds external library code.
 * app/js/object holds entity definitions.  Also, the basic physics engine is here in `physicalObject.js`.
 * app/js/view holds the driver code that makes the game go!
 * app/js/view/engine holds any specific purpose rendering code.
