# Deployment instructions

This manual contains instructions on how to deploy the repo on Netlify hosting service.

## Configuration and Build

1. Switch `APIroot` variable to the deployed backend URL in `src/utils/api*` files.
1. Add directory `public`  at the same level as `src` directory.
1. Add file `_redirects` (no file extension) into the `public` directory.
1. In the commandline execute this command:

        npm run build

    This should create a new directory `dist` at the same level as `src` directory.

## Deployment

1. In the commandline execute this command (this will take some time):

        npm install netlify-cli -g

1. In the commandline execute this command:

        netlify deploy

1. When prompted:

    * Authorise into Netlify with GitHub, if prompted by browser.
    * Select `Create & configure a new site`.
    * Confirm your Netlify team name.
    * Input site name - this can be anything, since the URL for the outside world will be overriden later.
    * Provide path to the build directory `./dist`.

1. Once the build is finished, a link to `Website draft URL` will be provided. Ctrl+ Click on the link and check that everything looks alright.

1. In the commandline execute this command:

        netlify deploy --prod

    * When prompted provide path to the build directory `./dist`.


## Domain redirection

1. If the domain name has not been previously set up on Netlify, follow [these](https://www.youtube.com/watch?v=dGFYGDz9RUA) instructions to set it up.

1. To switch an existing domain name to the new site:

    1. Open Netlify `Domains` dashboard.
    1. In the `DNS records` section delete the existing records for the domain name that has to be reassigned.
    1. Open Netlify `Sites` dashboard.
    1. Click on the newly deployed site card.
    1. Open `Domain management` dashboard for the site.
    1. Click `Add domain alias` and add the domain name. Netlify should recognise that the domain name has previously been used and reassign it to the new site.