var ReactTestUtils = React.addons.TestUtils;

describe("ScheduleByOrigin", function() {
  var element, component;
  
  beforeEach(function() {
    element = React.createElement(
      ScheduleByOrigin, 
      {
        origin: "North Station",
        trains: [ { time_stamp: 1474932813, origin: "North Station", trip: "177", destination: 
          "Newburyport", scheduled_time: 1474932900, lateness: 0, track: "2", status: "now_boarding" }, 
          { time_stamp: 1474932813, origin: "North Station", trip: "223", destination: "Haverhill", 
          scheduled_time: 1474933200, lateness: 0, status: "on_time" } ]
      }
    );
  });
  
  it("should render", function() {
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();
  });
  
  describe(".getInitialState", function() {
    it("should default to showing the trains", function() {
      expect(component.getInitialState()).toEqual({ showTrains: true });
    });
  });
  
  describe(".showOrHideDepartures", function() {
    it("should change the showTrains state value", function() {
      component.showOrHideDepartures();
      expect(component.state.showTrains).toBe(false);
      component.showOrHideDepartures();
      expect(component.state.showTrains).toBe(true);
    });
  });
});