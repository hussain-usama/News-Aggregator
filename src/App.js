import './App.css';
import NewsFeed from './views/components/NewsFeed/NewsFeed';

function App() {

  return (
    <div className="App">
      <div className='p-4'>
          <div className='d-flex align-items-center justify-content-center'>
            <h1 className='main-heading'>NEWS <br/>AGGREGATOR</h1>
          </div>
          <NewsFeed/>
      </div>
    </div>
  );
}

export default App;
