var ScheduleTableHeader = React.createClass({
  render() {
    return (
      <thead>
        <tr>
          <th className="col-xs-2 col-md-3">Departure Time</th>
          <th className="col-xs-5 col-md-3">Destination</th>
          <th className="col-xs-1 col-md-2">Trip</th>
          <th className="col-xs-1 col-md-2">Track</th>
          <th className="col-xs-3 col-md-2">Status</th>
        </tr>
      </thead>
    );
  }
});