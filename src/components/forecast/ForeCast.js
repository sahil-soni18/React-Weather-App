import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "./ForeCast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ForeCast = ({ data }) => {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  );

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {/* eslint-disable-next-line array-callback-return */}
        {data.list.splice(0, 7).map((item, idx) => {
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      alt="weather"
                      className="icon-small"
                      src={`icons/${item.weather[0].icon}.png`}
                    />
                    <label className="day">{forecastDays[idx]}</label>
                    <label className="description">
                      {item.weather[0].description}
                    </label>
                    <label className="min-max">
                      {Math.round(item.main.temp_min)}&deg;C /{" "}
                      {Math.round(item.main.temp_max)}&deg;C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-items">
                    <label> Pressure </label>
                    <label> {item.main.pressure} hPa</label>
                  </div>
                  <div className="daily-details-grid-items">
                    <label> Humadity </label>
                    <label> {item.main.humidity} %</label>
                  </div>
                  <div className="daily-details-grid-items">
                    <label> Clouds </label>
                    <label> {item.clouds.all} %</label>
                  </div>
                  <div className="daily-details-grid-items">
                    <label> Wind Speed </label>
                    <label> {item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-items">
                    <label> Sea Level </label>
                    <label> {item.main.sea_level} m</label>
                  </div>
                  <div className="daily-details-grid-items">
                    <label> Feels Like </label>
                    <label> {Math.round(item.main.feels_like)}&deg;C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default ForeCast;
