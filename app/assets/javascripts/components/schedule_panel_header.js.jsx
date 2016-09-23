var SchedulePanelHeader = React.createClass({
  showOrHideDepartures() {
    this.props.onClick();
  },
  
  render() {
    return (
      <div className="panel-heading">
        <h4>
          <span>
            Trains departing from <strong>{this.props.origin}</strong>&nbsp;
            <span className="badge">{this.props.length}</span>
          </span>
          
          <button className="float-right btn btn-primary show-hide-btn btn-xs"
            onClick={this.showOrHideDepartures}>
            <span className={this.props.glyphiconClass} aria-hidden="true" />
            &nbsp;{this.props.btnText}
          </button>
        </h4>
      </div>
    );
  },
});