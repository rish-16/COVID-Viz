Smits = {};
Smits.Common = {
    nodeIdIncrement: 0,
    activeNode: 0,
    roundFloat: function(a, c) {
        for (var b = 0, f = 1; b < c;) f *= 10, b++;
        return Math.round(a * f) / f
    },
    apply: function(a, c) {
        if (a && typeof c == "object")
            for (var b in c) a[b] = c[b];
        return a
    },
    addRaphEventHandler: function(a, c, b, f) {
        try {
            a[c](function(c, a) {
                return function(g) {
                    a.e = g;
                    c(a)
                }
            }(b, f))
        } catch (k) {}
    },
    isInteger: function(a) {
        return !isNaN(parseInt(a))
    },
    isXMLSerializerAvailable: function() {
        return typeof XMLSerializer == "function" ? !0 : !1
    },
    createSvgEl: function(a, c) {
        a = document.createElementNS("http://www.w3.org/2000/svg", a);
        if (c)
            for (var b in c) c.hasOwnProperty(b) && a.setAttribute(b, String(c[b]));
        return a
    },
    createGradientEl: function(a, c, b) {
        if (c.type != "radialGradient") return !1;
        a = Smits.Common.createSvgEl("radialGradient", {
            id: a,
            gradientUnits: "userSpaceOnUse",
            cx: b[0],
            cy: b[1],
            r: b[2],
            fx: b[0],
            fy: b[1]
        });
        if (c.stop) {
            c = c.stop;
            for (b = 0; b < c.length; b++) {
                var f = c[b];
                f["@attributes"] ? a.appendChild(Smits.Common.createSvgEl("stop", f["@attributes"])) : (f._attributes && delete f._attributes, f._children && delete f._children, f.__proto__ && delete f.__proto__,
                    a.appendChild(Smits.Common.createSvgEl("stop", f)))
            }
        }
        return a
    },
    setCssStyle: function(a, c) {
        var b = document.styleSheets[0];
        b.addRule ? b.addRule(a, c) : b.insertRule && b.insertRule(a + " { " + c + " }", b.cssRules.length)
    }
};
Smits.PhyloCanvas = function() {
    var a, c, b, f;
    return function(k, l, p, g, m) {
        this.getNewickObject = function() {};
        this.clear = function() {};
        this.scale = function(d) {
            b.svg.scale(d)
        };
        this.getSvg = function() {
            return b
        };
        this.getPhylogram = function() {
            return a
        };
        this.getSvgSource = function() {
            return Raphael.svg && Smits.Common.isXMLSerializerAvailable() ? (new XMLSerializer).serializeToString(b.svg.canvas) : !1
        };
        if (typeof k === "object")
            if (k.xml) {
                var d = k.fileSource ? k.xml : XMLObjectifier.textToXML(k.xml),
                    d = XMLObjectifier.xmlToJSON(d);
                f = new Smits.PhyloCanvas.PhyloxmlParse(d)
            } else k.phyloxml ? (d = k.fileSource ? k.phyloxml : XMLObjectifier.textToXML(k.phyloxml), d = XMLObjectifier.xmlToJSON(d), f = new Smits.PhyloCanvas.PhyloxmlParse(d)) : k.nexml ? (d = k.fileSource ? k.nexml : XMLObjectifier.textToXML(k.nexml), d = XMLObjectifier.xmlToJSON(d), f = new Smits.PhyloCanvas.NexmlParse(d, k)) : k.json ? f = new Smits.PhyloCanvas.PhyloxmlParse(k.json) : k.newick ? f = new Smits.PhyloCanvas.NewickParse(k.newick) : k.nexmlJson ? f = new Smits.PhyloCanvas.NexmlJsonParse(k) : alert("Please set the format of input data");
        else f = new Smits.PhyloCanvas.NewickParse(k);
        c = l;
        b = new Smits.PhyloCanvas.Render.SVG(c, p, g);
        a = m == "circular" ? new Smits.PhyloCanvas.Render.CircularPhylogram(b, f) : new Smits.PhyloCanvas.Render.Phylogram(b, f)
    }
}();
Smits.PhyloCanvas.prototype = {};
Smits.PhyloCanvas.Node = function() {
    return function(a, c) {
        this.id = Smits.Common.nodeIdIncrement += 1;
        this.newickLen = this.len = this.level = 0;
        this.type = this.name = "";
        this.chart = {};
        this.img = [];
        a && Smits.Common.apply(this, a);
        this._midBranchPosition = this._countImmediateChildren = this._countAllChildren = !1;
        this.children = [];
        c && c.children.push(this)
    }
}();
Smits.PhyloCanvas.Node.prototype = {
    getCountAllChildren: function() {
        if (this._countAllChildren !== !1) return this._countAllChildren;
        var a = 0,
            c;
        for (c in this.children)
            if (Smits.Common.isInteger(c)) {
                var b = this.children[c];
                b.children && b.children.length > 0 ? a += b.getCountAllChildren() : a++
            } return this._countAllChildren = a
    },
    getCountImmediateChildren: function() {
        if (this._countImmediateChildren !== !1) return this._countImmediateChildren;
        var a = 0,
            c;
        for (c in this.children) a += this.children[c].length;
        return this._countImmediateChildren =
            a
    },
    getMidbranchPosition: function(a) {
        if (this._midBranchPosition !== !1) return this._midBranchPosition;
        for (var c = [0, 0], b = 0; b < this.children.length; b++) {
            var f = this.children[b];
            f.children && f.children.length > 0 ? b == 0 && a ? (c[0] = f.getMidbranchPosition(!0), c[1] += f.getCountAllChildren() - 1) : b == 0 ? (c[0] = f.getMidbranchPosition(), c[1] += f.getCountAllChildren()) : c[1] += b == this.children.length - 1 ? f.getMidbranchPosition() : f.getCountAllChildren() : b == 0 && a ? c[0] = 0 : (b == 0 && (c[0] = 1), c[1] += 1)
        }
        return this._midBranchPosition = c[1] >=
            c[0] ? (c[1] + c[0]) / 2 : c[0]
    }
};
Smits.PhyloCanvas.NewickParse = function() {
    var a, c, b, f = 0,
        k = 0,
        l, p = function(a) {
            for (var e = new Smits.PhyloCanvas.Node; c !== ")" && c !== ",";)
                if (c === ":") {
                    if (d(), e.len = Smits.Common.roundFloat(m(), 4), e.len == 0) e.len = 1.0E-4
                } else if (c === "'" || c === '"') {
                e.type = "label";
                for (var g = e, j = c, b = ""; c !== j;) b += c, d();
                g.name = b
            } else e.type = "label", e.name = m();
            e.level = a.level + 1;
            return e
        },
        g = function(a) {
            var e = new Smits.PhyloCanvas.Node;
            if (a) e.level = a.level + 1;
            for (; c !== ")";) d(), c === "(" ? e.children.push(g(e)) : e.children.push(p(e));
            d();
            if (c !==
                ":" && c !== ")" && c !== "," && c !== ";") e.type = "label", e.name = m();
            if (c === ":") {
                d();
                e.len = Smits.Common.roundFloat(m(), 4);
                if (e.len == 0) e.len = 1.0E-4;
                e.type = "stem"
            }
            return e
        },
        m = function() {
            for (var a = ""; c !== ":" && c !== ")" && c !== "," && c !== ";";) a += c, d();
            return a
        },
        d = function() {
            c = a.charAt(b);
            b += 1;
            return c
        },
        j = function(d) {
            if (d.children && d.children.length)
                for (var c = 0; c < d.children.length; c++) {
                    var a = d.children[c];
                    if (a.len === 0) a.len = 1;
                    a.newickLen = Smits.Common.roundFloat(a.len + d.newickLen, 4);
                    if (a.level > f) f = a.level;
                    if (a.newickLen >
                        k) k = a.newickLen;
                    a.children.length > 0 && j(a, d)
                }
            return d
        };
    return function(c) {
        this.getRoot = function() {
            return l
        };
        this.getLevels = function() {
            return f
        };
        this.getNewickLen = function() {
            return k
        };
        this.getValidate = function() {};
        k = f = 0;
        a = c;
        b = 0;
        d();
        l = g();
        l = j(l)
    }
}();
Smits.PhyloCanvas.NewickParse.prototype = {};
Smits.PhyloCanvas.PhyloxmlParse = function() {
    var a = 0,
        c = 0,
        b, f, k = function(a, c) {
            var d = new Smits.PhyloCanvas.Node;
            if (c) d.level = c.level + 1;
            if (a.clade && a.clade.length)
                for (var j = 0; j < a.clade.length; j++) d.children.push(k(a.clade[j], d));
            if (a.branch_length) {
                if (typeof a.branch_length === "object") a.branch_length = a.branch_length[0].Text;
                d.len = Smits.Common.roundFloat(a.branch_length, 4);
                if (d.len == 0) d.len = 1.0E-4
            }
            if (a.name) {
                d.type = "label";
                d.name = a.name[0].Text;
                if (a.name[0] && a.name[0].style) d.style = a.name[0].style;
                if (a.name[0] &&
                    a.name[0].bgStyle) d.bgStyle = a.name[0].bgStyle
            } else if (a.confidence) d.name = a.confidence[0].Text;
            if (a.sequence && a.sequence[0] && a.sequence[0].name && a.sequence[0].name[0] && a.sequence[0].name[0].Text) d.sequenceName = a.sequence[0].name[0].Text;
            if (a.taxonomy && a.taxonomy[0]) {
                if (a.taxonomy[0].scientific_name && a.taxonomy[0].scientific_name[0] && a.taxonomy[0].scientific_name[0].Text) d.taxonomyScientificName = a.taxonomy[0].scientific_name[0].Text;
                if (a.taxonomy[0].common_name && a.taxonomy[0].common_name[0] && a.taxonomy[0].common_name[0].Text) d.taxonomyCommonName =
                    a.taxonomy[0].common_name[0].Text
            }
            if (a.sequence && a.sequence[0] && a.sequence[0].accession && a.sequence[0].accession[0] && a.sequence[0].accession[0].Text) d.sequenceAccession = a.sequence[0].accession[0].Text;
            if (a.point) d.LatLong = [a.point[0].lat[0].Text, a.point[0]["long"][0].Text];
            if (!d.name) {
                if (d.sequenceName) d.name = d.sequenceName;
                else if (d.taxonomyScientificName) d.name = d.taxonomyScientificName;
                else if (d.taxonomyCommonName) d.name = d.taxonomyCommonName;
                else if (d.sequenceAccession) d.name = d.sequenceAccession;
                if (d.name) d.type = "label"
            }
            if (a.annotation) {
                if (a.annotation[0] && a.annotation[0].desc && a.annotation[0].desc[0] && a.annotation[0].desc[0].Text) d.description = a.annotation[0].desc[0].Text;
                if (a.annotation[0] && a.annotation[0].uri && a.annotation[0].uri[0] && a.annotation[0].uri[0].Text) d.uri = a.annotation[0].uri[0].Text;
                if (a.annotation[0] && a.annotation[0].img)
                    for (j in a.annotation[0].img)
                        if (Smits.Common.isInteger(j)) d.img[j] = a.annotation[0].img[j].Text
            }
            if (a.chart && a.chart[0])
                for (j in a.chart[0])
                    if (j != "Text" && j !=
                        "_children") d.chart[j] = a.chart[0][j][0].Text;
            d && d.level > 1 && (d.len || (f = "Error. Please include Branch Lengths - we only draw rooted phylogenetic trees."));
            return d
        },
        l = function(b) {
            if (b.children && b.children.length)
                for (var f = 0; f < b.children.length; f++) {
                    var d = b.children[f];
                    d.newickLen = Math.round((d.len + b.newickLen) * 1E4) / 1E4;
                    if (d.level > a) a = d.level;
                    if (d.newickLen > c) c = d.newickLen;
                    d.children.length > 0 && l(d, b)
                }
            return b
        },
        p = function(a, c) {
            for (var d in a) d != "_children" && d != "Text" && (d == "rectangular" || d == "circular" ?
                p(a[d][0], d) : (Smits.PhyloCanvas.Render.Parameters[d] || (Smits.PhyloCanvas.Render.Parameters[d] = {}), Smits.PhyloCanvas.Render.Parameters.set(d, a[d][0].Text, c)))
        };
    return function(g) {
        this.getRoot = function() {
            return b
        };
        this.getLevels = function() {
            return a
        };
        this.getNewickLen = function() {
            return c
        };
        this.getValidate = function() {
            return f
        };
        g.phylogeny && g.phylogeny[0] && g.phylogeny[0].clade && (b = k(g.phylogeny[0].clade[0]));
        if (g.phylogeny && g.phylogeny[0] && g.phylogeny[0].render && g.phylogeny[0].render[0]) {
            if ((g = g.phylogeny[0].render[0]) &&
                g.styles) {
                var m = g.styles[0],
                    d;
                for (d in m)
                    if (d != "_children" && d != "Text")
                        if (m[d][0].type && m[d][0].type == "radialGradient" && Raphael.svg) m[d][0].name = d, Smits.PhyloCanvas.Render.Style[d] = m[d][0], Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList || (Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList = []), Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList.push(d);
                        else
                            for (var j in Smits.PhyloCanvas.Render.Style[d] || (Smits.PhyloCanvas.Render.Style[d] = {}), m[d][0]) j != "_attributes" && j != "_children" && j !=
                                "type" && (Smits.PhyloCanvas.Render.Style[d][j.replace("_", "-")] = m[d][0][j])
            }
            g && g.parameters && p(g.parameters[0]);
            if (g && g.charts)
                for (d in g = g.charts[0], g)
                    if (d != "_children" && d != "Text")
                        for (j in g[d])
                            if (g[d][j].type == "binary") g[d][j].chart = d, Smits.PhyloCanvas.Render.Parameters.binaryCharts.push(g[d][j]);
                            else if (g[d][j].type == "integratedBinary") g[d][j].chart = d, Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.push(g[d][j]);
            else if (g[d][j].type == "bar") g[d][j].chart = d, Smits.PhyloCanvas.Render.Parameters.barCharts.push(g[d][j])
        }
        b =
            l(b)
    }
}();
Smits.PhyloCanvas.PhyloxmlParse.prototype = {};
Smits.PhyloCanvas.NexmlParse = function() {
    var a = 0,
        c = 0,
        b, f, k, l, p = function(a, d, c) {
            var i = new Smits.PhyloCanvas.Node;
            if (c) i.level = c.level + 1;
            for (c = 0; c < k.length; c++)
                if (k[c].source == a.id)
                    for (var e = 0; e < l.length; e++) k[c].target == l[e].id && i.children.push(p(l[e], k[c].length, i));
            if (i && i.level > 0 && !i.len) i.len = 1;
            if (d && (i.len = Smits.Common.roundFloat(d, 4), i.len == 0)) i.len = 1.0E-4;
            if (a.label && (i.type = "label", i.name = a.label, a.style)) i.style = a.style;
            return i
        },
        g = function(b) {
            if (b.children && b.children.length)
                for (var d = 0; d <
                    b.children.length; d++) {
                    var j = b.children[d];
                    j.newickLen = Math.round((j.len + b.newickLen) * 1E4) / 1E4;
                    if (j.level > a) a = j.level;
                    if (j.newickLen > c) c = j.newickLen;
                    j.children.length > 0 && g(j, b)
                }
            return b
        };
    return function(m, d) {
        this.getRoot = function() {
            return b
        };
        this.getLevels = function() {
            return a
        };
        this.getNewickLen = function() {
            return c
        };
        this.getValidate = function() {
            return f
        };
        d.tree && m.trees[0] && m.trees[0].tree[d.tree - 1] ? (k = m.trees[0].tree[d.tree - 1].edge, l = m.trees[0].tree[d.tree - 1].node) : (k = m.trees[0].tree[0].edge, l = m.trees[0].tree[0].node);
        for (var j = 0; j < l.length; j++) {
            var i = 0;
            if (l[j].root && l[j].root == "true") {
                b = l[j];
                break
            }
            for (var e = 0; e < k.length; e++) k[e].target == l[j].id && i++;
            if (i == 0) {
                b = l[j];
                break
            }
        }
        b ? (b = p(b), b = g(b)) : f = "Error. Currently, only rooted NeXML trees are supported."
    }
}();
Smits.PhyloCanvas.NexmlParse.prototype = {};
Smits.PhyloCanvas.NexmlJsonParse = function() {
    var a = 0,
        c = 0,
        b, f, k = [],
        l = [],
        p = function(a, c, i) {
            var e = new Smits.PhyloCanvas.Node;
            if (i) e.level = i.level + 1;
            for (i = 0; i < k.length; i++)
                if (k[i].source == a.id)
                    for (var b = 0; b < l.length; b++) k[i].target == l[b].id && e.children.push(p(l[b], k[i].length, e));
            if (c && (e.len = Smits.Common.roundFloat(c, 4), e.len == 0)) e.len = 1.0E-4;
            if (a.label) {
                e.type = "label";
                e.name = a.label;
                if (a.accession) e.accession = a.accession;
                if (a.style) e.style = a.style;
                if (a.bgStyle) e.bgStyle = a.bgStyle
            }
            if (a.chart) e.chart =
                a.chart;
            e && e.level > 1 && (e.len || (f = "Error. Please include Branch Lengths - we only draw rooted phylogenetic trees."));
            return e
        },
        g = function(d) {
            if (d.children && d.children.length)
                for (var b = 0; b < d.children.length; b++) {
                    var i = d.children[b];
                    i.newickLen = Math.round((i.len + d.newickLen) * 1E4) / 1E4;
                    if (i.level > a) a = i.level;
                    if (i.newickLen > c) c = i.newickLen;
                    i.children.length > 0 && g(i, d)
                }
            return d
        },
        m = function(a, c) {
            for (var b in a) b != "_children" && b != "Text" && (b == "rectangular" || b == "circular" ? m(a[b], b) : (Smits.PhyloCanvas.Render.Parameters[b] ||
                (Smits.PhyloCanvas.Render.Parameters[b] = {}), Smits.PhyloCanvas.Render.Parameters.set(b, a[b], c)))
        };
    return function(d) {
        this.getRoot = function() {
            return b
        };
        this.getLevels = function() {
            return a
        };
        this.getNewickLen = function() {
            return c
        };
        this.getValidate = function() {
            return f
        };
        var j = d.nexmlJson.nexml,
            i = j.render;
        if (i && i.styles) {
            var e = i.styles,
                h;
            for (h in e)
                if (h != "_children" && h != "Text")
                    if (e[h]["@attributes"].type && e[h]["@attributes"].type == "radialGradient" && Raphael.svg) e[h].name = h, e[h].type = e[h]["@attributes"].type,
                        Smits.PhyloCanvas.Render.Style[h] = e[h], Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList || (Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList = []), Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList.push(h);
                    else
                        for (var n in Smits.PhyloCanvas.Render.Style[h] || (Smits.PhyloCanvas.Render.Style[h] = {}), e[h]["@attributes"]) n != "_attributes" && n != "_children" && n != "type" && (Smits.PhyloCanvas.Render.Style[h][n.replace("_", "-")] = e[h]["@attributes"][n])
        }
        i && i.parameters && m(i.parameters);
        if (i && i.charts)
            for (h in i =
                i.charts, i) i[h]["@attributes"].chart = h, i[h]["@attributes"].type == "binary" ? Smits.PhyloCanvas.Render.Parameters.binaryCharts.push(i[h]["@attributes"]) : i[h]["@attributes"].type == "integratedBinary" ? Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.push(i[h]["@attributes"]) : i[h]["@attributes"].type == "bar" && Smits.PhyloCanvas.Render.Parameters.barCharts.push(i[h]["@attributes"]);
        if (d.tree && j.trees[0] && j.trees[0].tree[d.tree - 1]) k = j.trees[0].tree[d.tree - 1].edge, l = j.trees[0].tree[d.tree - 1].node;
        else {
            for (h =
                0; h < j.trees.tree.edge.length; h++) k.push(j.trees.tree.edge[h]["@attributes"]);
            for (h = 0; h < j.trees.tree.node.length; h++) {
                d = j.trees.tree.node[h]["@attributes"];
                if (d.label) d.chart = j.trees.tree.node[h].chart;
                l.push(d)
            }
        }
        for (h = 0; h < l.length; h++) l[h].root && l[h].root == "true" && (b = l[h]);
        b ? (b = p(b), b = g(b)) : f = "Error. Currently, only rooted NeXML trees are supported."
    }
}();
Smits.PhyloCanvas.NexmlParse.prototype = {};
Smits.PhyloCanvas.Render = {};
Smits.PhyloCanvas.Render.Style = {
    line: {
        stroke: "rgb(0,0,0)",
        "stroke-width": 1
    },
    text: {
        "font-family": "Verdana",
        "font-size": 12,
        "text-anchor": "start"
    },
    path: {
        stroke: "rgb(0,0,0)",
        "stroke-width": 1
    },
    connectedDash: {
        stroke: "rgb(200,200,200)",
        "stroke-dasharray": ". "
    },
    textSecantBg: {
        fill: "#EEE",
        stroke: "#DDD"
    },
    highlightedEdgeCircle: {
        fill: "red"
    },
    barChart: {
        fill: "#003300",
        stroke: "#DDD"
    },
    getStyle: function(a, c) {
        return this[a] ? this[a] : this[c]
    }
};
Smits.PhyloCanvas.Render.Parameters = {
    jsOverride: 0,
    Rectangular: {
        bufferX: 200,
        paddingX: 10,
        paddingY: 20,
        bufferInnerLabels: 10,
        bufferOuterLabels: 5,
        minHeightBetweenLeaves: 10,
        alignPadding: 0,
        alignRight: !1,
        showScaleBar: !1
    },
    Circular: {
        bufferRadius: 0.33,
        bufferAngle: 20,
        initStartAngle: 160,
        innerCircleRadius: 0,
        minHeightBetweenLeaves: 5,
        bufferInnerLabels: 2,
        bufferOuterLabels: 5
    },
    binaryCharts: [],
    integratedBinaryCharts: [],
    barCharts: [],
    binaryChartBufferInner: 5,
    binaryChartBufferSiblings: 0.01,
    binaryChartThickness: 15,
    binaryChartDisjointed: !1,
    barChartBufferInner: 3,
    barChartHeight: 50,
    barChartWidth: 0.5,
    mouseRollOver: function(a) {
        if (a.node.edgeCircleHighlight) a.node.edgeCircleHighlight.show();
        else {
            var c = a.svg.draw(new Smits.PhyloCanvas.Render.Circle(a.x, a.y, 5, {
                attr: Smits.PhyloCanvas.Render.Style.highlightedEdgeCircle
            }));
            a.node.edgeCircleHighlight = c[0]
        }
        a.textEl.attr({
            fill: "red"
        })
    },
    mouseRollOut: function(a) {
        a.node.edgeCircleHighlight.hide();
        a.textEl.attr({
            fill: "#000"
        })
    },
    set: function(a, c, b) {
        this.jsOverride || (b ? b == "circular" ? this.Circular[a] = parseFloat(c) :
            b == "rectangular" && (this.Rectangular[a] = parseFloat(c)) : this[a] = parseFloat(c))
    }
};
Smits.PhyloCanvas.Render.Line = function() {
    return function(a, c, b, f, k) {
        this.type = "line";
        this.attr = Smits.PhyloCanvas.Render.Style.line;
        this.x1 = a;
        this.x2 = c;
        this.y1 = b;
        this.y2 = f;
        if (k && (Smits.Common.apply(this, k), k.attr)) this.attr = k.attr
    }
}();
Smits.PhyloCanvas.Render.Text = function() {
    return function(a, c, b, f) {
        this.type = "text";
        this.attr = Smits.PhyloCanvas.Render.Style.text;
        this.x = a;
        this.y = c;
        this.text = b;
        if (f && (Smits.Common.apply(this, f), f.attr)) this.attr = f.attr
    }
}();
Smits.PhyloCanvas.Render.Path = function() {
    return function(a, c) {
        this.type = "path";
        this.attr = Smits.PhyloCanvas.Render.Style.path;
        this.path = a;
        if (c && (Smits.Common.apply(this, c), c.attr)) this.attr = c.attr
    }
}();
Smits.PhyloCanvas.Render.Circle = function() {
    return function(a, c, b, f) {
        this.type = "circle";
        this.x = a;
        this.y = c;
        this.radius = b;
        if (f && (Smits.Common.apply(this, f), f.attr)) this.attr = f.attr
    }
}();
Smits.PhyloCanvas.Render.SVG = function() {
    return function(a, c, b) {
        this.canvasSize = [c, b];
        this.svg = Raphael(a, this.canvasSize[0], this.canvasSize[1])
    }
}();
Smits.PhyloCanvas.Render.SVG.prototype = {
    render: function() {
        var a = this.phylogramObject.getDrawInstructs();
        console.log("render", this.phylogramObject.getDrawInstructs());
        for (var c = 0; c < a.length; c++)
            if (a[c].type == "line") this.svg.path(["M", a[c].x1, a[c].y1, "L", a[c].x2, a[c].y2]).attr(Smits.PhyloCanvas.Render.Style.line);
            else if (a[c].type == "path") this.svg.path(a[c].path).attr(a[c].attr);
        else if (a[c].type == "circle") this.svg.circle(a[c].x, a[c].y, a[c].radius).attr({
            stroke: "red"
        });
        else {
            var b = this.svg.text(a[c].x,
                a[c].y, a[c].text).attr(Smits.PhyloCanvas.Render.Style.text);
            a[c].attr && b.attr(a[c].attr);
            a[c].rotate && b.rotate(a[c].rotate);
            b.getBBox()
        }
    },
    draw: function(a) {
        var c, b;
        a.type == "line" ? c = this.svg.path(["M", a.x1, a.y1, "L", a.x2, a.y2]).attr(Smits.PhyloCanvas.Render.Style.line) : a.type == "path" ? c = this.svg.path(a.path).attr(a.attr) : a.type == "circle" ? c = this.svg.circle(a.x, a.y, a.radius).attr({
            stroke: "red"
        }) : a.type == "text" && (c = this.svg.text(a.x, a.y, a.text).attr(Smits.PhyloCanvas.Render.Style.text), a.attr && c.attr(a.attr),
            a.rotate && c.rotate(a.rotate), a = c.getBBox(), b = Math.sqrt(a.height * a.height + a.width * a.width));
        return [c, b]
    }
};
Smits.PhyloCanvas.Render.Phylogram = function() {
    var a, c = Smits.PhyloCanvas.Render.Parameters.Rectangular,
        b, f, k, l, p, g, m = !0,
        d = 0,
        j = 0,
        i, e, h, n, o, q = [],
        u = function(b, e) {
            b.len && m == !1 && b.children.length == 0 && (d = Smits.Common.roundFloat(d + l, 4));
            if (b.children.length > 0) {
                var i = [],
                    h, f, o, n;
                b.len && (h = e, f = e = Smits.Common.roundFloat(e + k * b.len, 4), n = o = d + b.getMidbranchPosition(m) * l, a.draw(new Smits.PhyloCanvas.Render.Line(h, f, o, n)));
                if (b.name) {
                    h = {};
                    h = Smits.PhyloCanvas.Render.Style.getStyle("bootstrap", "text");
                    if (b.uri) h.href =
                        b.uri;
                    if (b.description) h.title = b.description;
                    var g = b.level == 0 ? d + b.getMidbranchPosition(m) * l : n;
                    a.draw(new Smits.PhyloCanvas.Render.Text((f || e) + 5, g, b.name, {
                        attr: h
                    }))
                }
                if (b.children && b.children.length)
                    for (h = 0; h < b.children.length; h++) i.push(u(b.children[h], e));
                f = [];
                for (h = 0; h < i.length; h++) i[h][0] && f.push(i[h][0]), i[h][1] && f.push(i[h][1]);
                i = Math.min.apply(null, f);
                f = Math.max.apply(null, f);
                a.draw(new Smits.PhyloCanvas.Render.Path(["M", e + 1.0E-4, i, "L", e, i, "L", e, f, "L", e + 1.0E-4, f], {
                    attr: Smits.PhyloCanvas.Render.Style.line
                }))
            } else {
                h =
                    e;
                f = Smits.Common.roundFloat(e + k * b.len, 2);
                n = o = d;
                b.y = d;
                q.push(b);
                a.draw(new Smits.PhyloCanvas.Render.Line(h, f, o, n));
                c.alignRight && a.draw(new Smits.PhyloCanvas.Render.Path(["M", f, o, "L", c.alignPadding + p, n], {
                    attr: Smits.PhyloCanvas.Render.Style.connectedDash
                }));
                if (b.name) {
                    h = {};
                    b.style && (h = Smits.PhyloCanvas.Render.Style.getStyle(b.style, "text"));
                    h["text-anchor"] = "start";
                    if (b.uri) h.href = b.uri;
                    if (b.description) h.title = b.description;
                    i = a.draw(new Smits.PhyloCanvas.Render.Text(c.alignRight ? p + c.bufferInnerLabels +
                        c.alignPadding : f + c.bufferInnerLabels, n, b.name, {
                            attr: h
                        }));
                    j = Math.max(i[1], j);
                    Smits.PhyloCanvas.Render.Parameters.mouseRollOver && Smits.Common.addRaphEventHandler(i[0], "mouseover", Smits.PhyloCanvas.Render.Parameters.mouseRollOver, {
                        svg: a,
                        node: b,
                        x: f,
                        y: n,
                        textEl: i[0]
                    });
                    Smits.PhyloCanvas.Render.Parameters.mouseRollOut && Smits.Common.addRaphEventHandler(i[0], "mouseout", Smits.PhyloCanvas.Render.Parameters.mouseRollOut, {
                        svg: a,
                        node: b,
                        x: f,
                        y: n,
                        textEl: i[0]
                    });
                    Smits.PhyloCanvas.Render.Parameters.onClickAction && Smits.Common.addRaphEventHandler(i[0],
                        "click", Smits.PhyloCanvas.Render.Parameters.onClickAction, {
                            svg: a,
                            node: b,
                            x: f,
                            y: n,
                            textEl: i[0]
                        })
                }
                m && (m = !1)
            }
            return [o, n]
        },
        z = function(d, c, b) {
            for (var e = (b && b.bufferInner ? b.bufferInner : 0) | Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner, i = (b && b.bufferSiblings ? b.bufferSiblings * l : 0) | (Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings < 1 ? l * Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings : Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings), b = (b && b.thickness ? b.thickness :
                    0) | Smits.PhyloCanvas.Render.Parameters.binaryChartThickness, h = 0; h < q.length; h++) {
                var j = q[h];
                a.draw(new Smits.PhyloCanvas.Render.Path(["M", d + e, j.y - l / 2 + i / 2, "L", d + e + b, j.y - l / 2 + i / 2, "L", d + e + b, j.y + l / 2 - i / 2, "L", d + e, j.y + l / 2 - i / 2, "Z"], {
                    attr: Smits.PhyloCanvas.Render.Style.getStyle(j.chart[c], "textSecantBg")
                }))
            }
            return d + e + b
        },
        B = function(d, c, b) {
            for (var e = [], i = b && b.bufferInner ? b.bufferInner : 0 | Smits.PhyloCanvas.Render.Parameters.barChartBufferInner, h = b && b.height ? b.height : 0 | Smits.PhyloCanvas.Render.Parameters.barChartHeight,
                    b = b && b.width ? b.width < 1 ? l * b.width : b.width : 0 | (Smits.PhyloCanvas.Render.Parameters.barChartWidth < 1 ? l * Smits.PhyloCanvas.Render.Parameters.barChartWidth : Smits.PhyloCanvas.Render.Parameters.barChartWidth), j = 0, f = 0; f < q.length; f++) e.push(q[f].chart[c]);
            e = Math.max.apply(null, e);
            j = Smits.Common.roundFloat(h / e, 4);
            for (f = 0; f < q.length; f++) e = q[f], a.draw(new Smits.PhyloCanvas.Render.Path(["M", d + i, e.y - b / 2, "L", d + i + j * e.chart[c], e.y - b / 2, "L", d + i + j * e.chart[c], e.y + b / 2, "L", d + i, e.y + b / 2, "Z"], {
                attr: Smits.PhyloCanvas.Render.Style.getStyle(e.chart[c],
                    "barChart")
            }));
            return d + i + h
        };
    return function(q, m) {
        this.getCanvasSize = function() {
            return [b, f]
        };
        this.getRoot = function() {
            return m.getRoot()
        };
        m.getValidate() && a.draw(0, 0, m.getValidate());
        a = q;
        var r = m.getRoot(),
            v = m.getNewickLen();
        b = a.canvasSize[0];
        f = a.canvasSize[1];
        h = c.bufferX;
        n = c.paddingX;
        o = c.paddingY;
        g = c.minHeightBetweenLeaves;
        d = o;
        k = Math.round((b - h - n * 2) / v);
        l = Math.round((f - o * 2) / (c.showScaleBar ? r.getCountAllChildren() : r.getCountAllChildren() - 1));
        l < g && (l = g);
        p = Math.round(b - h - n * 2);
        if (Smits.PhyloCanvas.Render.Parameters.binaryCharts.length ||
            Smits.PhyloCanvas.Render.Parameters.barCharts.length) c.alignRight = !0;
        u(r, n);
        c.showScaleBar && (y = d + l, e = c.showScaleBar * k, a.draw(new Smits.PhyloCanvas.Render.Line(0, e, y, y)), a.draw(new Smits.PhyloCanvas.Render.Text((0 + e) / 2, y - 8, c.showScaleBar)));
        i = p + j + c.bufferInnerLabels;
        if (Smits.PhyloCanvas.Render.Parameters.binaryCharts.length) {
            var r = Smits.PhyloCanvas.Render.Parameters.binaryCharts,
                s;
            for (s in r) i = z(i, r[s].chart, r[s])
        }
        if (Smits.PhyloCanvas.Render.Parameters.barCharts.length)
            for (s in r = Smits.PhyloCanvas.Render.Parameters.barCharts,
                r) B(i, r[s].chart, r[s])
    }
}();
Smits.PhyloCanvas.Render.Phylogram.prototype = {};
Smits.PhyloCanvas.Render.CircularPhylogram = function() {
    function a(a, d) {
        d += D;
        return [Smits.Common.roundFloat(E + a * Math.sin(d * F), 4), Smits.Common.roundFloat(r + a * Math.cos(d * F), 4)]
    }

    function c(a) {
        a = k(90 - a - D);
        if (a > 90 && a < 270) {
            a += 180;
            var d = "end"
        } else d = "start";
        return [a, d]
    }

    function b(d, b, c, e) {
        var i = a(d, b),
            h = a(d, c),
            j = [],
            f = 0,
            b = Math.abs(k(c - b)) > 180 ? 1 : -1;
        e && e.invertSecant && (b *= -1, f = 1);
        (!e || !e.noMove) && j.push("M");
        j.push(i[0], i[1], "A", d, d, 0, b < 1 ? 0 : 1, f, h[0], h[1]);
        return j
    }

    function f(d, b, c, e) {
        var i = [],
            b = a(b, d),
            d = a(c,
                d);
        (!e || !e.noMove) && i.push("M");
        i.push(b[0], b[1], "L", d[0], d[1]);
        return i
    }

    function k(a) {
        for (; a > 360 || a < 0;) a > 360 ? a -= 360 : a < 0 && (a += 360);
        return a
    }

    function l(a, d, c, e) {
        !d && a.length > 1 && (e = a[3], c = a[2], d = a[1], a = a[0]);
        return g("M", b(a, c, e, {
            noMove: 1,
            invertSecant: 0
        }), "L", b(d, e, c, {
            noMove: 1,
            invertSecant: 1
        }), "Z")
    }

    function p(d, h) {
        d.len && (B ? A = C || 1 : d.children.length == 0 && (A = Smits.Common.roundFloat(A + u, 4)));
        if (d.children.length > 0) {
            var j = [],
                o, n, k;
            o = h;
            n = h += Smits.Common.roundFloat(q * d.len, 4);
            if (d.children && d.children.length)
                for (var l =
                        0; l < d.children.length; l++) {
                    var m = p(d.children[l], h);
                    m > 0 && j.push(m)
                }
            l = Smits.Common.roundFloat(Math.min.apply(null, j), 4);
            j = Smits.Common.roundFloat(Math.max.apply(null, j), 4);
            d.level != 0 && i.draw(new Smits.PhyloCanvas.Render.Path(g("M", a(h + 0.01, l), "L", b(h, l, j, {
                noMove: !0
            }), "L", a(h + 0.01, j))));
            d.len && (k = Smits.Common.roundFloat(l + (j - l) / 2, 4), i.draw(new Smits.PhyloCanvas.Render.Path(f(k, o, n))))
        } else if (d.y = A, s.push(d), o = h, n = Smits.Common.roundFloat(h + q * d.len), k = A, i.draw(new Smits.PhyloCanvas.Render.Path(f(k, o,
                n))), i.draw(new Smits.PhyloCanvas.Render.Path(f(k, n, v), {
                attr: Smits.PhyloCanvas.Render.Style.connectedDash
            })), d.name) {
            o = a(v + e.bufferInnerLabels, k);
            l = c(k);
            j = l[0];
            l = l[1];
            m = {};
            d.style && Smits.Common.apply(m, Smits.PhyloCanvas.Render.Style.getStyle(d.style, "text"));
            m["text-anchor"] = l;
            if (d.uri) m.href = d.uri;
            if (d.description) m.title = d.description;
            j = i.draw(new Smits.PhyloCanvas.Render.Text(o[0], o[1], d.name, {
                attr: m,
                rotate: [j, o[0], o[1]]
            }));
            d.bgStyle && t.push([d.bgStyle, k]);
            o = a(n, k);
            Smits.PhyloCanvas.Render.Parameters.mouseRollOver &&
                Smits.Common.addRaphEventHandler(j[0], "mouseover", Smits.PhyloCanvas.Render.Parameters.mouseRollOver, {
                    svg: i,
                    node: d,
                    x: o[0],
                    y: o[1],
                    textEl: j[0]
                });
            Smits.PhyloCanvas.Render.Parameters.mouseRollOut && Smits.Common.addRaphEventHandler(j[0], "mouseout", Smits.PhyloCanvas.Render.Parameters.mouseRollOut, {
                svg: i,
                node: d,
                x: o[0],
                y: o[1],
                textEl: j[0]
            });
            Smits.PhyloCanvas.Render.Parameters.onClickAction && Smits.Common.addRaphEventHandler(j[0], "click", Smits.PhyloCanvas.Render.Parameters.onClickAction, {
                svg: i,
                node: d,
                x: o[0],
                y: o[1],
                textEl: j[0]
            });
            x = Math.max(j[1], x)
        }
        B && (B = !1);
        return k
    }

    function g(a) {
        for (var d = a, b = 1; b < arguments.length; b++) d = d.concat(arguments[b]);
        return d
    }

    function m() {
        var a = [];
        if (t.length > 0) {
            if (Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList)
                for (var d = 0; d < Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList.length; d++) {
                    var b = Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList[d],
                        b = Smits.Common.createGradientEl(b, Smits.PhyloCanvas.Render.Style[b], [E, r, v + x + e.bufferOuterLabels]);
                    i.svg.defs.appendChild(b)
                }
            for (d =
                0; d < t.length; d++) d != t.length - 1 && t[d][0] == t[d + 1][0] ? t[d + 1][2] = t[d][2] ? t[d][2] : t[d][1] : (a = l(v, v + x + e.bufferOuterLabels, t[d][2] ? t[d][2] - u / 2 : t[d][1] - u / 2, t[d][1] + u / 2), b = Smits.PhyloCanvas.Render.Style.getStyle(t[d][0], "textSecantBg"), a = i.draw(new Smits.PhyloCanvas.Render.Path(a, {
                attr: b.type ? {} : b
            })), b.type && b.type == "radialGradient" && a[0].node.setAttribute("fill", "url(#" + b.name + ")"), b.type && b.type == "radialGradient" && a[0].node.setAttribute("stroke", "none"), a[0].toBack())
        }
        a = l(v, v + x + e.bufferOuterLabels, (C || 1) -
            u / 2, 360 - u / 2);
        a = i.draw(new Smits.PhyloCanvas.Render.Path(a, {
            attr: Smits.PhyloCanvas.Render.Style.textSecantBg
        }));
        a[0].toBack();
        return v + x + e.bufferOuterLabels
    }

    function d(d, b, e) {
        for (var j = e && e.bufferInner ? parseFloat(e.bufferInner) : Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner, h = (e && e.bufferSiblings ? e.bufferSiblings * u : 0) | (Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings < 1 ? u * Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings : Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings),
                f = e && e.thickness ? parseFloat(e.thickness) : Smits.PhyloCanvas.Render.Parameters.binaryChartThickness, o = (e && e.disjointed ? e.disjointed : 0) | Smits.PhyloCanvas.Render.Parameters.binaryChartDisjointed, e = e && e.isInternal ? e.isInternal : !1, n = !0, g, m = 0; m < s.length; m++) {
            var q = s[m];
            if ((!s[m + 1] || q.chart[b] !== s[m + 1].chart[b] || o) && q.chart[b] != "none") {
                var p = Smits.PhyloCanvas.Render.Style.getStyle(q.chart[b], "textSecantBg");
                g = e ? [v - j - f, v - j, (g ? g : q.y) - u / 2 + (n && !o ? 0 : h / 2), q.y + u / 2 - (m == s.length - 1 && !o ? 0 : h / 2)] : [d + j, d + j + f, (g ? g : q.y) -
                    u / 2 + (n && !o ? 0 : h / 2), q.y + u / 2 - (m == s.length - 1 && !o ? 0 : h / 2)
                ];
                if (p.label) {
                    var n = Smits.PhyloCanvas.Render.Style.getStyle(p.labelStyle, "text"),
                        q = a((g[0] + g[1]) / 2, (g[2] + g[3]) / 2),
                        r = c((g[2] + g[3]) / 2),
                        r = k(r[0] + (n.rotate ? parseFloat(n.rotate) : 0)),
                        t = k(90 - (g[2] + g[3]) / 2 - D);
                    t > 90 && t < 270 && (r += 180);
                    n["text-anchor"] || (n["text-anchor"] = "middle");
                    i.draw(new Smits.PhyloCanvas.Render.Text(q[0], q[1], p.label, {
                        attr: n,
                        rotate: r
                    }))[0].toBack()
                }
                p.borderStyle && (n = Smits.PhyloCanvas.Render.Style.getStyle(p.borderStyle, "textSecantBg"), i.draw(new Smits.PhyloCanvas.Render.Path(l([v,
                    n.fullsize ? g[1] : g[0], g[2], g[3]
                ]), {
                    attr: n
                }))[0].toBack());
                i.draw(new Smits.PhyloCanvas.Render.Path(l(g), {
                    attr: p
                }))[0].toBack();
                g = 0
            } else {
                if (!g) g = q.y;
                q.chart[b] == "none" && (g = 0)
            }
            n = !1
        }
        return e ? d : d + j + f
    }

    function j(d, a, b) {
        for (var c = [], e = b && b.bufferInner ? parseFloat(b.bufferInner) : Smits.PhyloCanvas.Render.Parameters.barChartBufferInner, j = b && b.height ? parseFloat(b.height) : Smits.PhyloCanvas.Render.Parameters.barChartHeight ? Smits.PhyloCanvas.Render.Parameters.barChartHeight : 0, b = b && b.width ? parseFloat(b.width) < 1 ?
                u * parseFloat(b.width) : parseFloat(b.width) : 0 | (Smits.PhyloCanvas.Render.Parameters.barChartWidth < 1 ? u * Smits.PhyloCanvas.Render.Parameters.barChartWidth : Smits.PhyloCanvas.Render.Parameters.barChartWidth), h = 0, f = 0; f < s.length; f++) c.push(s[f].chart[a]);
        c = Math.max.apply(null, c);
        h = Smits.Common.roundFloat(j / c, 4);
        for (f = 0; f < s.length; f++) c = s[f], c.chart[a] > 0 && i.draw(new Smits.PhyloCanvas.Render.Path(l(d + e, d + e + h * c.chart[a], c.y - b / 2, c.y + b / 2), {
            attr: Smits.PhyloCanvas.Render.Style.getStyle(c.chart[a], "barChart")
        }));
        return d +
            e + j
    }
    var i, e = Smits.PhyloCanvas.Render.Parameters.Circular,
        h, n, o, q, u, z, B = !0,
        A = 0,
        E, r, v, s = [],
        t = [],
        C, w, x = 0,
        D, F = Math.PI / 180;
    return function(a, b, c) {
        this.getCanvasSize = function() {
            return [h, n]
        };
        this.getRoot = function() {
            return b.getRoot()
        };
        if (b.getValidate()) a.draw({
            type: "text",
            x: 0,
            y: a.canvasSize[1] / 3,
            text: b.getValidate()
        });
        else {
            i = a;
            var a = b.getRoot(),
                f = b.getNewickLen();
            h = i.canvasSize[0];
            n = i.canvasSize[1];
            E = h / 2;
            r = n / 2;
            o = Math.min.apply(null, [h, n]);
            c = e.bufferRadius > 1 ? e.bufferRadius : Smits.Common.roundFloat(o * e.bufferRadius,
                4);
            C = e.bufferAngle;
            z = e.innerCircleRadius;
            D = e.initStartAngle;
            v = Math.round((o - c - z) / 2);
            q = (v - z) / f;
            u = Smits.Common.roundFloat((360 - C) / a.getCountAllChildren(), 4);
            p(a, z);
            w = v + x + e.bufferOuterLabels;
            if (Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.length) {
                var c = Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts,
                    g;
                for (g in c) w = d(w - (c[g].thickness ? c[g].thickness : Smits.PhyloCanvas.Render.Parameters.binaryChartThickness) - (c[g].bufferInner ? c[g].bufferInner : Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner),
                    c[g].chart, c[g])
            }
            w = m();
            if (Smits.PhyloCanvas.Render.Parameters.binaryCharts.length)
                for (g in c = Smits.PhyloCanvas.Render.Parameters.binaryCharts, c) w = d(w, c[g].chart, c[g]);
            if (Smits.PhyloCanvas.Render.Parameters.barCharts.length)
                for (g in c = Smits.PhyloCanvas.Render.Parameters.barCharts, c) w = j(w, c[g].chart, c[g])
        }
    }
}();
Smits.PhyloCanvas.Render.CircularPhylogram.prototype = {};
var XMLObjectifier = function() {
    var a = function(a) {
        var b = "";
        a && typeof a === "string" && (b = a);
        return /^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/.test(b)
    };
    return {
        xmlToJSON: function(c) {
            try {
                if (!c) return null;
                var b = {
                        typeOf: "JSXBObject"
                    },
                    f = c.nodeType == 9 ? c.documentElement : c;
                b.RootName = f.nodeName || "";
                if (c.nodeType == 3 || c.nodeType == 4) return c.nodeValue;
                var k = function(a) {
                        return a.replace(/^\s+|\s+$/gm, "")
                    },
                    l = function(a, b) {
                        if (b.attributes.length > 0) {
                            var c = b.attributes.length - 1,
                                e;
                            a._attributes = [];
                            do e = String(String(b.attributes[c].name).replace(/-/g,
                                "_")), a._attributes.push(e), a[e] = k(b.attributes[c].value); while (c--)
                        }
                    };
                (function() {
                    return {
                        activate: function() {
                            var a = [];
                            a.getNodesByAttribute = function(b, c) {
                                if (a && a.length > 0) {
                                    var e = [],
                                        h, f = a.length - 1;
                                    try {
                                        do h = a[f], h[b] === c && e.push(h); while (f--);
                                        e.reverse();
                                        return e
                                    } catch (o) {}
                                    return null
                                }
                            };
                            a.getNodeByAttribute = function(b, c) {
                                if (a && a.length > 0) {
                                    var e, h = a.length - 1;
                                    try {
                                        do
                                            if (e = a[h], e[b] === c) return e; while (h--)
                                    } catch (f) {}
                                    return null
                                }
                            };
                            a.getNodesByValue = function(b) {
                                if (a && a.length > 0) {
                                    var c = [],
                                        e, h = a.length - 1;
                                    try {
                                        do e = a[h], e.Text && e.Text === b && c.push(e); while (h--);
                                        return c
                                    } catch (f) {}
                                    return null
                                }
                            };
                            a.contains = function(b, c) {
                                if (a && a.length > 0) {
                                    var e = a.length - 1;
                                    try {
                                        do
                                            if (a[e][b] === c) return !0; while (e--)
                                    } catch (h) {}
                                    return !1
                                }
                            };
                            a.indexOf = function(b, c) {
                                var e = -1;
                                if (a && a.length > 0) {
                                    var h = a.length - 1;
                                    try {
                                        do a[h][b] === c && (e = h); while (h--)
                                    } catch (f) {
                                        return -1
                                    }
                                    return e
                                }
                            };
                            a.SortByAttribute = function(b, c) {
                                if (a && a.length > 0) {
                                    var e = function(a, b) {
                                        var d = a[b];
                                        return d = bam.validation.isNumeric(d) ? parseFloat(d) : d
                                    };
                                    a.sort(function(a, d) {
                                        var f,
                                            g;
                                        f = e(a, b);
                                        g = e(d, b);
                                        f = f < g ? -1 : g < f ? 1 : 0;
                                        c && (f = c.toUpperCase() === "DESC" ? 0 - f : f);
                                        return f
                                    })
                                }
                            };
                            a.SortByValue = function(b) {
                                if (a && a.length > 0) {
                                    var c = function(a) {
                                        a = a.Text;
                                        return a = bam.validation.isNumeric(a) ? parseFloat(a) : a
                                    };
                                    a.sort(function(a, d) {
                                        var f, g;
                                        f = c(a);
                                        g = c(d);
                                        f = f < g ? -1 : g < f ? 1 : 0;
                                        b && (f = b.toUpperCase() === "DESC" ? 0 - f : f);
                                        return f
                                    })
                                }
                            };
                            a.SortByNode = function(b, c) {
                                if (a && a.length > 0) {
                                    var e = function(a, b) {
                                        var d = a[b][0].Text;
                                        return d = bam.validation.isNumeric(d) ? parseFloat(d) : d
                                    };
                                    a.sort(function(a, d) {
                                        var f, g;
                                        f = e(a, b);
                                        g =
                                            e(d, b);
                                        f = f < g ? -1 : g < f ? 1 : 0;
                                        c && (f = c.toUpperCase() === "DESC" ? 0 - f : f);
                                        return f
                                    })
                                }
                            };
                            return a
                        }
                    }
                })();
                var p = function(b) {
                        b.getNodeByAttribute = function(a, b) {
                            if (this.length > 0) {
                                var d, c = this.length - 1;
                                try {
                                    do
                                        if (d = this[c], d[a] == b) return d; while (c--)
                                } catch (f) {}
                                return !1
                            }
                        };
                        b.contains = function(a, b) {
                            if (this.length > 0) {
                                var d = this.length - 1;
                                try {
                                    do
                                        if (this[d][a] == b) return !0; while (d--)
                                } catch (c) {}
                                return !1
                            }
                        };
                        b.indexOf = function(a, b) {
                            var d = -1;
                            if (this.length > 0) {
                                var c = this.length - 1;
                                try {
                                    do this[c][a] == b && (d = c); while (c--)
                                } catch (f) {
                                    return -1
                                }
                                return d
                            }
                        };
                        b.SortByAttribute = function(b, d) {
                            if (this.length) {
                                var c = function(b, d) {
                                    var c = b[d];
                                    return c = a(c) ? parseFloat(c) : c
                                };
                                this.sort(function(a, f) {
                                    var g = 0,
                                        k, l;
                                    k = c(a, b);
                                    l = c(f, b);
                                    k < l ? g = -1 : l < k && (g = 1);
                                    d && (g = d.toUpperCase() == "DESC" ? 0 - g : g);
                                    return g
                                })
                            }
                        };
                        b.SortByValue = function(b) {
                            if (this.length) {
                                var d = function(b) {
                                    b = b.Text;
                                    return b = a(b) ? parseFloat(b) : b
                                };
                                this.sort(function(a, c) {
                                    var f = 0,
                                        g, k;
                                    g = d(a);
                                    k = d(c);
                                    g < k ? f = -1 : k < g && (f = 1);
                                    b && (f = b.toUpperCase() == "DESC" ? 0 - f : f);
                                    return f
                                })
                            }
                        };
                        b.SortByNode = function(b, d) {
                            if (this.length) {
                                var c =
                                    function(b, d) {
                                        var c = b[d][0].Text;
                                        return c = a(c) ? parseFloat(c) : c
                                    };
                                this.sort(function(a, f) {
                                    var g = 0,
                                        k, l;
                                    k = c(a, b);
                                    l = c(f, b);
                                    k < l ? g = -1 : l < k && (g = 1);
                                    d && (g = d.toUpperCase() == "DESC" ? 0 - g : g);
                                    return g
                                })
                            }
                        }
                    },
                    g = function(a, b) {
                        var c, e, f, m = "";
                        if (!b) return null;
                        b.attributes.length > 0 && l(a, b);
                        a.Text = "";
                        if (b.hasChildNodes()) {
                            var o = b.childNodes.length - 1,
                                q = 0;
                            do switch (e = b.childNodes[q], e.nodeType) {
                                case 1:
                                    a._children = [];
                                    c = e.localName ? e.localName : e.baseName;
                                    c = String(c).replace(/-/g, "_");
                                    m != c && a._children.push(c);
                                    a[c] || (a[c] = []);
                                    f = {};
                                    a[c].push(f);
                                    e.attributes.length > 0 && l(f, e);
                                    a[c].contains || p(a[c]);
                                    m = c;
                                    e.hasChildNodes() && g(f, e);
                                    break;
                                case 3:
                                    a.Text += k(e.nodeValue);
                                    break;
                                case 4:
                                    a.Text += e.text ? k(e.text) : k(e.nodeValue)
                            }
                            while (q++ < o)
                        }
                    };
                g(b, f);
                f = c = null;
                return b
            } catch (m) {
                return null
            }
        },
        textToXML: function(a) {
            var b = null;
            try {
                b = document.all ? new ActiveXObject("Microsoft.XMLDOM") : new DOMParser, b.async = !1
            } catch (f) {
                throw Error("XML Parser could not be instantiated");
            }
            var k;
            try {
                k = document.all ? b.loadXML(a) ? b : !1 : b.parseFromString(a, "text/xml")
            } catch (l) {
                throw Error("Error parsing XML string");
            }
            return k
        }
    }
}();