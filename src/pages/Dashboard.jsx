import { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Labcontext } from "../context/Labprovider";
import { Pcscontext } from "../context/Pcsprovider";
import { StudentContext } from "../context/Studentprovider";
import { useResize } from "../hooks/useResize";

const Dashboard = () => {
  const { allLab } = useContext(Labcontext);
  const { pcs } = useContext(Pcscontext);
  const { student } = useContext(StudentContext);
  const { width: windowWidth } = useResize();

  const labChartRef = useRef(null);
  const pcChartRef = useRef(null);
  const studentChartRef = useRef(null);

  const totalLabs = allLab.length;
  const totalPcs = pcs.length;
  const totalStudents = student.length;
  const occupiedPcs = pcs.filter((p) => p.status === "Occupied").length;
  const availablePcs = pcs.filter((p) => p.status === "Available").length;

  // ===== LAB CHART =====
  useEffect(() => {
    const container = labChartRef.current;
    d3.select(container).selectAll("*").remove();

    if (!allLab.length) {
      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", "100%")
        .attr("height", 200)
        .append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .attr("fill", "#9ca3af")
        .text("No Data Found");
      return;
    }

    const containerWidth = container.clientWidth || 800;
    const containerHeight = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("w-full h-auto", true)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(allLab.map((d) => d.name))
      .range([0, width])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(allLab, (d) => d.capacity)])
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "rotate(-20)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll(".bar-total")
      .data(allLab)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.capacity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.capacity))
      .attr("fill", "#d1d5db");

    svg
      .selectAll(".bar-current")
      .data(allLab)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.currentCapacity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.currentCapacity))
      .attr("fill", "#22c55e");
  }, [allLab, windowWidth]);

  // ===== PC CHART =====
  useEffect(() => {
    const container = pcChartRef.current;
    d3.select(container).selectAll("*").remove();

    if (!pcs.length) {
      d3.select(container)
        .append("svg")
        .attr("width", "100%")
        .attr("height", 200)
        .append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .attr("fill", "#9ca3af")
        .text("No Data Found");
      return;
    }

    const size = container.clientWidth || 260;
    const radius = size / 2;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${size} ${size}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("w-full h-auto", true)
      .append("g")
      .attr("transform", `translate(${size / 2},${size / 2})`);

    const data = [
      { label: "Available", value: availablePcs },
      { label: "Occupied", value: occupiedPcs },
    ];

    if (data.every((d) => d.value === 0)) {
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", 10)
        .attr("fill", "#9ca3af")
        .text("No Data Found");
      return;
    }

    const color = d3.scaleOrdinal(["#10b981", "#ef4444"]);
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(radius * 0.4).outerRadius(radius - 10);

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
  }, [pcs, windowWidth]);

  // ===== STUDENT CHART =====
  useEffect(() => {
    const container = studentChartRef.current;
    d3.select(container).selectAll("*").remove();

    if (!student.length || !allLab.length) {
      d3.select(container)
        .append("svg")
        .attr("width", "100%")
        .attr("height", 200)
        .append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .attr("fill", "#9ca3af")
        .text("No Data Found");
      return;
    }

    const size = container.clientWidth || 260;
    const radius = size / 2;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${size} ${size}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("w-full h-auto", true)
      .append("g")
      .attr("transform", `translate(${size / 2},${size / 2})`);

    const data = allLab
      .map((lab) => ({
        label: lab.name,
        value: student.filter((s) => s.lab === lab.id).length,
      }))
      .filter((d) => d.value > 0);

    if (!data.length) {
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", 10)
        .attr("fill", "#9ca3af")
        .text("No Data Found");
      return;
    }

    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(radius * 0.45).outerRadius(radius - 10);

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
      .text((d) => d.data.label)
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", 5)
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "#374151")
      .text(`Total: ${student.length}`);
  }, [student, allLab, windowWidth]);

  return (
    <div className="h-screen overflow-y-auto bg-gray-100 p-8 pt-16 space-y-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">PC Availability</h2>
          <div className="flex justify-center w-full">
            <div ref={pcChartRef} className="w-full max-w-sm"></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Students per Lab</h2>
          <div className="flex justify-center w-full">
            <div ref={studentChartRef} className="w-full max-w-sm"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Lab Capacity Overview</h2>
        <div ref={labChartRef} className="w-full"></div>
      </div>
    </div>
  );
};

export default Dashboard;
