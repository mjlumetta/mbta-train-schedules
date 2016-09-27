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
});