var host = 'http://localhost:3000';


var map = callMap();

function viewTotal() {
  var map = callMap();

  fetch(`${host}/api/stores`).then(data => {
    return data.json();
  }).then(stores => {
    makeMarker(map, stores);

    var total = document.getElementById('total');
    total.classList.add('active');
  })
}

function viewPart(e) {
  var map = callMap();

  fetch(`${host}/api/stores/${e.id}`).then(data => {
    return data.json();
  }).then(stores => {
    makeMarker(map, stores);

    var part = document.getElementById(e.id);
    part.classList.add('active');
  })
}

var openBox = null;

function makeMarker(map, stores) {
  for (let store of stores) {
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(store.addr, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 식당과 카페 marker 다르게 한다. store의 part로 marker image 선택하도록 조건문
        if (store.part === 'restaurant') {
          var imageSrc = `${host}/images/green_marker.png`;
          var imageSize = new kakao.maps.Size(30, 35);
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        } else if (store.part === 'cafe') {
          var imageSrc = `${host}/images/blue_marker.png`;
          var imageSize = new kakao.maps.Size(30, 35);
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        }

        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          clickable: true,
          image: markerImage
        });

        var infowindow = new kakao.maps.InfoWindow({
          content : `<div style="width:150px; text-align:center;">${store.name}</div>`
        })

        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        var infoBox = new kakao.maps.InfoWindow({
          content: `
          <div class="wrap">
            <div class="info">
            <h3>${store.name} <a href="${store.nLink}" style="color:green;">N</a></h3>
            <span style="font-size: 16px;">${store.review}</span>
            </div>
          </div>`,
          position: marker.getPosition()
        })
        
        kakao.maps.event.addListener(marker, 'click', function() {
          // 처음에 클릭할 때
          if (openBox == null) {
            infoBox.open(map, marker);
            openBox = infoBox;
          } 
          // 이미 열린 창이 있고, 다른 마커 클릭할 때
          else if (openBox != null && openBox != infoBox) {
            openBox.close();
            openBox = infoBox;
            openBox.open(map, marker);
          }
          // 이미 열린 창, 같은 마커 클릭
          else if (openBox != null && openBox == infoBox) {
            openBox.close();
            openBox = null;
          }
        })

        kakao.maps.event.addListener(map, 'click', function() {
          infoBox.close();
          openBox = null;
        })


        
        // selectMarker = null;
        // kakao.maps.event.addListener(marker, 'click', function() {
        //   if (!selectMarker || selectMarker !== marker) {
        //     var detail = document.getElementById('detail');
        //     detail.style.visibility = 'visible';
        //     detail.innerHTML = `
        //     <div class="container my-3">
        //       <h2>${store.name}</h2>
        //       <p>${store.review}</p>
        //       <p>${store.addr}</p>
        //     </div>
        //     `;
        //     // info window로 출력하도록 변경 예정
        //   }
        //   selectMarker = marker;
        // })
      }
    })
  }
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

// function closeInfoBox() {
//   return function() {
//     infoBox.close();
//   }
// }
