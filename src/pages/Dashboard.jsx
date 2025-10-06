import { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Labcontext } from "../context/Labprovider";
import { Pcscontext } from "../context/Pcsprovider";
import { StudentContext } from "../context/Studentprovider";
// import { Labcontext } from "../../context/Labprovider";
// import { Pcscontext } from "../../context/Pcsprovider";
// import { StudentContext } from "../../context/Studentprovider";

const Dashboard = () => {
  const { allLab } = useContext(Labcontext);
  const { pcs } = useContext(Pcscontext);
  const { student } = useContext(StudentContext);

  const labChartRef = useRef(null);
  const pcChartRef = useRef(null);
  const studentChartRef = useRef(null);

  // ===== Summary Metrics =====
  const totalLabs = allLab.length;
  const totalPcs = pcs.length;
  const totalStudents = student.length;

  const occupiedPcs = pcs.filter((p) => p.status === "Occupied").length;
  const availablePcs = pcs.filter((p) => p.status === "Available").length;

  // ===== Lab Capacity (Grouped Bar Chart) =====
  useEffect(() => {
    if (!allLab.length) return;
    d3.select(labChartRef.current).selectAll("*").remove();

    const width = 1350;
    const height = 280;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const svg = d3
      .select(labChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(allLab.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(allLab, (d) => d.capacity)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll(".bar-total")
      .data(allLab)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.capacity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.capacity))
      .attr("fill", "#d1d5db");

    svg
      .selectAll(".bar-current")
      .data(allLab)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.currentCapacity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.currentCapacity))
      .attr("fill", "#22c55e");
  }, [allLab]);

  // ===== PC Status (Pie Chart) =====
  useEffect(() => {
    if (!pcs.length) return;
    d3.select(pcChartRef.current).selectAll("*").remove();

    const width = 260;
    const height = 260;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(pcChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const data = [
      { label: "Available", value: availablePcs },
      { label: "Occupied", value: occupiedPcs },
    ];

    const color = d3.scaleOrdinal(["#10b981", "#ef4444"]);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(50).outerRadius(radius);

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "#fff")
      .style("stroke-width", "2px");

    svg
      .selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .text((d) => `${d.data.label}: ${d.data.value}`)
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px");
  }, [pcs]);

  // ===== Students per Lab (Donut Chart) =====
  useEffect(() => {
    if (!student.length || !allLab.length) return;
    d3.select(studentChartRef.current).selectAll("*").remove();

    const width = 260;
    const height = 260;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(studentChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Count students per lab
    const data = allLab
      .map((lab) => {
        const count = student.filter((s) => s.lab === lab.id).length;
        return { label: lab.name, value: count };
      })
      .filter((d) => d.value > 0);

    if (data.length === 0) {
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", 10)
        .attr("fill", "#9ca3af")
        .text("No Student Data Available");
      return;
    }

    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(70).outerRadius(radius);

    // Draw slices
    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "#fff")
      .style("stroke-width", "2px");

    // Add labels
    svg
      .selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .text((d) => d.data.label)
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px");

    // Add total count in center
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", 5)
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "#374151")
      .text(`Total: ${student.length}`);
  }, [student, allLab]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Labs</h3>
          <p className="text-3xl font-bold text-green-600">{totalLabs}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total PCs</h3>
          <p className="text-3xl font-bold text-blue-600">{totalPcs}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Students</h3>
          <p className="text-3xl font-bold text-yellow-500">{totalStudents}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-lg shadow p-4 ">
            <h2 className="text-lg font-semibold mb-4">PC Availability</h2>
          <div className="flex justify-center">
            <div ref={pcChartRef}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 ">
          <h2 className="text-lg font-semibold mb-4">Students per Lab</h2>
          <div className="flex justify-center">
            <div ref={studentChartRef}></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Lab Capacity Overview</h2>
        <div ref={labChartRef}></div>
      </div>
    </div>
  );
};

export default Dashboard;
