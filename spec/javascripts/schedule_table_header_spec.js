var ReactTestUtils = React.addons.TestUtils;

describe("ScheduleTableHeader", function() {
  var element, component;
  
  beforeEach(function() {
    element = React.createElement(ScheduleTableHeader);
  });
  
  it("should render", function() {
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();
  });
  
  it("should be a composite component", function() {
    expect(ReactTestUtils.isCompositeComponent(component)).toBe(true);
  });
  
  describe("UI", function() {
    var tr;
    
    it("should contain a table row", function() {
      var trComponent = ReactTestUtils.findRenderedDOMComponentWithTag(component, "tr");
      expect(trComponent).toBeDefined();
      tr = ReactDOM.findDOMNode(trComponent);
    });
    
    it("should have the expected columns", function() {
      var children = tr.children;
      var columnHeaders = ["Departure Time", "Destination", "Trip", "Track", "Status"];
      expect(children.length).toBe(5);
      
      for (var index; index < children.length; index++) {
        expect(children[index].tagName).toBe("th");
        expect(children[index].textContent).toBe(columnHeaders[index]);
      }
    });
  });
});