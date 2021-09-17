var host = 'http://localhost:3000';


var map = callMap();

function main() {
  callMap();
}

function intro() {
  var main = document.getElementById('main');
  main.innerHTML = `
  <a href="https://github.com/younGsse/scenespick" style="font-size:64px;">Github</a>
  `;
}

// 함수로 맵을 불러오니 지도 다시 안불러오고 마커만 변경된다. 뭐지?
function callMap() {
  var main = document.getElementById('main');
  // main.classList.replace('flex-column', 'flex-row');
  main.innerHTML = `
  <!--  side bar -->
  <div class="sidebar d-flex flex-row justify-content-between">
    <ul class="list-group list-group-horizontal">
      <li class="list-group-item" onclick="viewTotal()" id="total">전체</li>
      <li class="list-group-item" onclick="viewPart(this)" id="restaurant">식당</li>
      <li class="list-group-item" onclick="viewPart(this)" id="cafe">카페</li>
    </ul>
    <ul class="list-group list-group-horizontal d-flex justify-content-end">
      <li class="list-group-item active" onclick="callMap()">map</li>
      <li class="list-group-item" onclick="callTab()">tab</li>
    </ul>
  </div>
  <!-- map -->
  <div id="map" style="width:100%; height: 70vh; border-radius: 4px;">
    <button class="btn btn-secondary list-group-item" id="myLocation" style="z-index:2; margin:4px;"><i class="fas fa-crosshairs"></i></button>
  </div>
  `;

  var container = document.getElementById('map');
  var options = {
    center: new kakao.maps.LatLng(33.37903821496581, 126.55043597716713),
    level: 9,
  };
  var map = new kakao.maps.Map(container, options);

  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


  // 맵 안에 버튼 만들기 어떻게 하지?
  // 맵 컨테이너 안에 버튼 만들고 z-index 끌올

  // 현재 위치 컨트롤러
  var myLocation = document.getElementById('myLocation');
  myLocation.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // 현재 위치의 위도 경도 받아옴.
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        if ((lat < 33.1138 || lat > 33.2854) && (lng < 126.1059 || lng > 126.5657)) {
          alert('현재 위치가 제주도가 아닙니다.');
          return false;
        }

        var locPosition = new kakao.maps.LatLng(lat, lng);

        // 마커 이미지 옵션
        var imageSrc = `${host}/images/myLocation_marker.png`;
        var imageSize = new kakao.maps.Size(48, 50);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커 생성
        var marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
          clickable: true,
          image: markerImage
        })

        // 맵 마커 중심으로 옮김
        map.setCenter(locPosition);

        // 클릭 시 마커 사라짐
        kakao.maps.event.addListener(marker, 'click', function() {
          marker.setMap(null);
        })

      })
    } else {
      console.log('cannot use geolocation');
    }
  })

  return map;
}


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
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          clickable: true
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



function callTab() {
  var main = document.getElementById('main');
  // main.classList.replace('flex-row', 'flex-column');
  main.innerHTML = `
  <div class="mb-3">
    <ul class="list-group list-group-horizontal d-flex justify-content-end">
      <li class="list-group-item" onclick="callMap()">map</li>
      <li class="list-group-item active" onclick="callTab()">tab</li>
    </ul>
  </div>
  <div class="d-flex flex-row">
    <input type="text" class="form-control" id="input" placeholder="search">
  </div>
  `;
  // table 검색기능, 페이징 기능
  var table = document.createElement('table');
  table.className = 'table';
  table.id = 'table';

  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');

  fetch(`${host}/api/stores`).then(data => {
    return data.json();
  }).then(stores => {

    var tr = document.createElement('tr');
    tr.innerHTML = `<th>NAME</th><th>Review</th><th>Naver</th>`;  
    thead.appendChild(tr);

    return stores;
    
  }).then(stores => {
    stores.forEach(store => {
      var tr = document.createElement('tr');
      tr.innerHTML = `<td>${store.name}</td><td>${store.review}</td><td><a href="${store.nLink}">link</a></td>`;
      tbody.appendChild(tr);
    })
    table.appendChild(thead);
    table.appendChild(tbody);
    main.appendChild(table);
  })

  input.oninput = function() {
    var data = input.value;
    var tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName('td')[0];
      if (td) {
        if (td.innerHTML.includes(data)) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }
}

