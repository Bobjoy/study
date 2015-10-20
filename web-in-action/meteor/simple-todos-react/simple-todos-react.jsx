Tasks = new Mongo.Collection("tasks");
if (Meteor.isClient) {
  
  Meteor.startup(function () {
    // code to run on server at startup
    React.render(<App />, document.getElementById("render-target"));
  });
}
