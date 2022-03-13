import React, { useEffect } from "react";

interface Props {
  location: {
    latitude: string;
    longitude: string;
  };
  setPos: ({ latitude, longitude }: { latitude: string; longitude: string }) => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({ location, setPos }: Props) => {
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d4b1fff90f325f4339618dfbaf2cc242&autoload=false`;
    document.head.appendChild(mapScript);
    if (location) {
      const onLoadKaKaoMap = () => {
        window.kakao.maps.load(() => {
          var container = document.getElementById("map");
          var options = {
            center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
            level: 3,
          };
          var map = new window.kakao.maps.Map(container, options);

          var markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
          var marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
          marker.setDraggable(true);
          window.kakao.maps.event.addListener(marker, "dragend", function () {
            const { La, Ma } = marker.getPosition();
            setPos({
              latitude: Ma,
              longitude: La,
            });
          });
        });
      };
      mapScript.addEventListener("load", onLoadKaKaoMap);
      return () => mapScript.removeEventListener("load", onLoadKaKaoMap);
    }
  }, [location, setPos]);
  return <div style={{ width: "100%", height: "100%" }} id="map"></div>;
};

export default Map;
