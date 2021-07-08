// Load in the JSON data
d3.json("samples.json").then((importedData) => {
  var samplesData = importedData.samples;
  var nameData = importedData.names;
  var metaData = importedData.metadata;

  // Sort the data needed for the bar chart
  var sortSamplesData = samplesData.sort(function(a, b) {
    return parseFloat(b.sample_values) - parseFloat(a.sample_values);
  });
  
  // DROP DOWN MENU
  // Select the drop down menu
  var dropdownMenu = d3.select("#selDataset");
  
  // assign all the id's to the menu options
  nameData.forEach(id => {
      var idItem = dropdownMenu.append("option");
      idItem.text(id);
  });

    // INIT DATA
  // id showing in dropdown on page load
  var idOnLoad = 940;

  // data filtered by test subject id number
  var onLoadData = sortSamplesData.filter(obj => parseInt(obj.id) === idOnLoad);
  var onLoadDemoData = metaData.filter(obj => obj.id === idOnLoad);
  var onLoadGauge = metaData.filter(obj => obj.id === idOnLoad);

  // Bar Chart
  var xdata = onLoadData[0].sample_values.slice(0,10).reverse();
  var yvalues = onLoadData[0].otu_ids.slice(0,10);
  function myFunction(value) {return "UTO " + value + " ";} // add OTU and turn num into string
  var ydata = yvalues.map(myFunction).reverse();
  var tdata = onLoadData[0].otu_labels.slice(0,10).reverse();

  // Bubble Chart
  var xbubb = onLoadData[0].otu_ids;
  var ybubb = onLoadData[0].sample_values;
  var tbubb = onLoadData[0].otu_labels;

  // Gauge Chart
  var xGauge = onLoadGauge[0].wfreq;
  
  // DISPLAY DATA ON PAGE LOAD
  function init() {
    
    // Demographic Info
    // Select the drop down menu
    var demoInfo = d3.select("#sample-metadata");
    
    // assign demo info to div
    Object.entries(onLoadDemoData[0]).forEach(([key, value]) => {
        var demoData = demoInfo.append("p");
        demoData.text(`${key}: ${value}`);
    });
    
    // Bar Chart
    trace = [{
      x: xdata,
      y: ydata,
      text: tdata,
      type: "bar",
      orientation: "h",
      marker: {color: "rgb(121,190,199"}}];
    layout = {
        title: "Top 10 Bacteria Cultures Found",
        };
    Plotly.newPlot("bar", trace, layout);
    
    // Bubble Chart
    var trace1 = {
      x: xbubb,
      y: ybubb,
      text: tbubb,
      mode: 'markers',
      marker: {
        size: ybubb,
        color: xbubb,
      }
    };
    var data = [trace1];
    var layout2 = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      showlegend: false,
      height: 500,
      width: 800
    };
    Plotly.newPlot("bubble", data, layout2);

    // Gauge Chart
    var gData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: xGauge,
      title: { text: "<span style='color:#333333'>Belly Button Washing Frequency</span><br><span style='font-size:0.8em;'>Scrubs Per Week</span>" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
          bar: {color: "#DC7573"},
          axis: {range: [null, 9] },
          steps: [
          {range: [0, 1], color: "#9292b1" },
          {range: [1, 2], color: "#9095b3" },
          {range: [2, 3], color: "#8d9ab5" },
          {range: [3, 4], color: "#8b9fb7" },
          {range: [4, 5], color: "#88a5bb" },
          {range: [5, 6], color: "#83abbe" },
          {range: [6, 7], color: "#80b1c0" },
          {range: [7, 8], color: "#7db7c3" },
          {range: [8, 9], color: "#7db7c3" },],
      }
    }];
    var layout3 = { 
      font: {color: "gray"}};

    Plotly.newPlot("gauge", gData, layout3);
  
  };
    
  // ON CHANGE 
  // Select the drop down menu
  d3.selectAll("#selDataset").on("change", optionChanged);
    
  // Create a function for the change event
    
  function optionChanged() {
    var dropdownMenu = d3.selectAll("#selDataset").node();
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;
        
    // check the value is correct
    console.log(selectedOption);
    // buildPlot(selectedOption)
    
    // * * * * * * * * *
    // DEMOGRAPHIC INFO
    // Select the div
    var demoInfo = d3.select("#sample-metadata");
    demoInfo.html("");
 
    // filter the data
    var filterDemoData = metaData.filter(obj => obj.id === parseInt(selectedOption));

    // assign demo info to div
    Object.entries(filterDemoData[0]).forEach(([key, value]) => {
      var demoData = demoInfo.append("p");
      demoData.text(`${key}: ${value}`);
    });

    // CHART DATA
    var filterData = sortSamplesData.filter(obj => obj.id === selectedOption);

    // Create BAR CHART data for chosen id
    var xValues = filterData[0].sample_values.slice(0,10).reverse();
    var yValues = filterData[0].otu_ids.slice(0,10);
    function myFunction(value) {return "UTO " + value + " ";} // add OTU and turn num into string
    var yEdit = yValues.map(myFunction).reverse();
    var textValues = filterData[0].otu_labels.slice(0,10).reverse();

    // update the plot
    Plotly.restyle("bar", "x", [xValues]);
    Plotly.restyle("bar", "y", [yEdit]);
    Plotly.restyle("bar", "text", [textValues]);
    
    // Create BUBBLE CHART data for chosen id
    var xBubb = filterData[0].otu_ids,
    yBubb = filterData[0].sample_values,
    tBubb = filterData[0].otu_labels;

    var trace1 = {
        marker: {
        size: yBubb,
        color: xBubb,}
    };
    
    // update the plot
    Plotly.restyle("bubble", "x", [xBubb]);
    Plotly.restyle("bubble", "y", [yBubb]);
    Plotly.restyle("bubble", "text", [tBubb]);
    Plotly.restyle("bubble", "marker", [trace1.marker]);
        
    // Create GAUGE CHART data for chosen id
    var onLoadData = metaData.filter(obj => obj.id === parseInt(selectedOption));
    var washValue = onLoadData[0].wfreq;

    Plotly.restyle("gauge", "value", [washValue]);
    };

  // Call the function to populate the page on load
  init();

});

//Object.entries(onLoadDemoData[0]).forEach(([key, value]) => console.log(`${key}: ${value}`));
