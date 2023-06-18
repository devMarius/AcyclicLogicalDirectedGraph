/**
 * Represents an Acyclic Logical Directed Graph.
 */
class AcyclicLogicalDirectedGraph {
    /**
     * Constructor to initialize a new Acyclic Logical Directed Graph object.
     * @param {Array} arr - Array of edges to create the graph.
     * @param {Array} mermaidMap - Array of vertex labels.
     */
    constructor(arr, mermaidMap) {
        this.adjacencyList = {};
        this.reverseAdjacencyList = {};
        if (Array.isArray(arr)) {
            [...new Set(arr.reduce((a, b) => {
                return [...(a || []), ...b]
            }))].forEach((e) => { this.addVertex(e) })
            arr.forEach((e) => { this.addEdge(e[0], e[1]) })
        }
        if (Array.isArray(mermaidMap)) {
            this.mermaidMap = new Map(mermaidMap);
        }
    }

    /**
     * Adds a vertex to the graph.
     * @param {string} vertex - Vertex to be added.
     */
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
        if (!this.reverseAdjacencyList[vertex]) this.reverseAdjacencyList[vertex] = [];
    }

    /**
     * Adds an edge between two vertices.
     * @param {string} vertex1 - Vertex 1.
     * @param {string} vertex2 - Vertex 2.
     */
    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.reverseAdjacencyList[vertex2].push(vertex1);
    }

    /**
     * Removes an edge between two vertices.
     * @param {string} vertex1 - Vertex 1.
     * @param {string} vertex2 - Vertex 2.
     */
    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            (v) => v !== vertex2
        );
        this.reverseAdjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            (v) => v !== vertex1
        );
    }

    /**
     * Removes a vertex from the graph along with its edges.
     * @param {string} vertex - Vertex to be removed.
     */
    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }

    /**
     * Calculates the depth of a given vertex.
     * @param {string} vertex - Vertex to calculate depth for.
     * @returns {number} - Depth of the vertex.
     */
    calculateVertexDepth(vertex) {
        let VertexDepth = 1;
        if (!this.adjacencyList[vertex])
            return 0;

        if (vertex.includes("AND") || vertex.includes("OR"))
            VertexDepth -= 1;

        for (const deeperVertex of this.adjacencyList[vertex]) {
            VertexDepth += this.calculateVertexDepth(deeperVertex);
        }

        return Math.max(VertexDepth, 0);
    }

    /**
     * Calculates the depths of all vertices in the graph and returns a map.
     * @returns {Map} - Map of vertex depths.
     */
    calculateVertexDepthMap() {
        let map = new Map();
        for (const vertex of Object.keys(this.adjacencyList)) {
            map.set(vertex, this.calculateVertexDepth(vertex));
        }
        return map;
    }

    /**
     * Calculates the smart depth of a given vertex by considering upstream vertices.
     * @param {string} vertex - Vertex to calculate depth for.
     * @param {boolean} down - True if recursively called from a downstream vertex.
     * @returns {number} - Smart depth of the vertex.
     */
    calculateVertexSmartDepth(vertex, down) {
        let VertexDepth = 1;
        if (!this.adjacencyList[vertex])
            return 0;

        if (vertex.includes("AND") || vertex.includes("OR"))
            VertexDepth -= 1;

        for (const deeperVertex of this.adjacencyList[vertex]) {
            VertexDepth += this.calculateVertexSmartDepth(deeperVertex, true);
        }

        if (down !== true && this.reverseAdjacencyList[vertex].length == 1 && this.reverseAdjacencyList[vertex][0].includes("AND")) {
            for (const deeperVertex of [...this.adjacencyList[this.reverseAdjacencyList[vertex][0]].filter((e) => e != vertex)]) {
                VertexDepth += this.calculateVertexSmartDepth(deeperVertex, true);
            }
            VertexDepth += 1;
        }

        return Math.max(VertexDepth, 0);
    }

    /**
     * Calculates the smart depths of all vertices in the graph and returns a map.
     * @returns {Map} - Map of vertex smart depths.
     */
    calculateVertexSmartDepthMap() {
        let map = new Map();
        for (const vertex of Object.keys(this.adjacencyList)) {
            map.set(vertex, this.calculateVertexSmartDepth(vertex));
        }
        return map;
    }

    /**
     * Static method to create an AcyclicLogicalDirectedGraph instance from Mermaid data string.
     * @param {string} data - Mermaid data string
     * @returns {AcyclicLogicalDirectedGraph} - A new instance of AcyclicLogicalDirectedGraph.
     */
    static fromMermaid(data) {
        const filteredData = data.split(/graph\s+[A-Z]+[\n\r]/)[1];

        const splittedData = filteredData.split(/[\n\r]/g);

        const mappedData = splittedData
            .map((item) => item.split(/\s+-->\s+/))
            .filter((item) => item.length === 2)
            .map((item) => [
                item[0].replace(')', '').split('('),
                item[1].replace(')', '').split('('),
            ])
            .map((item) => {
                return item.map((element) => {
                    element[0] = element[0].replaceAll(/\s/g, '');
                    return element;
                });
            });
        return new this([...mappedData.map((e) => [e[0][0], e[1][0]])], [...new Set((mappedData.reduce((a, b) => [...(a || []), ...b])).filter((e) => e.length == 2))]);
    }

    /**
     * Converts the AcyclicLogicalDirectedGraph instance back to a Mermaid data string.
     * @returns {string} - The Mermaid data string representation of the instance.
     */
    toMermaid() {
        if (!!this.mermaidMap) {
            let relations = Object.entries(this.adjacencyList).filter((e) => e[1].length > 0);
            let usedKeys = [];
            relations = relations.map((e) => [e[0], e[1].map((ee) => [e[0], ee])]).reduce((a, b) => [...(a || []), ...b[1]]).filter((e) => Array.isArray(e)).map((e) => {
                if (Array.isArray(e[0]) && e[0].length == 2) {
                    e[1] = e[0][1];
                    e[0] = e[0][0];
                }
                if (!usedKeys.includes(e[0])) {
                    usedKeys.push(e[0]);
                    e[0] = e[0] + '(' + this.mermaidMap.get(e[0]) + ')';
                }
                if (!usedKeys.includes(e[1])) {
                    usedKeys.push(e[1]);
                    e[1] = e[1] + '(' + this.mermaidMap.get(e[1]) + ')';
                }
                return '  ' + e[0] + ' --> ' + e[1];
            })
            return "graph LR\n" + relations.join("\n");
        }
    }
}
