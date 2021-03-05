# Welcome to BlockLand DevNotes: CICD Since July 2020!

## This document is meant to explain the current setup for BlockLand's file structure, and provide a brief 'how-to' for making modifications to the code in a CICD environment.

### The New Way, Brother:

- BlockLand's files are now located on two local directories: Development and Production.

- In order to deploy changes in the code base to GitHub, the Development directory is linked to the BlockLand GitHub remote repo, while the Production directory is linked to Firebase.

- Changes to the game's code should be made on branches in the DEVELOPMENT directory. When they are ready for deployment, changes must be copied into the production directory and then deployed to Firebase.

### The Procedure:

1. All new code must be written in the Development directory, and committed and pushed frequently to GitHub to make a more detailed commit history.

2. In Development mode, the server functionality (login page) has been re-enabled, so any tests to new code must be run on this local server, using either yarn dev, or yarn start the server from the terminal.

3. Updates to the game's code (in development) should be pushed regularly to GitHub and periodically to production, as 'patch' or 'version' releases.

4. All new feature development should be done on branches named for their version/patch number. A branch may have many commits before it is merged. When a branch is merged back to the master, that version/patch is considered ready for release and should be imported to production. Use GitHub's difference display to verify which files need to be brought in (or removed) from production version to update successfully.

5. When changing CSS rules be sure to always do it from the SCSS folder.

6. To update the production version, copy the 'public' folder from your Dev directory and replace the inner 'public' folder in the Production mode (the one in Blockland-PROD-X.X.X/BlockLand-version-X.X.X/public).

7. After that's done, set the DEV_MODE boolean to false and then do a firebase deploy. Wait about 10 minutes then test it out live!

### Things to Check When Adding Entities to the Engine Cycle:

1. Does the Entity get updated every cycle?

2. Is it replaced by a reset event (when you die)?

3. Is its root updated when we come out of the in-game menu?

4. Does it need to be removed at the end of a mission?

### Map Editor Workflow:

- You can edit older maps by loading them by their const name.

- Edited maps appear as new consts in the basic_biomes library.

- You must make at least one change to a map before saving it, otherwise you get an empty biome!

- When using a newly saved map that is a copy of an older one, check that it hasn't gained any extra thickness (sometimes there seems to be an issue with the editor where it adds duplicate columns to the start of a map).

- Make sure your maps have a tall border at the end to add realism and to prevent the player from falling off the edge!
