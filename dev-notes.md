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

5. This current Prod-vs-Dev configuration requires the development code to be run from a local Express server rather than the Production version's Firebase server. The game CONSTANTS file will have a 'DEV_MODE' boolean that will always be true in Dev and false in Production, so that no toggling is needed when importing new code into production. Just make sure that if the production version's CONSTANTS file ever needs to be updated that its variable is kept to production mode and not dev mode, otherwise it won't work... There must be some way to do that with a local environment variable...

6. When changing CSS rules be sure to always do it from the SCSS folder.
