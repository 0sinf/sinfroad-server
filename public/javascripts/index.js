var host = 'localhost:3000';

var container = document.getElementById('map');
var options = {
  center: new kakao.maps.LatLng(33.37903821496581, 126.55043597716713),
  level: 9,
  scrollwheel: false,
};
var map = new kakao.maps.Map(container, options);

function viewTotal() {
  var container = document.getElementById('map');
  container.innerHTML = '';
  var options = {
    center: new kakao.maps.LatLng(33.37903821496581, 126.55043597716713),
    level: 9,
    scrollwheel: false,
  };
  var map = new kakao.maps.Map(container, options);

  fetch(`http://${host}/api/stores`).then(data => {
    return data.json();
  }).then(stores => {
    for (let store of stores) {
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(store.addr, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });
          var infowindow = new kakao.maps.InfoWindow({
            content : `<div style="width:150px; text-align:center;">${store.name}</div>`
          })

          kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }
      })
    }
  })
}

function viewPart(e) {
  var container = document.getElementById('map');
  container.innerHTML = '';
  var options = {
    center: new kakao.maps.LatLng(33.37903821496581, 126.55043597716713),
    level: 9,
    scrollwheel: false,
  };
  var map = new kakao.maps.Map(container, options);
  // console.log(e.id);

  fetch(`http://${host}/api/stores/${e.id}`).then(data => {
    return data.json();
  }).then(stores => {
    for (let store of stores) {
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(store.addr, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });
          var infowindow = new kakao.maps.InfoWindow({
            content : `<div style="width:150px; text-align:center;">${store.name}</div>`
          })

          kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }
      })
    }
  })
}



function makeOverListener(map, marker, infowindow) {
  return function() {
    infowindow.open(map, marker);
  }
}

function makeOutListener(infowindow) {
  return function() {
    infowindow.close();
  }
}