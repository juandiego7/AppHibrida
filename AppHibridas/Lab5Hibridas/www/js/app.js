angular.module('starter', ['ionic'])
.controller('weather',function($scope,$http,$window){

  $window.navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude
    var lon = position.coords.longitude
    $scope.$apply(function(){
      $scope.lat = lat;
      $scope.lon = lon;
      $scope.geolocation = true;
      if ($scope.lat.length==0) {
        $scope.geolocation = false;
      }
    });
    getWeather(lat,lon);
  });

  $scope.cityList = ["Medellin","Bogota","Cali","Cartagena","Barranquilla","Cucuta","Soledad","Ibague","Bucaramanga","Soacha","Santa marta","Villavicencio","Bello","Pereira","Valledupar","Buenaventura","Pasto","Manizales","Monteria","Neiva"];  
  
  $scope.complete = function(string){  
    $scope.hidethis = false;  
    var output = [];  
    angular.forEach($scope.cityList, function(city){  
      if(city.toLowerCase().indexOf(string.toLowerCase()) >= 0 && $scope.city.length > 0)  
      {  
        output.push(city);  
      }  
    });  
    $scope.filterCity = output;  
  }  
  
  $scope.fillTextbox = function(string){  
    $scope.city = string;  
    $scope.hidethis = true;  
  }  

  $scope.changeCity = function(city){
    if (city != null && city.length != 0){
      $scope.loading = true;
      $http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&mode=json&units=metric&cnt=1&appid=7dfaaf35bd351e5049b4cb542ce2ebd6')
      .success(function(data){
        $scope.changed = true;
        $scope.newCurrentWeather = data;
        $scope.city = '';
        $scope.loading = false;
      })
      .error(function(err){
        console.log(err);
      });
    }
  }

  function getWeather(latitude, longitude) {
    $scope.load = true;
    var OpenWeatherAppKey = "7dfaaf35bd351e5049b4cb542ce2ebd6";
    $http.get('http://api.openweathermap.org/data/2.5/weather?lat='
    + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial')
    .success(function(data){
      $scope.currentWeather = data;
      $scope.load = false;
    })
    .error(function(err){
      console.log(err);           
    });  
  }
    
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})