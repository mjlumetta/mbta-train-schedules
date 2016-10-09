var ReactTestUtils = React.addons.TestUtils;

describe("ScheduleByOrigin", function() {
  var element, component, trains;
  
  beforeEach(function() {
    trains = [ { time_stamp: 1474932813, origin: "North Station", trip: "177", destination: 
      "Newburyport", scheduled_time: 1474932900, lateness: 0, track: "2", status: "now_boarding" }, 
      { time_stamp: 1474932813, origin: "North Station", trip: "223", destination: "Haverhill", 
      scheduled_time: 1474933200, lateness: 0, status: "on_time" } ];
    element = React.createElement(
      ScheduleByOrigin, 
      { origin: "North Station", trains: trains }
    );
  });
  
  it("should render", function() {
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();
  });
  
  it("should be a composite component", function() {
    expect(ReactTestUtils.isCompositeComponent(component)).toBe(true);
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
  
  describe("UI", function() {
    var domNode;
    
    beforeEach(function() {
      domNode = ReactDOM.findDOMNode(component);
      component.setState({ showTrains: true });
    });
    
    it("should have a panel div at the top level", function() {
      expect(domNode.tagName.toLowerCase()).toBe("div");
      expect(domNode.className).toMatch("panel panel-default");
    });
    
    it("should have a SchedulePanelHeader component", function() {
      var panelHeader = ReactTestUtils.findRenderedComponentWithType(component,
        SchedulePanelHeader);
      expect(panelHeader).toBeDefined();
    });
    
    it("should have a ScheduleTable if showing trains", function() {
      var scheduleTable = ReactTestUtils.findRenderedComponentWithType(component,
        ScheduleTable);
      expect(scheduleTable).toBeDefined();
      
      var train;
      for (var index = 0; index < scheduleTable.props.departures.length; index++) {
        train = scheduleTable.props.departures[index].props.train;
        expect(train).toEqual(trains[index]);
      }
    });
    
    it("should not have a ScheduleTable if not showing trains", function() {
      component.setState({ showTrains: false });
      var scheduleTables = ReactTestUtils.scryRenderedComponentsWithType(component,
        ScheduleTable);
      expect(scheduleTables).toEqual([]);
    });
    
    describe("Showing and hiding trains", function() {
      var button, spanArrowIcon, panelComponent;
      
      beforeEach(function() {
        button = ReactTestUtils.findRenderedDOMComponentWithTag(component, "button");
        spanArrowIcon = button.getElementsByClassName("glyphicon")[0];
        panelComponent = ReactTestUtils.findRenderedComponentWithType(component, 
          SchedulePanelHeader);
        component.setState({ showTrains: true });
      });
      
      it("should show trains initially", function() {
        expect(button.textContent).toMatch(/\sHide/);
        expect(spanArrowIcon.className).toMatch("glyphicon-menu-up");
        expect(spanArrowIcon.className).not.toMatch("glyphicon-menu-down");
      });
      
      it("should change state when button is clicked", function() {
        ReactTestUtils.Simulate.click(button);
        expect(component.state.showTrains).toBe(false);
        ReactTestUtils.Simulate.click(button);
        expect(component.state.showTrains).toBe(true);
      });
      
      it("should hide trains", function() {
        ReactTestUtils.Simulate.click(button);
        expect(button.textContent).toMatch(/\sShow/);
        expect(spanArrowIcon.className).toMatch("glyphicon-menu-down");
        expect(spanArrowIcon.className).not.toMatch("glyphicon-menu-up");
      });
      
      it("should show trains", function() {
        component.setState({ showTrains: false });
        ReactTestUtils.Simulate.click(button);
        expect(button.textContent).toMatch(/\sHide/);
        expect(spanArrowIcon.className).toMatch("glyphicon-menu-up");
        expect(spanArrowIcon.className).not.toMatch("glyphicon-menu-down");
      });
    });
  });
});