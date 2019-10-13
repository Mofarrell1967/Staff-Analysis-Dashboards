queue()
  .defer(d3.csv, "assets/data/work.csv")
  .await(makeGraphs);

 function makeGraphs(error, workData) {
  var ndx = crossfilter(workData);

 var parseDate = d3.time.format("%Y/%m/%d").parse;
  workData.forEach(function(d) {
   d.date = parseDate(d.date);
  });

  var date_dim = ndx.dimension(dc.pluck('date'));
  var total_duration_per_date = date_dim.group().reduceSum(dc.pluck('duration'));

  var minDate = date_dim.bottom(1)[0].date;
  var maxDate = date_dim.top(1)[0].date;

  dc.lineChart("#line-chart")
   .width(1600)
   .height(300)
   .margins({ top: 10, right: 50, bottom: 50, left: 50 })
   .dimension(date_dim)
   .group(total_duration_per_date)
   .transitionDuration(500)
   .x(d3.time.scale().domain([minDate, maxDate]))
   .xAxisLabel("Month")
   .yAxisLabel("Hours")
   .yAxis().ticks(4);

   dc.renderAll();


 }