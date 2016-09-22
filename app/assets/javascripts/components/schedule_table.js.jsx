var ScheduleTable = React.createClass({
  render() {
    return (
      <table className="table">
        <ScheduleTableHeader />
        <tbody>
          {this.props.departures}
        </tbody>
      </table>
    );
  }
});