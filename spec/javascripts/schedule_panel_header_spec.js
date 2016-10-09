var ReactTestUtils = React.addons.TestUtils;

describe("SchedulePanelHeader", function() {
  var element, component;
  
  beforeEach(function() {
    element = React.createElement(
      SchedulePanelHeader,
      {
        origin: "North Station",
        onClick: function() {},
        length: 3,
        btnText: "Hide",
        glyphiconClass: "glyphicon glyphicon-menu-up"
      }
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
  
  describe("UI", function() {
    var domNode, h4;
    
    beforeAll(function() {
      domNode = ReactDOM.findDOMNode(component);
    });
    
    it("should have a panel heading at the top level", function() {
      expect(domNode.className).toMatch("panel-heading");
      expect(domNode.tagName.toLowerCase()).toBe("div");
    });
    
    it("should wrap content in a header element", function() {
      h4 = domNode.children[0];
      expect(h4.tagName.toLowerCase()).toBe("h4");
    });
    
    it("should contain summary in a span", function() {
      var span = h4.children[0];
      expect(span.tagName.toLowerCase()).toBe("span");
      expect(span.textContent).toMatch(/Trains departing from North Station\s3/);
    });
    
    describe("Button", function() {
      var button, spanArrow;
      
      beforeAll(function() {
        button = h4.children[1];
        spanArrow = button.getElementsByTagName("span")[0];
      });
      
      beforeEach(function() {
        spyOn(component, "showOrHideDepartures");
      });
      
      it("should be a button", function() {
        expect(button.tagName.toLowerCase()).toBe("button");
        expect(button.className).toMatch("btn");
        expect(button.className).toMatch("btn-primary");
        expect(button.className).toMatch("btn-xs");
      });
      
      it("should be in a hide state initially", function() {
        expect(button.textContent).toMatch(/\sHide/);
        expect(spanArrow.className).toMatch("glyphicon-menu-up");
        expect(spanArrow.className).not.toMatch("glyphicon-menu-down");
      });
    });
  });
});