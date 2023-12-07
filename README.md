# FIXIE POC on Appsync
This POC is for Fixie.ai assistant build upon AWS Appsync GraphQL API

AWS resources are deployed using SAM.
You need AWS CLI and SAM CLI installed

```sh
cd appsync
sam build
sam deploy --guided
```

## running fixie agent
```sh
cd fixie
```

1. create an account on [FIXIE](https://fixie.ai)
2. create new data coprus
3. upload rule files form `corpus` folder
4. set `fixie/.env` file with corpus id
5. set `fixie/.env` file with your API KEY
6. set `src/index.tsx` with the API URL

1. install dependencies
```sh
npx fixie
npm uninstall
```
2. authenticate
```sh
npx fixie auth
```
3. run locally
```ah
npx fixie serve
```