Get started with NodeJSCloudant
-------------------------------------
This is a boilerplate application for Node.js with Cloudant service.

The sample is a Favorites Organizer application, that allows users to organize and manage their files in different categories, while those files are persisted into the database in the background. This application supports uploading files of different types. In the sample, it clearly demonstrates how to access the database service that binds to the application using cradle node.js API.

1. [Install the cf command-line tool](https://www.eu-gb.bluemix.net/docs/#starters/buildingweb.html#install_cf).
2. [Download the starter application package](https://console-classic-20150717-102441.eu-gb.bluemix.net:443/rest/../rest/apps/23f185dc-0f7d-4396-ad2b-5a353492f64d/starter-download).
3. Extract the package and 'cd' to it.
4. Connect to Bluemix:

		cf api https://api.eu-gb.bluemix.net

5. Log into Bluemix:

		cf login -u gjoshi@de.ibm.com
		cf target -o gjoshi@de.ibm.com -s dev
		
		
		password: frankfurt1572015
6. Deploy your app:

		cf push NodeJSCloudant -c "node app.js" -m 512M

7. Access your app: [NodeJSCloudant.eu-gb.mybluemix.net](http://NodeJSCloudant.eu-gb.mybluemix.net)
