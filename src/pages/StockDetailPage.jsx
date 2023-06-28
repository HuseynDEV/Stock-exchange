import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData"
const formData = (data) => {
  return data.t.map((item, index) => {
    return {
      x: item * 1000,
      y: data.c[index],
    };
  });
};

export const StockDetailPage = () => {
  const { symbol } = useParams();
  const [charData, setChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay;
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: "W",
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        setChartData({
          day: formData(responses[0].data),
          week: formData(responses[1].data),
          year: formData(responses[2].data),
        });
      } catch (err) {}
    };

    fetchData();
  }, [symbol]);
  return <div>
   {charData && (<div> <StockChart charData={charData} symbol={symbol} />
   <StockData symbol={symbol} />
   </div>
   ) }
 
  </div>;
};