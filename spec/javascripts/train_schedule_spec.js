var ReactTestUtils = React.addons.TestUtils;

describe("TrainSchedule", function() {
  var element, component, trainGrouping;
  
  beforeEach(function() {
    element = React.createElement(
      TrainSchedule,
      { pollInterval: 5000, url: "/dummy/url" }
    );
    
    trainGrouping = { "North Station": [ { time_stamp: 1474932813, origin: "North Station", trip: "177",
      destination: "Newburyport", scheduled_time: 1474932900, lateness: 0, track: "2",
      status: "now_boarding" }, { time_stamp: 1474932813, origin: "North Station", trip: "223", 
      destination: "Haverhill", scheduled_time: 1474933200, lateness: 0, status: "on_time" } ],
      "South Station": [ { time_stamp: 1474932813, origin: "South Station", trip: "725", 
      destination: "Forge Park / 495", scheduled_time: 1474933500, lateness: 0, status: "on_time" } ] };
  });
  
  it("should render", function() {
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();
  });
  
  describe(".insertTrainInOriginGrouping", function() {
    var northStationTrain, southStationTrain;
    
    beforeEach(function() {
      trainGrouping = { 
        "North Station": [ { time_stamp: 1474932813, origin: "North Station", trip: "177",
          destination: "Newburyport", scheduled_time: 1474932900, lateness: 0, track: "2",
          status: "now_boarding" } ] 
      };
      northStationTrain = { time_stamp: 1474932813, origin: "North Station", trip: "223", 
        destination: "Haverhill", scheduled_time: 1474933200, lateness: 0, status: "on_time" };
      southStationTrain = { time_stamp: 1474932813, origin: "South Station", trip: "725",
        destination: "Forge Park / 495", scheduled_time: 1474933500, lateness: 0, status: "on_time" };
    });
    
    it("should insert a new origin station in grouping", function() {
      component.insertTrainInOriginGrouping(southStationTrain, trainGrouping);
      expect(trainGrouping["South Station"]).toBeDefined();
      expect(trainGrouping["South Station"]).toContain(southStationTrain);
    });
    
    it("should add a new train to an existing origin station", function() {
      component.insertTrainInOriginGrouping(northStationTrain, trainGrouping); 
      component.insertTrainInOriginGrouping(northStationTrain, trainGrouping);
      expect(trainGrouping["North Station"]).toContain(northStationTrain);
    });
  });
  
  describe(".getInitialState", function() {
    var initialState;
    
    beforeEach(function() {
      initialState = { trainsByOrigin: {} };
    });
    
    it("should give the component the correct initial state", function() {
      expect(component.state).toEqual(initialState);
    });
    
    it("should return the correct value", function() {
      expect(component.getInitialState()).toEqual(initialState); 
    });
  });
  
  describe(".componentDidMount", function() {
    beforeEach(function() {
      spyOn(component, "loadTrainsFromServer");
      jasmine.clock().install();
    });
    
    afterEach(function() {
      jasmine.clock().uninstall();
    });
    
    it("should load the schedule", function() {
      component.componentDidMount();
      expect(component.loadTrainsFromServer).toHaveBeenCalled();
    });
    
    it("should set an interval to poll the server", function() {
      component.componentDidMount();
      expect(component.loadTrainsFromServer).toHaveBeenCalledTimes(1);
      jasmine.clock().tick(5001);
      expect(component.loadTrainsFromServer).toHaveBeenCalledTimes(2);
    });
  });
  
  describe(".loadTrainsFromServer", function() {
    beforeEach(function() {
      spyOn($, "ajax");
    });
    
    it("should make an ajax call to the server", function() {
      component.loadTrainsFromServer();
      expect($.ajax).toHaveBeenCalled();
    });
  });
  
  describe(".groupTrainsByOrigin", function() {
    var trainList;
    
    beforeEach(function() {
      trainList = [ { time_stamp: 1474932813, origin: "North Station", trip: "177",
        destination: "Newburyport", scheduled_time: 1474932900, lateness: 0, track: "2",
        status: "now_boarding" }, { time_stamp: 1474932813, origin: "North Station", trip: "223", 
        destination: "Haverhill", scheduled_time: 1474933200, lateness: 0, status: "on_time" },
        { time_stamp: 1474932813, origin: "South Station", trip: "725", destination: "Forge Park / 495",
        scheduled_time: 1474933500, lateness: 0, status: "on_time" } ];
    });
    
    it("should group trains by origin station", function() {
      expect(component.groupTrainsByOrigin(trainList)).toEqual(trainGrouping);
    });
  });
  
  describe(".getDeparturesByOrigin", function() {
    var northStationTrains;
    
    beforeEach(function() {
      northStationTrains = [ { time_stamp: 1474932813, origin: "North Station", trip: "177",
        destination: "Newburyport", scheduled_time: 1474932900, lateness: 0, track: "2",
        status: "now_boarding" }, { time_stamp: 1474932813, origin: "North Station", trip: "223", 
        destination: "Haverhill", scheduled_time: 1474933200, lateness: 0, status: "on_time" } ];
    });
    
    it("should return empty array if the state has not been updated", function() {
      expect(component.getDeparturesByOrigin()).toEqual([]);
    });
    
    it("should return trains for the given station", function() {
      component.setState({ trainsByOrigin: trainGrouping });
      expect(component.getDeparturesByOrigin("North Station")).toEqual(northStationTrains);
    });
  });
  
  describe(".getSchedulesByOrigin", function() {
    var schedulesElement, schedulesComponent;
    
    it("should return a DOM component", function() {
      schedulesElement = component.getSchedulesByOrigin();
      schedulesComponent = ReactTestUtils.renderIntoDocument(schedulesElement);
      expect(ReactTestUtils.isDOMComponent(schedulesComponent)).toBe(true);
    });
  });
});