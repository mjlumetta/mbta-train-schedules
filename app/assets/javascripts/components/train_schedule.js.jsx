var TrainSchedule = React.createClass({
  getInitialState() {
    return { trainsByOrigin: {} };
  },
  
  componentDidMount() {
    this.loadTrainsFromServer();
    setInterval(this.loadTrainsFromServer, 5000);
  },
  
  loadTrainsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data) {
        this.setState({trainsByOrigin: this.groupTrainsByOrigin(data)});
      }.bind(this)
    });
  },
  
  groupTrainsByOrigin(trains) {
    var trainsByOrigin = {};
    for (var index in trains) {
      this.insertTrainInOriginGrouping(trains[index], trainsByOrigin);
    }
    return trainsByOrigin;
  },
  
  insertTrainInOriginGrouping(train, grouping) {
    if (train.origin in grouping) {
      grouping[train.origin].push(train);
    }
    else {
      grouping[train.origin] = [train];
    }
  },
  
  getDeparturesByOrigin(origin) {
    return (origin in this.state.trainsByOrigin ? this.state.trainsByOrigin[origin] : []);
  },
  
  getSchedulesByOrigin() {
    var schedulesByOrigin = Object.keys(this.state.trainsByOrigin).map(
      function(origin) {
        return (
          <ScheduleByOrigin key={origin.toLowerCase().replace(/\s+/g, "-")} 
            origin={origin} trains={this.getDeparturesByOrigin(origin)} />
        );
      }, this
    );
    
    return (
      <div className="row">
        <div className="col-md-12">
          {schedulesByOrigin}
        </div>
      </div>
    );
  },
  
  render() {
    if (Object.keys(this.state.trainsByOrigin).length > 0) {
      return this.getSchedulesByOrigin();
    }
    else {
      return <EmptyDepartureList />;
    }
  },
});