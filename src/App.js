import React , {Component} from 'react';
import Navigation from './Components/Navigation';
import UrlForm from './Components/UrlForm';
import RankBanner from './Components/RankBanner';
import DetectedImage from './Components/DetectedImage';
import SignIn from './Components/SignIn';
import Register from './Components/Register';
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';



const app = new Clarifai.App({
apiKey: '19ea3ace08ee48f8bd437078efb467cb'
});

const particlesOptions = {
  particles: {
    numder: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{
        id: '',
        name: '',
        entries: ''
      },
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      entries: data.entries
    }});
  }

  onSighOut= () => {
    this.setState({
      input:'',
      imageUrl: '',
      box: {}
  });
    this.onRouteChange('signin');
  }
  

  DetectCounter = () =>{
    console.log('on DetectCounter')
    fetch('https://agile-lake-77488.herokuapp.com/image',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        user: this.state.user
      })
    }).then(res => res.json())
    .then(data => {
      console.log('on DetectCounter if,' , data)
      this.loadUser(data)
    })
  }

  getBoxSizes = (res) => {
    const clarifaiFace = res.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)      
    }
  }

  displayBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input}); 
    this.DetectCounter();
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response => this.displayBox(this.getBoxSizes(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  renderSwitch(route) {
  switch(this.state.route) {
    case 'register':
      return (<Register 
        onRouteChange={this.onRouteChange}
        loadUser={this.loadUser}/>);
    case 'home':
      return(
        <div>
          <RankBanner
            user={this.state.user} />
          <UrlForm
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} />
          <DetectedImage
            box = {this.state.box}
            imageUrl={this.state.imageUrl}/>
        </div>
      );
      default:
        return (<SignIn 
          onRouteChange={this.onRouteChange}
          loadUser={this.loadUser}/>);
      }
  } 

  render(){
  return (
    <div className="App">
      <Particles 
        params={particlesOptions}
        className="particles"
      />
      <Navigation onSighOut={this.onSighOut} onRouteChange={this.onRouteChange} route={this.state.route}/>
      <div>
      {this.renderSwitch(this.state.route)}
      </div>
    </div>
  );}
}

export default App;

