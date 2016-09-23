var EmptyDepartureList = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4>
                Thank you for visiting the MBTA website.
              </h4>
            </div>
            <div className="panel-body">
              <p>
                There are no departures scheduled right now. Please check again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});