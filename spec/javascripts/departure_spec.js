var ReactTestUtils = React.addons.TestUtils;

describe("Departure", function() {
  var element, component, train;
  
  beforeEach(function() {
    train = { time_stamp: 1474932813, origin: "North Station", trip: "177", destination: "Newburyport", 
      scheduled_time: 1474932900, lateness: 0, track: "2", status: "now_boarding" };
    element = React.createElement(Departure, { train: train });
  });
  
  it("should render", function() {
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();
  });
  
  describe(".getTrackForDisplay", function() {
    it("should return the track if it is not empty", function() {
      expect(component.getTrackForDisplay()).toBe("2");
    });
    
    it("should return TBD if the track is unknown", function() {
      component.props.train.track = "";
      expect(component.getTrackForDisplay()).toBe("TBD");
    });
  });
  
  describe(".getTimeForDisplay", function() {
    it("should return a string representation of the time", function() {
      expect(component.getTimeForDisplay()).toBe("7:35 PM");
    });
    
    it("should return the empty string if time is undefined", function() {
      component.props.train.scheduled_time = "";
      expect(component.getTimeForDisplay()).toBe("TBD");
    });
  });
  
  describe(".getStatusForDisplay", function() {
    it("returns a readable version of the status", function() {
      expect(component.getStatusForDisplay()).toBe("Now Boarding");
    });
    
    it("should include the lateness if any", function() {
      component.props.train.lateness = 120;
      expect(component.getStatusForDisplay()).toBe("Now Boarding - 2 minutes late");
    });
  });
  
  describe(".getLatenessForDisplay", function() {
    it("should return the empty string if there is no lateness", function() {
      component.props.train.lateness = 0;
      expect(component.getLatenessForDisplay()).toBe("");
    });
    
    it("should return lateness in seconds", function() {
      component.props.train.lateness = 37;
      expect(component.getLatenessForDisplay()).toBe(" - 37 seconds late");
    });
    
    it("should return lateness in minutes", function() {
      component.props.train.lateness = 120;
      expect(component.getLatenessForDisplay()).toBe(" - 2 minutes late");
    });
    
    it("should round up lateness in minutes", function() {
      component.props.train.lateness = 145;
      expect(component.getLatenessForDisplay()).toBe(" - 3 minutes late");
    });
  });
});