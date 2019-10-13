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

  var name_dim = ndx.dimension(dc.pluck('name'));
  var total_hours_by_name = name_dim.group().reduceSum(dc.pluck('duration'));

  dc.barChart("#total-hours-chart")
   .width(380)
   .height(250)
   .margins({ top: 10, right: 50, bottom: 50, left: 50 })
   .dimension(name_dim)
   .group(total_hours_by_name)
   .transitionDuration(500)
   .renderLabel(true)
   .elasticY(true)
   .clipPadding(10)
   .yAxisLabel("Hours")
   .x(d3.scale.ordinal())
   .xUnits(dc.units.ordinal)
   .barPadding(0.1)
   .outerPadding(0.05)
   .colorAccessor(d => d.key)
   .ordinalColors(['#5768FF', '#6A43E8', '#5738FF', '#173DE8', '#5327E8', '#1F22FF', '#6E2BFF'])
   .yAxis().ticks(10);





   dc.renderAll();
 }