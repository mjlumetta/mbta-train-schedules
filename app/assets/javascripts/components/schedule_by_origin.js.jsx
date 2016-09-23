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
    
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            Trains departing from <strong>{this.props.origin}</strong>&nbsp;
            <span className="badge">{this.props.trains.length}</span>
            <span className="float-right" onClick={this.showOrHideDepartures}>
              <span className={glyphiconClass} aria-hidden="true" />
              &nbsp;{ this.state.showTrains ? "Hide" : "Show" }
            </span>
          </h4>
        </div>
        
        { this.state.showTrains ? <ScheduleTable departures={departureLines} /> : null }
      </div>
    );
  }
});