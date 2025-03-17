const hamberger = document.querySelector('.hamburger');
const modal = document.querySelector('.modal');
const mocloseBtn = document.querySelector('#mocloseBtn');

hamberger.addEventListener('click', function () {
    modal.classList.toggle('on');
});
mocloseBtn.addEventListener('click', function () {
    modal.classList.toggle('on');
});

const weatherApiKey = 'a64a5c4f491cc98941022c90285932bc';
const city = 'Busan';

function getWeatherIcon(weatherMain, weatherDescription, isDaytime) {
    const iconMap = {
        "Clear": isDaytime ? "01d.png" : "01n.png",
        "Few Clouds": isDaytime ? "02d.png" : "02n.png",
        "Scattered Clouds": "03d.png",
        "Broken Clouds": isDaytime ? "04d.png" : "04n.png",
        "Clouds": "03d.png",
        "Shower Rain": isDaytime ? "09d.png" : "09n.png",
        "Rain": isDaytime ? "10d.png" : "10n.png",
        "Thunderstorm": isDaytime ? "11d.png" : "11n.png",
        "Snow": isDaytime ? "13d.png" : "13n.png",
        "Mist": isDaytime ? "50d.png" : "50n.png"
    };

    return iconMap[weatherMain] || "01d.png";
}

function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=kr`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("API 응답 (현재 날씨):", data);

            const weatherMain = data.weather[0].main;
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const cloudiness = data.clouds.all;
            const currentHour = new Date().getHours();
            const isDaytime = currentHour >= 6 && currentHour < 18;
            const iconFileName = getWeatherIcon(weatherMain, weatherDescription, isDaytime);
            const iconPath = `./image/info/${iconFileName}`;

            console.log("이미지 경로:", iconPath);

            // 아이콘 및 텍스트 업데이트
            document.getElementById('weather-icon').src = iconPath;
            document.getElementById('weather-text').innerHTML =
                `"${weatherDescription}" [ 🌡️: ${temperature.toFixed(1)}°C <span class="forecast-detail1">/ 💦: ${cloudiness}%</span> ]`;
        })
        .catch(error => {
            console.error("날씨 API 호출 실패:", error);
            document.getElementById('weather-text').innerText = '날씨 정보 불러오기 실패';
        });
}

function fetchForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric&lang=kr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("API 응답 (일기예보):", data);

            const forecasts = data.list
                .filter((_, index) => index % 8 == 0)
                .slice(0, 4)
                .map(entry => {
                    const date = new Date(entry.dt * 1000);
                    const formattedDate = date.toLocaleDateString('ko-KR');
                    const isDaytime = date.getHours() >= 6 && date.getHours() < 18;
                    const forecastMain = entry.weather[0].main;
                    const forecastDescription = entry.weather[0].description;
                    const cloudiness = entry.clouds.all;
                    const forecastIconFileName = getWeatherIcon(forecastMain, forecastDescription, isDaytime);
                    const forecastIconPath = `./image/info/${forecastIconFileName}`;

                    console.log("예보 날짜:", formattedDate, "아이콘 경로:", forecastIconPath);

                    return `<li class="forecast-item">
                <img src="${forecastIconPath}" alt="예보 아이콘" style="width:30px; height:30px; vertical-align:middle;">
               <span class ="forecast-detail2">${formattedDate}</span> <span class="forecast-detail1">"${forecastDescription}"</span><span class = "forecast-detail3">[🌡️ : ${entry.main.temp.toFixed(1)}°C / 💦 : ${cloudiness}% ]
            </span></li>`;
                })
                .join('');

            document.getElementById('forecast').innerHTML = forecasts;
        })
        .catch(error => {
            console.error("예보 API 호출 실패:", error);
            document.getElementById('forecast').innerHTML = '날씨 예보 불러오기 실패';
        });
}
fetchWeather();
fetchForecast();

//--------------------------------------------------날씨 끝
kakao.maps.load(() => {
    initMap();
});

let center = {
    "해운대해수욕장": { lat: 35.1587, lng: 129.1604 },
    "송정해수욕장": { lat: 35.1800, lng: 129.1994 },
    "동백섬": { lat: 35.1532, lng: 129.1527 },
    "달맞이길": { lat: 35.1674, lng: 129.1780 },
    "더베이101": { lat: 35.1535, lng: 129.1520 },
    "센텀시티": { lat: 35.1698, lng: 129.1307 },
    "해운대전통시장": { lat: 35.1633, lng: 129.1633 },
    "블루라인파크": { lat: 35.1601, lng: 129.1635 }
};

let map, marker, infowindow;
let trafficLayerOn = false;

function initMap() {
    var mapContainer = document.getElementById('map');

    if (!mapContainer) {
        console.error("map 요소를 찾을 수 없습니다.");
        return;
    }

    var mapOption = {
        center: new kakao.maps.LatLng(center["해운대해수욕장"].lat, center["해운대해수욕장"].lng), // 기본 중심 
        level: 4
    };

    map = new kakao.maps.Map(mapContainer, mapOption);
    marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(center["해운대해수욕장"].lat, center["해운대해수욕장"].lng),
        map: map
    });

    infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    infowindow.setContent(`<div style=" display: table-cell; vertical-align: middle; padding:10px; padding-left: 24px; font-size:16px; text-align: center; width: 100px;">해운대해수욕장</div>`);
    infowindow.open(map, marker);

    //  기본적으로 교통정보 추가
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    trafficLayerOn = true;

    // 지도가 보이는 시점에 relayout 적용 시간차 줘야함
    setTimeout(() => {
        console.log("map.relayout() 실행");
        map.relayout();
    }, 500);
}

function openDirections(place) {
    if (!center[place]) {
        alert("장소를 찾을 수 없습니다.");
        return;
    }

    var position = new kakao.maps.LatLng(center[place].lat, center[place].lng);
    map.setCenter(position);

    if (marker) {
        marker.setMap(null);
    }

    marker = new kakao.maps.Marker({
        position: position,
        map: map
    });

    infowindow.setContent(`<div style="display: table-cell; vertical-align: middle; padding: 10px; padding-left: 13px;font-size: 16px; width: 120px; text-align: center;">${place}</div>`);
    infowindow.open(map, marker);
}

function toggleTraffic() {
    if (trafficLayerOn) {
        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
        trafficLayerOn = false;
        console.log("🚦 교통정보 OFF");
    } else {
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
        trafficLayerOn = true;
        console.log("🚦 교통정보 ON");
    }
}

//Kakao API 로드 후 실행
kakao.maps.load(initMap);

// 써치플레이쓰
function searchPlace(place) {
    window.open(`https://map.kakao.com/?q=${place}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchQuery').value.trim();
        if (query) window.open(`https://map.kakao.com/?q=${query}`, '_blank');
    });
});


//top버튼
const topBtn = document.querySelector("#topBtn")

window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
        topBtn.style.opacity = 1;
        topBtn.style.visibility = "visible"
    } else {
        topBtn.style.opacity = 0;
        topBtn.style.visibility = "hidden"
    }
})
topBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})
