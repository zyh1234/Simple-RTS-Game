import React from 'react';
import { connect } from 'react-redux';
import './GameFooter.css';
import BulmaHappy from "../../BulmaHappy.png";
import BulmaAngry from "../../BulmaAngry.png";
import BulmaMocking from "../../BulmaMocking.png";

class PillageCaptainPortrait extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portraitImage: {
        "happy": props.happy,
        "angry": props.mad,
        "mocking": props.mocking
      },
      currentPortrait: props.happy
    }
    this.getPortrait = this.getPortrait.bind(this);
  }

  componentDidMount() {
    this.happy = setInterval(()=>{this.changeReaction("happy")}, 10000);
    this.angry = setInterval(()=>{this.changeReaction("angry")}, 4000);
    this.mocking = setInterval(()=>{this.changeReaction("mocking")}, 7000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        portraitImage: {
          "happy": this.props.happy,
          "angry": this.props.mad,
          "mocking": this.props.mocking
        },
        currentPortrait: this.props.happy
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.happy);
    clearInterval(this.angry);
    clearInterval(this.mocking);
  }

  changeReaction(reaction) {
    this.setState({
      currentPortrait: this.state.portraitImage[reaction]
    })
  }

  getPortrait() {
    let url = "http://localhost:8080/sky/cloud/J7n4VhYgFcYR7uSoaBQqBT/pillage_no_village.profile/getPortrait"
    fetch(url)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        this.setState({
          portraitImage: myJson,
          currentPortrait: myJson["happy"]
        })
      });
  }

  render() {
    return (
      <div className='portrait-container'>
        <img src={this.state.currentPortrait} className='portrait' alt="avatar" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    happy: state.avatar.happy,
    mad: state.avatar.mad,
    mocking: state.avatar.mocking
  }
}

export default connect(mapStateToProps)(PillageCaptainPortrait);
