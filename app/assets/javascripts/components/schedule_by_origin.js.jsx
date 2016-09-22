var ScheduleByOrigin = React.createClass({
  getInitialState() {
    return { showTrains: true };
  },
  
  render() {
    var departureLines = this.props.trains.map(
      function(train) {
        return (
          <Departure train={train} key={train.trip} />
        );
      }, this
    );
    
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            Trains departing from <strong>{this.props.origin}</strong> <span className="badge">{this.props.trains.length}</span>
          </h4>
        </div>
        
        { this.state.showTrains ? <ScheduleTable departures={departureLines} /> : null }
      </div>
    );
  }
});