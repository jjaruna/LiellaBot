// Libreria
var Twit = require('twit');

// Configuracion del sistema
var T = new Twit(require('./config.js'));

// # a retwittear
var mediaArtsSearch = {q: "#Liella", count: 15, result_type: "recent"}

// Esta funcion hace que busque y Retwitee lo del #
function retweetLatest() {
	T.get('search/tweets', mediaArtsSearch, function (error, data) {
	  // errores en consola
	  console.log(error, data);
	  //
	  if (!error) {
	  	// 
		var retweetId = data.statuses[0].id_str;
		// 
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('¡Éxito! Revisa tu bot, debería haber retuiteado algo.')
			}
			// Error si la API de TW no responde
			if (error) {
				console.log('Hubo un error con Twitter:', error);
			}
		})
	  }
	  // Error si no encuentra nada del ##
	  else {
	  	console.log('Hubo un error con tu búsqueda de hashtag:', error);
	  }
	});
}

// Retwitea lo ultimo
retweetLatest();
// 
// 1000 ms = 1 s, 1 sec * 60 = 1 min, 1 min * 60 = 1 hora --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 60);

//******************************************************SUBIR FOTO RANDOM A TWITTER*************************************************


var Twit = require('twit')

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

function random_from_array(images){
  return images[Math.floor(Math.random() * images.length)];
}

function upload_random_image(images){
  console.log('Eligiendo una Imagen...');
  var image_path = path.join(__dirname, '/Images/' + 
random_from_array(images)),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Subiendo...');

  T.post('media/upload', { media_data: b64content }, function (err, data, 
response) {
    if (err){
      console.log('ERROR:');
      console.log(err);
    }
    else{
      console.log('Subida!');

      T.post('statuses/update', {          
        status: random_from_array([
          '#Liella',
          '#LoveLive'
        ]),
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('ERROR:');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}


fs.readdir(__dirname + '/Images', function(err, files) {
   if (err){
    console.log(err);
  }
  else{
    var images = [];
    files.forEach(function(f) {
      images.push(f);
    });

  /*
60000 = 60 segundos = 1 minuto
  */
    setInterval(function(){
      upload_random_image(images);
    }, 10800000);
  }
});
