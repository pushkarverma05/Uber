"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";

const MapView = dynamic(() => import("@/components/MapView/page"), { ssr: false });

export default function LiveTracking({ pickupPos, destinationPos }) {
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!pickupPos || !destinationPos) return;

      try {
        const res = await axios.get("https://graphhopper.com/api/1/route", {
          params: {
            key: process.env.NEXT_PUBLIC_GRAPHHOPPER_KEY,
            vehicle: "car",
            locale: "en",
            instructions: false,
            calc_points: true,
            points_encoded: false
          },
          paramsSerializer: (params) => {
            const searchParams = new URLSearchParams();
            searchParams.append("point", `${pickupPos.lat},${pickupPos.lng}`);
            searchParams.append("point", `${destinationPos.lat},${destinationPos.lng}`);
            searchParams.append("vehicle", params.vehicle);
            searchParams.append("locale", params.locale);
            searchParams.append("instructions", params.instructions);
            searchParams.append("calc_points", params.calc_points);
            searchParams.append("points_encoded", params.points_encoded);
            searchParams.append("key", params.key);
            return searchParams.toString();
          }
        });

        const coords = res.data.paths[0].points.coordinates.map(c => [c[1], c[0]]);
        setRouteCoords(coords);
      } catch (err) {
        console.error("GraphHopper error:", err);
      }
    };

    fetchRoute();
  }, [pickupPos, destinationPos]);

  return <MapView pickupPos={pickupPos} destinationPos={destinationPos} routeCoords={routeCoords} />;
}