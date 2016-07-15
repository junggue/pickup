import React, { Component } from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import { submitPlayer } from '../actions/index';

class SearchHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newPlayerName: ''
    }

  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  };

  playerEntryInputChange(event) {
    this.setState({
      newPlayerName: event.target.value
    })
  };

  showNameEntry(event) {
    console.log(event.target)
    this.setState({
      newPlayerName: ''
    })

    $('.newPlayerEntry').hide()
    $(event.target).siblings('.newPlayerEntry').show()
  };

  submitNewPlayerEntry(event) {
    event.preventDefault()
    console.log($(event.target).parents('.valign-wrapper').attr('data-id'))
    console.log(this.state.newPlayerName)
    this.props.submitPlayer()
  }

  searchedGameCards() {
    return this.props.games.map((game) => {
      return(
        <div className="valign-wrapper" data-id={game.id}>
          <div className="valign center-block">

                <div className="card card-panel hoverable">
                  <div className="card-title">
                    <h3>Game: {game.sport}</h3>
                  </div>
                    <h3 className="left-align">Players Needed: {game.playersNeeded}</h3>
                    <h4 className="center-align">Time: {game.time}</h4>
                    <p className="card-text">Rules: {game.rules}</p>
                  <div className="card-action">
                    <button className="btn red waves-effect waves-light" onClick={this.showNameEntry.bind(this)} type="submit" name="action"> <i className="material-icons right">send</i>Join
                      </button>
                      <form className="newPlayerEntry" onSubmit={this.submitNewPlayerEntry.bind(this)}>
                        <input onChange={this.playerEntryInputChange.bind(this)} value={this.state.newPlayerName} type='text' placeholder='Enter Your Name'></input>
                      </form>
                    <p className="left-align">Host: {game.created_by}</p>
                  </div>
                </div>

          </div>                    
        </div>
      )
    })
  }


  render() {


  const coords = {
    lat: 34.024212,
    lng: -118.496475
  };

  const coords2 = {
    lat: 33.784284,
    lng: -118.242931
  };

    return (
      <div>

      <div id="gamesView">
        {this.searchedGameCards()}
      </div>
    
        <div id='map'>
          <Gmaps
            width={'1000px'}
            height={'1000px'}
            lat={this.props.determinedLocation.lat || 34.024212}
            lng={this.props.determinedLocation.lng || -118.496475}
            zoom={12}
            loadingMessage={'Be happy'}
            params={{v: '3.exp', key: 'AIzaSyAlCGs74Skpymw9LLAjkMg-8jQ1gIue9n8'}}
            onMapCreated={this.onMapCreated}>
            <Marker
              lat={coords.lat}
              lng={coords.lng}
              draggable={false}
              onDragEnd={this.onDragEnd} />
            <Marker
              lat={coords2.lat}
              lng={coords2.lng}
              draggable={false}
              onDragEnd={this.onDragEnd}
              label={'hotdog'}
              onClick={this.onClick} /> 
          </Gmaps>
        </div>


      </div>
    );
  }
};

function mapStateToProps(state) {
  // dummy data, need to change to state.searchGames
  return {
    games: state.games,
    determinedLocation: state.determinedLocation
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ submitPlayer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchHome)



   //          <InfoWindow
   //            lat={coords.lat}
   //            lng={coords.lng}
   //            onCloseClick={this.onCloseClick} />
   //          <Circle
   //            lat={coords.lat}
   //            lng={coords.lng}
   //            radius={500}
   //            onClick={this.onClick} />
