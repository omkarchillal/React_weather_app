import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "./forecast.css";

// Weekday labels used to show forecast days
const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Forecast = ({ data }) => {
  // Get current day index (0 = Sunday, 1 = Monday, etc.)
  const dayInAWeek = new Date().getDay();

  // Create a list of next 7 days starting from today
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      {/* Section title */}
      <label className="title">Forecast</label>

      {/* Accordion for daily forecast */}
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                {/* Collapsed view showing basic forecast */}
                <div className="daily-item">
                  {/* Weather icon */}
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />

                  {/* Weekday label */}
                  <label className="day">{forecastDays[idx]}</label>

                  {/* Description like "clear sky", "rain", etc.... */}
                  <label className="description">{item.weather[0].description}</label>

                  {/* Temperature range */}
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°c / {Math.round(item.main.temp_max)}°c
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>

            {/* Expanded view showing detailed forecast info */}
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity} %</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all} %</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Wind speed</label>
                  <label>{item.wind.speed} m/s</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Sea level</label>
                  <label>{item.main.sea_level} m</label>
                </div>

                <div className="daily-details-grid-item">
                  <label>Feels like</label>
                  <label>{item.main.feels_like} °c</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
