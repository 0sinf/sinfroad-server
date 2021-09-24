function main() {
  callMap();
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
    center: new kakao.maps.LatLng(33.499651057776916, 126.53123621834118),
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

        // 제주도 내에서 자신 위치 찾도록
        if ((lat < 33.1138 || lat > 33.2854) && (lng < 126.1059 || lng > 126.5657)) {
          alert('현재 위치가 제주도가 아닙니다.');
          return false;
        }

        var locPosition = new kakao.maps.LatLng(lat, lng);

        // 마커 이미지 옵션
        var imageSrc = `${host}/images/star_marker.png`;
        var imageSize = new kakao.maps.Size(35, 40);
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
      alert('위치 정보 서비스를 사용할 수 없습니다.');
    }
  })

  return map;
}

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

