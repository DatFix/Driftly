import { useEffect, useState } from "react";

export function useIpLocation() {
  const [location, setLocation] = useState<string>("Đang cập nhật...");

  useEffect(() => {
    fetch("https://api.ipapi.is/")
      .then((res) => res.json())
      .then((data) => {
        const city = data?.location?.city;
        
        if (city ) {
          setLocation(`${city}`);
        }  else {
          setLocation("Không lấy được vị trí");
        }
      })
      .catch(() => setLocation("Không lấy được vị trí"));
  }, []);

  return location;
}
