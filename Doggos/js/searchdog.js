// Angular.js funktion för att visa sökning i lista
angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('TypeaheadCtrl', function($scope, $http) {

  var _selected;

  $scope.selected = undefined;
    // En array av hundar som går att söka på
  $scope.dogs = ['Chihuahua', 'Schäfer', 'Pitbull', 'Bulldogg', 'Pudel', 'Malteser', 'Chihuahua Korthårig', 'Bostonterrier', 'Mops', 'Golden retriever', 'Labrador retriever', 'Gårdshund Skåning', 'Border Collie', 'Tibetansk spaniel', 'Gordon setter', 'Engelsk setter', 'King charles spaniel', 'Yorkshireterrier', 'Tax', 'Beagle', 'Boxer', 'Dvärgschnauzer', 'Shih tzu', 'Engelsk Bulldogg', 'Tysk spets', 'Cocker spaniel', 'Fransk bulldogg', 'Rottweiler', 'Engelsk setter', 'Engelsk springer spaniel', 'Korthårig vorsteh', 'Staffordshire bullterrier', 'Shetland sheepdog', 'Dobermann', 'White terrier', 'Berner sennenhund', 'Grand danois', 'Breton', 'Affenpinscher', 'Afghanhund', 'American Bulldogg', 'American Eskimo dog', 'Alpenländische dachsbracke', 'Australiensk fårhund', 'Drever', 'Siberian Husky'];
    
  $scope.dogs.sort();
    // Visar resultaten i bokstavsordning

  $scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
  };

  $scope.ngModelOptionsSelected = function(value) {
    if (arguments.length) {
      _selected = value;
    } else {
      return _selected;
    }
  };

  $scope.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };
});