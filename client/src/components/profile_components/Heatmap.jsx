import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Heatmap() {
  // Define a color scale
  const colorScale = d3.scaleSequential(d3.interpolateViridis).domain([0, 10]); // Customize the domain based on your data

  // Define the start and end dates for the year
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-12-31");

  // Generate a dataset for the entire year with zeros for inactive days
  const fullYearDataset = d3.timeDay.range(startDate, endDate).map((date) => ({
    date: d3.timeFormat("%Y-%m-%d")(date), // Format date as 'YYYY-MM-DD'
    count: 0, // Set count to zero for all days initially
  }));

  // Example: Add some random data for specific dates
  // Replace this with your actual data
  // For example, you can fetch data from an API and update the dataset accordingly
  const testDates = ["2023-09-05", "2023-09-10", "2023-09-12", "2023-09-20"];
  testDates.forEach((date) => {
    const index = fullYearDataset.findIndex((d) => d.date === date);
    if (index !== -1) {
      fullYearDataset[index].count = Math.floor(Math.random() * 11); // Random contribution count (0 to 10)
    }
  });

  const svgRef = useRef();

  useEffect(() => {
    // D3 code to generate the heatmap goes here
    const svg = d3.select(svgRef.current);

    // Create rectangles for each day
    svg
      .selectAll("rect")
      .data(fullYearDataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => (i % 7) * 50) // Set the x-coordinate (7 columns for a week)
      .attr("y", (d, i) => Math.floor(i / 7) * 50) // Set the y-coordinate (7 rows for a week)
      .attr("width", 4) // Set the width
      .attr("height", 4) // Set the height
      .style("fill", (d) => colorScale(d.count));
  }, [fullYearDataset]);

  return (
    <div className="heatmap-container">
      <svg
        ref={svgRef}
        width={350} // Adjust the width as needed
        height={350} // Adjust the height as needed
      >
        {/* Add any other SVG elements or labels as needed */}
      </svg>
    </div>
  );
}

export default Heatmap;
