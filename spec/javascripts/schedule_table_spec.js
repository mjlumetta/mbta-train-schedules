var ReactTestUtils = React.addons.TestUtils;

describe("ScheduleTable", function() {
  var element, component, trainData, trainLines;
  
  beforeEach(function() {
    trainData = [ { time_stamp: 1474932813, origin: "North Station", trip: "177",
      destination: "Newburyport", scheduled_time: 1474932900, lateness: 0, track: "2",
      status: "now_boarding" }, { time_stamp: 1474932813, origin: "North Station", trip: "223", 
      destination: "Haverhill", scheduled_time: 1474933200, lateness: 0, status: "on_time" } ];
    trainLines = trainData.map(function(line) {
      return React.createElement(Departure, { train: line, key: line.trip });
    });
    
    element = React.createElement(
      ScheduleTable,
      { departures: trainLines }
    );
  });
  
  it("should render", function() {
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();
  });
});