var ReactTestUtils = React.addons.TestUtils;

describe("EmptyDepartureList", function() {
  var element, component;
  
  beforeEach(function() {
    element = React.createElement(EmptyDepartureList);
  });
  
  it("should render", function() {
    expect(function() {
      component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();
  });
  
  it("is a composite component", function() {
    expect(ReactTestUtils.isCompositeComponent(component)).toBe(true);
  });
  
  describe("UI", function() {
    var domNode, panelComponent, divPanel, divPanelHeading, divPanelBody;
    
    beforeEach(function() {
      domNode = ReactDOM.findDOMNode(component);
    });
    
    it("should have a panel", function() {
      panelComponent = ReactTestUtils.findRenderedDOMComponentWithClass(component, "panel");
      expect(panelComponent).toBeDefined();
      divPanel = ReactDOM.findDOMNode(panelComponent);
    });
    
    it("should have a panel heading", function() {
      divPanelHeading = divPanel.getElementsByClassName("panel-heading")[0];
      expect(divPanelHeading).toBeDefined();
    });
    
    it("should have a panel heading with the correct text", function() {
      var h4 = divPanelHeading.getElementsByTagName("h4")[0];
      expect(h4).toBeDefined();
      expect(h4.textContent).toBe("Thank you for visiting the MBTA website.");
    });
    
    it("should have a panel body", function() {
      divPanelBody = divPanel.getElementsByClassName("panel-body")[0];
      expect(divPanelBody).toBeDefined();
    });
    
    it("should have a panel body with the correct text", function() {
       var p = divPanelBody.getElementsByTagName("p")[0];
       expect(p).toBeDefined();
       expect(p.textContent).toBe("There are no departures scheduled right now. Please check again later.");
    });
  });
});