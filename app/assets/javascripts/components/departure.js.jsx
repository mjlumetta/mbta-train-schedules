var Departure = React.createClass({
  getTrackForDisplay() {
    return (this.props.track ? this.props.train.track : "TBD");
  },
  
  getTimeForDisplay() {
    if (!this.props.train.scheduled_time) {
      return "TBD";
    }
    
    return new Date(this.props.train.scheduled_time * 1000).toLocaleTimeString({}, 
      { timeZone: "America/New_York", hour: "numeric", minute: "2-digit" });
  },
  
  getStatusForDisplay() {
    var words = this.props.train.status.split("_");
    var capitalWords = words.map(this.titlecase, this);
    return capitalWords.join(" ") + this.getLatenessForDisplay();
  },
  
  getLatenessForDisplay() {
    if (this.props.train.lateness <= 0) {
      return "";
    }
    else if (this.props.train.lateness < 60) {
      return " - " + this.props.train.lateness + " seconds late";
    }
    else {
      return " - " + Math.ceil(this.props.train.lateness / 60) + " minutes late";
    }
  },
  
  titlecase(word) {
    return (word.length < 2 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1));
  },
  
  render() {
    return (
      <tr>
        <td className="col-xs-2 col-md-3">{this.getTimeForDisplay()}</td>
        <td className="col-xs-5 col-md-3">{this.props.train.destination}</td>
        <td className="col-xs-1 col-md-2">{this.props.train.trip}</td>
        <td className="col-xs-1 col-md-2">{this.getTrackForDisplay()}</td>
        <td className="col-xs-3 col-md-2">{this.getStatusForDisplay()}</td>
      </tr>
    );
  }
});