queue()
  .defer(d3.csv, "data/work.csv")
  .await(makeGraphs);

 function makeGraphs(error, workData) {
  var ndx = crossfilter(workData);



   dc.renderAll();


 }