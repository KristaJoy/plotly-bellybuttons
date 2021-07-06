// Load in the JSON data
d3.json("../samples.json").then((importedData) => {
  var nameData = importedData.names;
  var metaData = importedData.metadata;

  // INIT DATA
  var idOnLoad = 940;
  var onLoadData = metaData.filter(obj => obj.id === idOnLoad);
  var xValue = onLoadData[0].wfreq;
  
  function init() {
    var data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: xValue,
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
            {range: [8, 9], color: "#7db7c3" },
            ],
        }
    }];
  
  var layout = { 
    width: 460, 
    height: 450,
    font: {color: "gray"}};

  Plotly.newPlot("gauge", data, layout);
    };
    
  // ON CHANGE 
  // Select the drop down menu
  d3.selectAll("#selDataset").on("change", optionChanged);
    
  // Create a function for the change event
    
  function optionChanged() {
    var dropdownMenu = d3.selectAll("#selDataset").node();
    // Assign the dropdown menu item ID to a variable
    var dropdownMenuID = dropdownMenu.id;
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;

    var onLoadData = metaData.filter(obj => obj.id === parseInt(selectedOption));
    var washValue = onLoadData[0].wfreq;
    
    var data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: washValue,
        title: { text: "<span style='color:#333333'>Belly Button Washing Frequency</span><br><span style='font-size:0.8em;'>Scrubs Per Week</span>" },
        type: "indicator",
        mode: "gauge+number",
    }];
    
    Plotly.restyle("gauge", "value", [data[0].value]);
    Plotly.restyle("gauge", "gauge value", [data[0].gauge]);


  };

  // Call the function to populate the page on load
  init();

});


//var filterData = sortSamplesData[Object.keys(sortSamplesData)[19]];
