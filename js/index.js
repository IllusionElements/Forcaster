$(document).ready(function() {
  var countr = ["US", "BS", "BZ", "KY", "PW"];
  var condition = $('#data');
  var ico = $('.icon');

  $('#info').click(function() {
    $('#about').addClass('hidden');
    $('#more').removeClass('hidden');
  });
  $('.close').click(function() {
    $('#more').addClass('hidden');
  });

  $('#inf').click(function() {
    $('#more').addClass('hidden');
    $('#about').removeClass('hidden');
  });

  $('#clos').click(function() {
    $('#about').addClass('hidden');
  });

  function getLocation() {
    if (!navigator.geolocation) {
      $('#err').html("Geolocation is not supported by your browser");

    }
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    var lati = position.coords.latitude;
    var long = position.coords.longitude;
    doFetchWeather(lati, long).then(function(p) {
      var celsius = Math.round(p - 273.15);
      var farenheit = Math.round((celsius * 1.8) + 32);
      for (var i = 0; i < countr.length; i++) {
        if (country === countr[i]) {
          $('#temp').html(farenheit + "&#8457");
        } else {
          $('#temp').html(celsius + "&#8451");
        }
      }
      
      $('#cel').click(function() {
        $('#temp').html(celsius + "&#8451");
          
        
      });
       $('#far').click(function() {
          $('#temp').html(farenheit + "&#8457");
      });

    });

    function doFetchWeather(lati, long) {
      var temp = 0;
      var dfd = $.Deferred();
      var url = "http://api.openweathermap.org/data/2.5/weather?lat=";
      url += lati;
      url += '&lon=';
      url += long;
      url += '&cnt=1';

      $.ajax({
        type: "POST",
        jsonp: "jsonp",
        url: url + '&callback=',
        async: false,
        success: function(data) {
          temperature = data.main.temp;
          area = data.name;
          country = data.sys.country;
          status = data.weather[0].id;
          pressure = data.main.pressure;
          humidity = data.main.humidity;
          min = data.main.temp_min;
          max = data.main.temp_max;
          sunset = data.sys.sunset;
          sunrise = data.sys.sunrise;
          time = data.dt;
          var rt = moment(sunset).format("hh:mm");
          var nt = moment(sunrise).format("hh:mm");
          $('#sunset').html('Sunset is at'+ " "+ rt+"UTC")
          $('#sunrise').html('Sunrise is at'+" "+nt+"UTC")
          if (time < sunset && time < sunrise) {
            $('.hero').css({
              'background': "url('https://images.unsplash.com/photo-1430760814266-9c81759e5e55?q=80&fm=jpg&s=3276a313ddc63ffca3ce9c6c78c53b62') no-repeat 0px -300px"
            });
            $('.hero h1').css({
              'color': '#fff'
            })
            $('.hero p').css({
              'color': '#fff'
            })
            console.log('time');
          }
          if (time < sunset && time < sunrise && status === "800") {
            $('.icon').html('<img src="http://openweathermap.org/img/w/01n.png" class="tall">')
            console.log(status !== 800);
          } else {
            $('.icon').html('<img src="http://openweathermap.org/img/w/01d.png" class="tall">')
            console.log(false);
          }
          condition.html(data.weather[0].id);
          $('#location').html(area);
          $('#humid').html('<em><b>Humidity</b></em>:</br>' + " " + humidity);
          $('#pressure').html('<em><b>Pressure</b></em>:</br> ' + "  " + Math.round((pressure / 10) / 101.325) + " atm");
          var minc = Math.round(min - 273.15);
          var maxc = Math.round(max - 273.15);
          var minf = Math.round((minc * 1.8) + 32);
          var maxf = Math.round((maxc * 1.8) + 32);
          var ws = data.wind.speed;
          var wd = data.wind.deg;
          $('.wind').html("The wind is blowing at " + ws+" m/s at "+wd+" degrees");
          
          for (var i = 0; i < countr.length; i++) {
            if (country === countr[i]) {
              $('#low').html('Today' + "'" + 's low was' + "&#8457" + minf);
              $('#high').html('Today' + "'" + 's high was' + "&#8457" + maxf);
            } else {
              $('#low').html('Today' + "'" + 's low was' + " " + minc + "&#8451");
              $('#high').html('Today' + "'" + 's high was' + " " + maxc + "&#8451");
            }
          }
          switch (status) {
            //thunderstorms
            case '200':
            case '210':
            case '230':
              condition.html('Light Thundershowers');
              ico.html('<img src="http://openweathermap.org/img/w/011d.png" class="tall">')
              $('.hero').css({
                'background': "url('https://images.unsplash.com/photo-1434077471918-4ea96e6e45d5?q=80&fm=jpg&s=03b099f2e515d86a05f68db7edef0da7') no-repeat 0px -300px"
              });
              $('.hero h1').css({
                'color': '#fff'
              });
              $('.hero p').css({
                'color': '#fff'
              });
              break;
            case '201':
            case '211':
            case '231':
              condition.html('Thunderstorm');
              ico.html('<img src="http://openweathermap.org/img/w/011d.png" class="tall">')
              $('.hero').css({
                'background': "url('https://images.unsplash.com/photo-1434077471918-4ea96e6e45d5?q=80&fm=jpg&s=03b099f2e515d86a05f68db7edef0da7') no-repeat 0px -300px"
              });
              $('.hero h1').css({
                'color': '#fff'
              });
              $('.hero p').css({
                'color': '#fff'
              });
              break;
            case '202':
            case '212':
            case '221':
            case '232':
              condition.html('Risk of strong thunderstorms');
              ico.html('<img src="http://openweathermap.org/img/w/011d.png" class="tall">')
              $('.hero').css({
                'background': "url('https://images.unsplash.com/photo-1434077471918-4ea96e6e45d5?q=80&fm=jpg&s=03b099f2e515d86a05f68db7edef0da7') no-repeat 0px -300px"
              });
              $('.hero h1').css({
                'color': '#fff'
              });
              $('.hero p').css({
                'color': '#fff'
              });
              break;
              //start drizzle//
            case '300':
            case '310':
            case '321':
              condition.html('Light drizzle');
              ico.html('<img src="http://openweathermap.org/img/w/09d.png" class="tall">');
              $('.hero').css({
                'background': "url('https://images.unsplash.com/photo-1432836431433-925d3cc0a5cd?q=80&fm=jpg&s=97a1e6c0e5adecf5dc6d53e17d6bc581') no-repeat 0px -300px"
              });
              $('.hero h1').css({
                'color': '#fff'
              })
              $('.hero p').css({
                'color': '#fff'
              });
              $('.hero').css({
                'background-size': 'cover'
              })
              $('.hero').css({
                'background-position': 'center'
              })
              break;
            case '301':
            case '311':
            case '313':
              condition.html('Drizzle with a chance for showers');
              ico.html('<img src="http://openweathermap.org/img/w/09d.png" class="tall">');
              $('.hero').css({
                'background': "url('https://images.unsplash.com/photo-1432836431433-925d3cc0a5cd?q=80&fm=jpg&s=97a1e6c0e5adecf5dc6d53e17d6bc581') no-repeat 0px -300px"
              });
              $('.hero').css({
                'background-size': 'cover'
              })
              $('.hero').css({
                'background-position': 'center'
              })
              break;
            case '302':
            case '312':
            case '314':
              condition.html('Heavy Drizzle');
              ico.html('<img src="http://openweathermap.org/img/w/09d.png" class="tall">');
              $('.hero').css({
                'background': "url('https://images.unsplash.com/photo-1432836431433-925d3cc0a5cd?q=80&fm=jpg&s=97a1e6c0e5adecf5dc6d53e17d6bc581') no-repeat 0px -300px"
              });
              $('.hero').css({
                'background-size': 'cover'
              })
              $('.hero').css({
                'background-position': 'center'
              })
              $('.hero').css({
                'background-size': 'cover'
              })
              $('.hero').css({
                'background-position': 'center'
              })
              break;
              //rain
            case '500':
            case '501':
            case '520':
            case '521':
              condition.html('it' + "'" + 's raining, better grab your umbrella!');
              ico.html('<img src="http://openweathermap.org/img/w/010d.png" class="tall">');
              $('.hero').css({
                'background': "url('https://images.unsplash.com/photo-1432836431433-925d3cc0a5cd?q=80&fm=jpg&s=97a1e6c0e5adecf5dc6d53e17d6bc581') no-repeat 0px -300px"
              });
              $('.hero').css({
                'background-size': 'cover'
              })
              $('.hero').css({
                'background-position': 'center'
              })
              break;
            case '502':
            case '503':
            case '504':
            case '522':
            case '531':
              condition.html('Heavy Rain');
              ico.html('<img src="http://openweathermap.org/img/w/010d.png" class="tall">');
              $('.hero').css({
                'background': "url('https://images.unsplash.com/photo-1432836431433-925d3cc0a5cd?q=80&fm=jpg&s=97a1e6c0e5adecf5dc6d53e17d6bc581') no-repeat 0px -300px"
              });
              $('.hero').css({
                'background-size': 'cover'
              })
              $('.hero').css({
                'background-position': 'center'
              })
              break;
            case '511':
              condition.html('Freezing Rain');
              ico.html('<img src="http://openweathermap.org/img/w/013d.png" class="tall">');
              break;

              //           snow
            case '600':
            case '601':
            case '602':
              condition.html('snowing');
              ico.html('<img src="http://openweathermap.org/img/w/013d.png" class="tall">');
              $('.hero').css({
                'background': "url('              https://images.unsplash.com/photo-1427955569621-3e494de2b1d2?q=80&fm=jpg&s=8d55df1cba9a968931f3fe05edb349c4') no-repeat 0px -300px"
              });
              $('.hero').css({
                'background-size': 'cover'
              })
              $('.hero').css({
                'background-position': 'center'
              })
              break;
            case '612':
            case '615':
            case '616':
            case '620':
            case '621':
            case '622':
              condition.html('rain and snow');
              ico.html('<img src="http://openweathermap.org/img/w/013d.png" class="tall">');
              break;

            case '800':
              condition.html('Clear Skies');
              break;
            case '801':
            case '802':
            case '803':
              condition.html('partly cloudy');
              ico.html('<img src="http://openweathermap.org/img/w/03d.png" class="tall">');
              $('.hero').css({
                'background': "url('https://images.unsplash.com/photo-1427806208781-b36531cb09ef?q=80&fm=jpg&s=9c621982dc689e87bc9dbf6cacd09dc6') no-repeat 0px -50px"
              });
              $('.hero').css({
                'background-size': 'cover'
              })
              $('.hero').css({
                'background-position': 'center'
              })
              $('.hero h1').css({
                'color': '#ECF0F1'
              });
              $('.hero p').css({
                'color': '#fff'
              });
              break;
            case '804':
              condition.html('overcast');
              ico.html('<img src="http://openweathermap.org/img/w/04d.png" class="tall">');
              break;
            default:
              break;

          }

          dfd.resolve(temperature);
          dfd.resolve(country);
          dfd.resolve();
        },
        error: function(errorData) {
          console.log(errorData);
          alert("Error while getting weather data :: " + errorData.status);
        }

      });
      return dfd.promise();

    }

  }
  getLocation();
});