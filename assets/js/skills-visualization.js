/**
 * Skills Visualization using D3.js
 * Interactive force-directed graph showing technical skills by category
 * 
 * Dependencies: D3.js v7
 * Required DOM elements: #skills-orbit, .tooltip, .back-button
 */

// Skills data structure
const skillsData = {
    name: "Michael",
    children: [
        {
            name: "Frontend",
            color: "#4fc3f7",
            icon: "M12,2L1,21H23M12,6L19.5,19H4.5M11,10V14M11,10H13M11,14H13",
            children: [
                { name: "React", value: 90, experience: "4 years", projects: ["E-commerce Platform", "Dashboard App"] },
                { name: "Vue.js", value: 80, experience: "3 years", projects: ["Admin Panel", "Real-time Chat"] },
                { name: "Angular", value: 70, experience: "2 years", projects: ["Enterprise App"] },
                { name: "JavaScript", value: 95, experience: "6 years", projects: ["All Frontend Projects"] },
                { name: "TypeScript", value: 85, experience: "3 years", projects: ["Large-scale Applications"] },
                { name: "HTML/CSS", value: 95, experience: "6 years", projects: ["All Web Projects"] }
            ]
        },
        {
            name: "Backend",
            color: "#ff8a65",
            icon: "M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z",
            children: [
                { name: "Node.js", value: 90, experience: "4 years", projects: ["REST APIs", "Microservices"] },
                { name: "Python", value: 85, experience: "5 years", projects: ["Data Processing", "ML Integration"] },
                { name: "Java", value: 75, experience: "3 years", projects: ["Enterprise Systems"] },
                { name: "C#", value: 70, experience: "2 years", projects: ["Desktop Applications"] },
                { name: "SQL", value: 85, experience: "5 years", projects: ["Database Design"] },
                { name: "MongoDB", value: 80, experience: "3 years", projects: ["NoSQL Solutions"] }
            ]
        },
        {
            name: "AI/ML",
            color: "#ba68c8",
            icon: "M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11M12,14L13.5,17H10.5L12,14Z",
            children: [
                { name: "TensorFlow", value: 80, experience: "3 years", projects: ["Image Recognition"] },
                { name: "PyTorch", value: 75, experience: "2 years", projects: ["NLP Models"] },
                { name: "Scikit-learn", value: 85, experience: "4 years", projects: ["Predictive Models"] },
                { name: "OpenCV", value: 70, experience: "2 years", projects: ["Computer Vision"] }
            ]
        },
        {
            name: "Cloud",
            color: "#4db6ac",
            icon: "M6.5,20Q4.22,20 2.61,18.43 1,16.85 1,14.58 1,12.63 2.17,11.1 3.35,9.57 5.25,9.15 5.88,6.85 7.75,5.43 9.63,4 12,4 14.93,4 16.96,6.04 19,8.07 19,11 20.73,11.2 21.86,12.5 23,13.78 23,15.5 23,17.38 21.69,18.69 20.38,20 18.5,20Z",
            children: [
                { name: "AWS", value: 85, experience: "4 years", projects: ["Scalable Infrastructure"] },
                { name: "Azure", value: 75, experience: "3 years", projects: ["Enterprise Solutions"] },
                { name: "Docker", value: 80, experience: "3 years", projects: ["Containerization"] },
                { name: "Kubernetes", value: 70, experience: "2 years", projects: ["Orchestration"] }
            ]
        },
        {
            name: "Security",
            color: "#ffd54f",
            icon: "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V10.7C15.4,10.9 16,11.3 16.5,11.9C16.8,11.3 17,10.6 17,10C17,7.8 15.2,6 13,6C10.8,6 9,7.8 9,10C9,10.6 9.2,11.3 9.5,11.9C10,11.3 10.6,10.9 11.2,10.7V10C11.2,8.6 12.6,7 12,7M12,11.5C11.3,11.5 10.7,11.9 10.7,12.5C10.7,13.1 11.3,13.5 12,13.5C12.7,13.5 13.3,13.1 13.3,12.5C13.3,11.9 12.7,11.5 12,11.5Z",
            children: [
                { name: "OAuth", value: 80, experience: "3 years", projects: ["Authentication Systems"] },
                { name: "JWT", value: 85, experience: "3 years", projects: ["Secure APIs"] },
                { name: "Pen Testing", value: 70, experience: "2 years", projects: ["Vulnerability Assessment"] }
            ]
        },
        {
            name: "DevOps",
            color: "#a1887f",
            icon: "M21.71,20.29L20.29,21.71A1,1 0 0,1 18.88,21.71L7,9.85A3.81,3.81 0 0,1 6,10A4,4 0 0,1 2,6A4,4 0 0,1 6,2A4,4 0 0,1 10,6C10,6.39 9.94,6.77 9.85,7.15L21.71,19A1,1 0 0,1 21.71,20.29M6,8A2,2 0 0,0 8,6A2,2 0 0,0 6,4A2,2 0 0,0 4,6A2,2 0 0,0 6,8M11,7A1,1 0 0,1 12,6A1,1 0 0,1 13,7A1,1 0 0,1 12,8A1,1 0 0,1 11,7Z",
            children: [
                { name: "Git", value: 90, experience: "5 years", projects: ["All Projects"] },
                { name: "Jenkins", value: 75, experience: "3 years", projects: ["CI/CD Pipelines"] },
                { name: "Terraform", value: 70, experience: "2 years", projects: ["Infrastructure as Code"] }
            ]
        }
    ]
};

/**
 * Initialize the D3 skills visualization
 * Creates an interactive force-directed graph with drag, zoom, and hover interactions
 */
function initVisualization() {
    // Check if d3 is loaded
    if (typeof d3 === 'undefined') {
        console.error('D3.js is not loaded - cannot initialize visualization');
        return;
    }
    
    const container = d3.select("#skills-orbit");
    const width = document.getElementById('skills-orbit-container').offsetWidth;
    const height = document.getElementById('skills-orbit-container').offsetHeight;

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);

    const tooltip = d3.select(".tooltip");
    const backButton = d3.select(".back-button");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const g = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(-800))
        .force("center", d3.forceCenter(0, 0))
        .force("collision", d3.forceCollide().radius(d => d.radius + 8))
        .alphaDecay(0.02);

    let nodes = [];
    let links = [];

    // Build center node
    nodes.push({
        id: "center",
        name: skillsData.name,
        radius: 50,
        type: "core",
        fx: 0,
        fy: 0
    });

    // Build category and skill nodes
    skillsData.children.forEach((category, i) => {
        const angle = (i / skillsData.children.length) * 2 * Math.PI;
        const distance = 180;

        const categoryNode = {
            id: category.name,
            name: category.name,
            radius: 30,
            type: "category",
            color: category.color,
            icon: category.icon,
            angle: angle,
            distance: distance,
            parent: "center"
        };
        nodes.push(categoryNode);

        links.push({
            source: "center",
            target: category.name,
            value: 2
        });

        category.children.forEach((skill, j) => {
            const skillAngle = (j / category.children.length) * 2 * Math.PI;
            const skillDistance = 80;

            const skillNode = {
                id: `${category.name}-${skill.name}`,
                name: skill.name,
                value: skill.value,
                experience: skill.experience,
                projects: skill.projects,
                radius: 12 + (skill.value / 10),
                type: "skill",
                color: category.color,
                parent: category.name,
                angle: skillAngle,
                distance: skillDistance
            };
            nodes.push(skillNode);

            links.push({
                source: category.name,
                target: `${category.name}-${skill.name}`,
                value: 1
            });
        });
    });

    // Create animated background particles
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            id: `particle-${i}`,
            x: (Math.random() - 0.5) * width,
            y: (Math.random() - 0.5) * height,
            radius: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    const particleElements = g.append("g")
        .selectAll("circle")
        .data(particles)
        .enter()
        .append("circle")
        .attr("r", d => d.radius)
        .attr("fill", "white")
        .attr("opacity", d => d.opacity);

    function animateParticles() {
        particleElements
            .attr("cx", d => {
                d.x += d.vx;
                if (d.x < -width / 2) d.x = width / 2;
                if (d.x > width / 2) d.x = -width / 2;
                return d.x;
            })
            .attr("cy", d => {
                d.y += d.vy;
                if (d.y < -height / 2) d.y = height / 2;
                if (d.y > height / 2) d.y = -height / 2;
                return d.y;
            });

        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Create orbital rings
    const orbitalRings = g.append("g")
        .selectAll("circle")
        .data([{ radius: 180 }, { radius: 80 }])
        .enter()
        .append("circle")
        .attr("r", d => d.radius)
        .attr("fill", "none")
        .attr("stroke", "rgba(0, 255, 255, 0.1)")
        .attr("stroke-width", 1)
        .style("filter", "url(#orbit-glow)");

    // Create links between nodes
    const linkElements = g.append("g")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("stroke", d => {
            if (d.source.id === "center" || d.source === "center") {
                return "rgba(255, 255, 255, 0.4)";
            } else {
                const category = nodes.find(n => n.id === d.source.id || n.id === d.source);
                return category ? `${category.color}90` : "rgba(255, 255, 255, 0.2)";
            }
        })
        .attr("stroke-width", d => d.value)
        .attr("fill", "none")
        .attr("class", "link")
        .style("filter", d => {
            if (d.source.id === "center" || d.source === "center") {
                return "url(#link-glow)";
            }
            return "none";
        });

    // Create node groups
    const nodeGroups = g.append("g")
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", d => `node ${d.type}`)
        .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded));

    // Render each node based on type
    nodeGroups.each(function (d) {
        const node = d3.select(this);

        if (d.type === "core") {
            const hexagon = node.append("polygon")
                .attr("points", getHexagonPoints(d.radius))
                .attr("fill", "url(#core-gradient)")
                .attr("stroke", "#ffffff")
                .attr("stroke-width", 2)
                .style("filter", "url(#core-glow)");

            node.append("polygon")
                .attr("points", getHexagonPoints(d.radius * 0.7))
                .attr("fill", "none")
                .attr("stroke", "rgba(255, 255, 255, 0.5)")
                .attr("stroke-width", 1);

            node.append("path")
                .attr("d", "M12,2L1,21H23M12,6L19.5,19H4.5M11,10V14M11,10H13M11,14H13")
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-width", 2)
                .attr("transform", `scale(0.8) translate(-12, -12)`);

        } else if (d.type === "category") {
            node.append("rect")
                .attr("x", -d.radius)
                .attr("y", -d.radius)
                .attr("width", d.radius * 2)
                .attr("height", d.radius * 2)
                .attr("rx", 8)
                .attr("fill", d.color)
                .attr("stroke", d.color)
                .attr("stroke-width", 2)
                .style("filter", `drop-shadow(0 0 8px ${d.color})`);

            node.append("path")
                .attr("d", d.icon)
                .attr("fill", "white")
                .attr("transform", `scale(0.6) translate(-16, -16)`);

        } else if (d.type === "skill") {
            node.append("circle")
                .attr("r", d.radius)
                .attr("fill", d.color)
                .attr("stroke", d.color)
                .attr("stroke-width", 1)
                .style("filter", `drop-shadow(0 0 5px ${d.color})`);

            node.append("circle")
                .attr("r", d.radius * 0.6)
                .attr("fill", "rgba(255, 255, 255, 0.2)")
                .attr("stroke", "none");
        }
    });

    // Add labels
    const labels = nodeGroups.append("text")
        .text(d => d.name)
        .attr("text-anchor", "middle")
        .attr("dy", d => {
            if (d.type === "core") return d.radius + 25;
            if (d.type === "category") return d.radius + 20;
            return d.radius + 15;
        })
        .attr("fill", "white")
        .style("font-size", d => {
            if (d.type === "core") return "16px";
            if (d.type === "category") return "12px";
            return "10px";
        })
        .style("pointer-events", "none")
        .style("opacity", d => d.type === "skill" ? 0 : 1)
        .style("font-weight", d => d.type === "core" ? "bold" : "normal");

    // Create SVG filters and gradients
    const defs = svg.append("defs");

    const coreGradient = defs.append("radialGradient")
        .attr("id", "core-gradient")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");

    coreGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ffffff");

    coreGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#00ffff");

    const coreGlow = defs.append("filter")
        .attr("id", "core-glow")
        .attr("height", "300%")
        .attr("width", "300%")
        .attr("x", "-100%")
        .attr("y", "-100%");

    coreGlow.append("feGaussianBlur")
        .attr("stdDeviation", "3.5")
        .attr("result", "coloredBlur");

    const feMerge = coreGlow.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    const orbitGlow = defs.append("filter")
        .attr("id", "orbit-glow")
        .attr("height", "300%")
        .attr("width", "300%")
        .attr("x", "-100%")
        .attr("y", "-100%");

    orbitGlow.append("feGaussianBlur")
        .attr("stdDeviation", "2")
        .attr("result", "orbitBlur");

    const orbitMerge = orbitGlow.append("feMerge");
    orbitMerge.append("feMergeNode")
        .attr("in", "orbitBlur");
    orbitMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    const linkGlow = defs.append("filter")
        .attr("id", "link-glow");

    linkGlow.append("feGaussianBlur")
        .attr("stdDeviation", "1")
        .attr("result", "linkBlur");

    const linkMerge = linkGlow.append("feMerge");
    linkMerge.append("feMergeNode")
        .attr("in", "linkBlur");
    linkMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    // Setup simulation
    simulation.nodes(nodes).on("tick", ticked);

    simulation.force("link", d3.forceLink(links)
        .id(d => d.id)
        .distance(d => {
            if (d.source.id === "center" || d.source === "center") {
                return 180;
            } else {
                return 80;
            }
        }));

    // Back button click handler
    backButton.on("click", function () {
        resetView();
    });

    // Node interaction handlers
    nodeGroups
        .on("mouseover", function (event, d) {
            if (isMobile) return;
            const connectedNodes = new Set();
            const connectedLinks = [];

            links.forEach(link => {
                if (link.source.id === d.id || link.target.id === d.id) {
                    connectedLinks.push(link);
                    connectedNodes.add(link.source.id);
                    connectedNodes.add(link.target.id);
                }
            });

            nodeGroups.style("opacity", 0.3);
            linkElements.style("opacity", 0.1);
            labels.style("opacity", 0.1);

            nodeGroups.filter(n => connectedNodes.has(n.id))
                .style("opacity", 1)
                .transition()
                .duration(300)
                .attr("transform", n => `scale(1.2) translate(${n.x}, ${n.y})`);

            linkElements.filter(l =>
                connectedNodes.has(l.source.id) && connectedNodes.has(l.target.id)
            )
                .style("opacity", 0.8);

            labels.filter(n => connectedNodes.has(n.id))
                .style("opacity", 1);

            if (d.type === "skill") {
                tooltip
                    .style("opacity", 1)
                    .html(`
                        <h3>${d.name}</h3>
                        <div class="proficiency-bar">
                            <div class="proficiency-fill" style="width: ${d.value}%"></div>
                        </div>
                        <p>Proficiency: ${d.value}%</p>
                        <p>Experience: ${d.experience}</p>
                        <p>Projects: ${d.projects.join(", ")}</p>
                    `)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            } else if (d.type === "category") {
                tooltip
                    .style("opacity", 1)
                    .html(`<h3>${d.name}</h3><p>Click to focus on this category</p>`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            } else if (d.type === "core") {
                tooltip
                    .style("opacity", 1)
                    .html(`<h3>${d.name}</h3><p>Full-stack Developer</p>`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            }
        })
        .on("mouseout", function (event, d) {
            if (isMobile) return;
            nodeGroups
                .style("opacity", 1)
                .transition()
                .duration(300)
                .attr("transform", n => `translate(${n.x}, ${n.y})`);

            linkElements.style("opacity", d => {
                if (d.source.id === "center" || d.source === "center") {
                    return 0.4;
                } else {
                    return 0.2;
                }
            });

            labels.style("opacity", d => d.type === "skill" ? 0 : 1);

            tooltip.style("opacity", 0);
        })
        .on("click", function (event, d) {
            if (d.type === "category") {
                zoomToCategory(d);
            }
        });

    // Simulation tick handler
    function ticked() {
        nodeGroups.attr("transform", d => `translate(${d.x}, ${d.y})`);

        linkElements.attr("d", d => {
            const dx = d.target.x - d.source.x;
            const dy = d.target.y - d.source.y;
            const dr = Math.sqrt(dx * dx + dy * dy);

            return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
        });
    }

    // Drag handlers
    function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // Zoom to specific category
    function zoomToCategory(category) {
        nodeGroups.style("opacity", n => {
            return (n.id === "center" || n.parent === category.id || n.id === category.id) ? 1 : 0.1;
        });

        linkElements.style("opacity", l => {
            const sourceId = l.source.id || l.source;
            const targetId = l.target.id || l.target;

            return (sourceId === "center" && targetId === category.id) ||
                (sourceId === category.id) ||
                (targetId === category.id) ? 1 : 0.1;
        });

        labels.style("opacity", n => {
            return (n.id === "center" || n.parent === category.id || n.id === category.id) ? 1 : 0;
        });

        backButton.style("display", "block");
    }

    // Reset view to show all nodes
    function resetView() {
        nodeGroups.style("opacity", 1);
        linkElements.style("opacity", d => {
            if (d.source.id === "center" || d.source === "center") {
                return 0.4;
            } else {
                return 0.2;
            }
        });

        labels.style("opacity", d => d.type === "skill" ? 0 : 1);

        backButton.style("display", "none");
    }

    // Generate hexagon points for core node
    function getHexagonPoints(radius) {
        const points = [];
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            points.push([
                radius * Math.cos(angle),
                radius * Math.sin(angle)
            ]);
        }
        return points.map(p => p.join(",")).join(" ");
    }

    // Set initial node positions
    nodes.forEach((d, i) => {
        if (d.type === "category") {
            d.x = Math.cos(d.angle) * d.distance;
            d.y = Math.sin(d.angle) * d.distance;
        } else if (d.type === "skill") {
            const category = nodes.find(n => n.id === d.parent);
            d.x = category.x + Math.cos(d.angle) * d.distance;
            d.y = category.y + Math.sin(d.angle) * d.distance;
        }
    });

    // Add gentle animation to keep visualization dynamic
    setInterval(() => {
        nodes.forEach(d => {
            if (d.type === "skill") {
                d.x += (Math.random() - 0.5) * 2;
                d.y += (Math.random() - 0.5) * 2;
            }
        });
        simulation.alpha(0.1).restart();
    }, 2000);
}

// Initialize on page load
window.onload = initVisualization;

// Reinitialize on window resize
window.onresize = function () {
    d3.select("#skills-orbit").selectAll("*").remove();
    initVisualization();
};

