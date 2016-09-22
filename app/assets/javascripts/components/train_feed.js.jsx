var TrainFeed = React.createClass({
  getInitialState() {
    return { trains: [] };
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
        this.setState({trains: data});
      }.bind(this)
    });
  },
  
  render() {
    return (
      <div>
        <div>
          URL: {this.props.url}
        </div>
        <div>
          Poll interval: {this.props.pollInterval}
        </div>
        <div>
          {this.state.trains.length}
        </div>
      </div>
    );
  },
});