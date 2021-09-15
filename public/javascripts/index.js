var host = 'localhost:3000';

var map = callMap();

// 함수로 맵을 불러오니 지도 다시 안불러오고 마커만 변경된다. 뭐지?
function callMap() {
  var main = document.getElementById('main');
  // main.classList.replace('flex-column', 'flex-row');
  main.innerHTML = `
  <!--  side bar -->
  <div class="sidebar d-flex flex-row justify-content-between">
    <ul class="list-group list-group-horizontal">
      <li class="list-group-item" onclick="viewTotal()"><a href="#">전체</a></li>
      <li class="list-group-item" onclick="viewPart(this)" id="restaurant"><a href="#">식당</a></li>
      <li class="list-group-item" onclick="viewPart(this)" id="cafe"><a href="#">카페</a></li>
    </ul>
    <ul class="list-group list-group-horizontal d-flex justify-content-end">
      <li class="list-group-item" type="button" onclick="callMap()">map</li>
      <li class="list-group-item" type="button" onclick="callTab()">tab</li>
    </ul>
  </div>
  <!-- map -->
  <div id="map" style="width:100%; height: 70vh; border-radius: 4px;">

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

  return map;
}

function viewTotal() {
  var map = callMap();

  fetch(`http://${host}/api/stores`).then(data => {
    return data.json();
  }).then(stores => {
    makeMarker(map, stores);
  })
}

function viewPart(e) {
  var map = callMap();

  fetch(`http://${host}/api/stores/${e.id}`).then(data => {
    return data.json();
  }).then(stores => {
    makeMarker(map, stores);
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
            <h3>${store.name}</h3>
            <p style="font-size: 16px;">${store.review}</p>
            <p style="visibility: hidden;">${store.addr}</p>
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
      <li class="list-group-item" type="button" onclick="callMap()">map</li>
      <li class="list-group-item" type="button" onclick="callTab()">tab</li>
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

  fetch(`http://${host}/api/stores`).then(data => {
    return data.json();
  }).then(stores => {

    var tr = document.createElement('tr');
    tr.innerHTML = `<th>NAME</th><th>Review</th>`;  
    thead.appendChild(tr);

    return stores;
    
  }).then(stores => {
    stores.forEach(store => {
      var tr = document.createElement('tr');
      tr.innerHTML = `<td>${store.name}</td><td>${store.review}</td>`;
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

