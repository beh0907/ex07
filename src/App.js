import './App.css';
import RouterPage from './components/RouterPage';
import any from './images/any.jpg'

const App = () => {
    return (
        <div className="App">
            <img src={any} width="100%"/>
            <RouterPage/>
        </div>
    );
}

export default App;
