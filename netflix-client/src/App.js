import "./App.css";
import request from "./request";
import Row from "./Row";
import Banner from "./Banner";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow //basically it means isLargeRow={true} in react
      />
      <Row title="Upcoming" fetchUrl={request.fetchUpcoming} />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
      <Row title="Top Rated" fetchUrl={request.fetchToprated} />
      <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
      <Row title="Comdegy Movies" fetchUrl={request.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
      <Row title="romantic Movies" fetchUrl={request.fetchRomanceMovies} />
      <Row title="Documentries" fetchUrl={request.fetchDocumentaries} />
    </div>
  );
}

export default App;
