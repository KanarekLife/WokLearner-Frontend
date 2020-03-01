# WokLearner-Frontend
Created by KanarekLife and Kubsztajn @ 2020

### How to setup?
1. Git pull https://github.com/KanarekLife/WokLearner-Frontend
2. Download all packages by entering `npm install`
3. Modify `src/environments/environment.prod.ts` and set working url for API
4. Compile project by entering `ng build --prod --aot`
5. Install some sort of webserver on server (Personally I recommend Nginx)
6. Transfer built files from `dist` folder onto server

### How to update?
Do all the steps from `How to setup?` section

#### Project unfortunately was being created in a hurry so I didn't have time to design unit and integration tests. Please be careful while modifying!
