const DUMMMY_DATA = [
    {id: 'd1', value: 10, region: 'USA'},
    {id: 'd2', value: 9, region: 'WHERWEWONT'},
    {id: 'd3', value: 10, region: 'TAL'},
    {id: 'd4', value: 6, region: 'PELEG'},
    ];


    const xScale = d3
    .scaleBand()
    .domain(DUMMMY_DATA.map((dataPoint) => dataPoint.region))
    .rangeRound([0,250])
    .padding(0.1);
    const yScale = d3.scaleLinear().domain([0,15]).range([200,0]);


const container = d3.select('svg').classed('container',true);
 // .classed('continer', true);
 
 const bars = container
  .selectAll('.bar')
  .data(DUMMMY_DATA)
  .enter()
  .append('rect')
  .classed('bar',true)
  .attr('width', xScale.bandwidth())
  .attr('height', (data) =>200 - yScale(data.value))
  .attr('x', data => xScale(data.region))
  .attr('y', data=> yScale(data.value));
