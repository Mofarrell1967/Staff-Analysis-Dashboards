 d3.csv("assets/data/work.csv", function(err, data) {
    if (err) throw err;


    data.forEach(function(d) {
     d.date = new Date(d.date);
    });

    var ndx = crossfilter(data);
    var all = ndx.groupAll();


    var nameChart = dc.rowChart("#name"),
     worktypeChart = dc.rowChart("#worktype"),
     platformChart = dc.rowChart("#platform"),
     priorityChart = dc.rowChart("#priority"),
     visCount = dc.dataCount(".dc-data-count"),
     visTable = dc.dataTable(".dc-data-table");



    var nameDim = ndx.dimension(function(d) { return d.name; });
    var worktypeDim = ndx.dimension(function(d) { return d.worktype; });
    var platformDim = ndx.dimension(function(d) { return d.platform; });
    var priDim = ndx.dimension(function(d) { return d.priority; });
    var dateDim = ndx.dimension(function(d) { return d.date; });


    var nameGroup = nameDim.group();
    var worktypeGroup = worktypeDim.group();
    var platformGroup = platformDim.group();
    var priGroup = priDim.group();
    var dateGroup = dateDim.group();
      nameChart
     .width(380)
     .height(250)
     .dimension(nameDim)
     .group(nameGroup)
     .elasticX(true)
     .ordinalColors(['#5768FF', '#6A43E8', '#5738FF', '#173DE8', '#5327E8', '#1F22FF', '#6E2BFF']);

    worktypeChart
     .width(380)
     .height(250)
     .dimension(worktypeDim)
     .group(worktypeGroup)
     .elasticX(true)
     .ordinalColors(['#5768FF', '#6A43E8', '#5738FF', '#173DE8', '#5327E8', '#1F22FF', '#6E2BFF']);

    platformChart
     .width(380)
     .height(250)
     .dimension(platformDim)
     .group(platformGroup)
     .elasticX(true)
     .ordinalColors(['#5768FF', '#6A43E8', '#5738FF', '#173DE8', '#5327E8', '#1F22FF', '#6E2BFF']);

    priorityChart
     .width(380)
     .height(250)
     .dimension(priDim)
     .group(priGroup)
     .elasticX(true)
     .ordinalColors(['#5768FF', '#6A43E8', '#5738FF', '#173DE8', '#5327E8', '#1F22FF', '#6E2BFF']);

    visCount
     .dimension(ndx)
     .group(all);


    visTable
     .dimension(dateDim)
     .size(220)
     .group(function(d) {
      var format = d3.format('02d');
      return d.date.getFullYear() + '/' + format((d.date.getMonth() + 1));
     })

     .columns([
      "name",
      "date",
      "worktype",
      "platform",
      "duration",
      "priority",
      "id",
      "zone"
     ]);







    dc.renderAll();

   });