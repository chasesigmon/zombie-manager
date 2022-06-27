# zombie-manager
Manage your zombies!

# Setup & Installation

First we need to install all dependencies.

- run command `npm run install:all` from the root of the project

# Running

- run command `npm run start`

# Code details

- The `start` command has a `pre` step that will automatically build the front and back ends.
- The `start:server` has a `pre` step that will execute the `start-mongodb.js` script.
- The `start-mongodb.js` script first makes sure a `zombiedata` docker volume exists. Then it proceeds to either start up or create a `zombiedb` mongodb docker container.
- For ease of use I left the `.env` on the server file not .gitignored.

# App details

- The portal should have a header and a create zombie button. Then below that should be a default set of 6 zombies loaded in that the server should ensure are there.
- There should be hospital & school & warehouse icons displayed in their respective buttons as well as male or female zombie icons displayed next to the zombie names.
- Zombies are immortal and cannot be removed.

Example:
<img width="1509" alt="Screen Shot 2022-06-27 at 3 21 37 PM" src="https://user-images.githubusercontent.com/7799494/176020626-e48db0fe-8dc5-472f-842f-7f31d4e07144.png">
