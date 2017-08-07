/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path'), fs = require('fs');

var app = express();

var db;

var cloudant;

var fileToUpload;

var dbCredentials = {
	dbName : 'DummyDB'
};


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.multipart());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/view', express.static(path.join(__dirname, '/views/style')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

function initDBConnection(Dbname) {

	dbCredentials.dbName=Dbname;
	
	if(process.env.VCAP_SERVICES) {
		var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
		if(vcapServices.cloudantNoSQLDB) {
			dbCredentials.host = vcapServices.cloudantNoSQLDB[0].credentials.host;
			dbCredentials.port = vcapServices.cloudantNoSQLDB[0].credentials.port;
			dbCredentials.user = vcapServices.cloudantNoSQLDB[0].credentials.username;
			dbCredentials.password = vcapServices.cloudantNoSQLDB[0].credentials.password;
			dbCredentials.url = vcapServices.cloudantNoSQLDB[0].credentials.url;
		}
		console.log('VCAP Services: '+JSON.stringify(process.env.VCAP_SERVICES));
	}
    else{
            dbCredentials.host = "67969bd3-f7fc-437c-aa48-d5e62fb60d82-bluemix.cloudant.com",
			dbCredentials.port = 443;
			dbCredentials.user = "67969bd3-f7fc-437c-aa48-d5e62fb60d82-bluemix",
			dbCredentials.password = "e891834743c83fabf50f36826e16cbf141298362db424c8de1baf42ee46d1955";
			dbCredentials.url = "https://67969bd3-f7fc-437c-aa48-d5e62fb60d82-bluemix:e891834743c83fabf50f36826e16cbf141298362db424c8de1baf42ee46d1955@67969bd3-f7fc-437c-aa48-d5e62fb60d82-bluemix.cloudant.com";
        
    }


	cloudant = require('cloudant')(dbCredentials.url);

	//check if DB exists if not create
	cloudant.db.create(dbCredentials.dbName, function (err, res) {
		if (err) { console.log('could not create db ', err); }
    });
	db = cloudant.use(dbCredentials.dbName);

	console.log(' DB CREATRED Name   : '+dbCredentials.dbName);
}

app.get('/', routes.index);
app.get('/login.html', routes.login);
app.get('/Dashboard.html', routes.Dashboard);
app.get('/SetGoals.html', routes.SetGoals);


app.get('/risktolerance.html', routes.risktolerance);
app.get('/result.html', routes.result);


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

var REST_DATA_POST = '/GIT_Wealthmanagement/POST';
var REST_DATA_PUT = '/GIT_Wealthmanagement/PUT';
var REST_DATA_DELETE = '/GIT_Wealthmanagement/DELETE';
var REST_DATA_GET = '/GIT_Wealthmanagement/GET';
var REST_DATA_CREATEDB = '/GIT_Wealthmanagement/CREATEDB';


app.post(REST_DATA_CREATEDB, function(request, response) {

	console.log(" REST_DATA_CREATEDB");
	var Dbname = request.query.DB;
	// var rev = request.query.rev; // Rev can be fetched from request. if needed, send the rev from client
	console.log("Dbname  : " + Dbname);

	initDBConnection(Dbname);
});


app.post(REST_DATA_POST, function(request, response) {

	console.log(" REST_DATA_POST");
	//var data1={'age' :25 ,'sal':1234 ,'name': 'gaurav','Account': 442432};

	var docid='dbexbcstmr1staticdata';
	var data={'last name' : 'Müller', 'first name' : 'Laura', 'Date of Birth' : '30.07.1987', 'Birthplace' : 'Stuttgart','Nationality':'German', 'Street Name' : 'Maximilanstraße', 'Street Number' :'1', 'Post Code':'80538', 'City':'Munich','Country':'Germany', 'Martial Status':'Married','No. of children' : 0, 'Status of employment' : 'Employed', 'Employer':'Klinikum Großhadern', 'Employed since':'08.2012','Previous Employer':'','Employement time':'','Academic/Educational Status':'M.D.','Annual Income': 100000,'Cash Reserve':50000,'Real Estate Holdings':0,'Portfolio Holdings':0,'Other Assets':1000,'Risk Tolerance':'Conservative','Diversification':'Gloabl Diversification','Initial Investment Nominal':50000};

	console.log("Doc  Id  : " + docid);
	console.log("Data     : " + data);
	db.insert(data,docid, function(err, body, header) {
		if (err)
		{return console.log('Insertion Successfull  ', err.message);
		}
		else
		{
			console.log('Insertion Successfull .');
			console.log(body);
		}
	})

});


app.put(REST_DATA_PUT, function(request, response) {

	console.log(" REST_DATA_PUT");

	var docid='dbexbcstmr1pfdata';
	var data={'t+1: Value Scenario 1':53000,'t+2:Value Scenario 1':56180,'t+3: Value Scenario 1':59550.8,'t+4: Value Scenario 1':63123.848,'t+5: Value Scenario1':66911.27888,'t+6: Value Scenario 1 ':70925.9556128,'t+7: Value Scenario 1':75181.512949568,'t+8: Value Scenario 1':79692.4037265421,'t+9: Value Scenario 1':84473.9479501346,'t+10: Value Scenario 1':89542.3848271427,'t+11: Value Scenario 1':94914.9279167713,'t+12:Value Scenario 1':100609.823591778,'t+13:Value Scenario 1':106646.413007284,'t+14:Value Scenario 1':113045.197787721,'t+15:Value Scenario 1':119827.909654985,'t+16:Value Scenario 1':127017.584234284,'t+17:Value Scenario 1':134638.639288341,'t+18:Value Scenario 1':142716.957645641,'t+19:Value Scenario 1':151279.97510438,'t+20:Value Scenario 1':160356.773610642,'t+1:Value Scenario 2':53500,'t+2:Value Scenario 2':56710,'t+3:Value Scenario 2':60112.6,'t+4:Value Scenario 2':63719.356,'t+5:Value Scenario 2':67542.51736,'t+6:Value Scenario 2':71595.0684016,'t+7:Value Scenario 2':75890.772505696,'t+8:Value Scenario 2':80444.2188560378,'t+9:Value Scenario 2':85270.8719874001,'t+10:Value Scenario 2':90387.1243066441,'t+11:Value Scenario 2':95810.3517650427,'t+12:Value Scenario 2':101558.972870945,'t+13:Value Scenario 2':107652.511243202,'t+14:Value Scenario 2':114111.661917794,'t+15:Value Scenario 2':120958.361632862,'t+16:Value Scenario 2':128215.863330833,'t+17:Value Scenario 2':135908.815130684,'t+18:Value Scenario 2':144063.344038525,'t+19:Value Scenario 2':152707.144680836,'t+20:Value Scenario 2':161869.573361686,'t+1:Value Scenario 3':54000,'t+2:Value Scenario 3':57240,'t+3:Value Scenario 3':60674.4,'t+4:Value Scenario 3':64314.864,'t+5:Value Scenario 3':68173.75584,'t+6:Value Scenario 3':72264.1811904,'t+7:Value Scenario 3':76600.032061824,'t+8:Value Scenario 3':81196.0339855334,'t+9:Value Scenario 3':86067.7960246655,'t+10:Value Scenario 3':91231.8637861454,'t+11:Value Scenario 3':96705.7756133141,'t+12:Value Scenario 3':102508.122150113,'t+13:Value Scenario 3':108658.60947912,'t+14:Value Scenario 3':115178.126047867,'t+15:Value Scenario 3':122088.813610739,'t+16:Value Scenario 3':129414.142427383,'t+17:Value Scenario 3':137178.990973026,'t+18:Value Scenario 3':145409.730431408,'t+19:Value Scenario 3':154134.314257292,'t+20:Value Scenario 3':163382.37311273,'t+1:Value Scenario 4':54500,'t+2:Value Scenario 4':59405,'t+3:Value Scenario 4':64751.45,'t+4:Value Scenario 4':70579.0805,'t+5:Value Scenario 4':76931.197745,'t+6:Value Scenario 4':83855.00554205,'t+7:Value Scenario 4':91401.9560408345,'t+8:Value Scenario 4':99628.1320845097,'t+9:Value Scenario 4':108594.663972116,'t+10:Value Scenario 4':118368.183729606,'t+11:Value Scenario 4':129021.32026527,'t+12:Value Scenario 4':140633.239089145,'t+13:Value Scenario 4':153290.230607168,'t+14:Value Scenario 4':167086.351361813,'t+15:Value Scenario 4':182124.122984376,'t+16:Value Scenario 4':198515.29405297,'t+17:Value Scenario 4':216381.670517737,'t+18:Value Scenario 4':235856.020864334,'t+19:Value Scenario 4':257083.062742124,'t+20:Value Scenario 4':280220.538388915,'t+1:Value Scenario 5':55000,'t+2:Value Scenario 5':60500,'t+3:Value Scenario 5':66550,'t+4:Value Scenario 5':73205,'t+5:Value Scenario 5':80525.5,'t+6:Value Scenario 5':88578.0500000001,'t+7:Value Scenario 5':97435.8550000001,'t+8:Value Scenario 5':107179.4405,'t+9:Value Scenario 5':117897.38455,'t+10:Value Scenario 5':129687.123005,'t+11:Value Scenario 5':142655.8353055,'t+12:Value Scenario 5':156921.41883605,'t+13:Value Scenario 5':172613.560719655,'t+14:Value Scenario 5':189874.916791621,'t+15:Value Scenario 5':208862.408470783,'t+16:Value Scenario 5':229748.649317861,'t+17:Value Scenario 5':252723.514249647,'t+18:Value Scenario 5':277995.865674612,'t+19:Value Scenario 5':305795.452242073,'t+20:Value Scenario 5':336374.997466281,'t+1:Value Scenario 6':52500,'t+2:Value Scenario 6':55125,'t+3:Value Scenario 6':57881.25,'t+4:Value Scenario 6':60775.3125,'t+5:Value Scenario 6':63814.078125,'t+6:Value Scenario 6':67004.78203125,'t+7:Value Scenario 6':70355.0211328125,'t+8:Value Scenario 6':73872.7721894531,'t+9:Value Scenario 6':77566.4107989258,'t+10:Value Scenario 6':81444.7313388721,'t+11:Value Scenario 6':85516.9679058157,'t+12:Value Scenario 6':89792.8163011065,'t+13:Value Scenario 6':94282.4571161618,'t+14:Value Scenario 6':98996.5799719699,'t+15:Value Scenario 6':103946.408970568,'t+16:Value Scenario 6':109143.729419097,'t+17:Value Scenario 6':114600.915890052,'t+18:Value Scenario 6':120330.961684554,'t+19:Value Scenario 6':126347.509768782,'t+20:Value Scenario 6':132664.885257221,'t+1:Value Scenario 7':55500,'t+2:Value Scenario 7':61605,'t+3:Value Scenario 7':68381.55,'t+4:Value Scenario 7':75903.5205,'t+5:Value Scenario 7':84252.907755,'t+6:Value Scenario 7':93520.72760805,'t+7:Value Scenario 7':103808.007644936,'t+8:Value Scenario 7':115226.888485878,'t+9:Value Scenario 7':127901.846219325,'t+10:Value Scenario 7':141971.049303451,'t+11:Value Scenario 7':157587.864726831,'t+12:Value Scenario 7':174922.529846782,'t+13:Value Scenario 7':194164.008129928,'t+14:Value Scenario 7':215522.04902422,'t+15:Value Scenario 7':239229.474416884,'t+16:Value Scenario 7':265544.716602741,'t+17:Value Scenario 7':294754.635429043,'t+18:Value Scenario 7':327177.645326238,'t+19:Value Scenario 7':363167.186312124,'t+20:Value Scenario 7':403115.576806458,'t+1:Value Scenario 8':56000,'t+2:Value Scenario 8':62720,'t+3:Value Scenario 8':70246.4,'t+4:Value Scenario 8':78675.968,'t+5:Value Scenario 8':88117.0841600001,'t+6:Value Scenario 8':98691.1342592001,'t+7:Value Scenario 8':110534.070370304,'t+8:Value Scenario 8':123798.158814741,'t+9:Value Scenario 8':138653.937872509,'t+10:Value Scenario 8':155292.410417211,'t+11:Value Scenario 8':173927.499667276,'t+12:Value Scenario 8':194798.799627349,'t+13:Value Scenario 8':218174.655582631,'t+14:Value Scenario 8':244355.614252547,'t+15:Value Scenario 8':273678.287962852,'t+16:Value Scenario 8':306519.682518395,'t+17:Value Scenario 8':343302.044420602,'t+18:Value Scenario 8':384498.289751074,'t+19:Value Scenario 8':430638.084521203,'t+20:Value Scenario 8':482314.654663748,

	};

	console.log("Doc  Id  : " + docid);
	console.log("Data     : " + data);
	db.insert(data,docid, function(err, body, header) {
		if (err)
		{return console.log('Insertion Successfull  ', err.message);
		}
		else
		{
			console.log('Insertion Successfull .');
			console.log(body);
		}
	})
	
});


app.del(REST_DATA_DELETE, function(request, response) {

	console.log(" REST_DATA_DELETE");
	var docid = request.query.docid;
	console.log("Doc  Deleted  : " + docid);

});


app.get(REST_DATA_GET, function(request, response) {

	console.log("  REST_DATA_GET");

	var docid='dbexbcstmr1pfdata';
	console.log("Doc  Id  : " + docid);

	db.get(docid, function(err, data) {
		if (err)
		{return console.log('[get API error ] ', err.message);
		}
		else
		{
			console.log(data);
			response.json(data);
			response.end;
		}
	});

});































