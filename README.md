#  Numeral_McNumberFace [API]

* clone this repo via the bundle pack
```
> git clone nikkomesina.bundle ./
```
* npm install 
> please do not yet install in production mode, as it will ignore the dev dependencies, and test automation will not work.
*  Setup the appropriate .env values, or at least have it set on your machine's environment variables. you can also just rename `template.env` file to `.env`
* run the server: 
	```
	> npm run dev
	```
	or
	```
	> node server.js	
	```
* running the JestJS [https://jestjs.io/] test automation :
	``` 
	> npm run test
	```
	or simply run:
	``` 
	> jest
	```
	it is already configured at `jest.config.js`, and is also open for adjustments,
	however, it may require jest to be installed globally in order to run jest commands.
	I would recommend running the npm script instead. 
	

#  Requirements
*This API stores and fetches the data in MongoDB.*

-  nodejs: ^14.0.0
-  mongoDB: ^3.0.0