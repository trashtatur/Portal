![Logo](src/images/Portal_Logo_for_Readme.jpg)
## What is this?

Portal is a tool to help dungeon masters and people who write adventures. It features (or rather will eventually feature...) the following things:
- Run an encounter with complete overview over all the properties of every monster and player in it
- Have a history of past rounds of your encounter
- Share the encounter screen with your players, who will see an adjusted and less detailed version.
- Create new elements, like creatures, player characters, spells, attacks, actions, talents, feats, skills, languages...
- Use those elements in your encounters
- Be able to share your creations with other users (Users don't exist yet...)
- Switch between supported RPG systems on the fly
- Dynamically create and use status effects and see their effect on the affected creatures
- Write your own adventures with a very clean and straight forward interface
    - You'll link scenes together, reference people and places
    - Portal will create a graph overview of how your adventure links together
- ...Many more things!


## What systems does this support? 
 
 Currently Portal supports Pathfinder and DND5. Though the DND5 support is still being developed and not functional yet.
 
## Why is this?

I was tired of cluttered and overly filled worldbuilding tools or ones that were just ancient and barely usable anymore.
I also wanted a way to easily run my own encounters and have an easy to use overview for them. That's where the idea for Portal
came from. Originally it was just able to run encounters with creatures from one System but by now it is much bigger and
steadily evolving.

## How is this?

Currently it is in VERY active development. That means, that it often won't be usable or will just be flatout broken.
I try to keep the master branch in a state where you can use most features though.

Portal uses the following more major technologies in its Stack:

- Typescript
- React
- Mysql
- Sequelize (ORM)
- Ts.Ed

Planned technologies:

- Redux

## How do I start this?
(if you wanna run this on Windows... good luck. I tried it once and it didn't work. You're on your own buddy.
At some point I'll add docker support to hopefully mitigate this...)

Currently Portal is not hosted anywhere (yet). If you want to host it yourself here is what currently needs to be done.
You need:

- Nodejs
- npm
- A mysql database
- Docker, if you want to run MySQL locally in a container

Navigate into the config folder and create a file called ``config.json``. You can use the file ``config.json.example``
which you will find in there to see what information needs to be entered. The parameter ``forceDBReset`` will 
wipe the database every time you restart if you set it to true.

To run the development MySQL database with Docker, from the Portal root directory run:

``docker build -t portal-mysql .``

``docker run --name portal-mysql --restart unless-stopped -p 3306:3306 portal-mysql``

Wait for the container logs to report that MySQL is ready before starting the backend. The Dockerfile defaults match
the example configuration and expose MySQL on ``localhost:3306``.

After that navigate into the Portal root dir and run ``npm install``. Start the frontend development server with ``npm start``.
Start the backend separately with ``npm run start:backend``. Build the frontend with ``npm run build``.
The frontend should be reachable in your browser under ``http://localhost:5173``; the backend listens on ``http://localhost:4004``.