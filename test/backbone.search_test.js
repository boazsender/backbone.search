(function(window, $, Backbone, _, undefined) {

  module("tbd", {
    setup: function() {
      this.coll = new Backbone.Collection([
        { id: 0, title: "Welcome Isaac Durazo" },
        { id: 1, title: "Ringmark Tests Open Source" },
        { id: 2, title: "Bocoup Gamelab" },
        { id: 3, title: "Strangely capitalized wElCOMe" }
      ]);
    }
  });

  test("Defines a 'search' method on Backbone collections", 1, function() {
    equal(typeof this.coll.search, "function");
  });

  test("Returns correct matches", 3, function() {

    var results = this.coll.search("co");

    equal(results.length, 3);
    ok(results.get(this.coll.at(0)));
    ok(results.get(this.coll.at(2)));

  });

  test("Search is case-insensitive by default", 1, function() {

    var results = this.coll.search("welcome");

    equal(results.length, 2);

  });

}(this, this.jQuery, this.Backbone, this._));
