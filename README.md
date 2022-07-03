# Creator Tools App

## Running locally
Make sure you have node installed with `node -v`. If not, install [NVM](https://github.com/nvm-sh/nvm) and use it to install the latest node version `nvm install node`, then:
- `npm install`
- `npm start`

## Deployment
Deploying is currently manual. Install and configure the [AWS cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [s3cmd](https://github.com/s3tools/s3cmd/blob/master/INSTALL.md) and then run:
- `npm run build`
- `s3cmd sync build/* s3://creator-tools-dev`
- `aws cloudfront create-invalidation --distribution-id E2U2ZSHVSQ9H99 --paths "/*"`