React + TypeScript + Vite

To run
```
npm install
npm run dev
```
Go to `http://localhost:5173/portfolio`

### Project structure
* api
  apiInterface.ts  - api interface based on the description provided in the task
  assetsApi.ts - funtionality to call API
* components
  DonutChart.tsx - donut component that takes data as an input and renders the donut chart
  PositionsTable.tsx - table component, takes data as an input and renders table
  HistoricalChart.tsx - component to display performace over time
  ErrorBoundary.tsx - react error wrapper
* pages
  ErrorPage.tsx - page displayed when there is an API error
  LoginPage.tsx - /login page 
  PortfolioPage.tsx - the manin page that queries the data from the server and passes data further to DonutChart 
  / PositionsTable / HistoricalChart
* utils
  auth.ts - authentication related functions

  Notes:
  - The "/price" endpoint ended up being not needed because it is not displayed anywhere on its own. Only overall portfolio value and  historical performace is shown which is based on the price and quantity of assets owned by the user. That information is returned in "/portfolio" endpoint.
  - "/portfolio" only has "asOf" parameter, which means if we need to get a range of dates (from 01 to 30) we need to call that api 30 times with different 'asOf' dates. This is not ideal especially for long time ranges (5 years will need 365 * 5 = 1825 api calls
  - for that reason I made it to only display data for a fixed period of time (last 30 days). In my opinion ideally API should be tailored to the UI and you don't need to do much processing on the frontend side. The request should carry only the information provided by the user (for example to show data for the last year the request should be to /portfolios?timeline=lastYear). Response should contain information ready to be displayed so no filtering, sorting or mapping required on the UI side.

 Some work I'm planning to finish:
 - move data processing from inside components (DonutChart, HistoricalChart, PositionsTable) to PortfolioPage, so PortfolioPage will act like a 'smart' component and its children will be 'dumb' and more agnostic to the context of the data therefore more reusable
 - update 'portfolio' api so it also allows queries with time range
 - once the API changes are done, add time range selection to HistoricalChart. I had it but as I described above I realized that it will make a lot of qeries for large range of time

Some work that can be potentially done:
- tests
- add more styling, make the UI follow certain theme
- display more / different data on hover / click in charts
- day / night mode

  
