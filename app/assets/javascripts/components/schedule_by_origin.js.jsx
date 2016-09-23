var ScheduleByOrigin = React.createClass({
  getInitialState() {
    return { showTrains: true };
  },
  
  showOrHideDepartures() {
    this.setState({ showTrains: !this.state.showTrains });
  },
  
  render() {
    var departureLines = this.props.trains.map(
      function(train) {
        return (
          <Departure train={train} key={train.trip} />
        );
      }, this
    );
    var glyphiconArrow = this.state.showTrains ? "up" : "down";
    var glyphiconClass = "glyphicon glyphicon-menu-" + glyphiconArrow;
    var buttonText = this.state.showTrains ? "Hide" : "Show";
    
    return (
      <div className="panel panel-default">
        <SchedulePanelHeader onClick={this.showOrHideDepartures} length={this.props.trains.length}
          origin={this.props.origin} glyphiconClass={glyphiconClass} btnText={buttonText}  />
        
        { this.state.showTrains ? <ScheduleTable departures={departureLines} /> : null }
      </div>
    );
  }
});