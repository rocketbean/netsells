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
	
#  API Endpoints
you can check the route endpoints at `./container/routes/http/api.js`, 
let's set our base url as "http://localhost:3000/", 
*you can always change this on your `.env` or `config/server.js`*
* you will also be able to see the routes information when you run the server as [dev]. such as (Method, Path, Middlewares, Route Group, etc.)
* it will also display information about DB's where Chasi have active connections, you can check it on `./config/database.js`

 * [x] [POST]
       http://localhost:3000/api/conversions/[:type]/convert/[:value]
       	- Dynamic Params {[`:type` || ConversionType 'roman'], [`:value || the value to be converted]}
       	- this endpoint is for triggering the conversion and storing it to the DB. 	
       	- e.g.  -> http://localhost:3000/api/conversions/roman/convert/200
       
*Response:*
``` 

		{
			"type":  "Roman",
			"value":  2,
			"converted":  "II",
			"count":  1
		}
```
 * [x] [POST]
       http://localhost:3000/api/conversions/[:type]/recent/[*optional* :items]
       	- Dynamic Params {[`:type` || ConversionType 'roman'], [`:items`|| the numbers of items returned, `10 is the default`]}
       	- this endpoint is listing the latest conversions. 	
       	-  -> http://localhost:3000/api/conversions/roman/recent
       	-  -> http://localhost:3000/api/conversions/roman/recent/1
       
*Response:*
``` 

[
	{
	"type":  "Roman",
	"value":  2,
	"converted":  "II",
	"count":  1,
	"createdAt":  "2022-06-28T04:01:41.384Z",
	"updatedAt":  "2022-06-28T04:01:41.384Z"
	}
]
```

 * [x] [POST]
       http://localhost:3000/api/conversions/[:type]/top/[*optional* :items]
       	- Dynamic Params {[`:type` || ConversionType 'roman'], [`:items`|| the numbers of items returned, `10 is the default`]}
       	- this endpoint is for listing the most converted  integer. 	
       	-  -> http://localhost:3000/api/conversions/roman/top
       	-  -> http://localhost:3000/api/conversions/roman/top/1
       
*Response:*
``` 

[
	{
	"value":  42,
	"converted":  "XLII",
	"count":  6
	}
]
```

the response data structure can be manipulated in `./container/modules/Transformer/transformers/ConversionTransformer.js` 
in the `format` property. or it can also be altered in the controller itself by calling [include, exclude] method.
`./container/controllers/ConversionController.js`.

#  Requirements
*This API stores and fetches the data in MongoDB.*

-  nodejs: ^14.0.0
-  mongoDB: ^3.0.0