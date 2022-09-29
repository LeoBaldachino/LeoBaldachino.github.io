import me from './images/me.jpg';
import './App.css';

function App() {
  return (
    <div className="background-fullcover">
        <div className = "container">
            <div className = "row">
                <img src={me} className="my_logo" alt="logo" />
            </div>
        </div>
    </div>
  );
}

export default App;
