var link = "static/data/neighbourhoods.geojson";
var link2= "static/data/listings.geojson";

d3.json(link2, function(data2){
  console.log(data2);
  createFeatures(data2.features);
});
function createFeatures(properties) {
  function onEachFeature(feature, layer) {
      layer.bindPopup ("<h3>"+"Price: " + feature.properties.price +"$ per night"+
        "</h3><p>" +"Property type: "+ feature.properties.room_type + "</p>"+
        "</h3><hr><p>" +"Neighborhood: "+ feature.properties.neighbourhood + "</p>")
      //  "</h3><hr><p>" +"Address: "+ feature.properties.address + "</p>"+
      //  "</h3><hr><p>" +"City: "+ feature.properties.city + "</p>"+
      //  "</h3><hr><p>" + "Phone: "+ feature.properties.phone + "</p>")
    }
    
    var prop = L.geoJSON(properties, {
      onEachFeature: onEachFeature
    });
    createMap(prop);



function createMap(prop) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
  
};


d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  console.log(data);
  createFeatures(data.features);
});


function createFeatures(neigbourhoods) {
  function onEachFeature(feature, layer) {
      layer.bindPopup ("<h3>"+"Neighborhood: " + feature.properties.neighbourhood)//+
    //  "</h3><p>" +"Number of Properties Listed: "+ feature.properties. + "</p>"+
    //  "</h3><hr><p>" +"Neighborhood: "+ feature.properties.neighbourhood + "</p>")
    //  "</h3><hr><p>" +"Address: "+ feature.properties.address + "</p>"+
    //  "</h3><hr><p>" +"City: "+ feature.properties.city + "</p>"+
    //  "</h3><hr><p>" + "Phone: "+ feature.properties.phone + "</p>") 
      
    }
    var neigb = L.geoJSON(neigbourhoods, {
      onEachFeature: onEachFeature
    });
    createMap(neigb);

}

function createMap(neigb) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
  
}; 

var overlayMaps = {
  properties: prop,
  neigbourhoods: neigb
  
};
var map = L.map("map", {
  center: [
      43.6532, -79.3832
  ],
  zoom: 11,
  layers: [streetmap, prop, neigb]
});
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);


}
}

}