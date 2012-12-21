(function(window, $, Backbone, _, undefined) {

  module("tbd", {
    setup: function() {
      this.coll = new Backbone.Collection([
        { id: 0, title: "Welcome Isaac Durazo" },
        { id: 1, title: "Ringmark Tests Open Source" },
        { id: 2, title: "Bocoup Gamelab" }
      ]);
    }
  });

  test("Defines a 'search' method on Backbone collections", 1, function() {
    equal(typeof this.coll.search, "function");
  });

}(this, this.jQuery, this.Backbone, this._));
