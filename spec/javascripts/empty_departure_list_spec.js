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
});