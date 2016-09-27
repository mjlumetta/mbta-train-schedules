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
  })
})