  const data = [];
  const d3BarsAmount = Number(document.getElementById('d3amount').innerText);
  for(let j = 0; j < d3BarsAmount; j ++){
    let fetchData = document.getElementById(j+'d3').innerText;
    const dataJson = JSON.parse(fetchData);
    data.push({
      id: dataJson.id,
      value: dataJson.value,
      region: dataJson.region
    });
  }

  const MARGINS = {top: 20, bottom: 30};
  const CHART_WIDTH = 400;
  const CHART_HEIGHT = 200 - MARGINS.top - MARGINS.bottom;
  
  const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
  const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);
  
  const chartContainer = d3
    .select('#generalStats')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT + MARGINS.top + MARGINS.bottom);
  
  x.domain(data.map((d) => d.region));;
  y.domain([0, d3.max(data, (d) => d.value) + 3])

  const chart = chartContainer.append('g');

  chart
    .append('g')
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr('transform', `translate(0, ${CHART_HEIGHT})`)
    .attr('color', '#4f009e');



  chart
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', x.bandwidth())
    .attr('height', (data) => CHART_HEIGHT - y(data.value))
    .attr('x', (data) => x(data.region))
    .attr('y', (data) => y(data.value));

    chart.selectAll('.lable')
      .data(data)
      .enter()
      .append('text')
      .text((data) => data.value + " Orders")
      .attr('x', (data) => x(data.region) + x.bandwidth() / 2)
      .attr('y', (data) => y(data.value) - 20)
      .attr('text-anchor', 'middle')
      .classed('lable', true);